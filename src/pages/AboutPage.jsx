import { Link } from 'react-router-dom'
import { IceCanvas, Cursor, Nav, Footer, useReveal } from '../components/shared'
import StatCounter from '../components/StatCounter'

export default function AboutPage() {
  useReveal()
  return (
    <>
      <div className="page">
        <Nav />

        {/* ── Page Hero ── */}
        <section id="page-hero">
          <div className="frost-circle fc1" />
          <div className="frost-circle fc3" />
          <p className="hero-tag">// 04 — About</p>
          <h1 className="page-h1">Built on real-world<br />offensive experience</h1>
          <p className="page-subtitle">
            Jötunn Cybersecurity was founded by practitioners — not consultants. Every engagement is run by people who have found real vulnerabilities on real systems.
          </p>
        </section>

        <div className="divider-line" />

        {/* ── Why cards ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="svc-header reveal">
              <div>
                <span className="sec-tag">// Why Jötunn</span>
                <h2>The difference<br />is the team</h2>
              </div>
              <p>We don't staff engagements with junior analysts. The people you meet in the scoping call are the people who do the work.</p>
            </div>
            <div className="why-grid reveal">
              <div className="why-card">
                <span className="why-n">01</span>
                <h3>Impact-Driven Findings</h3>
                <p>We don't deliver raw CVE lists. Every finding includes its real business impact, the full exploitation chain, and a clear path to remediation your team can act on immediately.</p>
              </div>
              <div className="why-card">
                <span className="why-n">02</span>
                <h3>Florida &amp; Regulated Markets</h3>
                <p>Deep familiarity with the local regulatory landscape: healthcare, finance, government, and manufacturing in Florida — with documentation your auditors will accept.</p>
              </div>
              <div className="why-card">
                <span className="why-n">03</span>
                <h3>Attacker's Mindset</h3>
                <p>Our team comes from active bug bounty practice where results speak for themselves. No theoretical frameworks — we operate the same way real threat actors do.</p>
              </div>
              <div className="why-card">
                <span className="why-n">04</span>
                <h3>Full Confidentiality</h3>
                <p>NDA on every engagement. Your findings, your infrastructure details, and your vulnerability data never leave the scope of the contract. Responsible disclosure guaranteed.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Stats ── */}
        <section style={{ background: 'var(--bg-deep)' }}>
          <div className="inner">
            <div className="hero-stats" style={{ marginTop: 0 }}>
              <StatCounter to={150} suffix="+" label="Vulnerabilities Found" />
              <StatCounter text="P1/P2"           label="Critical Reports" />
              <StatCounter to={72}  suffix="h"    label="Avg. Report Delivery" />
              <StatCounter to={0}                 label="Client Data Breaches" />
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Compliance ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="svc-header reveal">
              <div>
                <span className="sec-tag">// Compliance coverage</span>
                <h2>Frameworks we<br />work within</h2>
              </div>
              <p>Our assessments are aligned to the frameworks your industry requires, so findings map directly to compliance obligations.</p>
            </div>
            <div className="svc-grid reveal">
              {[
                ['01', 'HIPAA',    'Healthcare security assessments covering technical safeguard requirements, access controls, and audit controls under HIPAA Security Rule.'],
                ['02', 'PCI-DSS',  'Penetration testing and vulnerability assessments meeting PCI-DSS Requirement 11.3 for service providers and merchants.'],
                ['03', 'SOC 2',    'Security testing aligned to the Trust Services Criteria for SOC 2 Type I and Type II audit preparation.'],
                ['04', 'NIST CSF', 'Assessments mapped to the NIST Cybersecurity Framework identify gaps and validate controls across all five functions.'],
                ['05', 'ISO 27001','Technical testing and gap analysis supporting ISO 27001 Annex A control validation and certification readiness.'],
                ['06', 'Florida',  'State-specific compliance guidance for regulated industries operating under Florida data protection and security statutes.'],
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
        <section style={{ background: 'var(--bg-deep)', textAlign: 'center' }}>
          <div className="inner">
            <div className="reveal">
              <span className="sec-tag">// Work with us</span>
              <h2>Let's talk about<br />your security posture</h2>
              <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                No sales pitch — just a direct conversation about your environment and what we can find.
              </p>
              <Link className="btn-ice" to="/contact">Start a Conversation →</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
