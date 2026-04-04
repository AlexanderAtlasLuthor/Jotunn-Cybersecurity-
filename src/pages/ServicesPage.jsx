import { Link } from 'react-router-dom'
import { IceCanvas, Cursor, Nav, Footer, useReveal } from '../components/shared'
import TiltCard       from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'

export default function ServicesPage() {
  useReveal()
  return (
    <>
      <div className="page">
        <Nav />

        {/* ── Page Hero ── */}
        <section id="page-hero">
          <div className="frost-circle fc1" />
          <div className="frost-circle fc2" />
          <p className="hero-tag">// 01 — Services</p>
          <h1 className="page-h1">We attack.<br />So you can defend.</h1>
          <p className="page-subtitle">
            Every engagement delivers prioritized, actionable findings tied to real business risk — not just a list of CVEs.
          </p>
          <div className="hero-actions" style={{ marginTop: '2.5rem' }}>
            <Link className="btn-ice" to="/contact">Request an Assessment</Link>
            <Link className="btn-ghost-ice" to="/process">Our Methodology</Link>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Services Grid ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="svc-grid reveal">
              {[
                ['01', 'Penetration Testing',      'Controlled simulations of real-world attacks against your web apps, APIs, internal networks, and infrastructure. Black-box, grey-box, and white-box methodologies available.'],
                ['02', 'Vulnerability Assessment',  'Systematic identification of weaknesses across your entire tech stack with CVSS scoring, risk prioritization, and a clear remediation roadmap.'],
                ['03', 'Secure Code Review',        'Manual and automated source code auditing to catch logic flaws, injection vectors, and authentication issues before they reach production.'],
                ['04', 'Red Team Operations',       'Full-scope adversarial engagements simulating advanced threat actors targeting your people, processes, and technology with real TTPs.'],
                ['05', 'Regulated Industries',      'Security assessments aligned to HIPAA, PCI-DSS, SOC 2, and Florida-specific compliance frameworks — with documentation your auditors accept.'],
                ['06', 'Security Training',         'Technical training for dev and IT teams covering offensive techniques, secure development practices, and threat modeling workshops.'],
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

        <div className="divider-line" />

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg-deep)', textAlign: 'center' }}>
          <div className="inner">
            <div className="reveal">
              <span className="sec-tag">// Ready to start?</span>
              <h2>Get a tailored quote<br />for your engagement</h2>
              <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                Tell us your scope and we'll respond within 24 business hours with a proposal.
              </p>
              <MagneticButton className="btn-ice" to="/contact" as={Link}>Contact Us →</MagneticButton>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
