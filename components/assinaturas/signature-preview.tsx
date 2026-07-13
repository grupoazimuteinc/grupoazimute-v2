import type { ResolvedSignature } from '@/lib/assinaturas/types'

import { GrupoAzimuteSignature } from './grupo-azimute-signature'

interface SignaturePreviewProps {
  signature: ResolvedSignature
}

export function SignaturePreview({ signature }: SignaturePreviewProps) {
  switch (signature.template) {
    case 'grupo_azimute':
      return <GrupoAzimuteSignature signature={signature} />
    default:
      return <p>Template não suportado.</p>
  }
}
