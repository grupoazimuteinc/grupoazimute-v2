import signaturesData from '@/data/assinaturas.json'

import {
  getCampaignSettings,
  getCategoryComplementSettings,
  getCategorySettings,
  getComplementSettings,
} from './campaign-settings'
import { isCampaignActive, resolveSignature } from './resolve-signature'
import type {
  CampaignSettings,
  CampaignSettingsByCategory,
  CollaboratorSignature,
  ComplementSettingsByCategory,
  ComplementSettings,
  ResolvedSignature,
  SignatureCampaign,
  SignatureComplement,
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

export function getComplements(): SignatureComplement[] {
  return data.complements ?? []
}

/** Complemento no ar para uma categoria: escolhido no dashboard + existente + dentro do período. */
export function getLiveComplement(settings: ComplementSettings): SignatureComplement | null {
  if (!settings.complementId) {
    return null
  }

  const complement = getComplements().find((item) => item.id === settings.complementId)

  return complement && isCampaignActive(complement) ? complement : null
}

function resolveWithSettings(
  collaborator: CollaboratorSignature,
  campaignSettings: CampaignSettingsByCategory,
  complementSettings: ComplementSettingsByCategory
): ResolvedSignature {
  const eligible = !collaborator.hideCampaigns && Boolean(getCategoryById(collaborator.category))

  const campaign = eligible
    ? getLiveCampaign(getCategorySettings(campaignSettings, collaborator.category))
    : null

  const complement = eligible
    ? getLiveComplement(getCategoryComplementSettings(complementSettings, collaborator.category))
    : null

  return resolveSignature(collaborator, data.defaults, campaign, complement)
}

export async function getSignatureBySlug(slug: string): Promise<ResolvedSignature | null> {
  const collaborator = getCollaboratorBySlug(slug)

  if (!collaborator) {
    return null
  }

  return resolveWithSettings(collaborator, await getCampaignSettings(), await getComplementSettings())
}

/** Todas as assinaturas ativas, agrupadas por categoria (na ordem do JSON). */
export async function getAllSignaturesByCategory(): Promise<
  { category: SignatureCategory | null; signatures: ResolvedSignature[] }[]
> {
  const [campaignSettings, complementSettings] = await Promise.all([
    getCampaignSettings(),
    getComplementSettings(),
  ])
  const collaborators = getAllCollaborators()
  const resolve = (items: CollaboratorSignature[]) =>
    items.map((item) => resolveWithSettings(item, campaignSettings, complementSettings))

  const groups: { category: SignatureCategory | null; signatures: ResolvedSignature[] }[] =
    getCategories().map((category) => ({
      category,
      signatures: resolve(collaborators.filter((item) => item.category === category.id)),
    }))

  const uncategorized = collaborators.filter((item) => !getCategoryById(item.category))

  if (uncategorized.length > 0) {
    groups.push({ category: null, signatures: resolve(uncategorized) })
  }

  return groups
}

export function getSignaturesData(): SignaturesData {
  return data
}
