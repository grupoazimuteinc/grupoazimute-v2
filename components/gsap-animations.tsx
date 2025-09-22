'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPAnimations() {
  useEffect(() => {
    // Animação de entrada para seções
    gsap.utils.toArray('section').forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // Animação de hover para cards
    gsap.utils.toArray('.bg-gray-50, .post-card').forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    // Animação de navegação suave
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')?.substring(1)
        const targetElement = document.getElementById(targetId || '')
        
        if (targetElement) {
          const targetY = targetElement.offsetTop - 80
          
          gsap.to(window, {
            duration: 1.5,
            scrollTo: targetY,
            ease: 'power2.inOut'
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null
}
