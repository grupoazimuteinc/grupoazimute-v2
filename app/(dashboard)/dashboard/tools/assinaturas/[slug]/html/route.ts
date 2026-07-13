import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { getSignatureBySlug } from '@/lib/assinaturas/get-signature'
import { renderSignatureHtml } from '@/lib/assinaturas/render-signature'

interface AssinaturaHtmlRouteProps {
  params: {
    slug: string
  }
}

export async function GET(_request: Request, { params }: AssinaturaHtmlRouteProps) {
  const signature = getSignatureBySlug(params.slug)

  if (!signature) {
    notFound()
  }

  const html = renderSignatureHtml(signature)

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}
