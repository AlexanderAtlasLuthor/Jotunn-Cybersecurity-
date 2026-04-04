import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Terminal        from './components/Terminal'
import StatCounter     from './components/StatCounter'
import TiltCard        from './components/TiltCard'
import MagneticButton  from './components/MagneticButton'
import ServicesPage  from './pages/ServicesPage'
import BugBountyPage from './pages/BugBountyPage'
import ProcessPage   from './pages/ProcessPage'
import AboutPage     from './pages/AboutPage'
import ContactPage   from './pages/ContactPage'
import './index.css'

/* ── Canvas background ─────────────────────────────────────────── */
function IceCanvas() {
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
function Cursor() {
  const curRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cur = curRef.current
    const ring = ringRef.current

    function onMove(e) {
      cur.style.left = e.clientX + 'px'
      cur.style.top = e.clientY + 'px'
      ring.style.left = e.clientX + 'px'
      ring.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)

    function onEnter() {
      cur.style.width = '14px'; cur.style.height = '14px'
      ring.style.width = '46px'; ring.style.height = '46px'
      ring.style.borderColor = 'rgba(126,207,255,0.65)'
    }
    function onLeave() {
      cur.style.width = '8px'; cur.style.height = '8px'
      ring.style.width = '30px'; ring.style.height = '30px'
      ring.style.borderColor = 'rgba(126,207,255,0.35)'
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

  return (
    <>
      <div id="cursor" ref={curRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

/* ── Reveal observer ───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── Nav ───────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <nav>
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
            <li><NavLink to="/contact" onClick={close} className={({isActive}) => isActive ? 'mobile-cta active' : 'mobile-cta'}>Get a Quote</NavLink></li>
          </ul>
        </div>
      )}
    </>
  )
}

/* ── Hero ──────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero">
      <video
        className="hero-video"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-glass" />
      <div className="frost-circle fc1" />
      <div className="frost-circle fc2" />
      <div className="frost-circle fc3" />

      <p className="hero-tag">// Offensive Security &amp; Bug Bounty</p>

      <div className="hero-emblem">
        <img src="/logojotunn.png" alt="Jötunn emblem" />
      </div>

      <h1 aria-label="JÖTUNN">
        {'JÖTUNN'.split('').map((ch, i) => (
          <span key={i} className="h1-letter" style={{ animationDelay: `${0.4 + i * 0.07}s` }}>{ch}</span>
        ))}
      </h1>
      <span className="h1-sub">Cybersecurity</span>

      <p className="hero-desc">
        We find your vulnerabilities before the adversary does. Offensive security for regulated industries and active bug bounty participation across global programs.
      </p>

      <div className="hero-actions">
        <MagneticButton className="btn-ice" href="#contact">Request an Assessment</MagneticButton>
        <MagneticButton className="btn-ghost-ice" href="#services">Our Services</MagneticButton>
      </div>

      <div className="hero-stats">
        <StatCounter to={150} suffix="+" label="Vulnerabilities Found" />
        <StatCounter text="P1/P2"           label="Critical Reports" />
        <StatCounter to={72}  suffix="h"    label="Avg. Report Delivery" />
        <StatCounter to={0}                 label="Client Data Breaches" />
      </div>
    </section>
  )
}

/* ── Services ──────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services">
      <div className="inner">
        <div className="svc-header reveal">
          <div>
            <span className="sec-tag">// 01 — Services</span>
            <h2>We attack.<br />So you can defend.</h2>
          </div>
          <p>Every engagement delivers prioritized, actionable findings tied to real business risk — not just a list of CVEs.</p>
        </div>
        <div className="svc-grid reveal">
          {[
            ['01', 'Penetration Testing', 'Controlled simulations of real-world attacks against your web apps, APIs, internal networks, and infrastructure.'],
            ['02', 'Vulnerability Assessment', 'Systematic identification of weaknesses across your tech stack with CVSS scoring and a remediation roadmap.'],
            ['03', 'Secure Code Review', 'Manual and automated source code auditing to catch security defects before they reach production.'],
            ['04', 'Red Team Operations', 'Full-scope red team engagements simulating advanced threat actors targeting your people, processes, and technology.'],
            ['05', 'Regulated Industries', 'Security assessments aligned to HIPAA, PCI-DSS, SOC 2, and Florida-specific compliance frameworks.'],
            ['06', 'Security Training', 'Technical training for dev and IT teams in offensive techniques, secure development, and threat modeling.'],
          ].map(([num, title, desc]) => (
            <TiltCard key={num}>
              <div className="svc-card-top" />
              <div className="svc-num">{num}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Bug Bounty ────────────────────────────────────────────────── */
function BugBounty() {
  return (
    <section id="bounty">
      <div className="inner">
        <div className="bounty-layout">
          <div className="reveal">
            <span className="sec-tag">// 02 — Bug Bounty</span>
            <h2>We hunt bugs.<br />For a living.</h2>
            <p style={{ marginBottom: '1.4rem' }}>Active participants on HackerOne, Bugcrowd, and Intigriti. Our track record of critical-severity findings on high-profile targets validates our methodology before we ever touch your system.</p>
            <p>Running a private program? We integrate directly into your responsible disclosure process with NDA coverage, defined timelines, and clear proof-of-concept deliverables.</p>
            <div className="bb-badges">
              <span className="badge hi">HackerOne</span>
              <span className="badge hi">Bugcrowd</span>
              <span className="badge hi">Intigriti</span>
              <span className="badge">Private Programs</span>
              <span className="badge">Responsible Disclosure</span>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  )
}

/* ── Process ───────────────────────────────────────────────────── */
function Process() {
  return (
    <section id="process">
      <div className="inner">
        <span className="sec-tag reveal">// 03 — Methodology</span>
        <h2 className="reveal">How we work</h2>
        <div className="proc-grid">
          {[
            ['01 — SCOPE', 'Scoping', 'Rules of engagement, targets, timelines, and legal coverage defined before any activity begins.'],
            ['02 — RECON', 'Reconnaissance', 'Passive and active intelligence on the attack surface: domains, IPs, technologies, personnel.'],
            ['03 — EXPLOIT', 'Exploitation', 'Controlled testing of confirmed vulnerabilities with minimal production impact and full evidence capture.'],
            ['04 — REPORT', 'Reporting', 'Executive and technical documentation with CVSS scores, reproduction steps, and prioritized recommendations.'],
            ['05 — RETEST', 'Verification', 'Once patches are applied, we verify every finding is properly remediated. No additional charge.'],
          ].map(([num, title, desc]) => (
            <div className="proc-step reveal" key={num}>
              <div className="proc-num">{num}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Why Jötunn ────────────────────────────────────────────────── */
function WhyJotunn() {
  return (
    <section id="why">
      <div className="inner">
        <span className="sec-tag reveal">// 04 — Why Jötunn</span>
        <h2 className="reveal">Built on real-world<br />offensive experience</h2>
        <div className="why-grid reveal">
          <div className="why-card">
            <span className="why-n">01</span>
            <h3>Impact-Driven Findings</h3>
            <p>We don't deliver raw CVE lists. Every finding includes its real business impact and a clear path to remediation.</p>
          </div>
          <div className="why-card">
            <span className="why-n">02</span>
            <h3>Florida &amp; Regulated Markets</h3>
            <p>Deep familiarity with the local regulatory landscape: healthcare, finance, government, and manufacturing in Florida.</p>
          </div>
          <div className="why-card">
            <span className="why-n">03</span>
            <h3>Attacker's Mindset</h3>
            <p>Our team comes from active bug bounty practice where results speak for themselves — no theoretical frameworks.</p>
          </div>
          <div className="why-card">
            <span className="why-n">04</span>
            <h3>Full Confidentiality</h3>
            <p>NDA on every engagement. Your findings never leave the scope of the contract. Responsible disclosure guaranteed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ───────────────────────────────────────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact">
      <div className="inner">
        <div className="contact-layout">
          <div className="reveal">
            <span className="sec-tag">// 05 — Contact</span>
            <h2>Start your<br />assessment</h2>
            <p style={{ marginBottom: '3rem' }}>A specialist will reach out within 24 business hours to discuss scope, timeline, and pricing for your engagement.</p>
            <div className="contact-block"><span className="clabel">Email</span><span className="cvalue">security@jotunn.io</span></div>
            <div className="contact-block"><span className="clabel">PGP Available</span><span className="cvalue">For sensitive communications</span></div>
            <div className="contact-block"><span className="clabel">Location</span><span className="cvalue">Florida, United States</span></div>
            <div className="contact-block"><span className="clabel">Response Time</span><span className="cvalue">&lt; 24 business hours</span></div>
          </div>
          <div className="contact-form reveal">
            <div className="form-row">
              <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
              <div className="form-group"><label>Company</label><input type="text" placeholder="Organization" /></div>
            </div>
            <div className="form-group"><label>Corporate Email</label><input type="email" placeholder="you@company.com" /></div>
            <div className="form-group">
              <label>Service</label>
              <select defaultValue="">
                <option value="">Select a service</option>
                <option>Penetration Testing</option>
                <option>Vulnerability Assessment</option>
                <option>Secure Code Review</option>
                <option>Red Team Operation</option>
                <option>Private Bug Bounty Program</option>
                <option>Compliance Consulting</option>
              </select>
            </div>
            <div className="form-group"><label>Project Description</label><textarea placeholder="Describe your infrastructure, security needs, and estimated timeline..." /></div>
            <button className="form-btn" onClick={() => setSubmitted(true)}>Send Request →</button>
            {submitted && <div className="form-success">// Message received. We will be in touch shortly.</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ────────────────────────────────────────────────────── */
function Footer() {
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

/* ── Home (untouched) ──────────────────────────────────────────── */
function Home() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <Hero />
        <div className="divider-line" />
        <Services />
        <div className="divider-line" />
        <BugBounty />
        <div className="divider-line" />
        <Process />
        <div className="divider-line" />
        <WhyJotunn />
        <div className="divider-line" />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

/* ── App / Router ──────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/services"   element={<ServicesPage />} />
        <Route path="/bug-bounty" element={<BugBountyPage />} />
        <Route path="/process"    element={<ProcessPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/contact"    element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
