import '../bootstrap.css'
import '../globals.css'

import { Roboto } from 'next/font/google'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Grupo Azimute - Soluções que unem inteligência, tecnologia e experiência',
  description: 'Mais de três décadas de atuação, pautadas em uma relação de responsabilidade com nossos clientes. Marca de valor, resultado de trabalho sério e de experiências com inúmeros desafios.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={ roboto.className }>
        <Header />

        { children }

        <Footer />
      </body>
    </html>
  )
}
