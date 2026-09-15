import React from 'react'
import Footer from './common/Footer'

function About() {
  return (
    <main className="page-content about-page">
      <section className="page-heading">
        <p className="eyebrow">A little about me</p>
        <h1 className="display-font">Building with <em>curiosity.</em></h1>
        <p>
          I am a developer who enjoys turning thoughtful ideas into clear,
          useful digital experiences.
        </p>
      </section>

      <section className="about-content">
        <div>
          <p className="eyebrow">The short version</p>
          <h2 className="display-font">A work in progress, by design.</h2>
        </div>
        <div className="about-copy">
          <p>
            This is placeholder content for the About section. Replace it with
            your story, the kind of work you do, and the values that guide your
            process.
          </p>
          <p>
            Outside of client work, I am usually learning something new,
            collecting references, or experimenting with a small idea for the
            web.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default About