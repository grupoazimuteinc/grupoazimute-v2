import { Metadata } from 'next'

export const siteConfig = {
  name: 'Grupo Azimute',
  title: 'Grupo Azimute - Soluções Integradas de Engenharia',
  description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech, Azimute San e Aria. Mais de três décadas de atuação no ramo da engenharia civil com soluções integradas e inovadoras.',
  url: 'https://grupoazimute.com.br',
  ogImage: 'https://grupoazimute.com.br/images/grupo-azimute.png',
  keywords: [
    'engenharia civil',
    'construção',
    'imóveis',
    'saneamento',
    'tecnologia',
    'inspeção',
    'meio ambiente',
    'grupo azimute',
    'azimute engenharia',
    'azimute imóveis',
    'azimute tech',
    'azimute san',
    'aria imagem e tecnologia',
    'projetos de engenharia',
    'consultoria técnica',
    'gestão de projetos',
    'sustentabilidade',
    'inovação tecnológica'
  ],
  authors: [
    {
      name: 'Grupo Azimute',
      url: 'https://grupoazimute.com.br',
    },
  ],
  creator: 'Grupo Azimute',
  publisher: 'Grupo Azimute',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://grupoazimute.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://grupoazimute.com.br',
    title: 'Grupo Azimute - Soluções Integradas de Engenharia',
    description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech, Azimute San e Aria. Mais de três décadas de atuação no ramo da engenharia civil.',
    siteName: 'Grupo Azimute',
    images: [
      {
        url: 'https://grupoazimute.com.br/images/grupo-azimute.png',
        width: 1200,
        height: 630,
        alt: 'Grupo Azimute - Soluções Integradas de Engenharia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grupo Azimute - Soluções Integradas de Engenharia',
    description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech, Azimute San e Aria.',
    images: ['https://grupoazimute.com.br/images/grupo-azimute.png'],
    creator: '@grupoazimute',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  noIndex?: boolean
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  noIndex = false,
  canonical,
}: PageMetadata): Metadata {
  const fullTitle = title.includes('Grupo Azimute') ? title : `${title} | Grupo Azimute`
  const fullDescription = description || siteConfig.description
  const fullKeywords = [...siteConfig.keywords, ...keywords]
  const fullImage = image || siteConfig.ogImage
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : fullUrl

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    formatDetection: siteConfig.formatDetection,
    metadataBase: siteConfig.metadataBase,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@grupoazimute',
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : siteConfig.robots,
    verification: siteConfig.verification,
  }
}

// Metadados específicos para cada página
export const pageMetadata = {
  home: {
    title: 'Grupo Azimute - Soluções Integradas de Engenharia',
    description: 'Grupo formado pelas empresas Azimute Engenharia, Azimute Imóveis, Azimute Tech, Azimute San e Aria. Mais de três décadas de atuação no ramo da engenharia civil com soluções integradas e inovadoras.',
    keywords: ['engenharia civil', 'construção', 'imóveis', 'saneamento', 'tecnologia'],
    url: '/',
  },
  azimuteEngenharia: {
    title: 'Azimute Engenharia - Projetos e Construções',
    description: 'Especializada em projetos de engenharia civil, construção e gestão de obras. Soluções completas para o desenvolvimento de empreendimentos residenciais e comerciais.',
    keywords: ['engenharia civil', 'projetos', 'construção', 'obras', 'empreendimentos'],
    url: '/azimute-engenharia',
  },
  azimuteImoveis: {
    title: 'Azimute Imóveis - Venda e Locação de Imóveis',
    description: 'Corretora especializada em venda, locação e administração de imóveis. Soluções completas para investidores e proprietários.',
    keywords: ['imóveis', 'venda', 'locação', 'corretora', 'investimentos'],
    url: '/azimute-imoveis',
  },
  azimuteTech: {
    title: 'Azimute Tech - Inspeção e Tecnologia',
    description: 'Especializada em inspeções técnicas, laudos periciais e soluções tecnológicas para a construção civil. Tecnologia a serviço da qualidade.',
    keywords: ['inspeção técnica', 'laudos periciais', 'tecnologia', 'qualidade', 'perícia'],
    url: '/azimute-tech',
  },
  azimuteSan: {
    title: 'Azimute San - Saneamento e Meio Ambiente',
    description: 'Especializada em projetos de saneamento básico, tratamento de água e esgoto, e soluções ambientais sustentáveis.',
    keywords: ['saneamento', 'meio ambiente', 'tratamento de água', 'esgoto', 'sustentabilidade'],
    url: '/azimute-san',
  },
  aria: {
    title: 'Aria - Imagem e Tecnologia',
    description: 'Especializada em soluções de imagem e tecnologia para a construção civil. Drones, fotogrametria e tecnologias inovadoras.',
    keywords: ['drones', 'fotogrametria', 'imagem', 'tecnologia', 'mapeamento'],
    url: '/aria',
  },
  contato: {
    title: 'Contato - Grupo Azimute',
    description: 'Entre em contato com o Grupo Azimute. Nossa equipe está pronta para atender suas necessidades em engenharia civil, imóveis, tecnologia e saneamento.',
    keywords: ['contato', 'atendimento', 'orçamento', 'proposta'],
    url: '/contato',
  },
  soliciteOrcamento: {
    title: 'Solicite seu Orçamento - Grupo Azimute',
    description: 'Solicite um orçamento personalizado para seus projetos de engenharia, imóveis, tecnologia ou saneamento. Resposta rápida e proposta detalhada.',
    keywords: ['orçamento', 'proposta', 'cotação', 'projeto'],
    url: '/solicite-orcamento',
  },
  trabalheConosco: {
    title: 'Trabalhe Conosco - Grupo Azimute',
    description: 'Faça parte da equipe do Grupo Azimute. Oportunidades de carreira em engenharia civil, tecnologia, imóveis e saneamento.',
    keywords: ['trabalhe conosco', 'vagas', 'carreira', 'oportunidades'],
    url: '/trabalhe-conosco',
  },
  pesquisaSatisfacao: {
    title: 'Pesquisa de Satisfação - Grupo Azimute',
    description: 'Participe da nossa pesquisa de satisfação e ajude-nos a melhorar nossos serviços. Sua opinião é fundamental para nosso crescimento.',
    keywords: ['pesquisa', 'satisfação', 'avaliação', 'feedback'],
    url: '/pesquisa-de-satisfacao',
  },
  blog: {
    title: 'Blog - Grupo Azimute',
    description: 'Acompanhe as últimas notícias, tendências e insights do mercado de engenharia civil, construção, tecnologia e sustentabilidade.',
    keywords: ['blog', 'notícias', 'tendências', 'insights', 'mercado'],
    url: '/blog',
  },
  noticias: {
    title: 'Notícias - Grupo Azimute',
    description: 'Fique por dentro das principais notícias do setor de engenharia civil, construção, tecnologia e sustentabilidade.',
    keywords: ['notícias', 'atualidades', 'mercado', 'setor'],
    url: '/noticias',
  },
  ifatBrasil2024: {
    title: 'IFAT Brasil 2024 - Grupo Azimute',
    description: 'O Grupo Azimute participa da IFAT Brasil 2024, a maior feira de saneamento e meio ambiente da América Latina.',
    keywords: ['ifat brasil', 'feira', 'saneamento', 'meio ambiente', 'evento'],
    url: '/ifat-brasil-2024',
  },
}

export function getPageMetadata(page: keyof typeof pageMetadata): Metadata {
  return generateMetadata(pageMetadata[page])
}
