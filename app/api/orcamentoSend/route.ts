import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email configuration not complete');
        return NextResponse.json({ error: 'Email configuration not complete' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, phone, message, grupo } = body

    console.log('Orçamento form data:', { name, email, phone, message, grupo });
    
    // Suporte a múltiplos e-mails separados por vírgula
    const emailList = process.env.RESEND_EMAIL_ORCAMENTO 
      ? process.env.RESEND_EMAIL_ORCAMENTO.split(',').map(email => email.trim())
      : [process.env.RESEND_EMAIL || 'comercial@grupoazimute.com.br'];
    
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
                    <h1>Solicitação de Orçamento</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Dados do Cliente:</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                    <p><strong>Empresa do Grupo:</strong> ${grupo || 'Não especificado'}</p>
                    
                    <h2>Observações:</h2>
                    <p>${message || 'Nenhuma observação adicional'}</p>
                </div>
                <div style="background-color: #313131; color: white; padding: 10px; text-align: center; font-size: 12px;">
                    <p>Este e-mail foi enviado automaticamente pelo formulário de orçamento do site Grupo Azimute.</p>
                </div>
            </div>
        `;

        const data = await transporter.sendMail({
            from: `"Grupo Azimute" <${process.env.EMAIL_USER}>`,
            to: emailList,
            subject: "Solicitação de Orçamento",
            html: htmlContent,
        });
  
        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, messageId: data.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
    }
  }