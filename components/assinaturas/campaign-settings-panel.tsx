'use client'

import { useState, useTransition } from 'react'

import { saveCampaignAssignmentsAction } from '@/app/(dashboard)/dashboard/tools/assinaturas/actions'
import { SIGNATURE_WIDTH } from '@/lib/assinaturas/format'
import type { SignatureCampaign, SignatureCampaignStatus } from '@/lib/assinaturas/types'

import { CampaignBar } from './campaign-bar'

export interface CampaignPanelOption extends SignatureCampaign {
  status: SignatureCampaignStatus
  statusLabel: string
}

export interface CampaignPanelCategory {
  id: string
  title: string
  collaboratorCount: number
}

/** Mensagem atribuída a cada departamento (`null` = nenhuma). */
export type CampaignAssignments = Record<string, string | null>

interface CampaignSettingsPanelProps {
  campaigns: CampaignPanelOption[]
  categories: CampaignPanelCategory[]
  assignments: CampaignAssignments
  updatedAt?: string
  updatedBy?: string
}

const ACCENT = '#E65C15'

function formatUpdatedAt(value?: string) {
  if (!value) return null
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))
}

export function CampaignSettingsPanel(props: CampaignSettingsPanelProps) {
  const { campaigns, categories, updatedAt, updatedBy } = props
  const [assignments, setAssignments] = useState<CampaignAssignments>(props.assignments)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  const assignedTo = (categoryId: string) => assignments[categoryId] ?? null
  const changed = categories.filter(
    (category) => assignedTo(category.id) !== (props.assignments[category.id] ?? null)
  )
  const dirty = changed.length > 0
  const campaignTitle = (id: string | null) =>
    campaigns.find((campaign) => campaign.id === id)?.title ?? null

  function toggle(campaignId: string, categoryId: string, checked: boolean) {
    setMessage(null)
    setAssignments((prev) => ({ ...prev, [categoryId]: checked ? campaignId : null }))
  }

  function save() {
    setMessage(null)
    startTransition(async () => {
      const result = await saveCampaignAssignmentsAction({
        assignments: Object.fromEntries(changed.map((category) => [category.id, assignedTo(category.id)])),
      })
      setMessage(
        result.ok
          ? { type: 'ok', text: 'Salvo. As assinaturas por URL já usam a nova configuração.' }
          : { type: 'error', text: result.error ?? 'Erro ao salvar.' }
      )
    })
  }

  return (
    <section
      style={{
        marginBottom: 32,
        padding: 20,
        borderRadius: 12,
        background: '#FFFFFF',
        border: '1px solid #E3E6EA',
        display: 'grid',
        gap: 16,
      }}
    >
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>Mensagens sazonais</div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#666666', lineHeight: 1.5 }}>
          Marque os departamentos que exibem cada mensagem. Cada departamento exibe no máximo uma
          mensagem por vez: marcá-lo em outra mensagem o remove da anterior.
          {updatedAt
            ? ` Última alteração: ${formatUpdatedAt(updatedAt)}${updatedBy ? ` por ${updatedBy}` : ''}.`
            : null}
        </div>
      </div>

      {campaigns.length === 0 ? (
        <div style={{ fontSize: 13, color: '#888888' }}>
          Nenhuma mensagem cadastrada em <code>campaigns</code> no data/assinaturas.json.
        </div>
      ) : (
        campaigns.map((campaign) => {
          const selectedCategories = categories.filter((category) => assignedTo(category.id) === campaign.id)
          const inUse = selectedCategories.length > 0

          return (
            <div
              key={campaign.id}
              style={{
                padding: 16,
                borderRadius: 10,
                border: `1px solid ${inUse ? '#F3C3A6' : '#E3E6EA'}`,
                background: inUse ? '#FFF8F4' : '#FAFAFA',
                display: 'grid',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>{campaign.title}</span>
                <span style={{ fontSize: 13, color: campaign.status === 'active' ? '#666666' : '#7A5200' }}>
                  {campaign.statusLabel}
                </span>
              </div>

              <div style={{ overflowX: 'auto', opacity: inUse ? 1 : 0.5 }}>
                <div style={{ width: SIGNATURE_WIDTH }}>
                  <CampaignBar campaign={campaign} />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#444444' }}>Exibir para:</span>
                {categories.map((category) => {
                  const current = assignedTo(category.id)
                  const elsewhere = current && current !== campaign.id ? campaignTitle(current) : null

                  return (
                    <label
                      key={category.id}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}
                    >
                      <input
                        type="checkbox"
                        checked={current === campaign.id}
                        onChange={(event) => toggle(campaign.id, category.id, event.target.checked)}
                        style={{ width: 16, height: 16, accentColor: ACCENT }}
                      />
                      <span style={{ fontWeight: 600, color: '#222222' }}>{category.title}</span>
                      <span style={{ fontSize: 12, color: '#888888' }}>
                        ({category.collaboratorCount}
                        {elsewhere ? ` · hoje em “${elsewhere}”` : ''})
                      </span>
                    </label>
                  )
                })}
              </div>

              {inUse && campaign.status !== 'active' ? (
                <div style={{ fontSize: 13, color: '#7A5200' }}>
                  Esta mensagem está fora do período definido no JSON ({campaign.statusLabel}) e só
                  aparece nas assinaturas quando estiver dentro dele.
                </div>
              ) : null}
            </div>
          )
        })
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={save}
          disabled={!dirty || pending}
          style={{
            padding: '9px 16px',
            borderRadius: 8,
            border: `1px solid ${ACCENT}`,
            background: ACCENT,
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 600,
            cursor: !dirty || pending ? 'not-allowed' : 'pointer',
            opacity: !dirty || pending ? 0.5 : 1,
          }}
        >
          {pending ? 'Salvando…' : 'Salvar'}
        </button>

        {dirty && !pending ? (
          <span style={{ fontSize: 13, color: '#666666' }}>
            Alterações não salvas: {changed.map((category) => category.title).join(', ')}
          </span>
        ) : null}

        {message ? (
          <span style={{ fontSize: 13, color: message.type === 'ok' ? '#1F7A33' : '#B3261E' }}>
            {message.text}
          </span>
        ) : null}
      </div>
    </section>
  )
}
