import '../bootstrap.css'
import '../globals.css'

import { Toaster } from 'react-hot-toast'
import { Roboto } from 'next/font/google'
import Script from 'next/script'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { GoogleAnalytics } from '@/components/ga'
import WhatsappButton from '@/components/whats-button'
import IsoBadges from '@/components/iso-badges'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

import { siteConfig } from '@/lib/metadata'
import BitrixWidget from '@/components/bitrix-form/BitrixWidget'
import BitrixTest from '@/components/bitrix-form/BitrixTest'

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: siteConfig.formatDetection,
  metadataBase: siteConfig.metadataBase,
  alternates: {
    canonical: siteConfig.alternates.canonical,
  },
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  robots: siteConfig.robots,
  verification: siteConfig.verification,
  category: 'technology',
  classification: 'Business',
  other: {
    'geo.region': 'BR',
    'geo.placename': 'Brasil',
    'geo.position': '-23.5505;-46.6333',
    'ICBM': '-23.5505, -46.6333',
    'DC.title': siteConfig.title,
    'DC.description': siteConfig.description,
    'DC.subject': siteConfig.keywords.join(', '),
    'DC.creator': siteConfig.creator,
    'DC.publisher': siteConfig.publisher,
    'DC.language': 'pt-BR',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': siteConfig.url,
    'DC.source': siteConfig.url,
    'DC.relation': siteConfig.url,
    'DC.coverage': 'Brasil',
    'DC.rights': '© 2025 Grupo Azimute. Todos os direitos reservados.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-P76DHV77NQ" />
      <body className={ roboto.className }>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

        <BitrixWidget />

        <Header />

        { children }

        <WhatsappButton />
        
        <IsoBadges />

        <Footer />
      </body>
    </html>
  )
}
