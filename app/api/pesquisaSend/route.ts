import { Resend } from 'resend'
import { NextResponse } from 'next/server'

import { ContactTemplate } from '@/components/email/pesquisa-template'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: any) {
    if (!resend) {
        console.error('Resend API key not configured');
        return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message } = body

    console.log('Pesquisa form data:', { name, email, cargo, empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message });
    console.log('Sending to email:', process.env.RESEND_EMAIL);

    try {
      const data = await resend.emails.send({
        from: 'Grupo Azimute <noreply@resend.dev>',
        to: [`${process.env.RESEND_EMAIL}`],
        subject: "Pesquisa de Satisfação",
        react: ContactTemplate({ name, email, cargo, grupo: empresaAzimute, comoChegou, atendimento, qualidade, expectativa, indicacao, message }) as React.ReactElement,
      });
  
      console.log('Email sent successfully:', data);
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to send email' }, { status: 500 });
    }
  }