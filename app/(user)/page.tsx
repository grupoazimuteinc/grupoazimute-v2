import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'

import { client } from '@/lib/sanity.client'

import { Posts } from '@/components/posts'

import azimuteEngenhariaOff from '@/src/images/azimute-engenharia-off.png'
import azimuteEngenhariaWhite from '@/src/images/azimute-engenharia-white.png'
import azimuteImoveisOff from '@/src/images/azimute-imoveis-off.png'
import azimuteImoveisWhite from '@/src/images/azimute-imoveis-white.png'
import azimuteTechOff from '@/src/images/azimute-tech-off.png'
import azimuteTechWhite from '@/src/images/azimute-tech-white.png'
import azimuteSanOff from '@/src/images/azimute-san-off.png'
import azimuteSanWhite from '@/src/images/azimute-san-white.png'
import azimuteAriaOff from '@/src/images/aria-off.png'
import azimuteAriaWhite from '@/src/images/aria-white.png'
import bannerGrupo from '@/src/images/banner-grupo.jpg'

const query = groq`
  *[_type=='post'] {
    ...,
    categories[]->,
  } | order(publishedAt desc)
`

export const revalidate = 60

export default async function Home() {
  const posts = await client.fetch(query)

  return (
    <main>
      <Image
        src={ bannerGrupo } 
        className="w-full smartphone:mt-[70px] tablet:mt-[70px]"
        alt="Assista agora"
        aria-hidden="true"
        width={ 1496 }
        height={ 791 }
      />

      <div className="content o-grupo">
        <div className="container">
          <div className="row">
            {/* <div className="col-12 col-md-8 offset-md-2 text-center">
              <h2>Conheça as empresas <br />que fazem parte do Grupo Azimute</h2>
              <p>Mais de três décadas de atuação, pautadas em uma relação de responsabilidade com nossos clientes. Marca de valor, resultado de trabalho sério e de experiências com inúmeros desafios.</p>
            </div> */}

            <div className="col-12 -mt-40 smartphone:mt-0 tablet:mt-0 monitor:mt-0">
              <div className="grid-logos gap-4 flex area-logo-empresas smartphone:flex-col tablet:flex-col">
                <div>
                  <Link href="https://www.azimuteengenharia.com.br/" target="_blank">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteEngenhariaOff } width={ 196 } height={ 51 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteEngenhariaWhite } width={ 196 } height={ 51 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="smartphone:w-full tablet:w-full">
                    <Link href="https://www.azimuteimoveis.com.br/" target="_blank">
                      <div className="box-empresa">
                        <div>
                          <div className="ga-logo">
                            <Image src={ azimuteImoveisOff } width={ 149 } height={ 54 } className="ga-logo-off" alt="" />
                            <Image src={ azimuteImoveisWhite } width={ 149 } height={ 54 } className="ga-logo-white" alt="" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="smartphone:w-full tablet:w-full">
                    <Link href="https://www.azimutetech.com.br/" target="_blank">
                      <div className="box-empresa">
                        <div>
                          <div className="ga-logo">
                            <Image src={ azimuteTechOff } width={ 140 } height={ 52 } className="ga-logo-off" alt="" />
                            <Image src={ azimuteTechWhite } width={ 140 } height={ 52 } className="ga-logo-white" alt="" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="smartphone:w-full tablet:w-full">
                    <Link href="https://www.azimutesan.com.br/" target="_blank">
                      <div className="box-empresa">
                        <div>
                          <div className="ga-logo">
                            <Image src={ azimuteSanOff } width={ 140 } height={ 53 } className="ga-logo-off" alt="" />
                            <Image src={ azimuteSanWhite } width={ 140 } height={ 53 } className="ga-logo-white" alt="" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="smartphone:w-full tablet:w-full">
                    <Link href="https://www.ariatecnologia.com.br/" target="_blank">
                      <div className="box-empresa">
                        <div>
                          <div className="ga-logo">
                            <Image src={ azimuteAriaOff } width={ 142 } height={ 40 } className="ga-logo-off" alt="" />
                            <Image src={ azimuteAriaWhite } width={ 142 } height={ 40 } className="ga-logo-white" alt="" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content o-grupo pt-24 monitor:pt-10">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center">
              <h2>Fique por dentro</h2>
              <p className="smartphone:mb-0">Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-24 monitor:pb-10">
        <div className="row">
          <Posts posts={ posts } />
        </div>
      </div> 
    </main>
  )
}
