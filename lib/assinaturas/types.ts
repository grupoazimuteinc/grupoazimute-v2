export type SignatureTemplate = 'grupo_azimute'

export interface SignatureAddress {
  street: string
  district: string
  city: string
  state: string
  country: string
  zip: string
}

export interface SignatureLogos {
  footerBar: string
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

export interface CollaboratorSignature {
  slug: string
  template: SignatureTemplate
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
}

export interface SignaturesData {
  version: number
  defaults: SignatureDefaults
  collaborators: CollaboratorSignature[]
}

export interface ResolvedSignature {
  slug: string
  template: SignatureTemplate
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
}
