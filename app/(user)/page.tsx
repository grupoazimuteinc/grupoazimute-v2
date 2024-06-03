import Image from 'next/image'
import { groq } from 'next-sanity'

import { client } from '@/lib/sanity.client'

import { Posts } from '@/components/posts'

import bannerGrupo from '@/src/images/banner-grupo.jpg'

import SwiperEmpresasGrupo from '@/components/swiper-empresas-grupo'
import Noticias from './noticias/page'

// const query = groq`
//   *[_type=='post'] {
//     ...,
//     categories[]->
//   } | order(publishedAt desc) [0..19]
// `

// export const revalidate = 1

export default function Home() {
  // const posts = await client.fetch(query)

  return (
    <main>
      <Image
        src={ bannerGrupo } 
        className="w-full smartphone:mt-[79px] tablet:mt-[78px]"
        alt="Assista agora"
        aria-hidden="true"
        width={ 1496 }
        height={ 791 }
      />

      <div className="content o-grupo smartphone:pt-5 smartphone:mb-0 smartphone:overflow-hidden small-tablet:overflow-hidden overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div>
                <h2 className="text-3xl text-[#6A696A] font-bold p-0 mb-[15px] smartphone:text-xl smartphone:!pl-[15px] monitor:!pl-[15px] small-tablet:!pl-[15px]">Conheça nossas empresas</h2>

                <SwiperEmpresasGrupo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="content o-grupo pt-[90px] smartphone:pt-5 small-tablet:pt-[30px] monitor:pt-10">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 text-left">
              <h2 className="text-3xl text-[#6A696A] font-bold p-0 mb-[15px] smartphone:text-xl">Fique por dentro</h2>
              <p className="smartphone:mb-0">Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container pb-16 smartphone:pb-[20px] monitor:pb-10">
        <div className="row">
          <Noticias />

          {/* <div className="w-full flex justify-center">
            <a href="/noticias" className="h-[40px] leading-[40px] rounded-[10px] bg-[#313131] text-white text-base px-[15px] transition-all border border-transparent hover:no-underline hover:border-[#313131] hover:bg-white hover:!text-[#313131]">Mais notícias</a>
          </div> */}
        </div>
      </div> 
    </main>
  )
}
