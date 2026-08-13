'use client'

import { useEffect, useRef } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  startTime: number
}

export function InteractiveGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ripplesRef = useRef<Ripple[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let dpr = 1

    const GRID_SIZE = 22 // Fine 22px sub-mesh for smooth curve bending
    let mouseX = -1000
    let mouseY = -1000
    let targetMouseX = -1000
    let targetMouseY = -1000
    let isInteracting = false
    const startTime = Date.now()

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      if (!isInteracting) {
        targetMouseX = width / 2
        targetMouseY = height * 0.45
        mouseX = targetMouseX
        mouseY = targetMouseY
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })

    const spawnRipple = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        startTime: Date.now()
      }

      ripplesRef.current = [...ripplesRef.current.slice(-7), newRipple]
    }

    const handlePointer = (clientX: number, clientY: number) => {
      isInteracting = true
      const rect = container.getBoundingClientRect()
      targetMouseX = clientX - rect.left
      targetMouseY = clientY - rect.top
    }

    const onPointerMove = (e: PointerEvent) => handlePointer(e.clientX, e.clientY)
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

    const targetEl = container.closest('section') || container.parentElement || window
    targetEl.addEventListener('pointermove', onPointerMove as EventListener, { passive: true })
    targetEl.addEventListener('pointerdown', onPointerDown as EventListener, { passive: true })
    targetEl.addEventListener('touchstart', onTouchStart as EventListener, { passive: true })
    targetEl.addEventListener('touchmove', onTouchMove as EventListener, { passive: true })

    const render = () => {
      const now = Date.now()

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.15
      mouseY += (targetMouseY - mouseY) * 0.15

      // Idle mouse movement if user isn't interacting
      if (!isInteracting) {
        const elapsed = (now - startTime) / 1000
        targetMouseX = width / 2 + Math.sin(elapsed * 0.4) * (width * 0.15)
        targetMouseY = height * 0.45 + Math.cos(elapsed * 0.6) * (height * 0.08)
      }

      // Filter expired ripples (> 1.9s duration)
      const activeRipples = ripplesRef.current.filter(r => (now - r.startTime) < 1900)
      ripplesRef.current = activeRipples

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      const cols = Math.ceil(width / GRID_SIZE) + 2
      const rows = Math.ceil(height / GRID_SIZE) + 2

      // Compute 2D node grid with elastic matrix displacement
      const gridNodes: { x: number; y: number; glowRatio: number; rippleGlow: number }[][] = []

      for (let c = 0; c < cols; c++) {
        gridNodes[c] = []
        for (let r = 0; r < rows; r++) {
          const baseX = c * GRID_SIZE
          const baseY = r * GRID_SIZE

          let shiftX = 0
          let shiftY = 0
          let maxRippleGlow = 0

          // Mouse spotlight illumination ONLY (Zero grid bending / zero displacement on hover)
          const mdx = baseX - mouseX
          const mdy = baseY - mouseY
          const mdist = Math.hypot(mdx, mdy)
          let mouseGlow = 0
          if (mdist < 180 && mdist > 0) {
            mouseGlow = 1 - mdist / 180
          }

          // Wave Grid Bending: Follows the wave continuously from center to screen edges
          for (let i = 0; i < activeRipples.length; i++) {
            const ripple = activeRipples[i]
            const age = (now - ripple.startTime) / 1000
            const maxTravel = 1200 // Travels up to 1200px across entire screen
            const waveRadius = age * 580 // Smooth 580px/s propagation speed
            const rdx = baseX - ripple.x
            const rdy = baseY - ripple.y
            const rdist = Math.hypot(rdx, rdy)

            if (rdist > 0 && waveRadius < maxTravel + 150) {
              const deltaR = rdist - waveRadius
              // Proportional wave width so wave crest remains full & curved even 800px away
              const WAVE_WIDTH = Math.max(34, waveRadius * 0.07)

              if (Math.abs(deltaR) < WAVE_WIDTH) {
                const normDelta = deltaR / WAVE_WIDTH // -1 to 1
                // Physical sine wave displacement
                const waveShape = Math.sin(normDelta * Math.PI)
                
                // Sustained wave intensity until 850px then smooth fade out to 1200px
                const distFade = rdist < 850 ? 1.0 : Math.max(0, 1 - (rdist - 850) / 350)
                const timeFade = Math.max(0, 1 - age / 1.9)
                const intensity = waveShape * distFade * timeFade

                // Grid nodes physically bend with the wave everywhere the wave goes
                shiftX += (rdx / rdist) * 12 * intensity
                shiftY += (rdy / rdist) * 12 * intensity

                const glowIntensity = Math.cos(normDelta * (Math.PI / 2)) * distFade * timeFade
                if (glowIntensity > maxRippleGlow) {
                  maxRippleGlow = glowIntensity
                }
              }
            }
          }

          gridNodes[c][r] = {
            x: baseX + shiftX,
            y: baseY + shiftY,
            glowRatio: mouseGlow,
            rippleGlow: maxRippleGlow
          }
        }
      }

      // Draw Major Grid Lines (spaced every 44px, connected through 22px sub-node curves)
      // Horizontal Lines (every r % 2 === 0)
      for (let r = 0; r < rows; r += 2) {
        let isPathOpen = false

        for (let c = 0; c < cols - 1; c++) {
          const p1 = gridNodes[c][r]
          const p2 = gridNodes[c + 1][r]

          const avgMouseGlow = (p1.glowRatio + p2.glowRatio) / 2
          const avgRippleGlow = Math.max(p1.rippleGlow, p2.rippleGlow)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          if (avgRippleGlow > 0.04) {
            ctx.strokeStyle = `rgba(38, 217, 138, ${0.05 + avgRippleGlow * 0.95})`
            ctx.lineWidth = 1 + avgRippleGlow * 1.3
          } else if (avgMouseGlow > 0.05) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + avgMouseGlow * 0.18})`
            ctx.lineWidth = 1
          } else {
            ctx.strokeStyle = 'rgba(38, 217, 138, 0.05)'
            ctx.lineWidth = 1
          }

          ctx.stroke()
        }
      }

      // Vertical Lines (every c % 2 === 0)
      for (let c = 0; c < cols; c += 2) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = gridNodes[c][r]
          const p2 = gridNodes[c][r + 1]

          const avgMouseGlow = (p1.glowRatio + p2.glowRatio) / 2
          const avgRippleGlow = Math.max(p1.rippleGlow, p2.rippleGlow)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          if (avgRippleGlow > 0.04) {
            ctx.strokeStyle = `rgba(38, 217, 138, ${0.05 + avgRippleGlow * 0.95})`
            ctx.lineWidth = 1 + avgRippleGlow * 1.3
          } else if (avgMouseGlow > 0.05) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + avgMouseGlow * 0.18})`
            ctx.lineWidth = 1
          } else {
            ctx.strokeStyle = 'rgba(38, 217, 138, 0.05)'
            ctx.lineWidth = 1
          }

          ctx.stroke()
        }
      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      targetEl.removeEventListener('pointermove', onPointerMove as EventListener)
      targetEl.removeEventListener('pointerdown', onPointerDown as EventListener)
      targetEl.removeEventListener('touchstart', onTouchStart as EventListener)
      targetEl.removeEventListener('touchmove', onTouchMove as EventListener)
    }
  }, [])

  return (
    <div ref={containerRef} className="interactive-green-grid-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="interactive-grid-canvas" style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
