import { Link } from 'react-router-dom'
import { IceCanvas, Cursor, Nav, Footer, useReveal } from '../components/shared'
import Terminal    from '../components/Terminal'
import StatCounter from '../components/StatCounter'

export default function BugBountyPage() {
  useReveal()
  return (
    <>
      <div className="page">
        <Nav />

        {/* ── Page Hero ── */}
        <section id="page-hero">
          <div className="frost-circle fc1" />
          <div className="frost-circle fc3" />
          <p className="hero-tag">// 02 — Bug Bounty</p>
          <h1 className="page-h1">We hunt bugs.<br />For a living.</h1>
          <p className="page-subtitle">
            Active participants on HackerOne, Bugcrowd, and Intigriti. Our track record of critical-severity findings on high-profile targets validates our methodology before we ever touch your system.
          </p>
          <div className="bb-badges reveal" style={{ justifyContent: 'center', marginTop: '2.5rem' }}>
            <span className="badge hi">HackerOne</span>
            <span className="badge hi">Bugcrowd</span>
            <span className="badge hi">Intigriti</span>
            <span className="badge">Private Programs</span>
            <span className="badge">Responsible Disclosure</span>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Terminal + Content ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="bounty-layout">
              <div className="reveal">
                <span className="sec-tag">// How we operate</span>
                <h2>Validated findings,<br />every time.</h2>
                <p style={{ marginBottom: '1.4rem' }}>
                  Running a private program? We integrate directly into your responsible disclosure process with NDA coverage, defined timelines, and clear proof-of-concept deliverables.
                </p>
                <p style={{ marginBottom: '1.4rem' }}>
                  Every report we submit includes full reproduction steps, impact analysis, CVSS score, and recommended remediation — no noise, no duplicates.
                </p>
                <p>We operate under strict responsible disclosure. Findings are reported directly to your security team with an agreed SLA before any public disclosure.</p>
              </div>
              <Terminal />
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Stats ── */}
        <section style={{ background: 'var(--bg-deep)' }}>
          <div className="inner">
            <div className="hero-stats" style={{ marginTop: 0 }}>
              <StatCounter to={150} suffix="+" label="Vulnerabilities Reported" />
              <StatCounter text="P1/P2"           label="Critical Severity Findings" />
              <StatCounter to={72}  suffix="h"    label="Avg. Report Delivery" />
              <StatCounter to={3}                 label="Active Platforms" />
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg-mid)', textAlign: 'center' }}>
          <div className="inner">
            <div className="reveal">
              <span className="sec-tag">// Launch a private program</span>
              <h2>Want us hunting<br />your infrastructure?</h2>
              <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                We set up private bug bounty programs with custom scope, NDA protection, and direct triage support.
              </p>
              <Link className="btn-ice" to="/contact">Get in Touch →</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
