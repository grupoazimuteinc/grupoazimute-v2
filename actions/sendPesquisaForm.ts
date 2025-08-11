'use server'

import nodemailer from 'nodemailer'

export async function sendPesquisaForm(form: FormData) {
    const name = form.get('name')
    const email = form.get('email')
    const cargo = form.get('cargo')
    const comoChegou = form.get('comoChegou')
    const empresaAzimute = form.get('empresaAzimute')
    const atendimento = form.get('atendimento')
    const qualidade = form.get('qualidade')
    const expectativa = form.get('expectativa')
    const indicacao = form.get('indicacao')
    const message = form.get('message')

    if(!name || !email || !empresaAzimute || !cargo || !comoChegou || !atendimento || !qualidade || !expectativa || !indicacao ) return

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
            to: 'comercial@grupoazimute.com.br, lab334mkt@gmail.com',
            subject: 'Pesquisa de Satisfação',
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
                                        Formulário de "Pesquisa de Satisfação" recebido. <br/>
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
                                        <strong>Cargo:</strong> ${ cargo }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Como você chegou até nós:</strong> ${ comoChegou }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Qual empresa você quer avaliar:</strong> ${ empresaAzimute }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Como foi nosso atendimento:</strong> ${ atendimento }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Avalie a qualidade dos serviços entregues:</strong> ${ qualidade }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Atendemos suas expectativas:</strong> ${ expectativa }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Você nos indicaria para outra empresa?</strong> ${ indicacao }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Mensagem:</strong> ${ message }
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
        
        return { status: 200, message: 'Pesquisa enviada com sucesso' }   
    } catch (error) {
        return { status: 503, message: 'Aconteceu algum erro' }   
    }
}