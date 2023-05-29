import Image from 'next/image'
import Link from 'next/link'

import logo from '@/src/images/logo.png'

export function Header() {
    return (
        <>
            <header className="header">
                <div className="container-fluid">
                    <div className="row d-flex align-items-center">
                        <div className="col-12 d-md-none">
                            <div className="extra-links top">
                                <a href="tel:554734736777" className="header-sublink"><span>Fone:</span> 55 47 3473.6777</a>
                                <a href="https://api.whatsapp.com/send?phone=554799994-5165" className="header-sublink"><span>Whatsapp:</span> 55 47 99994-5165</a>
                            </div>
                        </div>

                        <div className="col-9 col-md-3">
                            <Link href="/"><Image src={ logo } width={ 280 } height={ 39 } alt="Grupo Azimute" className="logo" /></Link>
                        </div>

                        <div className="col-3 text-right d-md-none">
                            <a href="#menu" className="menu-mobile">
                                <svg width="26px" height="16px" viewBox="0 0 26 16" version="1.1" xmlns="https://www.w3.org/2000/svg">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="home" transform="translate(-408.000000, -56.000000)" fill="#111111">
                                            <rect id="Rectangle1" x="408" y="56" width="26" height="2"></rect>
                                            <rect id="Rectangle2" x="408" y="63" width="26" height="2"></rect>
                                            <rect id="Rectangle3" x="408" y="70" width="26" height="2"></rect>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                        </div>

                        <div className="col-12 col-md-9 text-right d-none d-md-block header-home">
                            <div className="extra-links">
                                <a href="tel:554734736777" className="header-sublink"><span>Fone:</span> 55 47 3473.6777</a>
                                <a href="#" className="header-sublink">•</a>
                                <a href="https://api.whatsapp.com/send?phone=554799994-5165" className="header-sublink"><span>Whatsapp:</span> 55 47 99994.5165</a>
                            </div>

                            <div className="links">
                                <span>
                                    <a href="https://grupoazimute.com.br/solucoes" className="header-sublink anchor" data-anchor="o-grupo">O Grupo</a>

                                    <ul className="list-dropdown">
                                        <li>
                                            <a href="https://grupoazimute.com.br/azimute-engenharia">
                                                Azimute Engenharia
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://grupoazimute.com.br/azimute-imoveis">
                                                Azimute Imóveis
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://grupoazimute.com.br/azimute-tech">
                                                Azimute Tech
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://grupoazimute.com.br/azimute-san">
                                                Azimute San
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://grupoazimute.com.br/aria">
                                                Aria Imagem e Tecnologia
                                            </a>
                                        </li>
                                    </ul>
                                </span>
                                <a href="#" className="header-sublink anchor" data-anchor="feed">Notícias</a>
                                <a href="https://grupoazimute.com.br/contato" className="header-sublink">Contato</a>
                                <a href="https://grupoazimute.com.br/solicite-orcamento" className="header-sublink">Solicite um Orçamento</a>
                                <a href="https://grupoazimute.com.br/pesquisa-de-satisfacao" className="header-sublink">Pesquisa de Satisfação</a>
                                <a href="https://grupoazimute.com.br/trabalhe-conosco" className="header-sublink">Trabalhe Conosco</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}