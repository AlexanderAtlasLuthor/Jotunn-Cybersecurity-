import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

/* ── Canvas background ─────────────────────────────────────────── */
export function IceCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let W, H, animId

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      r: Math.random() * 1.1 + 0.2,
      op: Math.random() * 0.3 + 0.04,
      tw: Math.random() * 0.007 + 0.002,
      td: Math.random() > 0.5 ? 1 : -1,
      vy: -(Math.random() * 0.12 + 0.03),
      vx: (Math.random() - 0.5) * 0.06,
      a: Math.random() * Math.PI * 2,
    }))

    function snowflake(x, y, size, alpha) {
      ctx.save()
      ctx.translate(x, y)
      ctx.strokeStyle = `rgba(200,230,255,${alpha})`
      ctx.lineWidth = 0.45
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0); ctx.lineTo(0, size)
        ctx.moveTo(0, size * 0.38); ctx.lineTo(size * 0.18, size * 0.52)
        ctx.moveTo(0, size * 0.38); ctx.lineTo(-size * 0.18, size * 0.52)
        ctx.moveTo(0, size * 0.65); ctx.lineTo(size * 0.12, size * 0.76)
        ctx.moveTo(0, size * 0.65); ctx.lineTo(-size * 0.12, size * 0.76)
        ctx.stroke()
        ctx.rotate(Math.PI / 3)
      }
      ctx.restore()
    }

    const flakes = Array.from({ length: 22 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      size: Math.random() * 12 + 4,
      op: Math.random() * 0.10 + 0.02,
      drift: (Math.random() - 0.5) * 0.14,
      fall: Math.random() * 0.18 + 0.04,
    }))

    function loop() {
      ctx.clearRect(0, 0, W, H)
      stars.forEach(p => {
        p.op += p.tw * p.td
        if (p.op > 0.38 || p.op < 0.02) p.td *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,228,255,${p.op})`
        ctx.fill()
        p.y += p.vy; p.x += p.vx + Math.sin(p.a) * 0.06; p.a += 0.01
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
      })
      flakes.forEach(f => {
        snowflake(f.x, f.y, f.size, f.op)
        f.y += f.fall; f.x += f.drift
        if (f.y > H + 20) { f.y = -20; f.x = Math.random() * W }
      })
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="ice-canvas" ref={ref} />
}

/* ── Custom cursor ─────────────────────────────────────────────── */
export function Cursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current

    function onMove(e) {
      ring.style.left = e.clientX + 'px'
      ring.style.top  = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    function onEnter() {
      ring.style.width = '52px'; ring.style.height = '52px'
      ring.style.borderColor = 'rgba(126,207,255,0.75)'
      ring.style.boxShadow = '0 0 18px rgba(126,207,255,0.45)'
    }
    function onLeave() {
      ring.style.width = '34px'; ring.style.height = '34px'
      ring.style.borderColor = 'rgba(126,207,255,0.5)'
      ring.style.boxShadow = '0 0 8px rgba(126,207,255,0.2)'
    }

    const targets = document.querySelectorAll('a, button, .svc-card, .why-card')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return <div id="cursor-ring" ref={ringRef} />
}

/* ── Reveal observer ───────────────────────────────────────────── */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])
}

/* ── Nav ───────────────────────────────────────────────────────── */
export function Nav() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link className="nav-logo" to="/" onClick={close}>
          <svg className="nav-logo-svg" viewBox="0 0 100 100" fill="none">
            <polygon points="50,6 61,36 93,36 68,55 77,85 50,66 23,85 32,55 7,36 39,36"
              fill="none" stroke="rgba(200,235,255,0.75)" strokeWidth="2.2" strokeLinejoin="round"/>
            <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(126,207,255,0.5)" strokeWidth="1.5"/>
            <circle cx="50" cy="50" r="5" fill="rgba(126,207,255,0.8)"/>
            <polygon points="50,2 54,12 50,18 46,12" fill="none" stroke="rgba(220,245,255,0.8)" strokeWidth="1.5"/>
            <polygon points="93,33 97,43 87,43" fill="none" stroke="rgba(220,245,255,0.8)" strokeWidth="1.5"/>
            <polygon points="7,33 3,43 13,43" fill="none" stroke="rgba(220,245,255,0.8)" strokeWidth="1.5"/>
          </svg>
          <span className="nav-wordmark">Jötunn</span>
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/bug-bounty">Bug Bounty</NavLink></li>
          <li><NavLink to="/process">Process</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
        <Link className="nav-cta" to="/contact">Get a Quote</Link>
        <button className={`burger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          <ul>
            <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
            <li><NavLink to="/services" onClick={close}>Services</NavLink></li>
            <li><NavLink to="/bug-bounty" onClick={close}>Bug Bounty</NavLink></li>
            <li><NavLink to="/process" onClick={close}>Process</NavLink></li>
            <li><NavLink to="/about" onClick={close}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={close} className="mobile-cta">Get a Quote</NavLink></li>
          </ul>
        </div>
      )}
    </>
  )
}

/* ── Footer ────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer>
      <span className="foot-copy">© 2025 Jötunn Cybersecurity — All rights reserved</span>
      <ul className="foot-links">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Responsible Disclosure</a></li>
      </ul>
    </footer>
  )
}

/* ── Page header (used in inner pages) ────────────────────────── */
export function PageHeader({ tag, title, subtitle }) {
  return (
    <div className="page-header reveal">
      <span className="sec-tag">{tag}</span>
      <h1 className="page-h1">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  )
}
