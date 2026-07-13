export function getAssetBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'https://grupoazimute.com.br'
}

export function resolveAssetUrl(baseUrl: string, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const normalizedBase = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${normalizedBase}${normalizedPath}`
}
