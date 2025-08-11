'use server'

import nodemailer from 'nodemailer'

export async function sendTrabalheConoscoForm(form: FormData) {
    const name = form.get('name')
    const email = form.get('email')
    const linkedin = form.get('linkedin')
    const arquivo = form.get('arquivo')
    const phone = form.get('phone')
    const message = form.get('message')

    if(!name || !email || !linkedin || !arquivo || !phone) return

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
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: 'recrutamento@azimute.eng.br, lab334mkt@gmail.com',
            subject: 'Trabalhe Conosco',
            html: `
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
                    <tr>
                        <td align="center" bgcolor="#313131" style="padding: 40px 0 30px 0;">
                            <img src="https://www.grupoazimute.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6d0abdee.png&w=384&q=75" alt="Grupo Azimute" style="max-width: 250px; width: 100%; height: auto; display: block;" />
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                        <b>Informações</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        Formulário de "Trabalhe Conosco" recebido.<br/>
                                        Aqui estão os detalhes:
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
                                        <strong>Telefone:</strong> ${ phone }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Linkedin:</strong> ${ linkedin }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Link do currículo:</strong> ${ phone }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Mensagem adicional:</strong> ${ message }
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
                                        &copy; ${ new Date().getFullYear() } Grupo Azimute. Todos os direitos reservados.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `
        })
        
        return { status: 200, message: 'Informações enviada com sucesso' }   
    } catch (error) {
        return { status: 503, message: 'Aconteceu algum erro' }   
    }
}