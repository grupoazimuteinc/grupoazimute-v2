import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CopyHtmlButton } from '@/components/assinaturas/copy-html-button'
import { CopyUrlButton } from '@/components/assinaturas/copy-url-button'
import { SignaturePreview } from '@/components/assinaturas/signature-preview'
import { SIGNATURE_WIDTH, getSignatureHeight } from '@/lib/assinaturas/format'
import { getCollaboratorBySlug, getSignatureBySlug } from '@/lib/assinaturas/get-signature'
import { renderSignatureHtml } from '@/lib/assinaturas/render-signature'
import { getSignatureHtmlUrl } from '@/lib/assinaturas/signature-url'

// Reflete na hora a campanha escolhida no dashboard
export const dynamic = 'force-dynamic'

interface AssinaturaDetailPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: AssinaturaDetailPageProps) {
  const collaborator = getCollaboratorBySlug(params.slug)

  return {
    title: collaborator ? `Assinatura | ${collaborator.name}` : 'Assinatura não encontrada',
  }
}

export default async function AssinaturaDetailPage({ params }: AssinaturaDetailPageProps) {
  const signature = await getSignatureBySlug(params.slug)

  if (!signature) {
    notFound()
  }

  const html = renderSignatureHtml(signature)
  const htmlUrl = getSignatureHtmlUrl(signature.slug)

  return (
    <div className="dashboard-page">
      <Link href="/dashboard/tools/assinaturas" className="dashboard-back-link">
        ← Voltar para assinaturas
      </Link>

      <header className="dashboard-page-header">
        <div>
          <p className="dashboard-page__eyebrow">Tools · Assinaturas</p>
          <h1 className="dashboard-page__title" style={{ marginTop: 8 }}>
            {signature.name}
          </h1>
          <p className="dashboard-page__description">
            Template: <strong>{signature.template}</strong> · {SIGNATURE_WIDTH}×
            {getSignatureHeight(signature)}px
            {signature.campaign ? (
              <>
                {' '}
                · Mensagem: <strong>{signature.campaign.title}</strong>{' '}
                (<Link href="/dashboard/tools/assinaturas">alterar</Link>)
              </>
            ) : null}
          </p>
        </div>

        <div className="dashboard-actions">
          <CopyHtmlButton html={html} />
          <CopyUrlButton url={htmlUrl} />
          <a
            href={htmlUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #D9D9D9',
              background: '#FFFFFF',
              color: '#333333',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Abrir HTML
          </a>
        </div>
      </header>

      <section className="dashboard-panel">
        <SignaturePreview signature={signature} />
      </section>

      <div style={{ marginTop: 16, fontSize: 13, color: '#888', lineHeight: 1.6 }}>
        <div style={{ margin: '0 0 8px' }}>
          <strong>Outlook / Gmail (colar manualmente):</strong> use &quot;Copiar HTML&quot;.
        </div>
        <div style={{ margin: '0 0 8px' }}>
          <strong>Painel corporativo (importação por URL):</strong> use &quot;Copiar URL&quot;.
        </div>
        <div style={{ margin: 0 }}>
          Ícones e imagens do rodapé em <code>/public/images/assinaturas/</code>.
        </div>
      </div>
    </div>
  )
}
