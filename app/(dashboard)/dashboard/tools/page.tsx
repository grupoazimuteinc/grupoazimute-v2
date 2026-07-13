import Link from 'next/link'

const tools = [
  {
    title: 'Assinaturas de E-mail',
    description: 'Gerencie e copie assinaturas de e-mail dos colaboradores.',
    href: '/dashboard/tools/assinaturas',
  },
]

export const metadata = {
  title: 'Tools | Dashboard',
}

export default function DashboardToolsPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="dashboard-page__eyebrow">Tools</p>
        <h1 className="dashboard-page__title">Ferramentas</h1>
        <p className="dashboard-page__description">
          Utilitários internos do Grupo Azimute, acessíveis pelo menu lateral.
        </p>
      </header>

      <div className="dashboard-grid">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="dashboard-link-card">
            <h2 className="dashboard-link-card__title">{tool.title}</h2>
            <p className="dashboard-link-card__description">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
