import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/', '/admin/'],
    },
    sitemap: 'https://www.grupoazimute.com.br/sitemap.xml',
  }
}
