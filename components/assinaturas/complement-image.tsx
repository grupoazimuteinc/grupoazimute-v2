import { SIGNATURE_WIDTH } from '@/lib/assinaturas/format'
import type { SignatureComplement } from '@/lib/assinaturas/types'

interface ComplementImageProps {
  complement: SignatureComplement
}

export function ComplementImage({ complement }: ComplementImageProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- mesma imagem usada no HTML de e-mail
    <img
      src={complement.image}
      alt={complement.alt}
      width={complement.width}
      height={complement.height}
      style={{ display: 'block', border: 0, width: complement.width, height: complement.height }}
    />
  )

  return (
    <div
      style={{
        width: SIGNATURE_WIDTH,
        height: complement.height,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: complement.background,
      }}
    >
      {complement.href ? (
        <a href={complement.href} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  )
}
