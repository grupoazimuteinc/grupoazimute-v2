import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email configuration not complete');
        return NextResponse.json({ error: 'Email configuration not complete' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, phone, linkedin, arquivo, message, grupo } = body

    console.log('Trabalhe conosco form data:', { name, email, phone, linkedin, arquivo, message, grupo });
    
    // Suporte a múltiplos e-mails separados por vírgula
    const emailList = process.env.RESEND_EMAIL_TRABALHE 
      ? process.env.RESEND_EMAIL_TRABALHE.split(',').map(email => email.trim())
      : [process.env.RESEND_EMAIL || 'rh@grupoazimute.com.br'];
    
    console.log('Sending to emails:', emailList);

    // Configurar o transporter do Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    try {
        // Criar o HTML do e-mail
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #313131; color: white; padding: 20px; text-align: center;">
                    <h1>Trabalhe Conosco</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Dados do Candidato:</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                    <p><strong>LinkedIn:</strong> ${linkedin}</p>
                    <p><strong>Link do Arquivo:</strong> <a href="${arquivo}" target="_blank">Ver arquivo</a></p>
                    <p><strong>Empresa do Grupo:</strong> ${grupo}</p>
                    
                    ${message ? `<h2>Mensagem Adicional:</h2><p>${message}</p>` : ''}
                </div>
                <div style="background-color: #313131; color: white; padding: 10px; text-align: center; font-size: 12px;">
                    <p>Este e-mail foi enviado automaticamente pelo formulário de trabalhe conosco do site Grupo Azimute.</p>
                </div>
            </div>
        `;

        const data = await transporter.sendMail({
            from: `"Grupo Azimute" <${process.env.EMAIL_USER}>`,
            to: emailList,
            subject: "Trabalhe Conosco",
            html: htmlContent,
        });
  
        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, messageId: data.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
    }
  }