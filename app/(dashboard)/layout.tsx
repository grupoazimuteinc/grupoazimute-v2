import './dashboard.css'

import { Roboto } from 'next/font/google'

import { AppClerkProvider } from '@/components/clerk/clerk-provider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Dashboard | Grupo Azimute',
  description: 'Dashboard interno do Grupo Azimute',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AppClerkProvider>{children}</AppClerkProvider>
      </body>
    </html>
  )
}
