import type { ResolvedSignature, SignatureAddress } from './types'

export const SIGNATURE_WIDTH = 720
export const SIGNATURE_HEIGHT = 200
export const SIGNATURE_CAMPAIGN_HEIGHT = 30
/** Espaço entre o complemento (imagem) e o aviso, quando os dois aparecem. */
export const SIGNATURE_BLOCK_GAP = 8

export function hasBlockGap(signature: ResolvedSignature): boolean {
  return Boolean(signature.complement && signature.campaign)
}

export function getSignatureHeight(signature: ResolvedSignature): number {
  return (
    SIGNATURE_HEIGHT +
    (signature.campaign ? SIGNATURE_CAMPAIGN_HEIGHT : 0) +
    (signature.complement ? signature.complement.height : 0) +
    (hasBlockGap(signature) ? SIGNATURE_BLOCK_GAP : 0)
  )
}

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
