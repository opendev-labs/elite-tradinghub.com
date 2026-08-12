'use client'

import { useEffect, useRef } from 'react'

export function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let animationFrameId: number
    const startTime = Date.now()
    let isInteracting = false

    const setSpotlight = (x: number, y: number) => {
      el.style.setProperty('--mouse-x', `${x}px`)
      el.style.setProperty('--mouse-y', `${y}px`)
    }

    // Set initial center coordinates
    const rect = el.getBoundingClientRect()
    setSpotlight(rect.width / 2, rect.height / 2)

    // Gentle ambient floating animation when not interacting
    const animateIdle = () => {
      if (!isInteracting) {
        const elapsed = (Date.now() - startTime) / 1000
        const currentRect = el.getBoundingClientRect()
        const centerX = currentRect.width / 2 + Math.sin(elapsed * 0.7) * (currentRect.width * 0.18)
        const centerY = currentRect.height / 2 + Math.cos(elapsed * 0.9) * (currentRect.height * 0.12)

        setSpotlight(centerX, centerY)
      }
      animationFrameId = requestAnimationFrame(animateIdle)
    }

    animateIdle()

    const handlePointer = (clientX: number, clientY: number) => {
      isInteracting = true
      const currentRect = el.getBoundingClientRect()
      const x = clientX - currentRect.left
      const y = clientY - currentRect.top
      setSpotlight(x, y)
    }

    const onPointerMove = (e: PointerEvent) => {
      handlePointer(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    // Listen on hero section element or window
    const targetEl = el.closest('section') || el.parentElement || window
    targetEl.addEventListener('pointermove', onPointerMove as EventListener, { passive: true })
    targetEl.addEventListener('touchmove', onTouchMove as EventListener, { passive: true })
    targetEl.addEventListener('touchstart', onTouchStart as EventListener, { passive: true })

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      targetEl.removeEventListener('pointermove', onPointerMove as EventListener)
      targetEl.removeEventListener('touchmove', onTouchMove as EventListener)
      targetEl.removeEventListener('touchstart', onTouchStart as EventListener)
    }
  }, [])

  return (
    <div ref={containerRef} className="interactive-green-grid-bg" aria-hidden="true">
      <div className="grid-lines-layer" />
      <div className="grid-spotlight-layer" />
    </div>
  )
}
