'use client'

import { useViewCount } from '@/hooks/useViewCount'

interface ViewTrackerProps {
  postId: string
}

export function ViewTracker({ postId }: ViewTrackerProps) {
  // Apenas registra a visualização no backend, sem exibir nada no frontend
  useViewCount({ postId, enabled: true })
  
  return null // Não renderiza nada
}
