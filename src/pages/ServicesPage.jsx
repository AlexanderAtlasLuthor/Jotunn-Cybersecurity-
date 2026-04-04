import { IceCanvas, Cursor, Nav, Footer, PageHeader, useReveal } from '../components/shared'

export default function ServicesPage() {
  useReveal()
  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <section id="services" style={{ paddingTop: '10rem' }}>
          <div className="inner">
            <PageHeader
              tag="// 01 — Services"
              title={<>We attack.<br />So you can defend.</>}
              subtitle="Every engagement delivers prioritized, actionable findings tied to real business risk — not just a list of CVEs."
            />
            <div className="svc-grid reveal" style={{ marginTop: '4rem' }}>
              {[
                ['01', 'Penetration Testing', 'Controlled simulations of real-world attacks against your web apps, APIs, internal networks, and infrastructure.'],
                ['02', 'Vulnerability Assessment', 'Systematic identification of weaknesses across your tech stack with CVSS scoring and a remediation roadmap.'],
                ['03', 'Secure Code Review', 'Manual and automated source code auditing to catch security defects before they reach production.'],
                ['04', 'Red Team Operations', 'Full-scope red team engagements simulating advanced threat actors targeting your people, processes, and technology.'],
                ['05', 'Regulated Industries', 'Security assessments aligned to HIPAA, PCI-DSS, SOC 2, and Florida-specific compliance frameworks.'],
                ['06', 'Security Training', 'Technical training for dev and IT teams in offensive techniques, secure development, and threat modeling.'],
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
        <Footer />
      </div>
    </>
  )
}
