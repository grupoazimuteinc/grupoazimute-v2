import Link from 'next/link'

import { getAllCollaborators } from '@/lib/assinaturas/get-signature'

export const metadata = {
  title: 'Assinaturas de E-mail | Dashboard',
}

export default function AssinaturasPage() {
  const collaborators = getAllCollaborators()

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="dashboard-page__eyebrow">Tools</p>
        <h1 className="dashboard-page__title">Assinaturas de E-mail</h1>
        <p className="dashboard-page__description">
          Selecione um colaborador para visualizar e copiar a assinatura.
        </p>
      </header>

      <div className="dashboard-grid">
        {collaborators.map((collaborator) => (
          <Link
            key={collaborator.slug}
            href={`/dashboard/tools/assinaturas/${collaborator.slug}`}
            className="dashboard-list-item"
          >
            <div>
              <div className="dashboard-list-item__title">{collaborator.name}</div>
              <div className="dashboard-list-item__subtitle">{collaborator.role}</div>
            </div>
            <span className="dashboard-list-item__meta">{collaborator.template}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
