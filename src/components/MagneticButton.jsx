import { useRef, useEffect } from 'react'

/*
  Wraps any element (a, button) with a magnetic attraction effect.
  Props:
  - as      : element type to render ('a' | 'button'), default 'a'
  - strength: pull intensity 0-1, default 0.35
  - radius  : px distance at which magnet activates, default 90
  - All other props passed through (className, href, onClick, etc.)
*/
export default function MagneticButton({
  as: Tag = 'a',
  children,
  strength = 0.35,
  radius   = 90,
  style,
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMove(e) {
      const { left, top, width, height } = el.getBoundingClientRect()
      const cx = left + width  / 2
      const cy = top  + height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const pull = (radius - dist) / radius
        el.style.transition = 'transform 0.15s ease'
        el.style.transform  = `translate(${dx * pull * strength}px, ${dy * pull * strength}px)`
      } else {
        el.style.transition = 'transform 0.4s ease'
        el.style.transform  = 'translate(0,0)'
      }
    }

    function onLeave() {
      el.style.transition = 'transform 0.5s ease'
      el.style.transform  = 'translate(0,0)'
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, radius])

  return (
    <Tag ref={ref} style={{ display: 'inline-block', ...style }} {...props}>
      {children}
    </Tag>
  )
}
