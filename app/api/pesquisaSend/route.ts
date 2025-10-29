import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request: any) {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email configuration not complete');
        return NextResponse.json({ error: 'Email configuration not complete' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message } = body

    console.log('Pesquisa form data:', { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message });
    
    // Suporte a múltiplos e-mails separados por vírgula
    const emailList = process.env.RESEND_EMAIL_PESQUISA 
      ? process.env.RESEND_EMAIL_PESQUISA.split(',').map(email => email.trim())
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
                    <h1>Pesquisa de Satisfação</h1>
                </div>
                <div style="padding: 20px; background-color: #f9f9f9;">
                    <h2>Dados do Cliente:</h2>
                    <p><strong>Nome da Empresa:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Cargo:</strong> ${cargo}</p>
                    <p><strong>Empresa Avaliada:</strong> ${empresaAzimute}</p>
                    
                    <h2>Respostas da Pesquisa:</h2>
                    <p><strong>Como chegou até nós:</strong> ${comoChegou}</p>
                    <p><strong>Avaliação do Atendimento:</strong> ${atendimento}/5</p>
                    <p><strong>Avaliação da Qualidade:</strong> ${qualidade}/5</p>
                    <p><strong>Atendeu Expectativas:</strong> ${expectativa}</p>
                    <p><strong>Indicaria para outras empresas:</strong> ${indicacao}</p>
                    
                    ${message ? `<h2>Comentários Adicionais:</h2><p>${message}</p>` : ''}
                </div>
                <div style="background-color: #313131; color: white; padding: 10px; text-align: center; font-size: 12px;">
                    <p>Este e-mail foi enviado automaticamente pelo formulário de pesquisa de satisfação do site Grupo Azimute.</p>
                </div>
            </div>
        `;

        const data = await transporter.sendMail({
            from: `"Grupo Azimute" <${process.env.EMAIL_USER}>`,
            to: emailList,
            subject: "Pesquisa de Satisfação",
            html: htmlContent,
        });
  
        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, messageId: data.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
    }
  }