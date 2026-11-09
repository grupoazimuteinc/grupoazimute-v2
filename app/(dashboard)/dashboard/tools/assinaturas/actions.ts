'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath, revalidateTag } from 'next/cache'

import { CAMPAIGN_SETTINGS_TAG, saveCampaignSettings } from '@/lib/assinaturas/campaign-settings'
import { getCampaigns, getCategoryById } from '@/lib/assinaturas/get-signature'
import type { CampaignSettings } from '@/lib/assinaturas/types'

export interface SaveCampaignSettingsResult {
  ok: boolean
  error?: string
}

/**
 * Recebe só as categorias alteradas: `{ [categoryId]: campaignId | null }`.
 * `null` desliga a mensagem daquela categoria.
 */
export async function saveCampaignAssignmentsAction(input: {
  assignments: Record<string, string | null>
}): Promise<SaveCampaignSettingsResult> {
  const { userId } = auth()

  if (!userId) {
    return { ok: false, error: 'Não autorizado.' }
  }

  const campaignIds = new Set(getCampaigns().map((campaign) => campaign.id))
  const entries: Record<string, Pick<CampaignSettings, 'enabled' | 'campaignId'>> = {}

  for (const [categoryId, rawCampaignId] of Object.entries(input.assignments)) {
    if (!getCategoryById(categoryId)) {
      return { ok: false, error: `Departamento "${categoryId}" não encontrado no assinaturas.json.` }
    }

    const campaignId = rawCampaignId || null

    if (campaignId && !campaignIds.has(campaignId)) {
      return { ok: false, error: 'Mensagem não encontrada no assinaturas.json.' }
    }

    entries[categoryId] = { enabled: campaignId !== null, campaignId }
  }

  if (Object.keys(entries).length === 0) {
    return { ok: true }
  }

  try {
    const user = await currentUser()
    const updatedBy =
      [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
      user?.primaryEmailAddress?.emailAddress

    await saveCampaignSettings(userId, entries, updatedBy)
  } catch (error) {
    console.error('[assinaturas] Falha ao salvar configuração de campanha', error)
    return { ok: false, error: 'Não foi possível salvar. Tente novamente.' }
  }

  revalidateTag(CAMPAIGN_SETTINGS_TAG)
  revalidatePath('/dashboard/tools/assinaturas', 'layout')

  return { ok: true }
}
