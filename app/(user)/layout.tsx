import '../bootstrap.css'
import '../globals.css'

import { Toaster } from 'react-hot-toast'
import { Roboto } from 'next/font/google'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { GoogleAnalytics } from '@/components/ga'
import WhatsappButton from '@/components/whats-button'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Grupo Azimute - Soluções integradas de engenharia em um único grupo de empresas',
  description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech - Inspeção e Tecnologia, Azimute San - Saneamento e Meio Ambiente e Aria - Imagem e Tecnologia. No total, são mais de três décadas de atuação no ramo da engenharia civil, pautadas em uma relação de responsabilidade com nossos clientes. Somos marca de valor, resultado de trabalho sério e de experiências com inúmeros desafios.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-P76DHV77NQ" />
      <body className={ roboto.className }>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

        <Header />

        { children }

        <WhatsappButton />

        <Footer />
      </body>
    </html>
  )
}
