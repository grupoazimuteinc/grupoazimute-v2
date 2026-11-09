import Link from 'next/link'

import { CampaignSettingsPanel } from '@/components/assinaturas/campaign-settings-panel'
import { getCampaignSettings, getCategorySettings } from '@/lib/assinaturas/campaign-settings'
import {
  getAllCollaborators,
  getCampaigns,
  getCategories,
  getLiveCampaign,
} from '@/lib/assinaturas/get-signature'
import { getCampaignStatus } from '@/lib/assinaturas/resolve-signature'
import type { SignatureCampaign } from '@/lib/assinaturas/types'

export const dynamic = 'force-dynamic'

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

function statusLabel(campaign: SignatureCampaign) {
  switch (getCampaignStatus(campaign)) {
    case 'scheduled':
      return `começa em ${formatDate(campaign.startsAt!)}`
    case 'ended':
      return `encerrada em ${formatDate(campaign.endsAt!)}`
    default:
      return campaign.endsAt ? `até ${formatDate(campaign.endsAt)}` : 'sem data de fim'
  }
}

export const metadata = {
  title: 'Assinaturas de E-mail | Dashboard',
}

export default async function AssinaturasPage() {
  const collaborators = getAllCollaborators()
  const settingsByCategory = await getCampaignSettings()
  const categories = getCategories()
  const knownCategoryIds = new Set(categories.map((category) => category.id))
  const uncategorized = collaborators.filter(
    (collaborator) => !knownCategoryIds.has(collaborator.category)
  )
  const campaignOptions = getCampaigns().map((campaign) => ({
    ...campaign,
    status: getCampaignStatus(campaign),
    statusLabel: statusLabel(campaign),
  }))

  const categorySettings = categories.map((category) => ({
    category,
    settings: getCategorySettings(settingsByCategory, category.id),
    members: collaborators.filter((collaborator) => collaborator.category === category.id),
  }))
  const assignments = Object.fromEntries(
    categorySettings.map(({ category, settings }) => [
      category.id,
      settings.enabled ? settings.campaignId : null,
    ])
  )
  const lastUpdate = categorySettings
    .map(({ settings }) => settings)
    .filter((settings) => settings.updatedAt)
    .sort((a, b) => (a.updatedAt! < b.updatedAt! ? 1 : -1))[0]

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <p className="dashboard-page__eyebrow">Tools</p>
        <h1 className="dashboard-page__title">Assinaturas de E-mail</h1>
        <p className="dashboard-page__description">
          Selecione um colaborador para visualizar e copiar a assinatura.
        </p>
      </header>

      <CampaignSettingsPanel
        campaigns={campaignOptions}
        categories={categorySettings.map(({ category, members }) => ({
          id: category.id,
          title: category.title,
          collaboratorCount: members.length,
        }))}
        assignments={assignments}
        updatedAt={lastUpdate?.updatedAt}
        updatedBy={lastUpdate?.updatedBy}
      />

      {categorySettings.map(({ category, settings, members }) => {
        const liveCampaign = getLiveCampaign(settings)

        return (
          <section key={category.id} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#222222', margin: '0 0 4px' }}>
              {category.title}
            </h2>
            <p style={{ fontSize: 13, color: '#666666', margin: '0 0 12px' }}>
              {members.length} assinaturas · Mensagem no ar:{' '}
              <strong>{liveCampaign?.title ?? 'nenhuma'}</strong>
            </p>

            <CollaboratorGrid collaborators={members} />
          </section>
        )
      })}

      {uncategorized.length > 0 ? (
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#222222', margin: '0 0 4px' }}>
            Sem categoria
          </h2>
          <p style={{ fontSize: 13, color: '#7A5200', margin: '0 0 12px' }}>
            O campo <code>category</code> destes colaboradores não corresponde a nenhuma entrada
            em <code>categories</code> no data/assinaturas.json, então eles nunca exibem mensagem
            sazonal.
          </p>
          <CollaboratorGrid collaborators={uncategorized} />
        </section>
      ) : null}
    </div>
  )
}

function CollaboratorGrid({
  collaborators,
}: {
  collaborators: ReturnType<typeof getAllCollaborators>
}) {
  return (
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
  )
}
