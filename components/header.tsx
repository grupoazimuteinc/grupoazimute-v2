import Image from 'next/image'
import Link from 'next/link'

import logo from '@/src/images/logo.png'
import selo from '@/src/images/selo.png'
import MenuMobile  from './mobile-menu'

const variant = {
    open:{
        width: "100%",
        height: "100%",
        padding: "40px 25px 10px",
        top: "0px",
        right: "0px",
        zIndex: 10,
        transition: {duration: 0.5, ease: [0.76, 0, 0.24, 1]}
    },
    closed:{
        width: 0,
        height: 0,
        top: "0px",
        right: "0",
        padding: "0",
        transition: {duration: 0.5, delay: 0.35, ease: [0.76, 0, 0.24, 1]}
    }
}

export function Header() {
    return (
        <>
            <header className="header">
                <div className="container-fluid">
                    <div className="row d-flex align-items-center">
                        <div className="col-12 d-md-none smartphone:px-0">
                            <div className="extra-links top">
                                <a href="tel:554734736777" className="header-sublink"><span>Fone:</span> +55 47 3473-6777</a>
                                <a href="https://api.whatsapp.com/send?phone=5547999110824" className="header-sublink"><span>Whatsapp:</span> +55 47 99911-0824</a>
                            </div>
                        </div>

                        <div className="col-9 col-md-3 smartphone:px-0">
                            <Link href="/"><Image src={ logo } width={ 280 } height={ 39 } alt="Grupo Azimute" className="logo" /></Link>
                        </div>

                        <div className="col-3 text-right d-md-none smartphone:px-0">
                            <MenuMobile />
                        </div>

                        <div className="col-12 col-md-9 text-right d-none d-md-block header-home smartphone:px-0">
                            <div className="extra-links">
                                <a href="tel:554734736777" className="header-sublink"><span>Fone:</span> +55 47 3473-6777</a>
                                <a href="#" className="header-sublink">•</a>
                                <a href="https://api.whatsapp.com/send?phone=5547999110824" className="header-sublink"><span>Whatsapp:</span> +55 47 99911-0824</a>
                            </div>

                            <div className="links">
                                <span>
                                    <span className="header-sublink anchor" data-anchor="o-grupo">O Grupo</span>

                                    <ul className="list-dropdown">
                                        <li><Link href="/azimute-engenharia">Azimute Engenharia</Link></li>
                                        <li><Link href="/azimute-imoveis">Azimute Imóveis</Link></li>
                                        <li><Link href="/azimute-tech">Azimute Tech</Link></li>
                                        <li><Link href="/azimute-san">Azimute San</Link></li>
                                        <li><Link href="/aria">Aria - Imagem e Tecnologia</Link></li>
                                    </ul>
                                </span>
                                <Link href="/contato" className="header-sublink">Contato</Link>
                                <Link href="/solicite-orcamento" className="header-sublink">Solicite um Orçamento</Link>
                                <Link href="/pesquisa-de-satisfacao" className="header-sublink">Pesquisa de Satisfação</Link>
                                <Link href="/trabalhe-conosco" className="header-sublink">Trabalhe Conosco</Link>
                            </div>
                        </div>

                        <Image src={ selo } width={ 90 } height={ 90 } className="selo-header" alt="" />
                    </div>
                </div>
            </header>
        </>
    )
}