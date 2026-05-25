import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const parseEmailList = (value: string | undefined, fallback: string[]) =>
    value
        ? value.split(',').map((email) => email.trim()).filter(Boolean)
        : fallback

const pesquisaRecipientsByCompany: Record<string, string | undefined> = {
    'Azimute Engenharia': process.env.RESEND_EMAIL_PESQUISA_ENGENHARIA,
    'Azimute Imóveis': process.env.RESEND_EMAIL_PESQUISA_IMOVEIS,
    'Azimute Tech': process.env.RESEND_EMAIL_PESQUISA_TECH,
    'Azimute San': process.env.RESEND_EMAIL_PESQUISA_SAN,
    'Aria - Imagem e Tecnologia': process.env.RESEND_EMAIL_PESQUISA_ARIA,
}

export async function POST(request: any) {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_PORT || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('Email configuration not complete');
        return NextResponse.json({ error: 'Email configuration not complete' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message } = body

    console.log('Pesquisa form data:', { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message });
    
    const defaultEmailList = parseEmailList(
        process.env.RESEND_EMAIL_PESQUISA ?? process.env.RESEND_EMAIL,
        ['comercial@grupoazimute.com.br']
    )
    const emailList = parseEmailList(
        pesquisaRecipientsByCompany[empresaAzimute],
        defaultEmailList
    )
    
    console.log('Sending to emails:', { empresaAzimute, emailList });

    // Configurar o transporter do Nodemailer
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
            subject: `Pesquisa de Satisfação - ${empresaAzimute}`,
            html: htmlContent,
        });
  
        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, messageId: data.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
    }
  }