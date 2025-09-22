'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'

import { Form } from '@grupoazimute/web.form'

import { sendContactForm } from '@/actions/sendContactForm'
import { contactFormInputs } from '@/utils/contact-form-inputs'
import { getPageMetadata } from '@/lib/metadata'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const metadata = getPageMetadata('contato')

export default function Contato() {
    const [pending, setPending] = useState(false)

    function handleChange(form: FormData) {
        setPending(true)

        setTimeout(async () => {
            const response: any = await sendContactForm(form)

            if(response.status == 200) {
                toast.success(response.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
    
                const formInputs: any = document.querySelector('.event-form')
            
                for (let i = 0; i < formInputs.elements.length; i++) {
                    formInputs.elements[i].value = ''
                }
    
                setPending(false)
            } else {
                toast.error(response.message, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
    
                const formInputs: any = document.querySelector('.event-form')
            
                for (let i = 0; i < formInputs.elements.length; i++) {
                    formInputs.elements[i].value = ''
                }
    
                setPending(false)
            }
        }, 3000)
    }

    return (
        <div id="contato">
            <div className="content-form">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <h1>Contato</h1>
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

                            <span>+55 47 3473-6777</span>
                        </a>

                        <a href="mailto:comercial@grupoazimute.com.br">
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

                            <span>comercial@grupoazimute.com.br</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="py-10 lg:py-20 bg-white">
                <div className="container">
                    <div className="row flex-col-reverse lg:flex-row">
                        <div className="col-12 col-lg-6">
                            <h2 className="hidden lg:block font-semibold text-2xl mb-6 text-[#343434] xl:text-4xl xl:mb-12">Precisa falar conosco? Deixe sua mensagem que retornaremos o mais breve possível.</h2>
                        </div>
                        
                        <div className="col-12 col-lg-6">
                            <Form handleChange={ handleChange } fields={ contactFormInputs } pending={ pending } />
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}