import 'server-only'

import { clerkClient } from '@clerk/nextjs/server'
import { unstable_cache } from 'next/cache'

import type {
  CampaignSettings,
  CampaignSettingsByCategory,
  ComplementSettings,
  ComplementSettingsByCategory,
} from './types'

/**
 * A escolha da mensagem sazonal (toggle + campanha) é feita por categoria de
 * colaborador e fica gravada no privateMetadata do usuário do Clerk que
 * salvou, como `{ [categoryId]: CampaignSettings }`. Na leitura, vale a
 * alteração mais recente de cada categoria entre todos os usuários. Assim não
 * é preciso nenhum banco ou token além do CLERK_SECRET_KEY já existente.
 * As mensagens em si continuam em data/assinaturas.json.
 *
 * O complemento (imagem) usa uma chave própria, para que salvar um não
 * sobrescreva a escolha mais recente do outro feita por outra pessoa.
 */
const METADATA_KEY = 'signatureCampaignSettingsByCategory'
const COMPLEMENT_METADATA_KEY = 'signatureComplementSettingsByCategory'
export const CAMPAIGN_SETTINGS_TAG = 'signature-campaign-settings'

const PAGE_SIZE = 100
const MAX_PAGES = 5

export const DEFAULT_CAMPAIGN_SETTINGS: CampaignSettings = {
  enabled: false,
  campaignId: null,
}

export const DEFAULT_COMPLEMENT_SETTINGS: ComplementSettings = {
  complementId: null,
}

interface AllSettings {
  campaigns: CampaignSettingsByCategory
  complements: ComplementSettingsByCategory
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

function parseComplementSettings(value: unknown): ComplementSettings | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const raw = value as Record<string, unknown>

  if (typeof raw.updatedAt !== 'string') {
    return null
  }

  return {
    complementId: typeof raw.complementId === 'string' ? raw.complementId : null,
    updatedAt: raw.updatedAt,
    updatedBy: typeof raw.updatedBy === 'string' ? raw.updatedBy : undefined,
  }
}

function parseMap<T>(value: unknown, parse: (entry: unknown) => T | null): Record<string, T> {
  const result: Record<string, T> = {}

  if (!value || typeof value !== 'object') {
    return result
  }

  for (const [categoryId, entry] of Object.entries(value as Record<string, unknown>)) {
    const settings = parse(entry)

    if (settings) {
      result[categoryId] = settings
    }
  }

  return result
}

function parseSettingsMap(value: unknown): CampaignSettingsByCategory {
  return parseMap(value, parseSettings)
}

function parseComplementMap(value: unknown): ComplementSettingsByCategory {
  return parseMap(value, parseComplementSettings)
}

/** Mantém, por categoria, a entrada com `updatedAt` mais recente. */
function mergeLatest<T extends { updatedAt?: string }>(
  target: Record<string, T>,
  source: Record<string, T>
) {
  for (const [categoryId, settings] of Object.entries(source)) {
    const current = target[categoryId]

    if (!current || settings.updatedAt! > current.updatedAt!) {
      target[categoryId] = settings
    }
  }
}

async function readSettingsFromClerk(): Promise<AllSettings> {
  const latest: AllSettings = { campaigns: {}, complements: {} }

  for (let page = 0; page < MAX_PAGES; page++) {
    const { data: users } = await clerkClient().users.getUserList({
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      orderBy: '-updated_at',
    })

    for (const user of users) {
      mergeLatest(latest.campaigns, parseSettingsMap(user.privateMetadata?.[METADATA_KEY]))
      mergeLatest(
        latest.complements,
        parseComplementMap(user.privateMetadata?.[COMPLEMENT_METADATA_KEY])
      )
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

async function getAllSettings(): Promise<AllSettings> {
  try {
    return await getCachedSettings()
  } catch (error) {
    console.error('[assinaturas] Falha ao ler configuração de campanha no Clerk', error)
    return { campaigns: {}, complements: {} }
  }
}

export async function getCampaignSettings(): Promise<CampaignSettingsByCategory> {
  return (await getAllSettings()).campaigns
}

export async function getComplementSettings(): Promise<ComplementSettingsByCategory> {
  return (await getAllSettings()).complements
}

export function getCategoryComplementSettings(
  settings: ComplementSettingsByCategory,
  categoryId: string
): ComplementSettings {
  return settings[categoryId] ?? DEFAULT_COMPLEMENT_SETTINGS
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

/** Grava o complemento de uma ou mais categorias, preservando as demais. */
export async function saveComplementSettings(
  userId: string,
  entries: Record<string, string | null>,
  updatedBy?: string
): Promise<void> {
  const updatedAt = new Date().toISOString()
  const user = await clerkClient().users.getUser(userId)
  const next = parseComplementMap(user.privateMetadata?.[COMPLEMENT_METADATA_KEY])

  for (const [categoryId, complementId] of Object.entries(entries)) {
    next[categoryId] = { complementId, updatedAt, updatedBy }
  }

  await clerkClient().users.updateUserMetadata(userId, {
    privateMetadata: { [COMPLEMENT_METADATA_KEY]: next },
  })
}
