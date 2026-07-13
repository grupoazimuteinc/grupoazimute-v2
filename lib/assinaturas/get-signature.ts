import signaturesData from '@/data/assinaturas.json'

import { resolveSignature } from './resolve-signature'
import type { ResolvedSignature, SignaturesData } from './types'

const data = signaturesData as SignaturesData

export function getAllCollaborators() {
  return data.collaborators.filter((collaborator) => collaborator.active)
}

export function getSignatureBySlug(slug: string): ResolvedSignature | null {
  const collaborator = data.collaborators.find((item) => item.slug === slug)

  if (!collaborator || !collaborator.active) {
    return null
  }

  return resolveSignature(collaborator, data.defaults)
}

export function getSignaturesData(): SignaturesData {
  return data
}
