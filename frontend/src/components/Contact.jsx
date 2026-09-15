import React, { useState } from 'react'
import Footer from './common/Footer'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <main className="page-content contact-page">
      <section className="page-heading">
        <p className="eyebrow">Start a conversation</p>
        <h1 className="display-font">Let&apos;s make something <em>useful.</em></h1>
        <p>Have a project, question, or thoughtful idea in mind? Send a note and I&apos;ll get back to you soon.</p>
      </section>

      <section className="contact-content">
        <div className="contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 className="display-font">Good work starts with a good question.</h2>
          <p>This is placeholder contact copy. Replace it with your preferred email address, response time, location, or any details visitors should know before reaching out.</p>
        </div>

        <form className="form-panel form-stack" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" className="field" type="text" placeholder="Your name" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" className="field" type="email" placeholder="you@example.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" className="field" rows="6" placeholder="Tell me a little about your idea" required />
          </div>
          {submitted && <p className="form-success" role="status">Thanks for reaching out. This placeholder form is ready to connect to your inbox.</p>}
          <button type="submit" className="button-style">Send message</button>
        </form>
      </section>

      <Footer />
    </main>
  )
}

export default Contact