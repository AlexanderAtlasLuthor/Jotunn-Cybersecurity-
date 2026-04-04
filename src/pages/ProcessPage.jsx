import { Link } from 'react-router-dom'
import { Footer, useReveal } from '../components/shared'

export default function ProcessPage() {
  useReveal()
  return (
    <>
      <div className="page">
        {/* ── Page Hero ── */}
        <section id="page-hero">
          <div className="frost-circle fc1" />
          <div className="frost-circle fc2" />
          <p className="hero-tag">// 03 — Methodology</p>
          <h1 className="page-h1">How we work</h1>
          <p className="page-subtitle">
            A rigorous, repeatable process that delivers consistent results and zero surprises — from first contact to final retest.
          </p>
        </section>

        <div className="divider-line" />

        {/* ── 5-step process ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="proc-grid reveal">
              {[
                ['01 — SCOPE',   'Scoping',        'Rules of engagement, targets, timelines, and legal coverage defined before any activity begins. No surprises, no grey areas.'],
                ['02 — RECON',   'Reconnaissance',  'Passive and active intelligence on the attack surface: domains, IPs, technologies, exposed credentials, and personnel.'],
                ['03 — EXPLOIT', 'Exploitation',    'Controlled testing of confirmed vulnerabilities with minimal production impact and full evidence capture at every step.'],
                ['04 — REPORT',  'Reporting',       'Executive and technical documentation with CVSS scores, reproduction steps, business impact, and prioritized remediation guidance.'],
                ['05 — RETEST',  'Verification',    'Once patches are applied, we verify every finding is properly remediated. Included at no additional charge on every engagement.'],
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

        <div className="divider-line" />

        {/* ── Deliverables ── */}
        <section style={{ background: 'var(--bg-deep)' }}>
          <div className="inner">
            <div className="svc-header reveal">
              <div>
                <span className="sec-tag">// What you receive</span>
                <h2>Every report includes</h2>
              </div>
              <p>No jargon-only PDFs. Every deliverable is built for two audiences: your security team and your executive leadership.</p>
            </div>
            <div className="svc-grid reveal">
              {[
                ['01', 'Executive Summary',      'Board-ready overview of findings, risk posture, and business impact — no technical background required to understand it.'],
                ['02', 'Technical Report',        'Full reproduction steps, screenshots, payloads, and root cause analysis for every confirmed vulnerability.'],
                ['03', 'CVSS Scoring',            'Every finding scored using CVSSv3.1 with environmental adjustments specific to your infrastructure.'],
                ['04', 'Remediation Roadmap',     'Prioritized fix list ordered by risk and remediation effort, with recommended timelines and guidance.'],
                ['05', 'Retest Certificate',      'After remediation we retest and issue a signed certificate confirming closure of every critical and high finding.'],
                ['06', 'Raw Evidence Archive',    'All logs, screenshots, and proof-of-concept code delivered in a structured archive for your records.'],
              ].map(([num, title, desc]) => (
                <div className="svc-card" key={num}>
                  <div className="svc-card-top" />
                  <div className="svc-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── CTA ── */}
        <section style={{ background: 'var(--bg-mid)', textAlign: 'center' }}>
          <div className="inner">
            <div className="reveal">
              <span className="sec-tag">// Start the process</span>
              <h2>Ready to run<br />your engagement?</h2>
              <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                Scoping calls are free. We'll define the rules of engagement together before any work begins.
              </p>
              <Link className="btn-ice" to="/contact">Schedule a Scoping Call →</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
