'use server'

import nodemailer from 'nodemailer'

export async function sendContactForm(form: FormData) {
    const name = form.get('name')
    const email = form.get('email')
    const company = form.get('company')
    const phone = form.get('phone')
    const message = form.get('message')

    if(!name || !email) return

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email configuration not complete');
        return { status: 500, message: 'Configuração de e-mail incompleta' };
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_PORT === '465', // true para 465, false para outras portas
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Para evitar problemas de certificado em produção
        }
    })
  
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: 'comercial@grupoazimute.com.br, lab334mkt@gmail.com',
            subject: 'Contato',
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
                                        Formulário de "Entre em Contato" recebido. <br/>
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
                                        <strong>Empresa:</strong> ${ company }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Telefone:</strong> ${ phone }
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                        <strong>Observação:</strong> ${ message }
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
        
        return { status: 200, message: 'Mensagem enviada com sucesso' }   
    } catch (error) {
        console.error('Error sending email:', error);
        return { 
            status: 503, 
            message: `Erro ao enviar e-mail: ${error instanceof Error ? error.message : 'Erro desconhecido'}` 
        }   
    }
}