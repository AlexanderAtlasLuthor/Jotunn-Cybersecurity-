import { IceCanvas, Cursor, Nav, Footer, PageHeader, useReveal } from '../components/shared'

export default function BugBountyPage() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <section id="bounty" style={{ paddingTop: '10rem' }}>
          <div className="inner">
            <PageHeader
              tag="// 02 — Bug Bounty"
              title={<>We hunt bugs.<br />For a living.</>}
              subtitle="Active participants on HackerOne, Bugcrowd, and Intigriti — validated methodology before we ever touch your system."
            />
            <div className="bounty-layout" style={{ marginTop: '4rem' }}>
              <div className="reveal">
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
        <Footer />
      </div>
    </>
  )
}
