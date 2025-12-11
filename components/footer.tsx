'use client'

import Image from 'next/image'
import Link from 'next/link'
import Ano from "./ano";

import grupoBranco from '@/src/images/grupo-branco.png'

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* Seção principal do footer */}
                <div className="row" style={{ marginBottom: '50px' }}>
                    {/* Sobre o Grupo Azimute */}
                    <div className="col-12 col-lg-4 mb-5">
                        <h4 className="text-white font-bold mb-4 text-sm !text-sm">Sobre o Grupo Azimute</h4>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3 !text-sm !font-normal">
                            O Grupo Azimute é uma holding empresarial que reúne empresas especializadas em diferentes segmentos, 
                            unidas por um compromisso comum: entregar soluções de alta qualidade e impulsionar o crescimento sustentável.
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 !text-sm !font-normal">
                            Com mais de três décadas de atuação no ramo da engenharia civil, desenvolvemos projetos que transformam 
                            ideias em realidade, sempre priorizando a satisfação dos nossos clientes.
                        </p>
                        
                        {/* Valores do grupo */}
                        <div className="mt-5">
                            <h5 className="text-white font-semibold mb-3 text-sm">Nossos Valores</h5>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-700 text-gray-300 px-3 py-2 rounded-full text-sm font-medium">Inovação</span>
                                <span className="bg-gray-700 text-gray-300 px-3 py-2 rounded-full text-sm font-medium">Qualidade</span>
                                <span className="bg-gray-700 text-gray-300 px-3 py-2 rounded-full text-sm font-medium">Sustentabilidade</span>
                                <span className="bg-gray-700 text-gray-300 px-3 py-2 rounded-full text-sm font-medium">Excelência</span>
                            </div>
                        </div>
                    </div>

                    {/* Mapa do Site */}
                    <div className="col-12 col-lg-2 col-md-6 mb-5">
                        <h4 className="text-white font-bold mb-4 text-sm !text-sm">O Grupo</h4>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/azimute-engenharia" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Azimute Engenharia
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/azimute-imoveis" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Azimute Imóveis
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/azimute-tech" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Azimute Tech
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/azimute-san" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Azimute San
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/aria" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Aria Imagem e Tecnologia
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links Úteis */}
                    <div className="col-12 col-lg-2 col-md-6 mb-5">
                        <h4 className="text-white font-bold mb-4 text-sm !text-sm">Links Úteis</h4>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Contato
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/solicite-orcamento" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Solicite Orçamento
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/pesquisa-de-satisfacao" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Pesquisa de Satisfação
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/trabalhe-conosco" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Trabalhe Conosco
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/noticias" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Notícias
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/ifat-brasil-2024" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    IFAT Brasil 2024
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contato e Informações */}
                    <div className="col-12 col-lg-4 mb-5">
                        <h4 className="text-white font-bold mb-4 text-sm !text-sm">Contato</h4>
                        
                        <div className="mb-4">
                            <h5 className="text-gray-400 text-sm font-semibold mb-2">Telefone</h5>
                            <a href="tel:4734736777" className="text-gray-300 hover:text-white transition-colors text-sm block mb-2">
                                +55 47 3473-6777
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=5547999110824" className="text-gray-300 hover:text-white transition-colors text-sm block">
                                WhatsApp: +55 47 99911-0824
                            </a>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-gray-400 text-sm font-semibold mb-2">E-mail</h5>
                            <a href="mailto:comercial@grupoazimute.com.br" className="text-gray-300 hover:text-white transition-colors text-sm">
                                comercial@grupoazimute.com.br
                            </a>
                        </div>

                        <div className="mb-5">
                            <h5 className="text-gray-400 text-sm font-semibold mb-2">Endereço</h5>
                            <p className="text-gray-300 text-sm leading-relaxed !text-sm !font-normal">
                                Rua Clodoaldo Gomes, 415<br />
                                Distrito Industrial<br />
                                Joinville - Santa Catarina<br />
                            CEP: 89.219-550
                        </p>
                        </div>

                        {/* Newsletter/Contato Rápido */}
                        {/* <div className="bg-gray-800 p-5 rounded-lg">
                            <h5 className="text-white font-semibold mb-3 text-sm">Fique por dentro</h5>
                            <p className="text-gray-300 text-sm mb-4 !text-sm !font-normal">
                                Receba nossas novidades e atualizações
                            </p>
                            <a 
                                href="mailto:comercial@grupoazimute.com.br?subject=Newsletter - Grupo Azimute"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-3 rounded transition-colors inline-block font-medium"
                            >
                                Inscrever-se
                            </a>
                        </div> */}
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="border-t border-gray-700 mb-6"></div>

                {/* Seção de certificações e políticas */}
                <div className="row mb-5">
                    <div className="col-12 col-md-6 mb-4">
                        <h5 className="text-gray-400 text-sm font-semibold mb-4">Certificações e Políticas</h5>
                        <div className="flex flex-wrap gap-3">
                            <a 
                                href="/politica-de-gestao-integrada.pdf" 
                                target="_blank" 
                                className="text-gray-300 hover:text-white transition-colors text-sm border border-gray-600 px-4 py-3 rounded hover:border-gray-500 font-medium"
                            >
                                Políticas de Gestão Integrada
                            </a>
                            <span className="text-gray-500 text-sm border border-gray-600 px-4 py-3 rounded font-medium">
                                ISO 9001:2015
                            </span>
                            {/* <span className="text-gray-500 text-sm border border-gray-600 px-4 py-3 rounded font-medium">
                                ISO 45001:2015
                            </span> */}
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 mb-4">
                        <h5 className="text-gray-400 text-sm font-semibold mb-4">Redes Sociais</h5>
                        <div className="flex gap-4">
                            <a 
                                href="https://www.linkedin.com/company/74367091" 
                                target="_blank" 
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://www.instagram.com/grupo_azimute" 
                                target="_blank" 
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://www.facebook.com/grupoazimute" 
                                target="_blank" 
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Citação inspiracional */}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                            <p className="text-gray-300 italic text-sm leading-relaxed mb-3 !text-sm !font-normal">
                                &ldquo;O êxito da vida não se mede pelo caminho que você conquistou, 
                                mas sim pelas dificuldades que superou no caminho.&rdquo;
                            </p>
                            <span className="text-gray-400 text-sm">- Abraham Lincoln</span>
                        </div>
                    </div>
                </div>

                {/* Rodapé inferior com logos e copyright */}
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-9 mb-4 mb-md-0">
                        <a href="https://www.grupoazimute.com.br" target="_blank" rel="noopener noreferrer">
                            <Image src={ grupoBranco } width={ 781 } height={ 45 } alt="Grupo Azimute" style={{ maxWidth: '100%', height: 'auto' }} />
                        </a>
                    </div>

                    <div className="col-12 col-md-3 text-md-right">
                        <div className="text-gray-400 text-sm mb-1">Copyright © <Ano /> - Grupo Azimute</div>
                        <div className="text-gray-500 text-xs">Todos os direitos reservados</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}