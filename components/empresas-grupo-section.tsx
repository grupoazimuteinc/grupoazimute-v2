import Image, { StaticImageData } from 'next/image'
import { Yellowtail } from 'next/font/google'

import azimuteEngenhariaLogo from '@/src/images/azimute-engenharia-off.png'
import azimuteImoveisLogo from '@/src/images/azimute-imoveis-off.png'
import azimuteTechLogo from '@/src/images/azimute-tech-off.png'
import azimuteSanLogo from '@/src/images/azimute-san-off.png'
import ariaLogo from '@/src/images/aria-off.png'

const script = Yellowtail({ weight: '400', subsets: ['latin'], display: 'swap' })

type Empresa = {
  nome: string
  logo: StaticImageData
  descricao: string
  site: string
  dominio: string
  cor: string
  alturaLogo?: number
}

const empresas: Empresa[] = [
  {
    nome: 'Azimute Engenharia',
    logo: azimuteEngenhariaLogo,
    descricao: 'Projetos de infraestrutura, transportes, topografia e gerenciamento de obras.',
    site: 'https://www.azimuteengenharia.com.br',
    dominio: 'azimuteengenharia.com.br',
    cor: '#2E8540',
    alturaLogo: 42,
  },
  {
    nome: 'Azimute Imóveis',
    logo: azimuteImoveisLogo,
    descricao: 'Consultoria, avaliação e estudos de viabilidade para imóveis.',
    site: 'https://www.azimuteimoveis.com.br',
    dominio: 'azimuteimoveis.com.br',
    cor: '#0B8FD3',
  },
  {
    nome: 'Azimute Tech',
    logo: azimuteTechLogo,
    descricao: 'Inspeção robotizada de redes e tubulações e mapeamento com Georadar.',
    site: 'https://www.azimutetech.com.br',
    dominio: 'azimutetech.com.br',
    cor: '#E0505C',
  },
  {
    nome: 'Azimute San',
    logo: azimuteSanLogo,
    descricao: 'Estruturação de concessões (PPPs), planos de saneamento e gestão de ativos e perdas.',
    site: 'https://www.azimutesan.com.br',
    dominio: 'azimutesan.com.br',
    cor: '#2D9CDB',
  },
  {
    nome: 'Aria Imagem e Tecnologia',
    logo: ariaLogo,
    descricao: 'Aerolevantamento, modelagem 3D e inspeções aéreas com drones.',
    site: 'https://www.ariatecnologia.com.br',
    dominio: 'ariatecnologia.com.br',
    cor: '#E85D17',
    alturaLogo: 34,
  },
]

export function GlobeIcon({ color = 'currentColor', size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export default function EmpresasGrupoSection() {
  return (
    <section id="conheca-empresas" className="bg-white py-32 smartphone:py-20 smartphone:px-4">
      <div className="container">
        <h2 className="text-4xl smartphone:text-3xl font-bold text-[#5a5a5a] leading-tight mb-8">
          Conheça as{' '}
          <span className={`${script.className} font-normal text-[#5a5a5a] text-[1.35em]`}>empresas</span>{' '}
          do Grupo Azimute
        </h2>
        <div className="w-24 h-px bg-gray-300 mb-14 smartphone:mb-10" />

        <div className="grid grid-cols-5 gap-8 tablet:grid-cols-2 smartphone:grid-cols-1 smartphone:gap-10 medium-screen:grid-cols-3">
          {empresas.map((empresa) => (
            <div key={empresa.dominio} className="flex flex-col">
              <a
                href={empresa.site}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Site da ${empresa.nome}`}
                className="h-[60px] flex items-center mb-6 transition-opacity hover:opacity-80"
              >
                <Image
                  src={empresa.logo}
                  alt={empresa.nome}
                  className="w-auto max-w-full object-contain object-left"
                  style={{ maxHeight: empresa.alturaLogo ?? 48 }}
                />
              </a>

              <p className="text-base text-[#666] leading-relaxed mb-6 flex-1">{empresa.descricao}</p>

              <div className="h-px w-full mb-4" style={{ backgroundColor: empresa.cor }} />

              <a
                href={empresa.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#5a5a5a] hover:underline"
              >
                <GlobeIcon color={empresa.cor} />
                {empresa.dominio}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
