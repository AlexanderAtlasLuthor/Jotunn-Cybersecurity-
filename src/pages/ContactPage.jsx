import { useState } from 'react'
import { Footer, useReveal } from '../components/shared'

export default function ContactPage() {
  useReveal()
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <div className="page">
        {/* ── Page Hero ── */}
        <section id="page-hero">
          <div className="frost-circle fc1" />
          <div className="frost-circle fc2" />
          <p className="hero-tag">// 05 — Contact</p>
          <h1 className="page-h1">Start your<br />assessment</h1>
          <p className="page-subtitle">
            A specialist will reach out within 24 business hours to discuss scope, timeline, and pricing for your engagement.
          </p>
        </section>

        <div className="divider-line" />

        {/* ── Contact layout ── */}
        <section style={{ background: 'var(--bg-mid)' }}>
          <div className="inner">
            <div className="contact-layout">
              <div className="reveal">
                <span className="sec-tag">// Get in touch</span>
                <h2>We respond<br />within 24 hours</h2>
                <p style={{ marginBottom: '3rem' }}>
                  Whether you need a rapid assessment, a long-term red team partner, or help with compliance — we're ready to engage.
                </p>
                <div className="contact-block"><span className="clabel">Email</span><span className="cvalue">security@jotunn.io</span></div>
                <div className="contact-block"><span className="clabel">PGP Available</span><span className="cvalue">For sensitive communications</span></div>
                <div className="contact-block"><span className="clabel">Location</span><span className="cvalue">Florida, United States</span></div>
                <div className="contact-block"><span className="clabel">Response Time</span><span className="cvalue">&lt; 24 business hours</span></div>
                <div className="contact-block"><span className="clabel">Emergency IR</span><span className="cvalue">Available 24/7 for active incidents</span></div>
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
                    <option>Incident Response</option>
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
