import { IceCanvas, Cursor, Nav, Footer, PageHeader, useReveal } from '../components/shared'

export default function ProcessPage() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <section id="process" style={{ paddingTop: '10rem' }}>
          <div className="inner">
            <PageHeader
              tag="// 03 — Methodology"
              title="How we work"
              subtitle="A rigorous process that delivers consistent, actionable results across every engagement."
            />
            <div className="proc-grid" style={{ marginTop: '4rem' }}>
              {[
                ['01 — SCOPE',   'Scoping',        'Rules of engagement, targets, timelines, and legal coverage defined before any activity begins.'],
                ['02 — RECON',   'Reconnaissance',  'Passive and active intelligence on the attack surface: domains, IPs, technologies, personnel.'],
                ['03 — EXPLOIT', 'Exploitation',    'Controlled testing of confirmed vulnerabilities with minimal production impact and full evidence capture.'],
                ['04 — REPORT',  'Reporting',       'Executive and technical documentation with CVSS scores, reproduction steps, and prioritized recommendations.'],
                ['05 — RETEST',  'Verification',    'Once patches are applied, we verify every finding is properly remediated. No additional charge.'],
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
        <Footer />
      </div>
    </>
  )
}
