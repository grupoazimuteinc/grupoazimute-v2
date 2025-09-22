'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Animação de entrada para elementos
  const animateIn = (selector: string, options: any = {}) => {
    const defaultOptions = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      ...options
    }

    return gsap.fromTo(selector, 
      { y: defaultOptions.y, opacity: defaultOptions.opacity },
      {
        y: 0,
        opacity: 1,
        duration: defaultOptions.duration,
        ease: defaultOptions.ease,
        stagger: defaultOptions.stagger,
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Animação de hover para cards
  const animateHover = (selector: string) => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })
  }

  // Animação de navegação suave entre seções
  const smoothScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const targetY = section.offsetTop - 80
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: targetY,
        ease: 'power2.inOut'
      })
    }
  }

  // Animação de loading para elementos
  const animateLoading = (selector: string) => {
    return gsap.fromTo(selector,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1
      }
    )
  }

  // Animação de texto digitando
  const animateTyping = (selector: string, text: string, speed: number = 0.05) => {
    const element = document.querySelector(selector) as HTMLElement
    if (!element) return

    element.textContent = ''
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      setTimeout(() => {
        element.textContent += char
      }, index * speed * 1000)
    })
  }

  // Animação de contador
  const animateCounter = (selector: string, endValue: number, duration: number = 2) => {
    const element = document.querySelector(selector) as HTMLElement
    if (!element) return

    gsap.fromTo(element, 
      { textContent: 0 },
      {
        textContent: endValue,
        duration: duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          element.textContent = Math.ceil(this.targets()[0].textContent).toString()
        }
      }
    )
  }

  // Limpar animações
  const cleanup = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')
  }

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [])

  return {
    containerRef,
    animateIn,
    animateHover,
    smoothScrollToSection,
    animateLoading,
    animateTyping,
    animateCounter,
    cleanup
  }
}
