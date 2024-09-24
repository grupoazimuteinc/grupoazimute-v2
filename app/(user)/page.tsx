import Image from 'next/image'
import bannerGrupo from '@/src/images/banner-grupo.jpg'

import SwiperEmpresasGrupo from '@/components/swiper-empresas-grupo'

export default function Home() {
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

      <div className="content o-grupo pb-20 smartphone:pt-5 smartphone:overflow-hidden small-tablet:overflow-hidden overflow-hidden">
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
    </main>
  )
}
