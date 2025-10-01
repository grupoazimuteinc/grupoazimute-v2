'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface SlideData {
  id: number
  title: string
  description: string
  buttonText: string
  buttonLink: string
  image: string
  backgroundImage: string
}

// Cache busting estático para forçar atualização das imagens
const CACHE_VERSION = 'v2.0'

const slidesData: SlideData[] = [
  {
    id: 1,
    title: "Grupo Azimute",
    description: "Conheça nossas empresas e descubra como podemos ajudar você a alcançar seus objetivos com excelência e inovação.",
    buttonText: "Conhecer Empresas",
    buttonLink: "/#empresas",
    image: `/images/grupo-azimute.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_grupo_azimute.webp?${CACHE_VERSION}`
  },
  {
    id: 2,
    title: "Azimute Engenharia",
    description: "Tradição e inovação: Referência nacional em engenharia para infraestrutura.",
    buttonText: "Saiba Mais",
    buttonLink: "/azimute-engenharia",
    image: `/images/azimute-engenharia.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_azimute_engenharia.webp?${CACHE_VERSION}`
  },
  {
    id: 3,
    title: "Azimute Imóveis",
    description: "Avaliações de áreas: Avaliação de áreas para infraestrutura e intermediações imobiliárias.",
    buttonText: "Ver Imóveis",
    buttonLink: "/azimute-imoveis",
    image: `/images/azimute-imoveis.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_azimute_imoveis.webp?${CACHE_VERSION}`
  },
  {
    id: 4,
    title: "Azimute Tech",
    description: "Tecnologia ao seu alcance: Vídeo inspeção e mapeamento de redes de esgoto, pluviais e efluentes industriais.",
    buttonText: "Conhecer Soluções",
    buttonLink: "/azimute-tech",
    image: `/images/azimute-tech.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_azimute_tech.webp?${CACHE_VERSION}`
  },
  {
    id: 5,
    title: "Azimute San",
    description: "Consultoria, estudos e projetos: Soluções sustentáveis voltadas ao saneamento básico.",
    buttonText: "Ver Serviços",
    buttonLink: "/azimute-san",
    image: `/images/azimute-san.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_azimute_san.webp?${CACHE_VERSION}`
  },
  {
    id: 6,
    title: "Aria Imagem e Tecnologia",
    description: "Informações precisas: Aerolevantamento e topografia, inspeções com drone e escaneamento e modelagem 3D.",
    buttonText: "Ver Serviços",
    buttonLink: "/aria",
    image: `/images/aria-imagem-e-tecnologia.png?${CACHE_VERSION}`,
    backgroundImage: `/images/background_aria.webp?${CACHE_VERSION}`
  }
]

export default function BannerSlider() {
  return (
    <div 
      className="relative mt-[104px] smartphone:mt-[54px] tablet:mt-[80px] mb-[50px] overflow-hidden"
      style={{
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        position: 'relative'
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={true}
        watchSlidesProgress={true}
        centeredSlides={false}
        loop={false}
        navigation={{
          nextEl: '.swiper-button-next-banner',
          prevEl: '.swiper-button-prev-banner',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-banner',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="banner-swiper !pl-0 !overflow-hidden"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          height: '650px',
          overflow: 'hidden',
          paddingLeft: '0 !important'
        }}
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="!w-full">
            <div 
              className="relative min-h-[650px] smartphone:min-h-[500px] flex items-center w-full"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay para melhorar legibilidade */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              <div className="relative z-10 w-full max-w-[1410px] mx-auto">
                <div className="flex justify-center items-center min-h-[650px] smartphone:min-h-[500px]">
                  {/* Conteúdo centralizado */}
                  <div className="text-white space-y-8 text-center max-w-3xl">
                    {/* Logotipo da empresa */}
                    <div className="flex justify-center">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={120}
                        height={120}
                        className="w-30 h-30 object-contain opacity-90"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <h3 className="text-6xl smartphone:text-4xl font-bold leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-xl smartphone:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                    <Link 
                      href={slide.buttonLink}
                      className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white/80 transition-all duration-300 backdrop-blur-sm"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navegação customizada - setas limpas */}
      <div className="swiper-button-prev-banner absolute left-6 top-1/2 transform -translate-y-1/2 z-[110] w-8 h-8 cursor-pointer transition-all duration-300 hover:opacity-70">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="swiper-button-next-banner absolute right-6 top-1/2 transform -translate-y-1/2 z-[110] w-8 h-8 cursor-pointer transition-all duration-300 hover:opacity-70">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Paginação customizada */}
      <div className="swiper-pagination-banner absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[110] flex space-x-3"></div>
      
      {/* CSS customizado para sobrescrever regras globais */}
      <style jsx>{`
        @media (max-width: 640px) {
          .banner-swiper {
            padding-left: 0 !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </div>
  )
}
