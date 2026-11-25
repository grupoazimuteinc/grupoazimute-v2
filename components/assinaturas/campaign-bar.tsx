import { SIGNATURE_CAMPAIGN_HEIGHT } from '@/lib/assinaturas/format'
import {
  SIGNATURE_CAMPAIGN_BORDER_COLOR,
  SIGNATURE_FONT_FAMILY,
  SIGNATURE_FONT_WEIGHT_BOLD,
  SIGNATURE_FONT_WEIGHT_MEDIUM,
  SIGNATURE_TEXT_COLOR,
} from '@/lib/assinaturas/theme'
import type { SignatureCampaign } from '@/lib/assinaturas/types'

interface CampaignBarProps {
  campaign: Pick<SignatureCampaign, 'icon' | 'text' | 'ctaLabel' | 'ctaUrl'>
}

export function CampaignBar({ campaign }: CampaignBarProps) {
  return (
    <div
      style={{
        height: SIGNATURE_CAMPAIGN_HEIGHT,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${SIGNATURE_CAMPAIGN_BORDER_COLOR}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '0 12px',
        boxSizing: 'border-box',
        fontFamily: SIGNATURE_FONT_FAMILY,
        fontSize: 11,
        lineHeight: '14px',
      }}
    >
      <span style={{ fontWeight: SIGNATURE_FONT_WEIGHT_MEDIUM, color: SIGNATURE_TEXT_COLOR }}>
        {campaign.icon ? `${campaign.icon} ` : null}
        {campaign.text}
      </span>
      <a
        href={campaign.ctaUrl || undefined}
        target="_blank"
        rel="noreferrer"
        style={{
          fontSize: 11,
          lineHeight: '14px',
          fontWeight: SIGNATURE_FONT_WEIGHT_BOLD,
          color: SIGNATURE_TEXT_COLOR,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {campaign.ctaLabel}&nbsp;&rsaquo;
      </a>
    </div>
  )
}
