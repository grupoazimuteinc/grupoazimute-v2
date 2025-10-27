import BannerSlider from '@/components/banner-slider'
import SwiperEmpresasGrupo from '@/components/swiper-empresas-grupo'
import { LatestPosts } from '@/components/latest-posts'
import { GSAPAnimations } from '@/components/gsap-animations'
import { getPageMetadata } from '@/lib/metadata'
import Image from 'next/image'

export const metadata = getPageMetadata('home')

export default function Home() {
  return (
    <main>
      <GSAPAnimations />
      <BannerSlider />

      {/* Seção Sobre o Grupo Azimute */}
      <section id="sobre" className="pb-10 bg-white smartphone:px-4">
        <div className="container">
          <div className="row">
            <div className="w-full">
              {/* Cabeçalho da seção */}
              <div className="text-center mb-16">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">Sobre Nós</span>
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  Soluções integradas de engenharia
                </h2>
                <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
              </div>

              {/* Conteúdo centralizado */}
              <div className="max-w-4xl mx-auto my-10">
                <div className="space-y-12">
                  {/* Texto principal */}
                  <div className="text-center space-y-6">
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      O Grupo Azimute é uma holding empresarial que reúne empresas especializadas em diferentes segmentos, 
                      unidas por um compromisso comum: entregar soluções de alta qualidade e impulsionar o crescimento sustentável.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      Com uma visão estratégica e foco na excelência operacional, desenvolvemos projetos que transformam 
                      ideias em realidade, sempre priorizando a satisfação dos nossos clientes e o desenvolvimento das comunidades onde atuamos.
                    </p>
                  </div>

                  {/* Cards de valores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Inovação</h4>
                      <p className="text-gray-600 text-sm">Sempre à frente com tecnologias e metodologias modernas</p>
                    </div>

                    <div className="bg-gray-50 p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Qualidade</h4>
                      <p className="text-gray-600 text-sm">Padrões elevados em todos os nossos projetos e serviços</p>
                    </div>

                    <div className="bg-gray-50 p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Colaboração</h4>
                      <p className="text-gray-600 text-sm">Trabalho em equipe e parcerias estratégicas</p>
                    </div>

                    <div className="bg-gray-50 p-6 border border-gray-200 hover:bg-gray-100 transition-colors duration-300 text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Sustentabilidade</h4>
                      <p className="text-gray-600 text-sm">Compromisso com o meio ambiente e responsabilidade social</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Atuação Nacional */}
      <section id="atuacao" className="relative py-28 smartphone:py-16 smartphone:px-4 overflow-hidden">
        {/* Vídeo de Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/bg-atuacao-nacional.mp4" type="video/mp4" />
            {/* Fallback para navegadores que não suportam vídeo */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"></div>
          </video>
          {/* Overlay para melhorar legibilidade do texto */}
          <div className="absolute inset-0 bg-black bg-opacity-90"></div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 container">
          <div className="row">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Conteúdo Textual - Esquerda */}
                <div className="text-white space-y-8">
                  <div>
                    <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-4 block">
                      Atuação Nacional
                    </span>
                    <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6">
                      Presença em todo o território brasileiro
                    </h2>
                    <div className="w-20 h-1 bg-blue-400"></div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xl text-gray-100 leading-relaxed">
                      O Grupo Azimute expandiu sua atuação para todo o território nacional, 
                      levando excelência e inovação para diferentes regiões do Brasil.
                    </p>
                    
                    <p className="text-lg text-gray-200 leading-relaxed">
                      Com uma rede de parceiros estratégicos e equipes especializadas, 
                      atendemos clientes em todas as capitais e principais centros urbanos, 
                      garantindo a mesma qualidade e compromisso em cada projeto.
                    </p>
                  </div>
                </div>

                {/* Imagem - Direita */}
                <div className="relative">
                  <div className="relative z-10">
                    <Image
                      src="/images/mapa-atuacao-nacional.webp"
                      alt="Mapa do Brasil destacando a atuação nacional do Grupo Azimute"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                  {/* Efeito de brilho sutil */}
                  <div className="absolute inset-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Últimas Publicações do Blog */}
      <section id="noticias">
        <LatestPosts />
      </section>

      {/* Call to Action Full-Width */}
      <section className="bg-gray-900 py-16 smartphone:py-12 smartphone:px-4 mb-[50px]">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Pronto para fazer parte do nosso futuro?
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer com excelência e inovação.
                </p>
                
                {/* Formulário de Contato */}
                <form 
                  id="contact-form"
                  className="max-w-2xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Seu nome completo"
                        required
                        className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Seu e-mail"
                        required
                        className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Seu telefone"
                        className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <select
                        name="grupo"
                        className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      >
                        <option value="">Selecione sua empresa</option>
                        <option value="azimute-engenharia">Azimute Engenharia</option>
                        <option value="azimute-imoveis">Azimute Imóveis</option>
                        <option value="azimute-tech">Azimute Tech</option>
                        <option value="azimute-san">Azimute San</option>
                        <option value="aria">Aria Imagem e Tecnologia</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <textarea
                      name="message"
                      placeholder="Conte-nos sobre seu projeto ou necessidade"
                      rows={4}
                      required
                      className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-600/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-blue-600 hover:border-blue-500 backdrop-blur-sm"
                  >
                    Enviar Mensagem
                  </button>
                </form>
                
                <script dangerouslySetInnerHTML={{
                  __html: `
                    document.getElementById('contact-form').addEventListener('submit', async function(e) {
                      e.preventDefault();
                      
                      const formData = new FormData(this);
                      const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        message: formData.get('message'),
                        grupo: formData.get('grupo')
                      };
                      
                      try {
                        const response = await fetch('/api/contatoSend', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data)
                        });
                        
                        if (response.ok) {
                          alert('Mensagem enviada com sucesso!');
                          this.reset();
                        } else {
                          alert('Erro ao enviar mensagem. Tente novamente.');
                        }
                      } catch (error) {
                        alert('Erro ao enviar mensagem. Tente novamente.');
                      }
                    });
                  `
                }} />
                
                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Ou entre em contato diretamente: 
                    <a 
                      href="mailto:comercial@grupoazimute.com.br" 
                      className="text-blue-400 hover:text-blue-300 ml-1"
                    >
                      comercial@grupoazimute.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="empresas" className="content o-grupo pb-20 smartphone:pt-5 smartphone:px-4 smartphone:overflow-hidden small-tablet:overflow-hidden overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div>
                <h2 className="text-3xl text-gray-800 font-bold p-0 mb-[25px] smartphone:text-xl smartphone:!pl-[15px] monitor:!pl-[15px] small-tablet:!pl-[15px]">Saiba mais sobre as empresas do Grupo Azimute</h2>

                <SwiperEmpresasGrupo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}