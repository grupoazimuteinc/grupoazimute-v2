import { Resend } from 'resend'
import { NextResponse } from 'next/server'

import { ContactTemplate } from '@/components/email/orcamento-template'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: any) {
    if (!resend) {
        return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const body = await request.json()
    const { name, email, phone, message, grupo } = body

    try {
      const data = await resend.emails.send({
        from: 'Grupo Azimute <noreply@resend.dev>',
        to: [`${process.env.RESEND_EMAIL}`],
        subject: "Orçamento",
        react: ContactTemplate({ name, email, phone, message, grupo }) as React.ReactElement,
      });
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error });
    }
  }