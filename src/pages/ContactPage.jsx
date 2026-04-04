import { useState } from 'react'
import { IceCanvas, Cursor, Nav, Footer, PageHeader, useReveal } from '../components/shared'

export default function ContactPage() {
  useReveal()
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <IceCanvas />
      <Cursor />
      <div className="page">
        <Nav />
        <section id="contact" style={{ paddingTop: '10rem' }}>
          <div className="inner">
            <div className="contact-layout">
              <div className="reveal">
                <span className="sec-tag">// 05 — Contact</span>
                <h2>Start your<br />assessment</h2>
                <p style={{ marginBottom: '3rem' }}>A specialist will reach out within 24 business hours to discuss scope, timeline, and pricing for your engagement.</p>
                <div className="contact-block"><span className="clabel">Email</span><span className="cvalue">security@jotunn.io</span></div>
                <div className="contact-block"><span className="clabel">PGP Available</span><span className="cvalue">For sensitive communications</span></div>
                <div className="contact-block"><span className="clabel">Location</span><span className="cvalue">Florida, United States</span></div>
                <div className="contact-block"><span className="clabel">Response Time</span><span className="cvalue">&lt; 24 business hours</span></div>
              </div>
              <div className="contact-form reveal">
                <div className="form-row">
                  <div className="form-group"><label>Full Name</label><input type="text" placeholder="Your name" /></div>
                  <div className="form-group"><label>Company</label><input type="text" placeholder="Organization" /></div>
                </div>
                <div className="form-group"><label>Corporate Email</label><input type="email" placeholder="you@company.com" /></div>
                <div className="form-group">
                  <label>Service</label>
                  <select defaultValue="">
                    <option value="">Select a service</option>
                    <option>Penetration Testing</option>
                    <option>Vulnerability Assessment</option>
                    <option>Secure Code Review</option>
                    <option>Red Team Operation</option>
                    <option>Private Bug Bounty Program</option>
                    <option>Compliance Consulting</option>
                  </select>
                </div>
                <div className="form-group"><label>Project Description</label><textarea placeholder="Describe your infrastructure, security needs, and estimated timeline..." /></div>
                <button className="form-btn" onClick={() => setSubmitted(true)}>Send Request →</button>
                {submitted && <div className="form-success">// Message received. We will be in touch shortly.</div>}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}
