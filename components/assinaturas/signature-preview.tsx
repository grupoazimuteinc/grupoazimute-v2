import type { ResolvedSignature } from '@/lib/assinaturas/types'

import { GrupoAzimuteSignature } from './grupo-azimute-signature'

interface SignaturePreviewProps {
  signature: ResolvedSignature
}

export function SignaturePreview({ signature }: SignaturePreviewProps) {
  if (!signature.assets.logos.footerBars[signature.template]) {
    return <p>Template não suportado.</p>
  }

  return <GrupoAzimuteSignature signature={signature} />

}
