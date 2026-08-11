'use client'

import { useEffect, useRef } from 'react'

export function InteractiveMeshBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current || document.documentElement
      const x = e.clientX
      const y = e.clientY
      const rect = el.getBoundingClientRect()
      const posX = x - rect.left - rect.width / 2
      const posY = y - rect.top - rect.height / 2
      
      el.style.setProperty('--posX', `${posX}`)
      el.style.setProperty('--posY', `${posY}`)
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return <div ref={containerRef} className="interactive-mesh-bg" aria-hidden="true" />
}

export { InteractiveMeshBackground as LiveOrbitBackground, InteractiveMeshBackground as LiveTrendBackground }
