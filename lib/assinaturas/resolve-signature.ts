import type {
  CollaboratorSignature,
  ResolvedSignature,
  SignatureAddress,
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

export function resolveSignature(
  collaborator: CollaboratorSignature,
  defaults: SignatureDefaults
): ResolvedSignature {
  return {
    slug: collaborator.slug,
    template: collaborator.template,
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
  }
}
