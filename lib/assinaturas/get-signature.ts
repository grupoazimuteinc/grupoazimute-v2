import signaturesData from '@/data/assinaturas.json'

import { getCampaignSettings, getCategorySettings } from './campaign-settings'
import { isCampaignActive, resolveSignature } from './resolve-signature'
import type {
  CampaignSettings,
  ResolvedSignature,
  SignatureCampaign,
  SignatureCategory,
  SignaturesData,
} from './types'

const data = signaturesData as SignaturesData

export function getAllCollaborators() {
  return data.collaborators.filter((collaborator) => collaborator.active)
}

export function getCategories(): SignatureCategory[] {
  return data.categories ?? []
}

export function getCategoryById(id: string): SignatureCategory | null {
  return getCategories().find((category) => category.id === id) ?? null
}

export function getCollaboratorBySlug(slug: string) {
  const collaborator = data.collaborators.find((item) => item.slug === slug)
  return collaborator && collaborator.active ? collaborator : null
}

export function getCampaigns(): SignatureCampaign[] {
  return data.campaigns ?? []
}

/** Campanha no ar para uma categoria: toggle ligado + campanha existente + dentro do período. */
export function getLiveCampaign(settings: CampaignSettings): SignatureCampaign | null {
  if (!settings.enabled || !settings.campaignId) {
    return null
  }

  const campaign = getCampaigns().find((item) => item.id === settings.campaignId)

  return campaign && isCampaignActive(campaign) ? campaign : null
}

export async function getSignatureBySlug(slug: string): Promise<ResolvedSignature | null> {
  const collaborator = getCollaboratorBySlug(slug)

  if (!collaborator) {
    return null
  }

  const campaign =
    collaborator.hideCampaigns || !getCategoryById(collaborator.category)
      ? null
      : getLiveCampaign(getCategorySettings(await getCampaignSettings(), collaborator.category))

  return resolveSignature(collaborator, data.defaults, campaign)
}

export function getSignaturesData(): SignaturesData {
  return data
}
