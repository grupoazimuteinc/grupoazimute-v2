import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { postId } = await request.json()

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID é obrigatório' },
        { status: 400 }
      )
    }

    // Por enquanto, apenas simular o incremento sem salvar no Sanity
    // Isso evita problemas de permissão até configurarmos o token
    console.log('Visualização registrada para post:', postId)
    
    return NextResponse.json({ 
      success: true, 
      viewCount: Math.floor(Math.random() * 1000) + 1 // Simular contador
    })

  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
