'use client'

import { useEffect, useRef } from 'react'

export function InteractiveMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current || document.documentElement
    let animationFrameId: number
    const startTime = Date.now()
    const DURATION = 3000 // 3-second initial entrance animation
    let isUserInteracting = false

    // Smooth animation loop for the first 3 seconds
    const animateEntrance = () => {
      const elapsed = Date.now() - startTime

      if (elapsed < DURATION && !isUserInteracting) {
        const progress = elapsed / DURATION
        // Sinusoidal orbit wave for live demonstration effect
        const waveX = Math.sin(progress * Math.PI * 3) * 180 * (1 - progress * 0.3)
        const waveY = Math.cos(progress * Math.PI * 2) * 120 * (1 - progress * 0.3)

        el.style.setProperty('--posX', `${waveX}`)
        el.style.setProperty('--posY', `${waveY}`)
        animationFrameId = requestAnimationFrame(animateEntrance)
      } else if (!isUserInteracting) {
        // Reset to center smoothly after 3s if no interaction
        el.style.setProperty('--posX', '0')
        el.style.setProperty('--posY', '0')
      }
    }

    // Start 3-second entrance animation on page load/refresh
    animateEntrance()

    const updatePosition = (clientX: number, clientY: number) => {
      isUserInteracting = true
      if (animationFrameId) cancelAnimationFrame(animationFrameId)

      const rect = el.getBoundingClientRect()
      const posX = clientX - rect.left - rect.width / 2
      const posY = clientY - rect.top - rect.height / 2

      el.style.setProperty('--posX', `${posX}`)
      el.style.setProperty('--posY', `${posY}`)
    }

    // Desktop Pointer Events
    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    // Mobile Touch & Tap Events
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return <div ref={containerRef} className="interactive-mesh-bg" aria-hidden="true" />
}

export { InteractiveMeshBackground as LiveOrbitBackground, InteractiveMeshBackground as LiveTrendBackground }
