import { useRef } from 'react'

export default function TiltCard({ children }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left - width  / 2) / (width  / 2) // -1 → 1
    const y = (e.clientY - top  - height / 2) / (height / 2) // -1 → 1
    el.style.transition = 'transform 0.08s ease'
    el.style.transform  = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale3d(1.02,1.02,1.02)`
  }

  function onLeave() {
    const el = ref.current
    el.style.transition = 'transform 0.5s ease'
    el.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      className="svc-card"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
