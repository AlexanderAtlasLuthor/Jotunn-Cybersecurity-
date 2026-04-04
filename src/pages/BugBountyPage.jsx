import { Link } from 'react-router-dom'
import { IceCanvas, Cursor, Nav, Footer, useReveal } from '../components/shared'

export default function BugBountyPage() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
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
              <div className="terminal reveal">
                <div className="term-bar">
                  <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
                  <span className="term-title">jotunn :: recon v2.4</span>
                </div>
                <div className="tl"><span className="tc"># Target: api.target.com — full scope</span></div>
                <div className="tl">&nbsp;</div>
                <div className="tl"><span className="tp">$</span> <span className="to">./recon --mode passive --out subs.txt</span></div>
                <div className="tl"><span className="ta">[ INFO ]</span> <span className="to">312 subdomains enumerated</span></div>
                <div className="tl"><span className="ta">[ INFO ]</span> <span className="to">47 live hosts confirmed</span></div>
                <div className="tl">&nbsp;</div>
                <div className="tl"><span className="tp">$</span> <span className="to">./probe --fuzz auth --endpoints api_routes.txt</span></div>
                <div className="tl"><span className="tx">[ CRIT ]</span> <span className="to">IDOR @ /api/v2/account/&#123;id&#125; — no ownership check</span></div>
                <div className="tl"><span className="tx">[ CRIT ]</span> <span className="to">JWT alg:none accepted — auth bypass confirmed</span></div>
                <div className="tl"><span className="tx">[ HIGH ]</span> <span className="to">SSRF via webhook param — AWS metadata exposed</span></div>
                <div className="tl">&nbsp;</div>
                <div className="tl"><span className="tp">$</span> <span className="to">./report --severity p1 --format cvss</span></div>
                <div className="tl"><span className="ts">[ DONE ]</span> <span className="to">CVSS scores: 9.8 / 8.6 / 8.1</span></div>
                <div className="tl"><span className="ts">[ DONE ]</span> <span className="to">Vendor notified — 72h SLA clock started</span></div>
                <div className="tl">&nbsp;</div>
                <div className="tl"><span className="tp">$</span> <span className="term-cursor" /></div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-line" />

        {/* ── Stats ── */}
        <section style={{ background: 'var(--bg-deep)' }}>
          <div className="inner">
            <div className="hero-stats reveal" style={{ marginTop: 0 }}>
              <div className="hstat"><span className="hstat-n">150+</span><span className="hstat-l">Vulnerabilities Reported</span></div>
              <div className="hstat"><span className="hstat-n">P1/P2</span><span className="hstat-l">Critical Severity Findings</span></div>
              <div className="hstat"><span className="hstat-n">72h</span><span className="hstat-l">Avg. Report Delivery</span></div>
              <div className="hstat"><span className="hstat-n">3</span><span className="hstat-l">Active Platforms</span></div>
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
