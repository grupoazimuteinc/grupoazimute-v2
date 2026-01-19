import Image from "next/image";
import { getPageMetadata } from '@/lib/metadata'
import { LatestPostsCompany } from '@/components/latest-posts-company'
import { StoriesVideoPlayer } from '@/components/stories-video-player'

import azimuteTechInterna from '@/src/images/azimute-tech-interna.png'

export const metadata = getPageMetadata('azimuteTech')

export default async function AzimuteTech() {

    return (
        <div className="azimute-tech-page">
            <StoriesVideoPlayer videos={['/videos/stories-site-grupo-azimute-tech.webm']} />
            <div className="content-interna">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={azimuteTechInterna} width={ 424 } height={ 110 } alt="" style={{ height: "auto" }} />

                    <div className="infos-holder">
                        <a href="tel:554734736777" target="_blank">
                            <svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
                                <defs>
                                    <rect id="path-1" x="0" y="0" width="2433" height="886"></rect>
                                </defs>
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Home-Copy" transform="translate(-875.000000, -543.000000)">
                                        <g id="Group" transform="translate(876.000000, 542.000000)" fill="#FFFFFF" fillRule="nonzero" stroke="#FFFFFF" strokeWidth="0.54">
                                            <g id="phone-call" transform="translate(0.700000, 1.800000)">
                                                <path d="M4.65596685,0.27 C5.35361064,0.27 6.02005553,0.565510204 6.56931427,1.12696263 C6.9080999,1.44982559 7.236532,1.79414404 7.55215523,2.13091024 L7.78700143,2.38253371 L7.78700143,2.38253371 L8.02566572,2.63021478 L9.43310459,4.08327929 C10.0296437,4.69915668 10.3211492,5.40754819 10.3211492,6.11274194 C10.3211492,6.81793568 10.0296437,7.52632719 9.43434303,8.1409175 C8.64702097,8.96459674 8.27439865,9.35462123 7.93481908,9.68341544 C8.23461568,10.3264803 8.63874926,10.9697947 9.21405115,11.7205881 C10.415112,13.2441494 11.6624989,14.4512615 13.0181687,15.3999717 L13.390628,15.6523479 L15.6044056,14.4928697 C16.1786615,13.9075909 16.849573,13.6083871 17.5446012,13.6083871 C18.1899129,13.6083871 18.8052534,13.8666785 19.3275804,14.3606506 L19.481425,14.5158901 L22.3104914,17.4473171 C22.8850442,18.0346224 23.1814286,18.7347844 23.1814286,19.4617742 C23.1814286,20.180575 22.8919494,20.8843711 22.3311074,21.4867873 C22.1065222,21.7294375 21.8767436,21.9613323 21.6535115,22.1810721 C21.2915858,22.5424168 21.0139838,22.818598 20.7714298,23.1219878 C19.9039115,24.0985602 18.8363398,24.57 17.565223,24.57 C15.4120873,24.4390973 13.7956182,23.740353 12.5830644,23.1470701 C9.44537462,21.5811779 6.69829222,19.3591215 4.41478327,16.5440722 C2.53237249,14.2076448 1.27168847,12.0267563 0.427003157,9.67432618 C0.0770080658,8.6998003 -0.375155635,7.21031732 -0.247801774,5.61067598 C-0.167141304,4.66862437 0.177339839,3.84609507 0.775707048,3.15648341 L0.945185337,2.97171304 L2.70265782,1.14137383 C3.28522367,0.563508976 3.96093815,0.27 4.65596685,0.27 Z M4.66627776,2.24709677 C4.46318518,2.24709677 4.26260013,2.36275291 4.07055932,2.54888045 L4.07055932,2.54888045 L2.31857842,4.35784974 L2.18314618,4.50934901 C1.88624753,4.87042069 1.72263933,5.28540086 1.68226594,5.77308256 C1.60760097,6.71354408 1.78137907,7.71074277 2.24449362,8.99089076 C3.01382829,11.1370068 4.17633113,13.1343761 5.91298515,15.2953828 C8.0165507,17.8878154 10.5486786,19.9345019 13.4326812,21.3759039 C14.4711929,21.888681 15.8562554,22.4928922 17.5783887,22.5982153 C18.2953467,22.5963899 18.8435388,22.3542189 19.3087199,21.8406724 C19.5622031,21.5321556 19.8343092,21.2449683 20.1503145,20.9275235 L20.1503145,20.9275235 L20.5091066,20.5689693 C20.6614976,20.4148241 20.8229123,20.2477303 21.0292371,20.0158292 C21.1827458,19.8255618 21.2684807,19.6283412 21.2552053,19.4287616 C21.2416342,19.2247355 21.1274243,19.0280114 20.9346205,18.83089 L20.9346205,18.83089 L18.0827363,15.8865594 L18.0255316,15.8252666 C17.9036589,15.7018561 17.737422,15.5801613 17.5342903,15.5801613 C17.2855395,15.5801613 17.0813731,15.7613209 16.9497562,15.8972046 L16.9497562,15.8972046 L15.186591,17.7175272 L15.1469741,17.7575399 C15.0077799,17.8943456 14.6864569,18.1669355 14.2090226,18.1669355 C14.001629,18.1669355 13.7989385,18.1206453 13.491092,17.9539425 C13.3480395,17.8622728 13.1800975,17.7760985 13.0025287,17.6844359 C12.7884127,17.5739074 12.5638192,17.4574747 12.3443635,17.3137962 C10.6667022,16.2184522 9.14476942,14.7891284 7.70196556,12.9541435 C6.89320961,11.8954621 6.36734863,11.0132888 5.97018829,10.0080064 C5.90428169,9.7925365 5.84807812,9.51768738 5.92131785,9.20992522 C5.97355955,8.99039928 6.09081909,8.75152506 6.33883404,8.49604752 C6.78439912,8.0836255 7.19395565,7.66046712 8.06459522,6.75102874 C8.27671309,6.53202791 8.39948759,6.32609925 8.39948759,6.11274194 C8.39948759,5.89938462 8.27671309,5.69345596 8.06568966,5.47559168 L8.06568966,5.47559168 L6.16797462,3.50571088 L5.85819181,3.1778209 C5.65324149,2.96305875 5.44903705,2.75453272 5.23119524,2.54368551 C5.10256738,2.41108981 4.91146815,2.24709677 4.66627776,2.24709677 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                            <span>(47) 3473-6777</span>
                        </a>

                        <a href="https://api.whatsapp.com/send?phone=5547997630634">
                            <svg width="27px" height="27px" viewBox="0 0 27 27" version="1.1">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Home-Copy" transform="translate(-1075.000000, -543.000000)">
                                        <g id="Group" transform="translate(876.000000, 542.000000)" fill="#FFFFFF">
                                            <g id="whatsapp-(1)" transform="translate(200.000000, 2.000000)" fillRule="nonzero" stroke="#FFFFFF" strokeWidth="0.3">
                                                <path d="M18.3432894,14.8087014 L18.333655,14.8823255 C15.9796619,13.8064318 15.7334508,13.6631102 15.4294335,14.0812952 C15.2185482,14.3708833 14.6040907,15.0276104 14.4188971,15.2219781 C14.2315625,15.4134008 14.0452984,15.4281256 13.7273648,15.2956022 C13.4062198,15.148354 12.3753442,14.8391327 11.1549931,13.8378448 C10.2044038,13.0574292 9.56639572,12.1003157 9.37799064,11.8058193 C9.064339,11.3091019 9.72054534,11.2384228 10.3178751,10.2017953 C10.4249234,9.99564775 10.3703288,9.8336747 10.291113,9.68740813 C10.2108267,9.54015991 9.57174814,8.0971273 9.30412728,7.52187757 C9.04721126,6.94859115 8.78280185,7.02123361 8.58476242,7.02123361 C7.96816397,6.97215086 7.51749044,6.9800041 7.12034109,7.35892287 C5.39258084,9.10037854 5.82826759,10.8968069 7.30660521,12.8071072 C10.2118972,16.2939452 11.7598163,16.9359474 14.5901745,17.82729 C15.3544996,18.0501257 16.0513843,18.0187127 16.6026833,17.9460702 C17.2171408,17.8567397 18.4942275,17.2382971 18.7607779,16.5462304 C19.0337512,15.8541638 19.0337512,15.2798957 18.9534649,15.1473723 C18.8742491,15.0148489 18.6644344,14.9412248 18.3432894,14.8087014 L18.3432894,14.8087014 Z" id="Path"></path>
                                                <path d="M21.375,3.59309387 C13.365625,-4.14947502 0.110416667,1.46604884 0.105208333,12.3887688 C0.105208333,14.5720628 0.677083333,16.7011911 1.76666667,18.5813656 L0,25 L6.59895833,23.2791977 C14.8333333,27.7270342 24.9958333,21.8208906 25,12.3950187 C25,9.08674493 23.7083333,5.97325934 21.359375,3.63371814 L21.375,3.59309387 Z M22.91875,12.3606443 C22.9125,20.3115428 14.184375,25.2770783 7.28125,21.2188181 L6.90625,20.9959054 L3,22.0115122 L4.046875,18.2147055 L3.79791667,17.8240876 C-0.497916667,10.9856691 4.4375,2.04833002 12.575,2.04833002 C15.3395833,2.04833002 17.934375,3.12643561 19.8885417,5.07952543 C21.8416667,7.01594889 22.91875,9.61069383 22.91875,12.3606443 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                            {/* <!-- <span>(47) 99994-5165</span> --> */}

                            <span>(47) 99763-0634</span>
                        </a>

                        <a href="mailto:comercial@azimutetech.com.br">
                            <svg width="28px" height="22px" viewBox="0 0 28 22" version="1.1">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Home-Copy" transform="translate(-1279.000000, -546.000000)">
                                        <g id="Group" transform="translate(876.000000, 542.000000)" fill="#FFFFFF" fillRule="nonzero">
                                            <g id="email" transform="translate(403.300000, 4.500000)">
                                                <path d="M22.8014707,0.0928455882 L3.29852935,0.0928455882 C1.47975652,0.0928455882 0,1.68065735 0,3.63224118 L0,17.0676066 C0,19.0191904 1.47975652,20.6070022 3.29852935,20.6070022 L22.8014707,20.6070022 C24.6202435,20.6070022 26.1,19.0191904 26.1,17.0676066 L26.1,3.63224118 C26.1,1.68065735 24.6202435,0.0928455882 22.8014707,0.0928455882 Z M22.2861375,2.37593382 L13.05,10.0317375 L3.8138625,2.37593382 L22.2861375,2.37593382 Z M22.8014707,18.3240662 L3.29852935,18.3240662 C2.65297989,18.3240662 2.12771739,17.7604478 2.12771739,17.0677588 L2.12771739,3.86328971 L12.3996277,12.3776868 C12.5911223,12.5364375 12.8206321,12.6157368 13.05,12.6157368 C13.2793679,12.6157368 13.5088777,12.5364375 13.7003723,12.3776868 L23.9722826,3.86328971 L23.9722826,17.0676066 C23.9722826,17.7604478 23.4470201,18.3240662 22.8014707,18.3240662 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>

                            <span>comercial@azimutetech.com.br</span>
                        </a>
                    </div>

                    <div className="social-media">
                        
                        <div className="email">
                            <i className="fas fa-laptop"></i>

                            {/* <a href="https://www.azimutetech.com.br/" target="_blank"><strong>azimutetech.com.br</strong></a> */}

                            <strong>azimutetech.com.br</strong>

                            <span></span>
                        </div>
                        

                        

                        <div className="redes-sociais">
                            <a href="https://www.facebook.com/azimutetech" target="_blank">
                                <svg viewBox="0,0,256,256" width="24px" height="24px"><g fill="#c3393f" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(10.66667,10.66667)"><path d="M17.525,9h-3.525v-2c0,-1.032 0.084,-1.682 1.563,-1.682h1.868v-3.18c-0.909,-0.094 -1.823,-0.14 -2.738,-0.138c-2.713,0 -4.693,1.657 -4.693,4.699v2.301h-3v4l3,-0.001v9.001h4v-9.003l3.066,-0.001z"></path></g></g></svg>
                            </a>

                            <a href="https://www.instagram.com/azimutetech/" target="_blank">
                                <svg viewBox="0,0,256,256" width="24px" height="24px"><g fill="#c3393f" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(10.66667,10.66667)"><path d="M8,3c-2.757,0 -5,2.243 -5,5v8c0,2.757 2.243,5 5,5h8c2.757,0 5,-2.243 5,-5v-8c0,-2.757 -2.243,-5 -5,-5zM8,5h8c1.654,0 3,1.346 3,3v8c0,1.654 -1.346,3 -3,3h-8c-1.654,0 -3,-1.346 -3,-3v-8c0,-1.654 1.346,-3 3,-3zM17,6c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1c0,-0.55228 -0.44772,-1 -1,-1zM12,7c-2.757,0 -5,2.243 -5,5c0,2.757 2.243,5 5,5c2.757,0 5,-2.243 5,-5c0,-2.757 -2.243,-5 -5,-5zM12,9c1.654,0 3,1.346 3,3c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3z"></path></g></g></svg>
                            </a>

                            <a href="https://www.linkedin.com/company/azimute-tech/"target="_blank">
                                <svg viewBox="0,0,256,256" width="30px" height="30px"><g fill="#c3393f" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(8.53333,8.53333)"><path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path></g></g></svg>
                            </a>

                            <a href="https://www.youtube.com/channel/UC5241e0NoVe-JkKTwbpMcRQ" target="_blank">
                                <svg viewBox="0,0,256,256" width="24px" height="24px"><g fill="#c3393f" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(10.66667,10.66667)"><path d="M21.582,6.186c-0.23,-0.86 -0.908,-1.538 -1.768,-1.768c-1.56,-0.418 -7.814,-0.418 -7.814,-0.418c0,0 -6.254,0 -7.814,0.418c-0.86,0.23 -1.538,0.908 -1.768,1.768c-0.418,1.56 -0.418,5.814 -0.418,5.814c0,0 0,4.254 0.418,5.814c0.23,0.86 0.908,1.538 1.768,1.768c1.56,0.418 7.814,0.418 7.814,0.418c0,0 6.254,0 7.814,-0.418c0.861,-0.23 1.538,-0.908 1.768,-1.768c0.418,-1.56 0.418,-5.814 0.418,-5.814c0,0 0,-4.254 -0.418,-5.814zM10,14.598v-5.196c0,-0.385 0.417,-0.625 0.75,-0.433l4.5,2.598c0.333,0.192 0.333,0.674 0,0.866l-4.5,2.598c-0.333,0.193 -0.75,-0.048 -0.75,-0.433z"></path></g></g></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-[60px] smartphone:py-[30px] smartphone:px-4">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="mb-[5px] smartphone:mb-[30px]">Inspeções robotizadas e mapeamento <br/>de redes subterrâneas</h2>

                        <div className="clear40 smartphone:hidden"></div>
                        <div className="clear40 smartphone:hidden"></div>
                    </div>

                    {/* Única linha - 2 serviços */}
                    <div className="row justify-content-center">
                        <div className="col-6 col-md">
                            <div className="box-icon">
                                <a href="https://azimutetech.com.br/video-inspecao/" target="_blank" rel="noopener noreferrer">
                                    <div className="icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#E1363D" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                                        </svg>
                                    </div>
                                </a>

                                <span>Serviços e tecnologia <br/> Vídeo Inspeção</span>

                                <p>Diagnóstico e mapeamento que reduz riscos, previne falhas e assegura a integridade das suas redes industriais e de saneamento.</p>
                            </div>
                        </div>

                        <div className="col-6 col-md">
                            <div className="box-icon">
                                <a href="https://azimutetech.com.br/servicos-e-tecnologia-georadar/" target="_blank" rel="noopener noreferrer">
                                    <div className="icon-holder">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#E1363D" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                                        </svg>
                                    </div>
                                </a>

                                <span>Serviços e tecnologia <br/> Georadar</span>

                                <p>Identificação e mapeamento de todas as redes e interferências subterrâneas de forma não destrutiva.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clear40 smartphone:hidden"></div>

            <div className="img-azimute-tech">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h2>A Azimute Tech nasceu da necessidade do mercado em realizar inspeções em tubulações a partir de métodos não destrutivos, onde aplicamos a tecnologia robótica de inspeção visual.</h2>

                            <p className="smartphone:mb-0">Nós atuamos na prestação de serviços de inspeção visual robotizada em tubulações, aplicada a conceitos de engenharia, gerando um diagnóstico completo das condições das redes de drenagem pluvial, esgotamento sanitário e efluentes industriais</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-[60px] smartphone:py-[30px] smartphone:px-4">
                <div className="row">

                    <div className="col-12">
                        <h2>Porque nos escolher?</h2>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>Mínimo Impacto Social</strong>

                        <p>Evitando a necessidade de abertura de ruas e calçadas em<br/> grandes extensões, a população sofre menos com<br/> interrupções de vias, gerando menos desconforto.</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>As Built De Projeto</strong>

                        <p>Com a inspeção é possível verificar se a obra foi executada<br/> conforme o projeto.</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>Economia de tempo e recursos</strong>

                        <p>Com a inspeção robotizada localizamos falhas nas tubulações<br/> em menor tempo e com manutenção pontual no local da falha.</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>Robô Blindado</strong>

                        <p>Nosso equipamento pode trabalhar em vários tipos de<br/> ambientes com contaminação.</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>Economia de tempo e recursos</strong>

                        <p>Com a inspeção robotizada localizamos falhas nas tubulações<br/> em menor tempo e com manutenção pontual no local da falha.</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <strong>Equipamentos</strong>

                        <p>Possuímos uma gama de equipamentos para diversos tipos<br/> de inspeções em tubulações.</p>
                    </div>


                </div>
            </div>

            {/* Últimas Publicações da Azimute Tech */}
            <LatestPostsCompany 
                companyCategory="tech"
                companyName="Azimute Tech"
                companyColor="bg-red-600"
            />
                </div>
    )
}