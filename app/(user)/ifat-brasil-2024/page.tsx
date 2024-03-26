import Image from 'next/image'
import nodemailer from 'nodemailer'

import { eventFomInputs } from '@/utils/event-form-inputs'

import { FormButton } from '@/components/form-button'

export default function Home() {
    async function handleSendForm(form: FormData) {
        'use server'

        const name = form.get('name')
        const email = form.get('email')
        const organization = form.get('organization')
        const phone = form.get('phone')

        if(!name || !email || !organization) return

        const transporter = nodemailer.createTransport({
            // @ts-ignore
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            }
        })
      
        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL_USER, 
                to: 'mfs.murillo@gmail.com',
                subject: 'Cadastro IFAT Brasil 2024',
                html: `
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
                        <tr>
                            <td align="center" bgcolor="#313131" style="padding: 40px 0 30px 0;">
                                <img src="https://www.grupoazimute.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d0abdee.png&w=384&q=75" alt="Grupo Azimute" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                            <b>Confirmação de Cadastro</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            Olá, <br>
                                            Aqui estão os detalhes do cadastro:
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <strong>Nome:</strong> ${ name }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <strong>Email:</strong> ${ email }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <strong>Empresa:</strong> ${ organization }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            <strong>Telefone:</strong> ${ phone }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                            Se você não realizou este cadastro, por favor, ignore este e-mail ou entre em contato conosco.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#313131" style="padding: 30px 30px 30px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" align="center">
                                            &copy; 2024 Grupo Azimute. Todos os direitos reservados.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `
            })

            await new Promise(resolve => setTimeout(resolve, 3000))
            
            console.log('Message sent: %s', info.messageId)
        } catch (error) {
            console.error("Erro ao enviar email:", error)
        }
    }

    return (
        <main>
            <div className="event-header bg-[#0077AD] relative">
                <div className="container relative z-10">
                    <div className="row h-auto md:h-[350px] lg:h-[400px] xl:h-[500px] items-center">
                        <div className="col-12 col-md-6 self-end xl:self-center">
                            <h1 className="text-3xl mb-4 mt-24 md:mt-16 md:text-3xl lg:text-4xl xl:text-5xl">Grupo Azimute: Soluções integradas de saneamento em um único grupo de empresas</h1>
                        </div>

                        <div className="col-7 col-md-4 offset-md-1 col-lg-4 offset-lg-1 self-end">
                            <div className="max-sm:px-4 max-sm:py-4 gap-2 md:py-4 md:px-6 xl:py-12 xl:px-16 bg-white rounded-2xl rounded-b-none flex flex-col justify-center md:gap-6">
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
                            <h2 className="hidden lg:block text-2xl mb-6 text-[#343434] xl:text-4xl xl:mb-12">Cadastre-se para saber como as soluções integradas do Grupo Azimute podem atuar de forma sinérgica no setor de saneamento</h2>
                            
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

                            <form action={ handleSendForm } method="POST" encType="multipart/form-data" className="event-form mb-6 max-sm:p-3 md:p-10 bg-[#F2F2F2] border border-[#DDDEE2] rounded-2xl flex flex-col md:gap-6 lg:p-10">
                                { eventFomInputs.map((input: EventFormInput) => {
                                    return(
                                        <div key={ input.name }>
                                            <label htmlFor="name" className="block mb-2 font-semibold">{ input.label }</label>
                                            <input type={ input.type } name={ input.name } className="border border-[#C8C8C8] h-[50px] xl:h-[60px] px-4 rounded-md bg-white w-full" />
                                        </div>
                                    )
                                })}

                                <div className="self-end">
                                    <FormButton />
                                </div>
                            </form>

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
        </main>
    )
}