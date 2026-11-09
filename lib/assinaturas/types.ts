/**
 * Todos os templates compartilham o mesmo layout; o que muda é a faixa de
 * logotipos do rodapé (`assets.logos.footerBars[template]`).
 */
export type SignatureTemplate =
  | 'grupo_azimute'
  | 'azimute_engenharia'
  | 'azimute_imoveis'
  | 'azimute_tech'
  | 'azimute_san'
  | 'aria'

export interface SignatureFooterBar {
  src: string
  width: number
  height: number
  alt: string
}

export interface SignatureAddress {
  street: string
  district: string
  city: string
  state: string
  country: string
  zip: string
}

export interface SignatureLogos {
  footerBars: Record<SignatureTemplate, SignatureFooterBar>
  iso: string
}

export interface SignatureIcons {
  phone: string
  email: string
  website: string
  location: string
}

export interface SignatureAssets {
  baseUrl: string
  logos: SignatureLogos
  icons: SignatureIcons
}

export interface SignatureDefaults {
  company: string
  website: string
  address: SignatureAddress
  assets: SignatureAssets
}

/**
 * Agrupa colaboradores (ex.: administrativo, comercial). Cada categoria tem
 * sua própria configuração de mensagem sazonal no dashboard.
 */
export interface SignatureCategory {
  id: string
  title: string
}

export interface CollaboratorSignature {
  slug: string
  template: SignatureTemplate
  /** id de uma entrada em `categories`. */
  category: string
  active: boolean
  name: string
  role: string
  credential?: string
  department: string
  phones: string[]
  email: string
  website?: string
  company?: string
  address?: Partial<SignatureAddress>
  /** Quando `true`, este colaborador não exibe campanhas sazonais. */
  hideCampaigns?: boolean
}

/**
 * Mensagem sazonal exibida como faixa no rodapé da assinatura.
 * Cadastrada em `campaigns` no data/assinaturas.json; qual mensagem aparece
 * (e se aparece) é escolhido no dashboard. `startsAt`/`endsAt`
 * (YYYY-MM-DD, opcionais) limitam o período de validade da mensagem.
 */
export interface SignatureCampaign {
  id: string
  title: string
  startsAt?: string
  endsAt?: string
  icon?: string
  text: string
  ctaLabel: string
  ctaUrl: string
}

export type SignatureCampaignStatus = 'active' | 'scheduled' | 'ended'

/** Escolha feita no dashboard para uma categoria (gravada no Clerk). */
export interface CampaignSettings {
  enabled: boolean
  campaignId: string | null
  updatedAt?: string
  updatedBy?: string
}

/** Configuração de campanha indexada pelo id da categoria. */
export type CampaignSettingsByCategory = Record<string, CampaignSettings>

export interface SignaturesData {
  version: number
  defaults: SignatureDefaults
  categories: SignatureCategory[]
  campaigns?: SignatureCampaign[]
  collaborators: CollaboratorSignature[]
}

export interface ResolvedSignature {
  slug: string
  template: SignatureTemplate
  category: string
  active: boolean
  name: string
  role: string
  credential?: string
  department: string
  phones: string[]
  email: string
  website: string
  company: string
  address: SignatureAddress
  assets: SignatureAssets
  campaign: SignatureCampaign | null
}
