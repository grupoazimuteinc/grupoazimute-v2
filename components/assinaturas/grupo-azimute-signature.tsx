import {
  formatAddressLine2,
  formatAddressLine3,
  formatDepartmentLine,
  formatPhones,
  SIGNATURE_HEIGHT,
  SIGNATURE_WIDTH,
} from '@/lib/assinaturas/format'
import {
  SIGNATURE_DIVIDER_COLOR,
  SIGNATURE_DIVIDER_WIDTH,
  SIGNATURE_FONT_FAMILY,
  SIGNATURE_FONT_URL,
  SIGNATURE_FONT_WEIGHT_BOLD,
  SIGNATURE_FONT_WEIGHT_MEDIUM,
  SIGNATURE_TEXT_COLOR,
} from '@/lib/assinaturas/theme'
import type { ResolvedSignature } from '@/lib/assinaturas/types'

const FOOTER_BAR_HEIGHT = 26
const FOOTER_ISO_SIZE = 50

interface ContactRowProps {
  icon: string
  iconWidth: number
  iconHeight: number
  children: React.ReactNode
}

function ContactRow({ icon, iconWidth, iconHeight, children }: ContactRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 6,
        marginBottom: 3,
      }}
    >
      <img
        src={icon}
        alt=""
        width={iconWidth}
        height={iconHeight}
        style={{ marginTop: iconHeight === 16 ? 0 : 1, flexShrink: 0, display: 'block', border: 0 }}
      />
      <div
        style={{
          fontSize: 11,
          lineHeight: '14px',
          fontWeight: SIGNATURE_FONT_WEIGHT_MEDIUM,
          color: SIGNATURE_TEXT_COLOR,
          textAlign: 'left',
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface GrupoAzimuteSignatureProps {
  signature: ResolvedSignature
}

export function GrupoAzimuteSignature({ signature }: GrupoAzimuteSignatureProps) {
  const { assets, address } = signature

  const textStyle = {
    fontSize: 11,
    lineHeight: '15px' as const,
    fontWeight: SIGNATURE_FONT_WEIGHT_MEDIUM,
    color: SIGNATURE_TEXT_COLOR,
  }

  return (
    <>
      <link rel="stylesheet" href={SIGNATURE_FONT_URL} />

      <div
        style={{
          width: SIGNATURE_WIDTH,
          height: SIGNATURE_HEIGHT,
          backgroundColor: '#FFFFFF',
          fontFamily: SIGNATURE_FONT_FAMILY,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '14px 0 10px',
            height: 118,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                fontSize: 13,
                lineHeight: '16px',
                fontWeight: SIGNATURE_FONT_WEIGHT_BOLD,
                color: SIGNATURE_TEXT_COLOR,
                marginBottom: 4,
              }}
            >
              {signature.name}
            </div>
            <div style={{ ...textStyle, marginBottom: 2 }}>{signature.role}</div>
            {signature.credential ? (
              <div style={{ ...textStyle, marginBottom: 2 }}>{signature.credential}</div>
            ) : null}
            <div style={textStyle}>{formatDepartmentLine(signature)}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch', flexShrink: 0 }}>
            <div
              style={{
                width: SIGNATURE_DIVIDER_WIDTH,
                backgroundColor: SIGNATURE_DIVIDER_COLOR,
                flexShrink: 0,
              }}
            />

            <div style={{ paddingLeft: 18, minWidth: 0, textAlign: 'left' }}>
              <ContactRow icon={assets.icons.phone} iconWidth={13} iconHeight={13}>
                {formatPhones(signature.phones)}
              </ContactRow>
              <ContactRow icon={assets.icons.email} iconWidth={13} iconHeight={13}>
                {signature.email}
              </ContactRow>
              <ContactRow icon={assets.icons.website} iconWidth={13} iconHeight={13}>
                {signature.website}
              </ContactRow>
              <ContactRow icon={assets.icons.location} iconWidth={12} iconHeight={16}>
                <div>{address.street}</div>
                <div>{formatAddressLine2(address)}</div>
                <div>{formatAddressLine3(address)}</div>
              </ContactRow>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `${SIGNATURE_DIVIDER_WIDTH} solid ${SIGNATURE_DIVIDER_COLOR}`,
            padding: '8px 0 12px',
            height: 68,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={assets.logos.footerBar}
            alt="Grupo Azimute"
            width={499}
            height={FOOTER_BAR_HEIGHT}
            style={{
              width: 499,
              height: FOOTER_BAR_HEIGHT,
              display: 'block',
              border: 0,
              flexShrink: 0,
            }}
          />

          <img
            src={assets.logos.iso}
            alt="ISO 9001"
            width={FOOTER_ISO_SIZE}
            height={FOOTER_ISO_SIZE}
            style={{
              width: FOOTER_ISO_SIZE,
              height: FOOTER_ISO_SIZE,
              display: 'block',
              border: 0,
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </>
  )
}
