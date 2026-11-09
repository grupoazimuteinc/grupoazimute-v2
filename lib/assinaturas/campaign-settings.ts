import 'server-only'

import { clerkClient } from '@clerk/nextjs/server'
import { unstable_cache } from 'next/cache'

import type { CampaignSettings, CampaignSettingsByCategory } from './types'

/**
 * A escolha da mensagem sazonal (toggle + campanha) é feita por categoria de
 * colaborador e fica gravada no privateMetadata do usuário do Clerk que
 * salvou, como `{ [categoryId]: CampaignSettings }`. Na leitura, vale a
 * alteração mais recente de cada categoria entre todos os usuários. Assim não
 * é preciso nenhum banco ou token além do CLERK_SECRET_KEY já existente.
 * As mensagens em si continuam em data/assinaturas.json.
 */
const METADATA_KEY = 'signatureCampaignSettingsByCategory'
export const CAMPAIGN_SETTINGS_TAG = 'signature-campaign-settings'

const PAGE_SIZE = 100
const MAX_PAGES = 5

export const DEFAULT_CAMPAIGN_SETTINGS: CampaignSettings = {
  enabled: false,
  campaignId: null,
}

function parseSettings(value: unknown): CampaignSettings | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const raw = value as Record<string, unknown>

  if (typeof raw.enabled !== 'boolean' || typeof raw.updatedAt !== 'string') {
    return null
  }

  return {
    enabled: raw.enabled,
    campaignId: typeof raw.campaignId === 'string' ? raw.campaignId : null,
    updatedAt: raw.updatedAt,
    updatedBy: typeof raw.updatedBy === 'string' ? raw.updatedBy : undefined,
  }
}

function parseSettingsMap(value: unknown): CampaignSettingsByCategory {
  const result: CampaignSettingsByCategory = {}

  if (!value || typeof value !== 'object') {
    return result
  }

  for (const [categoryId, entry] of Object.entries(value as Record<string, unknown>)) {
    const settings = parseSettings(entry)

    if (settings) {
      result[categoryId] = settings
    }
  }

  return result
}

async function readSettingsFromClerk(): Promise<CampaignSettingsByCategory> {
  const latest: CampaignSettingsByCategory = {}

  for (let page = 0; page < MAX_PAGES; page++) {
    const { data: users } = await clerkClient().users.getUserList({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      orderBy: '-updated_at',
    })

    for (const user of users) {
      const map = parseSettingsMap(user.privateMetadata?.[METADATA_KEY])

      for (const [categoryId, settings] of Object.entries(map)) {
        const current = latest[categoryId]

        if (!current || settings.updatedAt! > current.updatedAt!) {
          latest[categoryId] = settings
        }
      }
    }

    if (users.length < PAGE_SIZE) {
      break
    }
  }

  return latest
}

const getCachedSettings = unstable_cache(readSettingsFromClerk, [CAMPAIGN_SETTINGS_TAG], {
  tags: [CAMPAIGN_SETTINGS_TAG],
  revalidate: 300,
})

export async function getCampaignSettings(): Promise<CampaignSettingsByCategory> {
  try {
    return await getCachedSettings()
  } catch (error) {
    console.error('[assinaturas] Falha ao ler configuração de campanha no Clerk', error)
    return {}
  }
}

export function getCategorySettings(
  settings: CampaignSettingsByCategory,
  categoryId: string
): CampaignSettings {
  return settings[categoryId] ?? DEFAULT_CAMPAIGN_SETTINGS
}

/** Grava uma ou mais categorias de uma vez, preservando as demais. */
export async function saveCampaignSettings(
  userId: string,
  entries: Record<string, Pick<CampaignSettings, 'enabled' | 'campaignId'>>,
  updatedBy?: string
): Promise<void> {
  const updatedAt = new Date().toISOString()
  const user = await clerkClient().users.getUser(userId)
  const next = parseSettingsMap(user.privateMetadata?.[METADATA_KEY])

  for (const [categoryId, settings] of Object.entries(entries)) {
    next[categoryId] = {
      enabled: settings.enabled,
      campaignId: settings.campaignId,
      updatedAt,
      updatedBy,
    }
  }

  await clerkClient().users.updateUserMetadata(userId, {
    privateMetadata: { [METADATA_KEY]: next },
  })
}
