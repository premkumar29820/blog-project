import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()

  return (
    <main className="welcome-page">
      <section className="welcome-panel">
        <p className="eyebrow">A personal space for ideas</p>
        <h1 className="display-font">Thoughtful work, <em>beautifully shared.</em></h1>
        <p className="welcome-copy">
          Read notes from the workbench, follow new ideas, and keep your own
          creative journal moving forward.
        </p>
        <div className="welcome-actions">
          <button className="button-style" onClick={() => navigate('/login')}>Login</button>
          <button className="button-style button-outline" onClick={() => navigate('/signup')}>Create an account</button>
        </div>
      </section>
    </main>
  )
}

export default Welcome