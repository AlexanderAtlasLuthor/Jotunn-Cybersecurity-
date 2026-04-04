import { IceCanvas, Cursor, Nav, Footer, PageHeader, useReveal } from '../components/shared'

export default function AboutPage() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <section id="why" style={{ paddingTop: '10rem' }}>
          <div className="inner">
            <PageHeader
              tag="// 04 — Why Jötunn"
              title={<>Built on real-world<br />offensive experience</>}
              subtitle="Not every security firm is the same. Here's what sets us apart."
            />
            <div className="why-grid reveal" style={{ marginTop: '4rem' }}>
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
        <Footer />
      </div>
    </>
  )
}
