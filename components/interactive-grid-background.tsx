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

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let dpr = 1

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
      const isMobile = width < 768
      dpr = isMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 1.5)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
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
    let isTouch = false

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

    const clearPointer = () => {
      targetMouseX = -1000
      targetMouseY = -1000
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        isTouch = true
        return
      }
      handlePointer(e.clientX, e.clientY)
    }
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') isTouch = true
      if (!isTouch) handlePointer(e.clientX, e.clientY)
      spawnRipple(e.clientX, e.clientY)
    }
    const onPointerLeave = () => {
      clearPointer()
    }

    const onTouchStart = (e: TouchEvent) => {
      isTouch = true
      clearPointer()
      if (e.touches && e.touches[0]) {
        spawnRipple(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchMove = () => {
      isTouch = true
      clearPointer()
    }
    const onTouchEnd = () => {
      isTouch = true
      clearPointer()
    }

    const targetEl = container.closest('section') || container.parentElement || window
    targetEl.addEventListener('pointermove', onPointerMove as EventListener, { passive: true })
    targetEl.addEventListener('pointerdown', onPointerDown as EventListener, { passive: true })
    targetEl.addEventListener('pointerleave', onPointerLeave as EventListener, { passive: true })
    targetEl.addEventListener('touchstart', onTouchStart as EventListener, { passive: true })
    targetEl.addEventListener('touchmove', onTouchMove as EventListener, { passive: true })
    targetEl.addEventListener('touchend', onTouchEnd as EventListener, { passive: true })
    targetEl.addEventListener('touchcancel', onTouchEnd as EventListener, { passive: true })

    const render = () => {
      const now = Date.now()

      mouseX += (targetMouseX - mouseX) * 0.15
      mouseY += (targetMouseY - mouseY) * 0.15

      if (!isInteracting) {
        const elapsed = (now - startTime) / 1000
        targetMouseX = width / 2 + Math.sin(elapsed * 0.4) * (width * 0.15)
        targetMouseY = height * 0.45 + Math.cos(elapsed * 0.6) * (height * 0.08)
      }

      const isMobile = width < 768
      const duration = isMobile ? 1300 : 1800
      const activeRipples = ripplesRef.current.filter(r => (now - r.startTime) < duration)
      ripplesRef.current = activeRipples

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      // Responsive Grid: 28px on mobile (prevents zoomed-in look), 44px on desktop
      const MAJOR_GRID = isMobile ? 28 : 44
      const SUB_GRID = isMobile ? 14 : 22
      const SUB_STEPS = 2

      const maxTravel = isMobile ? 550 : 1050
      const speed = isMobile ? 440 : 560
      const maxBend = isMobile ? 4.5 : 5.5 // Subtle, delicate bending

      const cols = Math.ceil(width / SUB_GRID) + 2
      const rows = Math.ceil(height / SUB_GRID) + 2
      const totalNodes = cols * rows

      // Optimized Float32 arrays
      const posX = new Float32Array(totalNodes)
      const posY = new Float32Array(totalNodes)
      const mouseGlow = new Float32Array(totalNodes)
      const rippleGlow = new Float32Array(totalNodes)

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const idx = c * rows + r
          const baseX = c * SUB_GRID
          const baseY = r * SUB_GRID

          let shiftX = 0
          let shiftY = 0
          let maxGlow = 0

          // Mouse spotlight glow ONLY for desktop mouse (zero hover glow on touch/mobile)
          const mdx = baseX - mouseX
          const mdy = baseY - mouseY
          const mdist = Math.hypot(mdx, mdy)
          if (!isTouch && mdist < 160 && mdist > 0) {
            mouseGlow[idx] = 1 - mdist / 160
          }

          // Subtle Wave Bending (follows green wave everywhere it travels)
          for (let i = 0; i < activeRipples.length; i++) {
            const ripple = activeRipples[i]
            const age = (now - ripple.startTime) / 1000
            const waveRadius = age * speed
            const rdx = baseX - ripple.x
            const rdy = baseY - ripple.y
            const rdist = Math.hypot(rdx, rdy)

            if (rdist > 0 && waveRadius < maxTravel + 150) {
              const deltaR = rdist - waveRadius
              const WAVE_WIDTH = Math.max(28, waveRadius * 0.065)

              if (Math.abs(deltaR) < WAVE_WIDTH) {
                const normDelta = deltaR / WAVE_WIDTH
                const waveShape = Math.sin(normDelta * Math.PI)
                const distFade = rdist < (maxTravel * 0.8) ? 1.0 : Math.max(0, 1 - (rdist - maxTravel * 0.8) / (maxTravel * 0.2))
                const timeFade = Math.max(0, 1 - age / (duration / 1000))
                const intensity = waveShape * distFade * timeFade

                shiftX += (rdx / rdist) * maxBend * intensity
                shiftY += (rdy / rdist) * maxBend * intensity

                const glowInt = Math.cos(normDelta * (Math.PI / 2)) * distFade * timeFade
                if (glowInt > maxGlow) maxGlow = glowInt
              }
            }
          }

          posX[idx] = baseX + shiftX
          posY[idx] = baseY + shiftY
          rippleGlow[idx] = maxGlow
        }
      }

      // Draw Horizontal Grid Lines
      for (let r = 0; r < rows; r += SUB_STEPS) {
        for (let c = 0; c < cols - 1; c++) {
          const idx1 = c * rows + r
          const idx2 = (c + 1) * rows + r

          const x1 = posX[idx1]
          const y1 = posY[idx1]
          const x2 = posX[idx2]
          const y2 = posY[idx2]

          const avgMouse = (mouseGlow[idx1] + mouseGlow[idx2]) / 2
          const avgRipple = Math.max(rippleGlow[idx1], rippleGlow[idx2])

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)

          if (avgRipple > 0.04) {
            ctx.strokeStyle = `rgba(38, 217, 138, ${0.05 + avgRipple * 0.95})`
            ctx.lineWidth = 1 + avgRipple * 1.2
          } else if (avgMouse > 0.05) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + avgMouse * 0.18})`
            ctx.lineWidth = 1
          } else {
            ctx.strokeStyle = 'rgba(38, 217, 138, 0.05)'
            ctx.lineWidth = 1
          }

          ctx.stroke()
        }
      }

      // Draw Vertical Grid Lines
      for (let c = 0; c < cols; c += SUB_STEPS) {
        for (let r = 0; r < rows - 1; r++) {
          const idx1 = c * rows + r
          const idx2 = c * rows + (r + 1)

          const x1 = posX[idx1]
          const y1 = posY[idx1]
          const x2 = posX[idx2]
          const y2 = posY[idx2]

          const avgMouse = (mouseGlow[idx1] + mouseGlow[idx2]) / 2
          const avgRipple = Math.max(rippleGlow[idx1], rippleGlow[idx2])

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)

          if (avgRipple > 0.04) {
            ctx.strokeStyle = `rgba(38, 217, 138, ${0.05 + avgRipple * 0.95})`
            ctx.lineWidth = 1 + avgRipple * 1.2
          } else if (avgMouse > 0.05) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + avgMouse * 0.18})`
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
