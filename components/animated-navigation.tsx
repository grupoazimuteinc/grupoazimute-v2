'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface NavigationItem {
  id: string
  label: string
  href: string
}

interface AnimatedNavigationProps {
  items: NavigationItem[]
  className?: string
}

export function AnimatedNavigation({ items, className = '' }: AnimatedNavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return

    const navItems = navRef.current.querySelectorAll('.nav-item')
    const indicator = indicatorRef.current

    // Animação inicial
    gsap.fromTo(navItems, 
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.2
      }
    )

    // Animação do indicador ativo
    const updateActiveIndicator = () => {
      const activeItem = navRef.current?.querySelector('.nav-item.active')
      if (activeItem && indicator) {
        const { offsetLeft, offsetWidth } = activeItem as HTMLElement
        
        gsap.to(indicator, {
          x: offsetLeft,
          width: offsetWidth,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    // ScrollTrigger para detectar seção ativa
    items.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            // Remove active de todos os itens
            navItems.forEach(navItem => navItem.classList.remove('active'))
            // Adiciona active ao item correspondente
            const navItem = navRef.current?.querySelector(`[data-section="${item.id}"]`)
            navItem?.classList.add('active')
            updateActiveIndicator()
          },
          onEnterBack: () => {
            navItems.forEach(navItem => navItem.classList.remove('active'))
            const navItem = navRef.current?.querySelector(`[data-section="${item.id}"]`)
            navItem?.classList.add('active')
            updateActiveIndicator()
          }
        })
      }
    })

    // Inicializar indicador
    updateActiveIndicator()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [items])

  const handleNavClick = (item: NavigationItem, e: React.MouseEvent) => {
    e.preventDefault()
    
    const section = document.getElementById(item.id)
    if (section) {
      const targetY = section.offsetTop - 80
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: targetY,
        ease: 'power2.inOut'
      })
    }
  }

  return (
    <nav ref={navRef} className={`relative ${className}`}>
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
        {items.map((item, index) => (
          <button
            key={item.id}
            data-section={item.id}
            className={`nav-item relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              index === 0 ? 'active' : ''
            } ${
              index === 0 
                ? 'text-white' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            onClick={(e) => handleNavClick(item, e)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Indicador ativo */}
      <div
        ref={indicatorRef}
        className="absolute top-1 bottom-1 bg-white rounded-full pointer-events-none transition-all duration-300"
        style={{ width: '0px', left: '4px' }}
      />
    </nav>
  )
}
