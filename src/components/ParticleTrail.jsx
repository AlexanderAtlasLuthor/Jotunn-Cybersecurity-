import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 6
const LIFETIME       = 500  // ms a particle lives
const SIZE_MAX       = 5    // px

export default function ParticleTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W, H, animId
    const particles = []
    let mouse = { x: -999, y: -999 }

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(x, y) {
      particles.push({
        x,
        y,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2 - 0.4,
        r:  Math.random() * SIZE_MAX + 1.5,
        born: performance.now(),
      })
      // Keep pool lean
      if (particles.length > 60) particles.splice(0, particles.length - 60)
    }

    // Spawn particles on move
    let lastSpawn = 0
    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const now = performance.now()
      if (now - lastSpawn > 16) {   // ~60fps spawn rate
        spawn(e.clientX, e.clientY)
        lastSpawn = now
      }
    }
    window.addEventListener('mousemove', onMove)

    function loop(now) {
      ctx.clearRect(0, 0, W, H)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p    = particles[i]
        const age  = now - p.born
        const life = age / LIFETIME         // 0 → 1
        if (life >= 1) { particles.splice(i, 1); continue }

        const alpha = (1 - life) * 0.55
        const r     = p.r * (1 - life * 0.5)

        ctx.beginPath()
        ctx.arc(p.x + p.dx * age * 0.025,
                p.y + p.dy * age * 0.025,
                r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(126,207,255,${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 99997,
        pointerEvents: 'none',
      }}
    />
  )
}
