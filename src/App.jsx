import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Canvas Background ────────────────────────────────────────────
function CanvasBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const particles = []
    const snowflakes = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create stars
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        twinkle: Math.random() * 0.02,
      })
    }

    // Create snowflakes
    for (let i = 0; i < 50; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      particles.forEach(p => {
        p.opacity += p.twinkle
        if (p.opacity > 1 || p.opacity < 0) p.twinkle = -p.twinkle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.opacity * 0.6})`
        ctx.fill()
      })

      // Snowflakes
      snowflakes.forEach(s => {
        s.wobble += s.wobbleSpeed
        s.y += s.speedY
        s.x += s.speedX + Math.sin(s.wobble) * 0.3
        if (s.y > canvas.height) { s.y = -10; s.x = Math.random() * canvas.width }
        if (s.x > canvas.width) s.x = 0
        if (s.x < 0) s.x = canvas.width

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.wobble)
        ctx.beginPath()
        // Hexagonal snowflake
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const r = s.size
          if (i === 0) ctx.moveTo(r * Math.cos(angle), r * Math.sin(angle))
          else ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle))
        }
        ctx.closePath()
        ctx.fillStyle = `rgba(200,230,255,${s.opacity * 0.4})`
        ctx.fill()
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="bgCanvas" ref={canvasRef} />
}

// ─── Custom Cursor ────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      curX += (mouseX - curX) * 0.15
      curY += (mouseY - curY) * 0.15
      cursor.style.left = curX + 'px'
      cursor.style.top = curY + 'px'
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  )
}

// ─── Navigation ───────────────────────────────────────────────────
function Nav() {
  return (
    <nav>
      <div className="nav-container">
        <a href="#home" className="nav-logo">
          JÖTUNN<span>SEC</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#bug-bounty">Bug Bounty</a></li>
          <li><a href="#process">Methodology</a></li>
          <li><a href="#why">Why Us</a></li>
          <li><a href="#contact" className="nav-cta">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content reveal">
        <div className="hero-emblem">
          <div className="emblem-outer">
            <span className="emblem-inner">J</span>
          </div>
        </div>
        <p className="hero-eyebrow">Elite Cybersecurity Services</p>
        <h1 className="hero-title">
          Forged in the<br />
          <span className="highlight">Digital Frost</span>
        </h1>
        <p className="hero-subtitle">
          We are Jötunn Cybersecurity — mythic-strength defense for the modern threat landscape.
          Penetration testing, red team operations, and vulnerability research that leave no shadow unexamined.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">Engage Our Team</a>
          <a href="#services" className="btn-secondary">Explore Services</a>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { number: '500+', label: 'Assessments Completed' },
    { number: '1,200+', label: 'Vulnerabilities Found' },
    { number: '98%', label: 'Client Retention Rate' },
    { number: '24/7', label: 'Incident Response' },
  ]

  return (
    <div className="stats-bar">
      <div className="stats-container">
        {stats.map((s, i) => (
          <div className="stat-item reveal" key={i}>
            <span className="stat-number">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: '🔓',
      title: 'Penetration Testing',
      desc: 'Comprehensive black, grey, and white-box testing across web, mobile, API, and infrastructure targets. We think like attackers to uncover what defenders miss.',
      tags: ['Web App', 'Mobile', 'API', 'Network'],
    },
    {
      icon: '🎯',
      title: 'Red Team Operations',
      desc: 'Full-scope adversarial simulations that test your people, processes, and technology against real-world attack scenarios. No assumptions, only results.',
      tags: ['APT Simulation', 'Social Engineering', 'Physical'],
    },
    {
      icon: '🛡️',
      title: 'Vulnerability Research',
      desc: 'Deep-dive security research on custom software, firmware, and proprietary protocols. We find zero-days before the adversaries do.',
      tags: ['0-day Research', 'Firmware', 'CVE Disclosure'],
    },
    {
      icon: '🔍',
      title: 'Threat Intelligence',
      desc: 'Strategic and tactical intelligence to understand the threat actors targeting your industry, their TTPs, and emerging campaigns before they reach you.',
      tags: ['OSINT', 'Dark Web', 'TTP Analysis'],
    },
    {
      icon: '⚡',
      title: 'Incident Response',
      desc: '24/7 rapid response to active compromises. We contain, eradicate, and recover — then help you understand exactly what happened and how to prevent recurrence.',
      tags: ['Forensics', 'Containment', 'Recovery'],
    },
    {
      icon: '📋',
      title: 'Security Consulting',
      desc: 'Strategic security program development, compliance readiness (SOC 2, ISO 27001, PCI-DSS), and vCISO services to elevate your security posture.',
      tags: ['SOC 2', 'ISO 27001', 'vCISO'],
    },
  ]

  return (
    <section className="services" id="services">
      <div className="section-header reveal">
        <span className="section-tag">What We Do</span>
        <h2 className="section-title">Comprehensive Security Services</h2>
        <p className="section-subtitle">From offensive security testing to strategic consulting, we cover every angle of your cyber defense.</p>
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card reveal" key={i}>
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t, j) => (
                <span className="tag" key={j}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Bug Bounty Terminal ──────────────────────────────────────────
function BugBounty() {
  const [lines, setLines] = useState([])

  const terminalLines = [
    { cls: 'terminal', text: null, delay: 0 },
    { cls: 't-prompt', text: '$ ', cmd: 'jotunn-scan --target example.corp --deep', delay: 200 },
    { cls: 't-comment', text: '# Initializing reconnaissance engine...', delay: 700 },
    { cls: 't-info', text: '[*] Enumerating subdomains... 47 found', delay: 1200 },
    { cls: 't-info', text: '[*] Port scanning... 1-65535', delay: 1700 },
    { cls: 't-warn', text: '[!] Port 8443 open — non-standard HTTPS', delay: 2200 },
    { cls: 't-info', text: '[*] Fingerprinting services...', delay: 2700 },
    { cls: 't-success', text: '[+] Running vulnerability checks...', delay: 3200 },
    { cls: 't-vuln', text: '[CRITICAL] SQL Injection — /api/v2/users?id=', delay: 3800 },
    { cls: 't-high', text: '[HIGH] Broken Auth — JWT alg:none accepted', delay: 4400 },
    { cls: 't-warn', text: '[MED] CORS misconfiguration on /api/data', delay: 4900 },
    { cls: 't-success', text: '[+] Generating report... CVSSv3 scores applied', delay: 5500 },
    { cls: 't-prompt', text: '$ ', cmd: '▊', delay: 6000 },
  ]

  useEffect(() => {
    const timers = []
    terminalLines.forEach((l, i) => {
      if (l.cls === 'terminal') return
      const t = setTimeout(() => {
        setLines(prev => [...prev, l])
      }, l.delay)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="bug-bounty" id="bug-bounty">
      <div className="bounty-container">
        <div className="bounty-content reveal">
          <span className="section-tag">Bug Bounty Program</span>
          <h2>Responsible Disclosure & Bug Bounty</h2>
          <p>
            Join our community of elite security researchers. We partner with organizations
            to establish and manage world-class bug bounty programs — ensuring vulnerabilities
            are found by the good guys first.
          </p>
          <ul className="bounty-features">
            <li>Structured triage and validation within 48 hours</li>
            <li>Competitive rewards up to $50,000 per critical finding</li>
            <li>Clear scope definitions and safe harbor protections</li>
            <li>Direct communication with remediation teams</li>
            <li>Hall of fame recognition for top researchers</li>
          </ul>
          <a href="#contact" className="btn-primary">Start a Program</a>
        </div>

        <div className="terminal reveal">
          <div className="terminal-header">
            <div className="t-btn red" />
            <div className="t-btn yellow" />
            <div className="t-btn green" />
            <span className="terminal-title">jotunn-scanner v2.4.1</span>
          </div>
          <div className="terminal-body">
            {lines.map((l, i) => (
              <span className={`t-line ${l.cls}`} key={i}>
                {l.text}
                {l.cmd && <span className="t-cmd">{l.cmd}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Process / Methodology ────────────────────────────────────────
function Process() {
  const steps = [
    {
      num: '01',
      title: 'Scoping & Intelligence',
      desc: 'We work with you to define precise targets, rules of engagement, and success criteria. Our OSINT phase builds a comprehensive picture before a single packet is sent.',
    },
    {
      num: '02',
      title: 'Threat Modeling',
      desc: 'Using MITRE ATT&CK and STRIDE frameworks, we model the most realistic threats to your environment and prioritize attack paths by business impact.',
    },
    {
      num: '03',
      title: 'Active Exploitation',
      desc: 'Our team executes controlled attacks using the same tools and techniques as nation-state adversaries — safely validating vulnerabilities to confirmed proof-of-concept.',
    },
    {
      num: '04',
      title: 'Analysis & Reporting',
      desc: 'Every finding is documented with technical detail, business context, CVSS scoring, and actionable remediation guidance. No jargon-only reports.',
    },
    {
      num: '05',
      title: 'Remediation & Retest',
      desc: 'We support your team through remediation and provide a complimentary retest to verify all critical findings are properly resolved — we close the loop.',
    },
  ]

  return (
    <section className="process" id="process">
      <div className="section-header reveal">
        <span className="section-tag">How We Work</span>
        <h2 className="section-title">Our Engagement Methodology</h2>
        <p className="section-subtitle">A rigorous, repeatable process that delivers consistent results across every engagement.</p>
      </div>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div className="process-step reveal" key={i}>
            {i % 2 === 0 ? (
              <>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <div className="step-node">
                  <span className="step-number">{s.num}</span>
                </div>
                <div className="step-spacer" />
              </>
            ) : (
              <>
                <div className="step-spacer" />
                <div className="step-node">
                  <span className="step-number">{s.num}</span>
                </div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Why Jötunn ───────────────────────────────────────────────────
function WhyJotunn() {
  const cards = [
    {
      icon: '⚔️',
      title: 'Offensive-First Mindset',
      desc: 'Our team is composed of former red teamers, CTF champions, and CVE researchers. We approach every engagement with the mentality of a motivated adversary.',
    },
    {
      icon: '🏔️',
      title: 'Elite Talent, No Junior Consultants',
      desc: 'Every engagement is led by senior practitioners with 10+ years of hands-on experience. No bait-and-switch. The team you meet is the team that does the work.',
    },
    {
      icon: '🔒',
      title: 'Absolute Discretion',
      desc: 'We operate under strict NDAs and follow rigorous data handling protocols. Your vulnerabilities never leave our secure environment. Trust is our most valuable asset.',
    },
    {
      icon: '📡',
      title: 'Cutting-Edge Tooling',
      desc: 'We maintain and develop proprietary tooling that goes beyond commercial scanners. Our custom exploit frameworks and automation give you a true adversarial perspective.',
    },
  ]

  return (
    <section className="why-jotunn" id="why">
      <div className="section-header reveal">
        <span className="section-tag">Why Jötunn</span>
        <h2 className="section-title">The Jötunn Difference</h2>
        <p className="section-subtitle">Not every security firm is the same. Here's why organizations choose us for their most critical assessments.</p>
      </div>
      <div className="why-grid">
        {cards.map((c, i) => (
          <div className="why-card reveal" key={i}>
            <span className="why-icon">{c.icon}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-wrapper">
        <div className="contact-info reveal">
          <span className="section-tag">Get In Touch</span>
          <h2>Ready to Stress-Test Your Defenses?</h2>
          <p>
            Whether you need a rapid assessment, a long-term red team partner, or help building
            your security program — we're ready to engage. Reach out and hear back within one business day.
          </p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">📧</div>
              <span>engagements@jotunn.sec</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">🔐</div>
              <span>PGP key available on request</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">🌍</div>
              <span>Remote & On-site Engagements Worldwide</span>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">⏱️</div>
              <span>24/7 Incident Response Hotline</span>
            </div>
          </div>
        </div>

        <div className="contact-form reveal">
          {submitted ? (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <h3>Message Received</h3>
              <p>Our team will review your request and respond within one business day. For urgent incidents, please use our 24/7 hotline.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Jane Smith" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Business Email</label>
                <input type="email" id="email" placeholder="jane@company.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="company">Organization</label>
                <input type="text" id="company" placeholder="Acme Corp" value={formData.company} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed</label>
                <select id="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  <option value="pentest">Penetration Testing</option>
                  <option value="redteam">Red Team Operation</option>
                  <option value="vuln">Vulnerability Research</option>
                  <option value="intel">Threat Intelligence</option>
                  <option value="ir">Incident Response</option>
                  <option value="consult">Security Consulting</option>
                  <option value="bounty">Bug Bounty Program</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell Us About Your Needs</label>
                <textarea id="message" placeholder="Describe your environment, scope, timeline, and any specific concerns..." value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="form-submit">Send Secure Inquiry →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">JÖTUNN CYBERSECURITY</a>
          <p>Elite offensive security services forged in the pursuit of absolute resilience. We find what others miss.</p>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul className="footer-links">
            <li><a href="#services">Penetration Testing</a></li>
            <li><a href="#services">Red Team Ops</a></li>
            <li><a href="#services">Vuln Research</a></li>
            <li><a href="#services">Threat Intel</a></li>
            <li><a href="#services">Incident Response</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#why">About Us</a></li>
            <li><a href="#process">Methodology</a></li>
            <li><a href="#bug-bounty">Bug Bounty</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#contact">Privacy Policy</a></li>
            <li><a href="#contact">Terms of Service</a></li>
            <li><a href="#contact">Responsible Disclosure</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Jötunn Cybersecurity. All rights reserved. Forged in the digital frost.</p>
        <div className="footer-bottom-links">
          <a href="#home">↑ Back to Top</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Intersection Observer (Reveal) ──────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  useReveal()

  return (
    <>
      <CanvasBackground />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <BugBounty />
        <Process />
        <WhyJotunn />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
