import type { ResolvedSignature, SignatureAddress } from './types'

export const SIGNATURE_WIDTH = 720
export const SIGNATURE_HEIGHT = 200

export function formatPhones(phones: string[]): string {
  return phones.join(' | ')
}

export function formatAddressLine2(address: SignatureAddress): string {
  return `${address.district} - ${address.city}/${address.state} - ${address.country}`
}

export function formatAddressLine3(address: SignatureAddress): string {
  return `CEP: ${address.zip}`
}

export function formatDepartmentLine(signature: ResolvedSignature): string {
  return `${signature.department} | ${signature.company}`
}
