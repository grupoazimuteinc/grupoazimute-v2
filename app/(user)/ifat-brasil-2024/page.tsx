'use client'

import Image from 'next/image'
import InputMask from 'react-input-mask'
import { ToastContainer, toast } from 'react-toastify'

import { handleSendForm } from '@/actions/handleSendForm'
import { eventFomInputs } from '@/utils/event-form-inputs'

import { FormButton } from '@/components/form-button'

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
    async function handleChange(form: FormData) {
        await handleSendForm(form)

        toast.success('Cadastro realizado com sucesso!', {
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
    }

    return (
        <main>
            <div className="event-header bg-[#0077AD] relative">
                <div className="container relative z-10">
                    <div className="row h-auto md:h-[350px] lg:h-[400px] xl:h-[500px] items-center">
                        <div className="col-12 col-md-6 self-end xl:self-center">
                            <h1 className="text-white font-semibold text-3xl mb-4 mt-24 md:mt-16 md:text-3xl lg:text-4xl xl:text-5xl">Grupo Azimute: Soluções integradas de saneamento em um único grupo de empresas</h1>
                        </div>

                        <div className="col-7 col-md-4 offset-md-1 col-lg-4 offset-lg-1 self-end">
                            <div className="small-screen:px-4 small-screen:py-4 gap-2 md:py-4 md:px-6 lg:py-4 lg:px-6 xl:py-12 xl:px-16 bg-white rounded-2xl rounded-b-none flex flex-col justify-center md:gap-6">
                                <div>
                                    <Image src="/images/ifat-logo.jpg" priority width={ 324 } height={ 124 } alt="" className="max-w-full" />
                                </div>

                                <div>
                                  <p className="text-xs mb-0 font-semibold text-center">
                                    Abril 24-26, 2024 - 13h às 20h <br />
                                    São Paulo Expo, Brasil
                                  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Image src="/images/ifat-background.jpg" priority width={ 1496 } height={ 408 } alt="" className="absolute top-0 left-0 object-cover w-full h-full" />
            </div>

            <div className="py-10 lg:py-20 bg-white">
                <div className="container">
                    <div className="row flex-col-reverse lg:flex-row">
                        <div className="col-12 col-lg-6">
                            <h2 className="hidden lg:block font-semibold text-2xl mb-6 text-[#343434] xl:text-4xl xl:mb-12">Cadastre-se para saber como as soluções integradas do Grupo Azimute podem atuar de forma sinérgica no setor de saneamento</h2>
                            
                            <p className="text-base block md:text-xl md:leading-8 text-[#605E5E] border-y-2 py-4 border-[#D9D9D9] lg:inline-block">
                                Conheça a iniciativa <strong className="text-base md:text-xl leading-8 text-[#605E5E]">AziSin Grupo Azimute</strong>: <br />
                                Sinergia corporativa para melhora da eficiência operacional
                            </p>

                            <p className="text-base"><strong>Soluções integradas de saneamento</strong> com atuação sinérgica entre empresas para a busca de novos negócios.</p>

                            <p className="text-base">A <strong>AziSin</strong> é uma iniciativa que amplia a capacidade de prestação de serviços e os campos de atuação das empresas do <strong>Grupo Azimute</strong> com base seus respectivos portfólios de serviços e de oportunidade de mercado.</p>

                            <a href="https://api.whatsapp.com/send?phone=5547999110824" target="_blank" className="bg-[#0072A5] text-white font-semibold inline-flex items-center gap-2 px-6 h-[50px] rounded-full"><svg className="mr-2" width="20" viewBox="0 0 24 24" fill="none"><path d="M12 0C5.373 0 0 5.373 0 12C0 14.2512 0.632342 16.3501 1.71094 18.1504L0.107422 24L6.08203 22.4316C7.82935 23.4251 9.84649 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM7.89258 6.40234C8.08758 6.40234 8.28794 6.40116 8.46094 6.41016C8.67494 6.41516 8.90786 6.43083 9.13086 6.92383C9.39586 7.50983 9.97287 8.97991 10.0469 9.12891C10.1209 9.27791 10.1733 9.45344 10.0703 9.64844C9.97231 9.84844 9.92134 9.96948 9.77734 10.1465C9.62834 10.3185 9.46508 10.5321 9.33008 10.6621C9.18108 10.8111 9.02722 10.9745 9.19922 11.2715C9.37122 11.5685 9.96856 12.5421 10.8516 13.3281C11.9866 14.3421 12.9442 14.6537 13.2422 14.8027C13.5402 14.9517 13.7128 14.9285 13.8848 14.7285C14.0618 14.5335 14.6281 13.8644 14.8281 13.5664C15.0231 13.2684 15.2222 13.32 15.4922 13.418C15.7662 13.516 17.2274 14.2358 17.5254 14.3848C17.8234 14.5338 18.0187 14.6075 18.0938 14.7285C18.1707 14.8535 18.1708 15.4486 17.9238 16.1426C17.6768 16.8356 16.4639 17.5057 15.9199 17.5527C15.3709 17.6037 14.8586 17.7995 12.3516 16.8125C9.32756 15.6215 7.42048 12.5242 7.27148 12.3242C7.12248 12.1292 6.06055 10.7139 6.06055 9.25391C6.06055 7.78891 6.82866 7.07144 7.09766 6.77344C7.37166 6.47544 7.69258 6.40234 7.89258 6.40234Z" fill="white"></path></svg> Quero saber mais</a>
                        </div>
                        
                        <div className="col-12 col-lg-6">
                            <h2 className="text-2xl mb-6 text-[#343434] xl:text-4xl xl:mb-12 lg:hidden">Cadastre-se para saber como as soluções integradas do Grupo Azimute podem atuar de forma sinérgica no setor de saneamento</h2>

                            {/* <form action={ handleChange } method="POST" encType="multipart/form-data" className="event-form mb-6 small-screen:p-3 md:p-10 bg-[#F2F2F2] border border-[#DDDEE2] rounded-2xl flex flex-col md:gap-6 lg:p-10">
                                { eventFomInputs.map((input: EventFormInput) => {
                                    return(
                                        <div key={ input.name }>
                                            <label htmlFor="name" className="block mb-2 font-semibold">{ input.label }</label>

                                            { input.type == 'textarea' ?
                                                <textarea name={ input.name } required={ input.required } className="border border-[#C8C8C8] h-[150px] xl:h-[160px] p-4 rounded-md bg-white w-full mb-3"></textarea>
                                            : 
                                                <>
                                                    { input?.mask ?
                                                        <InputMask mask={ input.mask } type={ input.type } name={ input.name } required={ input.required } className="border border-[#C8C8C8] h-[50px] xl:h-[60px] px-4 rounded-md bg-white w-full" />
                                                    :
                                                        <input type={ input.type } name={ input.name } required={ input.required } className="border border-[#C8C8C8] h-[50px] xl:h-[60px] px-4 rounded-md bg-white w-full" />
                                                    }
                                                </>
                                            }
                                        </div>
                                    )
                                })}

                                <div className="self-end">
                                    <FormButton />
                                </div>
                            </form> */}

                            <div className="text-right hidden lg:block">
                                <Image src="/images/selos-azimute.png" width={ 447 } height={ 133 } alt="" className="mt-10 max-w-full inline-block" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="text-left lg:text-right lg:hidden">
                                <Image src="/images/selos-azimute.png" width={ 447 } height={ 133 } alt="" className="mt-10 max-w-full inline-block" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </main>
    )
}
