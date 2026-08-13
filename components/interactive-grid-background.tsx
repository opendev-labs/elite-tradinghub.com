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

    const rect = el.getBoundingClientRect()
    setSpotlight(rect.width / 2, rect.height * 0.45)

    const animateIdle = () => {
      if (!isInteracting) {
        const elapsed = (Date.now() - startTime) / 1000
        const currentRect = el.getBoundingClientRect()
        const idleX = currentRect.width / 2 + Math.sin(elapsed * 0.4) * (currentRect.width * 0.15)
        const idleY = currentRect.height / 2 + Math.cos(elapsed * 0.6) * (currentRect.height * 0.08)

        setSpotlight(idleX, idleY)
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
      <svg className="vector-grid-svg" width="100%" height="100%">
        <defs>
          {/* Base Pattern: Darker Faint Emerald Green Vector Grid Lines */}
          <pattern id="base-grid-pattern" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(38, 217, 138, 0.05)" strokeWidth="1" />
          </pattern>
          {/* Active Pattern: 10% Brighter Dimmed White Vector Grid Lines */}
          <pattern id="active-grid-pattern" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Green vector grid visible across hero background */}
        <rect width="100%" height="100%" fill="url(#base-grid-pattern)" className="grid-base-rect" />

        {/* Ultra-soft faded white vector grid illuminated under cursor */}
        <rect width="100%" height="100%" fill="url(#active-grid-pattern)" className="grid-active-rect" />
      </svg>
    </div>
  )
}
