'use client'

import Image from 'next/image'
import Ano from "./ano";

import logos from '@/src/images/logos.png'

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <h6 className="text-[#797979]">Telefone</h6>
                        <a href="tel:4734736777" className="footer-sublink">+55 47 3473-6777</a>

                        <div className="divider"></div>

                        <h6 className="text-[#797979]">E-mail</h6>
                        <a href="mailto:comercial@grupoazimute.com.br" className="footer-sublink">comercial@grupoazimute.com.br</a>

                        <div className="divider"></div>

                        <h6 className="text-[#797979]">Políticas</h6>
                        <a href="https://grupoazimute.com.br/politicas-de-gestao-integrada" className="footer-sublink">Políticas de Gestão Integrada</a>
                    </div>

                    <div className="col-12 col-md-3">
                        <h6 className="text-[#797979]">Endereço</h6>
                        <p>
                            Rua Clodoaldo Gomes, 415 <br />
                            Distrito Industrial <br />
                            Joinville - Santa Catarina <br />
                            CEP: 89.219-550
                        </p>
                    </div>
                    
                    <div className="col-12 col-md-5 shape-holder">
                        <svg width="331px" height="318px" viewBox="0 0 331 318" version="1.1">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Home" transform="translate(-1217.000000, -4256.000000)">
                                    <g id="Footer" transform="translate(0.000000, 4256.000000)">
                                        <polygon id="Rectangle" fill="#F2F2F2" opacity="0.049999997" points="1331.80453 0 1548 0 1433.19547 318 1217 318"></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg>

                        <p>
                            O êxito da vida não se mede pelo 
                            caminho que você conquistou, 
                            mas sim pelas dificuldades 
                            que superou no caminho.
                        </p>

                        <span className="author">- Abraham Lincoln</span>
                    </div>
                </div>

                <div className="row d-flex align-items-center" style={{ marginTop: 100 }}>
                    <div className="col-12 col-md-9">
                        <Image src={ logos } width={ 781 } height={ 45 } alt="Grupo Azimute" style={{ maxWidth: '100%' }} />
                    </div>

                    <div className="col-12 col-md-3 text-right">
                        <small>Copyright © <Ano /> - Grupo Azimute</small>
                    </div>
                </div>
            </div>
        </footer>
    )
}