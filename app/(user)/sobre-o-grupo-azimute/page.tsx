import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { getPageMetadata } from '@/lib/metadata'

import azimuteEngenhariaLogo from '@/src/images/azimute-engenharia-off.png'
import azimuteImoveisLogo from '@/src/images/azimute-imoveis-off.png'
import azimuteTechLogo from '@/src/images/azimute-tech-off.png'
import azimuteSanLogo from '@/src/images/azimute-san-off.png'
import ariaLogo from '@/src/images/aria-off.png'

export const metadata = getPageMetadata('sobre')

const valores = [
  {
    titulo: 'Inovação',
    texto: 'Sempre à frente com tecnologias e metodologias modernas',
    icone: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    titulo: 'Qualidade',
    texto: 'Padrões elevados em todos os nossos projetos e serviços',
    icone: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    titulo: 'Colaboração',
    texto: 'Trabalho em equipe e parcerias estratégicas',
    icone: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    titulo: 'Sustentabilidade',
    texto: 'Compromisso com o meio ambiente e responsabilidade social',
    icone: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
]

type Empresa = {
  nome: string
  logo: StaticImageData
  alturaLogo?: number
  chamada: string
  texto: string
  href: string
  cor: string
}

const empresas: Empresa[] = [
  {
    nome: 'Azimute Engenharia',
    logo: azimuteEngenhariaLogo,
    alturaLogo: 46,
    chamada: 'Referência nacional em consultoria e projetos de engenharia.',
    texto:
      'Projetos de infraestrutura de transportes, plantas industriais e comerciais, arquitetura e urbanismo, levantamentos topográficos de grandes áreas e gerenciamento, supervisão e fiscalização de obras. Certificada pela NBR ISO 9001 desde 2002.',
    href: '/azimute-engenharia',
    cor: '#2E8540',
  },
  {
    nome: 'Azimute Imóveis',
    logo: azimuteImoveisLogo,
    chamada: 'Suporte completo em intermediações imobiliárias.',
    texto:
      'Consultoria, avaliação e estudos de viabilidade para imóveis, com atendimento desde a concepção da ideia até a compra e a concretização do empreendimento.',
    href: '/azimute-imoveis',
    cor: '#0B8FD3',
  },
  {
    nome: 'Azimute Tech',
    logo: azimuteTechLogo,
    chamada: 'Inspeções robotizadas e mapeamento de redes subterrâneas.',
    texto:
      'Inspeção visual robotizada de tubulações de drenagem pluvial, esgotamento sanitário e efluentes industriais, além de mapeamento não destrutivo de redes e interferências com Georadar.',
    href: '/azimute-tech',
    cor: '#E0505C',
  },
  {
    nome: 'Azimute San',
    logo: azimuteSanLogo,
    chamada: 'Soluções sustentáveis para saneamento básico e meio ambiente.',
    texto:
      'Consultoria, projetos e serviços em saneamento: estruturação de concessões (PPPs), planos municipais de saneamento e gestão de ativos e perdas, em abastecimento de água, esgotamento sanitário, drenagem e resíduos sólidos.',
    href: '/azimute-san',
    cor: '#2D9CDB',
  },
  {
    nome: 'Aria Imagem e Tecnologia',
    logo: ariaLogo,
    alturaLogo: 38,
    chamada: 'Inteligência visual para os melhores insights de negócios.',
    texto:
      'Aerolevantamento, modelagem 3D e inspeções aéreas com drones, da captura de dados à transformação em informação para decisões em obras, aterros sanitários, mineração e manutenção preventiva.',
    href: '/aria',
    cor: '#E85D17',
  },
]

export default function SobreOGrupoAzimute() {
  return (
    <main>
      {/* Sobre o Grupo */}
      <section id="sobre" className="pt-[200px] pb-24 smartphone:pt-[140px] smartphone:pb-16 bg-white smartphone:px-4">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-16 gap-y-10 items-start">
            <div className="col-span-5 smartphone:col-span-12 tablet:col-span-12">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Sobre o Grupo Azimute</span>
              <h1 className="text-5xl smartphone:text-3xl font-bold text-gray-800 leading-tight mb-8">
                Soluções integradas de engenharia
              </h1>
              <div className="w-24 h-px bg-gray-300"></div>
            </div>

            <div className="col-span-7 smartphone:col-span-12 tablet:col-span-12 space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                O Grupo Azimute é um grupo empresarial que reúne empresas especializadas em diferentes segmentos,
                unidas por um compromisso comum: entregar soluções de alta qualidade e impulsionar o crescimento sustentável.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Com uma visão estratégica e foco na excelência operacional, desenvolvemos projetos que transformam
                ideias em realidade, sempre priorizando a satisfação dos nossos clientes e o desenvolvimento das comunidades onde atuamos.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-4 tablet:grid-cols-2 smartphone:grid-cols-1 gap-6 mt-20 smartphone:mt-12">
            {valores.map((valor) => (
              <div key={valor.titulo} className="bg-gray-50 p-8 border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={valor.icone}></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{valor.titulo}</h4>
                <p className="text-gray-600 text-sm m-0">{valor.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empresas do Grupo */}
      <section id="empresas-do-grupo" className="pt-8 pb-32 smartphone:pb-20 bg-white smartphone:px-4">
        <div className="container">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Empresas do Grupo</span>
          <h2 className="text-4xl smartphone:text-3xl font-bold text-gray-800 leading-tight mb-8">
            Cinco empresas, uma visão integrada
          </h2>
          <div className="w-24 h-px bg-gray-300 mb-12"></div>

          <div>
            {empresas.map((empresa) => (
              <div
                key={empresa.href}
                className="grid grid-cols-12 gap-x-12 gap-y-6 items-center py-10 border-t border-gray-200 last:border-b"
              >
                <div className="col-span-3 smartphone:col-span-12 tablet:col-span-12">
                  <Link href={empresa.href} aria-label={`Conheça a ${empresa.nome}`} className="inline-block transition-opacity hover:opacity-80">
                    <Image
                      src={empresa.logo}
                      alt={empresa.nome}
                      className="w-auto max-w-full object-contain object-left"
                      style={{ maxHeight: empresa.alturaLogo ?? 52 }}
                    />
                  </Link>
                </div>

                <div className="col-span-6 smartphone:col-span-12 tablet:col-span-12">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{empresa.chamada}</h3>
                  <p className="text-base text-gray-600 leading-relaxed m-0">{empresa.texto}</p>
                </div>

                <div className="col-span-3 smartphone:col-span-12 tablet:col-span-12 flex justify-end smartphone:justify-start tablet:justify-start">
                  <Link
                    href={empresa.href}
                    className="inline-flex items-center gap-3 px-6 py-3 border text-sm font-semibold no-underline transition-colors duration-300 text-[var(--cor)] hover:bg-[var(--cor)] hover:!text-white"
                    style={{ borderColor: empresa.cor, ['--cor' as string]: empresa.cor } as React.CSSProperties}
                  >
                    Conheça a empresa
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
