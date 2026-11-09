import type {
  CollaboratorSignature,
  ResolvedSignature,
  SignatureAddress,
  SignatureCampaign,
  SignatureCampaignStatus,
  SignatureDefaults,
} from './types'

function mergeAddress(
  defaults: SignatureAddress,
  overrides?: Partial<SignatureAddress>
): SignatureAddress {
  return {
    ...defaults,
    ...overrides,
  }
}

function todayInSaoPaulo(now: Date): string {
  // en-CA formata como YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function getCampaignStatus(
  campaign: SignatureCampaign,
  now: Date = new Date()
): SignatureCampaignStatus {
  const today = todayInSaoPaulo(now)

  if (campaign.startsAt && today < campaign.startsAt) {
    return 'scheduled'
  }

  if (campaign.endsAt && today > campaign.endsAt) {
    return 'ended'
  }

  return 'active'
}

export function isCampaignActive(campaign: SignatureCampaign, now: Date = new Date()): boolean {
  return getCampaignStatus(campaign, now) === 'active'
}

export function resolveSignature(
  collaborator: CollaboratorSignature,
  defaults: SignatureDefaults,
  campaign: SignatureCampaign | null
): ResolvedSignature {
  return {
    slug: collaborator.slug,
    template: collaborator.template,
    category: collaborator.category,
    active: collaborator.active,
    name: collaborator.name,
    role: collaborator.role,
    credential: collaborator.credential,
    department: collaborator.department,
    phones: collaborator.phones,
    email: collaborator.email,
    website: collaborator.website ?? defaults.website,
    company: collaborator.company ?? defaults.company,
    address: mergeAddress(defaults.address, collaborator.address),
    assets: defaults.assets,
    campaign,
  }
}
