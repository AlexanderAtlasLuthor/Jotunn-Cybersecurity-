import { useState, useEffect, useRef } from 'react'

/*
  Props:
  - to      : target number (e.g. 150)
  - suffix  : string appended after number (e.g. "+", "h")
  - label   : string label below the number
  - text    : if provided, skip counting and type this text instead (e.g. "P1/P2")
  - duration: animation duration in ms (default 1800)
*/
export default function StatCounter({ to, suffix = '', label, text, duration = 1800 }) {
  const [value, setValue]     = useState(text ? '' : 0)
  const [started, setStarted] = useState(false)
  const ref                   = useRef(null)

  // Trigger when in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  // Numeric counter
  useEffect(() => {
    if (!started || text) return

    const start     = performance.now()
    const target    = Number(to)

    function tick(now) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setValue(target)
    }

    requestAnimationFrame(tick)
  }, [started, to, duration, text])

  // Typewriter for text values (e.g. "P1/P2")
  useEffect(() => {
    if (!started || !text) return

    let i = 0
    const interval = setInterval(() => {
      i++
      setValue(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 80)

    return () => clearInterval(interval)
  }, [started, text])

  return (
    <div className="hstat" ref={ref}>
      <span className="hstat-n">
        {text ? value : `${value}${suffix}`}
        {/* blinking cursor while typing text values */}
        {text && value !== text && <span className="term-cursor" style={{ width: 4, height: '0.7em', marginLeft: 2 }} />}
      </span>
      <span className="hstat-l">{label}</span>
    </div>
  )
}
