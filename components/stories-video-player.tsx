'use client'

import { useState, useEffect, useRef } from 'react'

interface StoriesVideoPlayerProps {
    videos: string[]
    className?: string
}

export function StoriesVideoPlayer({ videos, className = '' }: StoriesVideoPlayerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [thumbnailPosition, setThumbnailPosition] = useState<{ left: number; top: number } | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const hasMovedRef = useRef(false)
    const dragOffsetRef = useRef({ x: 0, y: 0 })
    const dragStartPositionRef = useRef({ x: 0, y: 0 })
    const videoRef = useRef<HTMLVideoElement>(null)
    const lightboxVideoRef = useRef<HTMLVideoElement>(null)
    const thumbnailRef = useRef<HTMLDivElement>(null)

    // Controlar o vídeo da thumbnail (sempre em mute e loop)
    useEffect(() => {
        if (videoRef.current && !isOpen) {
            videoRef.current.muted = true
            videoRef.current.loop = true
            videoRef.current.play().catch(() => {
                // Ignorar erros de autoplay
            })
        }
    }, [isOpen])

    // Controlar o vídeo do lightbox (com áudio)
    useEffect(() => {
        if (lightboxVideoRef.current && isOpen) {
            lightboxVideoRef.current.muted = false
            lightboxVideoRef.current.loop = true
            setProgress(0)
            setIsPlaying(true)
            
            const handleTimeUpdate = () => {
                if (lightboxVideoRef.current) {
                    const current = lightboxVideoRef.current.currentTime
                    const duration = lightboxVideoRef.current.duration
                    if (duration) {
                        setProgress((current / duration) * 100)
                    }
                }
            }

            const handlePlay = () => setIsPlaying(true)
            const handlePause = () => setIsPlaying(false)

            lightboxVideoRef.current.addEventListener('timeupdate', handleTimeUpdate)
            lightboxVideoRef.current.addEventListener('play', handlePlay)
            lightboxVideoRef.current.addEventListener('pause', handlePause)

            lightboxVideoRef.current.play().catch(() => {
                // Ignorar erros de autoplay
            })

            return () => {
                if (lightboxVideoRef.current) {
                    try {
                        lightboxVideoRef.current.removeEventListener('timeupdate', handleTimeUpdate)
                        lightboxVideoRef.current.removeEventListener('play', handlePlay)
                        lightboxVideoRef.current.removeEventListener('pause', handlePause)
                    } catch (err) {
                        // Ignorar erros ao remover listeners
                    }
                }
            }
        }
    }, [isOpen, currentVideoIndex])

    const openLightbox = () => {
        setIsOpen(true)
        setCurrentVideoIndex(0)
    }

    const closeLightbox = () => {
        setIsOpen(false)
        setIsPlaying(false)
        setProgress(0)
        // Resetar posição da thumbnail ao fechar
        setThumbnailPosition(null)
        if (lightboxVideoRef.current) {
            lightboxVideoRef.current.pause()
        }
    }

    const nextVideo = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1)
        } else {
            closeLightbox()
        }
    }

    const prevVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1)
        }
    }

    const handleVideoEnd = () => {
        nextVideo()
    }

    const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        
        // Se clicou na metade direita, próximo vídeo
        // Se clicou na metade esquerda, vídeo anterior
        if (clickX > width / 2) {
            nextVideo()
        } else {
            prevVideo()
        }
    }

    const togglePlayPause = () => {
        if (lightboxVideoRef.current) {
            if (isPlaying) {
                lightboxVideoRef.current.pause()
            } else {
                lightboxVideoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Handlers para arrastar a thumbnail
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!thumbnailRef.current) return
        e.preventDefault()
        e.stopPropagation()
        
        const rect = thumbnailRef.current.getBoundingClientRect()
        const headerHeight = window.innerWidth <= 820 ? 60 : 80
        const defaultTop = headerHeight + 45
        const currentLeft = thumbnailPosition?.left ?? 20
        const currentTop = thumbnailPosition?.top ?? defaultTop
        
        dragStartPositionRef.current = { x: e.clientX, y: e.clientY }
        hasMovedRef.current = false
        dragOffsetRef.current = {
            x: e.clientX - currentLeft,
            y: e.clientY - currentTop
        }
        setIsDragging(true)
    }

    useEffect(() => {
        if (!isDragging) return

        const handleMouseMove = (e: MouseEvent) => {
            if (!thumbnailRef.current) return
            
            // Verificar se houve movimento significativo (mais de 5px)
            const deltaX = Math.abs(e.clientX - dragStartPositionRef.current.x)
            const deltaY = Math.abs(e.clientY - dragStartPositionRef.current.y)
            if (deltaX > 5 || deltaY > 5) {
                hasMovedRef.current = true
            }
            
            const rect = thumbnailRef.current.getBoundingClientRect()
            const maxLeft = window.innerWidth - rect.width
            const maxTop = window.innerHeight - rect.height
            
            let newLeft = e.clientX - dragOffsetRef.current.x
            let newTop = e.clientY - dragOffsetRef.current.y
            
            // Limitar dentro da viewport
            newLeft = Math.max(0, Math.min(newLeft, maxLeft))
            newTop = Math.max(0, Math.min(newTop, maxTop))
            
            setThumbnailPosition({ left: newLeft, top: newTop })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            try {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            } catch (err) {
                // Ignorar erros ao remover listeners
            }
        }
    }, [isDragging])

    // Handlers para touch (mobile)
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!thumbnailRef.current) return
        e.preventDefault()
        e.stopPropagation()
        
        const touch = e.touches[0]
        const rect = thumbnailRef.current.getBoundingClientRect()
        const headerHeight = window.innerWidth <= 820 ? 60 : 80
        const defaultTop = headerHeight + 45
        const currentLeft = thumbnailPosition?.left ?? 20
        const currentTop = thumbnailPosition?.top ?? defaultTop
        
        dragStartPositionRef.current = { x: touch.clientX, y: touch.clientY }
        hasMovedRef.current = false
        dragOffsetRef.current = {
            x: touch.clientX - currentLeft,
            y: touch.clientY - currentTop
        }
        setIsDragging(true)
    }

    useEffect(() => {
        if (!isDragging) return

        const handleTouchMove = (e: TouchEvent) => {
            if (!thumbnailRef.current) return
            try {
                e.preventDefault()
            } catch (err) {
                // Ignorar erros de preventDefault (pode ocorrer com algumas extensões)
            }
            
            const touch = e.touches[0]
            if (!touch) return
            
            // Verificar se houve movimento significativo (mais de 5px)
            const deltaX = Math.abs(touch.clientX - dragStartPositionRef.current.x)
            const deltaY = Math.abs(touch.clientY - dragStartPositionRef.current.y)
            if (deltaX > 5 || deltaY > 5) {
                hasMovedRef.current = true
            }
            
            const rect = thumbnailRef.current.getBoundingClientRect()
            const maxLeft = window.innerWidth - rect.width
            const maxTop = window.innerHeight - rect.height
            
            let newLeft = touch.clientX - dragOffsetRef.current.x
            let newTop = touch.clientY - dragOffsetRef.current.y
            
            // Limitar dentro da viewport
            newLeft = Math.max(0, Math.min(newLeft, maxLeft))
            newTop = Math.max(0, Math.min(newTop, maxTop))
            
            setThumbnailPosition({ left: newLeft, top: newTop })
        }

        const handleTouchEnd = () => {
            setIsDragging(false)
        }

        try {
            window.addEventListener('touchmove', handleTouchMove, { passive: false })
            window.addEventListener('touchend', handleTouchEnd)
        } catch (err) {
            // Fallback caso passive: false não seja suportado
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleTouchEnd)
        }

        return () => {
            try {
                window.removeEventListener('touchmove', handleTouchMove)
                window.removeEventListener('touchend', handleTouchEnd)
            } catch (err) {
                // Ignorar erros ao remover listeners
            }
        }
    }, [isDragging])

    // Navegação com teclado
    useEffect(() => {
        if (!isOpen) return

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLightbox()
            } else if (e.key === 'ArrowRight') {
                if (currentVideoIndex < videos.length - 1) {
                    setCurrentVideoIndex(currentVideoIndex + 1)
                } else {
                    closeLightbox()
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentVideoIndex > 0) {
                    setCurrentVideoIndex(currentVideoIndex - 1)
                }
            } else if (e.key === ' ') {
                e.preventDefault()
                if (lightboxVideoRef.current) {
                    if (isPlaying) {
                        lightboxVideoRef.current.pause()
                    } else {
                        lightboxVideoRef.current.play()
                    }
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => {
            try {
                window.removeEventListener('keydown', handleKeyPress)
            } catch (err) {
                // Ignorar erros ao remover listeners
            }
        }
    }, [isOpen, currentVideoIndex, isPlaying, videos.length])

    if (videos.length === 0) return null

    return (
        <>
            {/* Thumbnail Flutuante */}
            {!isOpen && (
                <div 
                    ref={thumbnailRef}
                    className={`stories-video-thumbnail ${className} ${isDragging ? 'dragging' : ''}`}
                    onClick={(e) => {
                        // Só abrir o vídeo se não houve movimento (clique único sem arrastar)
                        if (!hasMovedRef.current && !isDragging) {
                            openLightbox()
                        }
                        // Resetar após verificação
                        hasMovedRef.current = false
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    role="button"
                    tabIndex={0}
                    style={thumbnailPosition ? {
                        left: `${thumbnailPosition.left}px`,
                        top: `${thumbnailPosition.top}px`,
                        transform: 'none',
                        bottom: 'auto'
                    } : {}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightbox()
                        }
                    }}
                >
                <video
                    ref={videoRef}
                    className="stories-video-thumbnail-video"
                    playsInline
                    muted
                    loop
                >
                    <source src={videos[0]} type="video/webm" />
                    <source src={videos[0].replace('.webm', '.mp4')} type="video/mp4" />
                </video>
                <div className="stories-video-play-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
            )}

            {/* Lightbox */}
            {isOpen && (
                <div 
                    className="stories-lightbox"
                    onClick={closeLightbox}
                >
                    <div 
                        className="stories-lightbox-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Controles de navegação */}
                        <div 
                            className="stories-navigation-left"
                            onClick={prevVideo}
                        />
                        <div 
                            className="stories-navigation-right"
                            onClick={nextVideo}
                        />

                        {/* Vídeo */}
                        <div 
                            className="stories-video-wrapper"
                            onClick={handleVideoClick}
                        >
                            {/* Barra de progresso superior */}
                            <div className="stories-progress-bar-container">
                                {videos.map((_, index) => (
                                    <div 
                                        key={index}
                                        className="stories-progress-bar"
                                    >
                                        <div 
                                            className={`stories-progress-bar-fill ${
                                                index === currentVideoIndex ? 'active' : ''
                                            } ${
                                                index < currentVideoIndex ? 'completed' : ''
                                            }`}
                                            style={
                                                index === currentVideoIndex
                                                    ? { width: `${progress}%` }
                                                    : undefined
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Botão de fechar */}
                            <button 
                                className="stories-close-button"
                                onClick={closeLightbox}
                                aria-label="Fechar"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                            <video
                                ref={lightboxVideoRef}
                                className="stories-lightbox-video"
                                playsInline
                                loop
                            >
                                <source src={videos[currentVideoIndex]} type="video/webm" />
                                <source src={videos[currentVideoIndex].replace('.webm', '.mp4')} type="video/mp4" />
                            </video>

                            {/* Indicador de vídeos */}
                            {videos.length > 1 && (
                                <div className="stories-video-counter">
                                    {currentVideoIndex + 1} / {videos.length}
                                </div>
                            )}

                            {/* Botão play/pause */}
                            {!isPlaying && (
                                <button
                                    className="stories-play-pause-button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        togglePlayPause()
                                    }}
                                    aria-label="Reproduzir"
                                >
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .stories-video-thumbnail {
                    position: fixed;
                    top: calc(80px + 45px);
                    left: 20px;
                    width: 135px;
                    height: 240px;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: grab;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                    z-index: 999;
                    transition: box-shadow 0.3s ease, opacity 0.2s ease;
                    user-select: none;
                    -webkit-user-select: none;
                }
                
                @media (max-width: 820px) {
                    .stories-video-thumbnail {
                        top: calc(60px + 45px);
                    }
                }

                .stories-video-thumbnail:not([style*="left"]) {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .stories-video-thumbnail:hover:not(.dragging) {
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
                }

                .stories-video-thumbnail:not([style*="left"]):hover:not(.dragging) {
                    transform: scale(1.05);
                }

                .stories-video-thumbnail.dragging {
                    cursor: grabbing;
                    opacity: 0.9;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
                }

                .stories-video-thumbnail-video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .stories-video-play-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }

                .stories-lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .stories-lightbox-container {
                    position: relative;
                    width: 100%;
                    max-width: 405px;
                    height: 100%;
                    max-height: 720px;
                    display: flex;
                    flex-direction: column;
                    background: #000;
                    border-radius: 0;
                    overflow: hidden;
                }

                .stories-progress-bar-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    gap: 4px;
                    padding: 12px 12px 8px;
                    z-index: 10003;
                }

                .stories-progress-bar {
                    flex: 1;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .stories-progress-bar-fill {
                    height: 100%;
                    width: 0%;
                    background: white;
                    transition: width linear;
                }

                .stories-progress-bar-fill.active {
                    transition: width 0.1s linear;
                }

                .stories-progress-bar-fill.completed {
                    width: 100%;
                }


                .stories-close-button {
                    position: absolute;
                    top: 20px;
                    right: 16px;
                    background: rgba(0, 0, 0, 0.25);
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10004;
                    transition: background 0.2s ease;
                }

                .stories-close-button:hover {
                    background: rgba(0, 0, 0, 0.7);
                }

                .stories-navigation-left,
                .stories-navigation-right {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 50%;
                    cursor: pointer;
                    z-index: 10002;
                }

                .stories-navigation-left {
                    left: 0;
                }

                .stories-navigation-right {
                    right: 0;
                }

                .stories-video-wrapper {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #000;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                }

                .stories-lightbox-video {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .stories-video-counter {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 16px;
                    font-size: 14px;
                    font-weight: 500;
                    z-index: 10001;
                }

                .stories-play-pause-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.6);
                    border: none;
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10001;
                    transition: background 0.2s ease, opacity 0.2s ease;
                    opacity: 1;
                }

                .stories-play-pause-button:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .stories-video-thumbnail {
                        width: 112px;
                        height: 200px;
                        bottom: 20px;
                    }

                    .stories-lightbox-container {
                        max-width: 100%;
                        max-height: 100%;
                        border-radius: 0;
                    }

                    .stories-progress-bar-container {
                        padding: 16px 16px 12px;
                    }

                    .stories-close-button {
                        top: 20px;
                        right: 20px;
                    }
                }
            `}</style>
        </>
    )
}

