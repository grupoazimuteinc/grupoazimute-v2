'use client'

import { useEffect, useState } from 'react'

interface UseViewCountProps {
  postId: string
  enabled?: boolean
}

export function useViewCount({ postId, enabled = true }: UseViewCountProps) {
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasViewed, setHasViewed] = useState(false)

  useEffect(() => {
    if (!enabled || !postId) return

    // Verificar se o usuário já visualizou este post nesta sessão
    const viewedPosts = JSON.parse(
      sessionStorage.getItem('viewedPosts') || '[]'
    )

    if (viewedPosts.includes(postId)) {
      setHasViewed(true)
      return
    }

    // Registrar a visualização
    const registerView = async () => {
      try {
        setIsLoading(true)
        console.log('Registrando visualização para post:', postId)
        
        const response = await fetch('/api/increment-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Visualização registrada com sucesso:', data)
          setViewCount(data.viewCount)
          
          // Marcar como visualizado na sessão
          const updatedViewedPosts = [...viewedPosts, postId]
          sessionStorage.setItem('viewedPosts', JSON.stringify(updatedViewedPosts))
          setHasViewed(true)
        } else {
          const errorData = await response.json()
          console.error('Erro ao registrar visualização:', errorData)
        }
      } catch (error) {
        console.error('Erro ao registrar visualização:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Delay para evitar múltiplas chamadas
    const timeoutId = setTimeout(registerView, 1000)

    return () => clearTimeout(timeoutId)
  }, [postId, enabled])

  return {
    viewCount,
    isLoading,
    hasViewed,
  }
}
