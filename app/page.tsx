import Image from 'next/image'

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

export default function Home() {
  return (
    <main>
      <div className="content o-grupo pt-52">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center">
              <h2>Conheça as empresas <br />que fazem parte do Grupo Azimute</h2>
              <p>Mais de três décadas de atuação, pautadas em uma relação de responsabilidade com nossos clientes. Marca de valor, resultado de trabalho sério e de experiências com inúmeros desafios.</p>
            </div>

            <div className="col-12">
              <div className="grid-logos gap-4 flex">
                <div>
                  <a href="/azimute-engenharia">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteEngenhariaOff } width={ 196 } height={ 51 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteEngenhariaWhite } width={ 196 } height={ 51 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a href="/azimute-imoveis">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteImoveisOff } width={ 149 } height={ 54 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteImoveisWhite } width={ 149 } height={ 54 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a href="/azimute-tech">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteTechOff } width={ 140 } height={ 52 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteTechWhite } width={ 140 } height={ 52 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a href="/azimute-san">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteSanOff } width={ 140 } height={ 53 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteSanWhite } width={ 140 } height={ 53 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                <div>
                  <a href="/aria">
                    <div className="box-empresa">
                      <div>
                        <div className="ga-logo">
                          <Image src={ azimuteAriaOff } width={ 142 } height={ 40 } className="ga-logo-off" alt="" />
                          <Image src={ azimuteAriaWhite } width={ 142 } height={ 40 } className="ga-logo-white" alt="" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content o-grupo pt-24">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center">
              <h2>Fique por dentro</h2>
              <p>Saiba as últimas informações relacionadas aos segmentos do grupo.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-24">
        <div className="row">
          <div className="col-12 col-md-3 all" style={{ display: 'block' }}>
            <a href="https://azimutesan.com.br/blog/azimute-san-realiza-estruturacao-de-solucao-sustentavel-para-abastecimento-de-agua-e-esgotamento-sanitario-do-municipio-de-maravilha-sc/" target="_blank">
              <div className="box-news">
                <div className="news-image">
                  <Image src="https://grupoazimute.com.br/api/wp-content/uploads/2023/05/san-11-05-23-300x230.jpeg" width={ 228 } height={ 160 } alt="Azimute San realiza estruturação de solução sustentável para Abastecimento de Água e Esgotamento Sanitário do município de Maravilha - SC" />
                </div>
                
                <div><span className="news-tag san">san</span></div>
                <span className="news-title">Azimute San realiza estruturação de solução sustentável para Abastecimento de Água e Esgotamento Sanitário do município de Maravilha – SC</span>
                <span className="news-date">11 de maio de 2023</span>
              </div>
            </a>
          </div>
        </div>
      </div> 
    </main>
  )
}
