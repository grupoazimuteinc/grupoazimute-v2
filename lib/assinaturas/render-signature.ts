import { resolveAssetUrl } from './asset-url'
import {
  formatAddressLine2,
  formatAddressLine3,
  formatDepartmentLine,
  formatPhones,
  SIGNATURE_HEIGHT,
  SIGNATURE_WIDTH,
} from './format'
import {
  SIGNATURE_DIVIDER_COLOR,
  SIGNATURE_DIVIDER_WIDTH,
  SIGNATURE_FONT_FAMILY,
  SIGNATURE_FONT_URL,
  SIGNATURE_FONT_WEIGHT_BOLD,
  SIGNATURE_FONT_WEIGHT_MEDIUM,
  SIGNATURE_TEXT_COLOR,
} from './theme'
import type { ResolvedSignature } from './types'

const FOOTER_BAR_HEIGHT = 26
const FOOTER_ISO_SIZE = 50

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function assetUrl(signature: ResolvedSignature, path: string): string {
  return resolveAssetUrl(signature.assets.baseUrl, path)
}

function contactRow(
  iconPath: string,
  text: string,
  signature: ResolvedSignature,
  iconWidth: number,
  iconHeight: number
): string {
  const icon = assetUrl(signature, iconPath)

  return `
    <tr>
      <td style="padding:0 0 3px 0; vertical-align:top; width:${iconWidth + 4}px;">
        <img src="${icon}" width="${iconWidth}" height="${iconHeight}" alt="" style="display:block; border:0;" />
      </td>
      <td style="padding:0 0 3px 6px; vertical-align:top; text-align:left; font-family:${SIGNATURE_FONT_FAMILY}; font-size:11px; line-height:14px; font-weight:${SIGNATURE_FONT_WEIGHT_MEDIUM}; color:${SIGNATURE_TEXT_COLOR};">
        ${escapeHtml(text)}
      </td>
    </tr>
  `
}

function footerImage(src: string, alt: string, width: number, height: number): string {
  return `<img src="${src}" alt="${escapeHtml(alt)}" width="${width}" height="${height}" style="display:block; border:0; width:${width}px; height:${height}px;" />`
}

export function renderGrupoAzimuteHtml(signature: ResolvedSignature): string {
  const { assets, address } = signature
  const logos = assets.logos
  const icons = assets.icons

  const addressBlock = [
    address.street,
    formatAddressLine2(address),
    formatAddressLine3(address),
  ].join('<br/>')

  const textStyle = `font-family:${SIGNATURE_FONT_FAMILY}; font-size:11px; line-height:15px; font-weight:${SIGNATURE_FONT_WEIGHT_MEDIUM}; color:${SIGNATURE_TEXT_COLOR};`

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="${SIGNATURE_FONT_URL}" rel="stylesheet" />
  </head>
  <body style="margin:0; padding:0;">
    <table cellpadding="0" cellspacing="0" border="0" width="${SIGNATURE_WIDTH}" height="${SIGNATURE_HEIGHT}" style="width:${SIGNATURE_WIDTH}px; height:${SIGNATURE_HEIGHT}px; border-collapse:collapse; font-family:${SIGNATURE_FONT_FAMILY}; background:#FFFFFF;">
      <tr>
        <td style="padding:14px 0 10px 0; vertical-align:top; height:118px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td align="left" valign="top" style="vertical-align:top; padding:0;">
                <div style="font-family:${SIGNATURE_FONT_FAMILY}; font-size:13px; line-height:16px; font-weight:${SIGNATURE_FONT_WEIGHT_BOLD}; color:${SIGNATURE_TEXT_COLOR}; margin:0 0 4px 0;">
                  ${escapeHtml(signature.name)}
                </div>
                <div style="${textStyle} margin:0 0 2px 0;">
                  ${escapeHtml(signature.role)}
                </div>
                ${
                  signature.credential
                    ? `<div style="${textStyle} margin:0 0 2px 0;">${escapeHtml(signature.credential)}</div>`
                    : ''
                }
                <div style="${textStyle} margin:0;">
                  ${escapeHtml(formatDepartmentLine(signature))}
                </div>
              </td>
              <td align="right" valign="top" style="vertical-align:top; padding:0; white-space:nowrap;">
                <table cellpadding="0" cellspacing="0" border="0" align="right" style="border-collapse:collapse;">
                  <tr>
                    <td style="width:${SIGNATURE_DIVIDER_WIDTH}; background:${SIGNATURE_DIVIDER_COLOR}; font-size:0; line-height:0;">&nbsp;</td>
                    <td style="vertical-align:top; padding:0 0 0 18px; text-align:left;">
                      <table cellpadding="0" cellspacing="0" border="0" align="left" style="border-collapse:collapse; text-align:left;">
                        ${contactRow(icons.phone, formatPhones(signature.phones), signature, 13, 13)}
                        ${contactRow(icons.email, signature.email, signature, 13, 13)}
                        ${contactRow(icons.website, signature.website, signature, 13, 13)}
                        <tr>
                          <td style="padding:0; vertical-align:top; width:16px;">
                            <img src="${assetUrl(signature, icons.location)}" width="12" height="16" alt="" style="display:block; border:0;" />
                          </td>
                          <td style="padding:0 0 0 6px; vertical-align:top; text-align:left; ${textStyle}">
                            ${addressBlock}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 12px 0; vertical-align:middle; border-top:${SIGNATURE_DIVIDER_WIDTH} solid ${SIGNATURE_DIVIDER_COLOR}; height:68px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td align="left" style="padding:0; vertical-align:middle;">
                ${footerImage(assetUrl(signature, logos.footerBar), 'Grupo Azimute', 499, FOOTER_BAR_HEIGHT)}
              </td>
              <td align="right" style="padding:0; vertical-align:middle;">
                ${footerImage(assetUrl(signature, logos.iso), 'ISO 9001', FOOTER_ISO_SIZE, FOOTER_ISO_SIZE)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function renderSignatureHtml(signature: ResolvedSignature): string {
  switch (signature.template) {
    case 'grupo_azimute':
      return renderGrupoAzimuteHtml(signature)
    default:
      throw new Error(`Template "${signature.template}" não suportado`)
  }
}
