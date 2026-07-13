import { getAssetBaseUrl, resolveAssetUrl } from './asset-url'

export function getSignatureHtmlUrl(slug: string): string {
  return resolveAssetUrl(getAssetBaseUrl(), `/dashboard/tools/assinaturas/${slug}/html`)
}
