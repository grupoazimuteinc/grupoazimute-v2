import { Resend } from 'resend'
import { NextResponse } from 'next/server'

import { ContactTemplate } from '@/components/email/pesquisa-template'

const resend = new Resend('re_4odMJFyP_3182mbQ37WXa6ULKPpwgE7Eb')

export async function POST(request: any) {
    const body = await request.json()
    const { name, email, cargo, message } = body

    try {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['grupoazimutejoinville@gmail.com'],
        subject: "Hello world",
        react: ContactTemplate({ name, email, cargo, message }) as React.ReactElement,
      });
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error });
    }
  }