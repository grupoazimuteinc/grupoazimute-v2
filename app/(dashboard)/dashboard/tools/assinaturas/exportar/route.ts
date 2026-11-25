import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { renderSignaturesExportHtml } from '@/lib/assinaturas/export-signatures'
import { getAllSignaturesByCategory } from '@/lib/assinaturas/get-signature'

// Sempre gera com as opções salvas no momento do download
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!auth().userId) {
    return new NextResponse('Não autorizado', { status: 401 })
  }

  const html = renderSignaturesExportHtml(await getAllSignaturesByCategory())
  const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date())

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="assinaturas-grupo-azimute-${date}.html"`,
      'Cache-Control': 'no-store',
    },
  })
}
