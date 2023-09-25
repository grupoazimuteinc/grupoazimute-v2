import { Resend } from 'resend'
import { NextResponse } from 'next/server'

import { ContactTemplate } from '@/components/email/pesquisa-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: any) {
    const body = await request.json()
    const { name, email, cargo, message, grupo } = body

    try {
      const data = await resend.emails.send({
        from: 'Grupo Azimute <onboarding@resend.dev>',
        to: [`${process.env.RESEND_EMAIL}`],
        subject: "Pesquisa de Satisfação",
        react: ContactTemplate({ name, email, cargo, message, grupo }) as React.ReactElement,
      });
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error });
    }
  }