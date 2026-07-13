import Link from 'next/link'

const mcpPlaceholders = [
  {
    label: 'Conexões MCP',
    value: '—',
    hint: 'Integrações com Neon, Sanity e outros serviços aparecerão aqui.',
  },
  {
    label: 'Métricas',
    value: '—',
    hint: 'Indicadores consolidados do ecossistema Grupo Azimute.',
  },
  {
    label: 'Atividade recente',
    value: '—',
    hint: 'Eventos e atualizações monitorados via MCP.',
  },
]

const quickLinks = [
  {
    title: 'Tools',
    description: 'Acesse assinaturas de e-mail e demais utilitários internos.',
    href: '/dashboard/tools',
  },
  {
    title: 'Assinaturas de E-mail',
    description: 'Visualize, copie HTML ou URL das assinaturas dos colaboradores.',
    href: '/dashboard/tools/assinaturas',
  },
]

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="dashboard-page__eyebrow">Principal</p>
        <h1 className="dashboard-page__title">Visão geral</h1>
        <p className="dashboard-page__description">
          Ponto de entrada do CMS interno. Em breve, esta área exibirá dados conectados via MCP.
        </p>
      </header>

      <section className="dashboard-grid dashboard-grid--stats" style={{ marginBottom: 24 }}>
        {mcpPlaceholders.map((item) => (
          <article key={item.label} className="dashboard-card">
            <p className="dashboard-card__label">{item.label}</p>
            <p className="dashboard-card__value">{item.value}</p>
            <p className="dashboard-card__hint">{item.hint}</p>
          </article>
        ))}
      </section>

      <section>
        <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#222' }}>Acesso rápido</h2>
        <div className="dashboard-grid">
          {quickLinks.map((item) => (
            <Link key={item.href} href={item.href} className="dashboard-link-card">
              <h3 className="dashboard-link-card__title">{item.title}</h3>
              <p className="dashboard-link-card__description">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
