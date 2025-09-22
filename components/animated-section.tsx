'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionProps {
  children: ReactNode
  id?: string
  className?: string
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn'
  delay?: number
  duration?: number
  stagger?: number
}

export function AnimatedSection({ 
  children, 
  id,
  className = '', 
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  stagger = 0.1
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const elements = section.querySelectorAll('.animate-element')

    // Configurações de animação baseadas no tipo
    const animationConfigs = {
      fadeInUp: {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      fadeInLeft: {
        from: { x: -50, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      fadeInRight: {
        from: { x: 50, opacity: 0 },
        to: { x: 0, opacity: 1 }
      },
      scaleIn: {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1 }
      },
      slideIn: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1 }
      }
    }

    const config = animationConfigs[animationType]

    // Animação inicial
    gsap.set(elements, config.from)

    // ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.to(elements, {
      ...config.to,
      duration: duration,
      ease: 'power2.out',
      stagger: stagger,
      delay: delay
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [animationType, delay, duration, stagger])

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  )
}

// Componente para elementos individuais
interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn'
  delay?: number
}

export function AnimatedElement({ 
  children, 
  className = '', 
  animationType = 'fadeInUp',
  delay = 0
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const animationConfigs = {
      fadeInUp: { from: { y: 50, opacity: 0 }, to: { y: 0, opacity: 1 } },
      fadeInLeft: { from: { x: -50, opacity: 0 }, to: { x: 0, opacity: 1 } },
      fadeInRight: { from: { x: 50, opacity: 0 }, to: { x: 0, opacity: 1 } },
      scaleIn: { from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      slideIn: { from: { y: 100, opacity: 0 }, to: { y: 0, opacity: 1 } }
    }

    const config = animationConfigs[animationType]

    gsap.set(element, config.from)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.to(element, {
      ...config.to,
      duration: 0.8,
      ease: 'power2.out',
      delay: delay
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animationType, delay])

  return (
    <div ref={elementRef} className={`animate-element ${className}`}>
      {children}
    </div>
  )
}
