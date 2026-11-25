'use client'

import { useState, useTransition } from 'react'

import { saveComplementAssignmentsAction } from '@/app/(dashboard)/dashboard/tools/assinaturas/actions'
import type { SignatureCampaignStatus, SignatureComplement } from '@/lib/assinaturas/types'

import type { CampaignAssignments, CampaignPanelCategory } from './campaign-settings-panel'
import { ComplementImage } from './complement-image'

export interface ComplementPanelOption extends SignatureComplement {
  status: SignatureCampaignStatus
  statusLabel: string
}

interface ComplementSettingsPanelProps {
  complements: ComplementPanelOption[]
  categories: CampaignPanelCategory[]
  /** Complemento atribuído a cada departamento (`null` = nenhum). */
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

export function ComplementSettingsPanel(props: ComplementSettingsPanelProps) {
  const { complements, categories, updatedAt, updatedBy } = props
  const [assignments, setAssignments] = useState<CampaignAssignments>(props.assignments)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  const assignedTo = (categoryId: string) => assignments[categoryId] ?? null
  const changed = categories.filter(
    (category) => assignedTo(category.id) !== (props.assignments[category.id] ?? null)
  )
  const dirty = changed.length > 0
  const complementTitle = (id: string | null) =>
    complements.find((complement) => complement.id === id)?.title ?? null

  function toggle(complementId: string, categoryId: string, checked: boolean) {
    setMessage(null)
    setAssignments((prev) => ({ ...prev, [categoryId]: checked ? complementId : null }))
  }

  function save() {
    setMessage(null)
    startTransition(async () => {
      const result = await saveComplementAssignmentsAction({
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
        <div style={{ fontSize: 16, fontWeight: 600, color: '#222222' }}>Complementos</div>
        <div style={{ marginTop: 4, fontSize: 13, color: '#666666', lineHeight: 1.5 }}>
          Imagem exibida abaixo da assinatura, independente da mensagem sazonal. Marque os
          departamentos que exibem cada complemento (no máximo um por departamento).
          {updatedAt
            ? ` Última alteração: ${formatUpdatedAt(updatedAt)}${updatedBy ? ` por ${updatedBy}` : ''}.`
            : null}
        </div>
      </div>

      {complements.length === 0 ? (
        <div style={{ fontSize: 13, color: '#888888' }}>
          Nenhum complemento cadastrado em <code>complements</code> no data/assinaturas.json.
        </div>
      ) : (
        complements.map((complement) => {
          const inUse = categories.some((category) => assignedTo(category.id) === complement.id)

          return (
            <div
              key={complement.id}
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
                <span style={{ fontSize: 15, fontWeight: 600, color: '#222222' }}>{complement.title}</span>
                <span style={{ fontSize: 13, color: complement.status === 'active' ? '#666666' : '#7A5200' }}>
                  {complement.statusLabel}
                </span>
              </div>

              <div style={{ overflowX: 'auto', opacity: inUse ? 1 : 0.5 }}>
                <ComplementImage complement={complement} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#444444' }}>Exibir para:</span>
                {categories.map((category) => {
                  const current = assignedTo(category.id)
                  const elsewhere = current && current !== complement.id ? complementTitle(current) : null

                  return (
                    <label
                      key={category.id}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}
                    >
                      <input
                        type="checkbox"
                        checked={current === complement.id}
                        onChange={(event) => toggle(complement.id, category.id, event.target.checked)}
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

              {inUse && complement.status !== 'active' ? (
                <div style={{ fontSize: 13, color: '#7A5200' }}>
                  Este complemento está fora do período definido no JSON ({complement.statusLabel}) e
                  só aparece nas assinaturas quando estiver dentro dele.
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
