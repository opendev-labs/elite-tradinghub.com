'use client'

import { useEffect, useRef, useState } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  startTime: number
}

export function InteractiveGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const ripplesRef = useRef<Ripple[]>([])

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

    const animate = () => {
      const now = Date.now()
      
      // Update idle mouse spotlight position if not interacting
      if (!isInteracting) {
        const elapsed = (now - startTime) / 1000
        const currentRect = el.getBoundingClientRect()
        const idleX = currentRect.width / 2 + Math.sin(elapsed * 0.4) * (currentRect.width * 0.15)
        const idleY = currentRect.height / 2 + Math.cos(elapsed * 0.6) * (currentRect.height * 0.08)
        setSpotlight(idleX, idleY)
      }

      // Filter and update active matrix ripples (duration = 1.2s)
      const activeRipples = ripplesRef.current.filter(r => (now - r.startTime) < 1200)
      if (activeRipples.length !== ripplesRef.current.length || activeRipples.length > 0) {
        ripplesRef.current = activeRipples
        setRipples([...activeRipples])
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    const spawnRipple = (clientX: number, clientY: number) => {
      const currentRect = el.getBoundingClientRect()
      const x = clientX - currentRect.left
      const y = clientY - currentRect.top

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        startTime: Date.now()
      }

      // Maintain up to 8 concurrent matrix ripples
      ripplesRef.current = [...ripplesRef.current.slice(-7), newRipple]
      setRipples([...ripplesRef.current])
    }

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

    const onPointerDown = (e: PointerEvent) => {
      handlePointer(e.clientX, e.clientY)
      spawnRipple(e.clientX, e.clientY)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY)
        spawnRipple(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const targetEl = el.closest('section') || el.parentElement || window
    targetEl.addEventListener('pointermove', onPointerMove as EventListener, { passive: true })
    targetEl.addEventListener('pointerdown', onPointerDown as EventListener, { passive: true })
    targetEl.addEventListener('touchstart', onTouchStart as EventListener, { passive: true })
    targetEl.addEventListener('touchmove', onTouchMove as EventListener, { passive: true })

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      targetEl.removeEventListener('pointermove', onPointerMove as EventListener)
      targetEl.removeEventListener('pointerdown', onPointerDown as EventListener)
      targetEl.removeEventListener('touchstart', onTouchStart as EventListener)
      targetEl.removeEventListener('touchmove', onTouchMove as EventListener)
    }
  }, [])

  const now = Date.now()

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
          {/* Matrix Ripple Pattern: High-Illumination Emerald Vector Grid Lines */}
          <pattern id="ripple-matrix-pattern" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(38, 217, 138, 0.95)" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Base green vector grid */}
        <rect width="100%" height="100%" fill="url(#base-grid-pattern)" className="grid-base-rect" />

        {/* Hover spotlight vector grid */}
        <rect width="100%" height="100%" fill="url(#active-grid-pattern)" className="grid-active-rect" />

        {/* Matrix Ripple Effect: Expanding Emerald Grid Waves on Mouse Click & Touch Tap */}
        {ripples.map(ripple => {
          const age = (now - ripple.startTime) / 1000
          const radius = Math.min(650, age * 550) // Expands at 550px/sec up to 650px
          const opacity = Math.max(0, 1 - (radius / 650))
          const innerRadius = Math.max(0, radius - 55)

          const maskStyle = {
            maskImage: `radial-gradient(circle ${radius}px at ${ripple.x}px ${ripple.y}px, transparent ${innerRadius}px, rgba(0, 0, 0, ${opacity * 0.9}) ${radius - 20}px, transparent ${radius}px)`,
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${ripple.x}px ${ripple.y}px, transparent ${innerRadius}px, rgba(0, 0, 0, ${opacity * 0.9}) ${radius - 20}px, transparent ${radius}px)`
          }

          return (
            <rect 
              key={ripple.id}
              width="100%" 
              height="100%" 
              fill="url(#ripple-matrix-pattern)" 
              style={maskStyle}
            />
          )
        })}
      </svg>
    </div>
  )
}
