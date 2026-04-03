import React, { useState, useRef } from 'react'
import ScratchCard, { CUSTOM_BRUSH_PRESET } from 'react-scratchingcard'

import * as IMG from './img.jpg'

const App = () => {
  const ref = useRef<ScratchCard>(null)
  const [isComplete, setIsComplete] = useState(false)

  const onClickReset = () => {
    if (ref.current) {
      ref.current.reset()
      setIsComplete(false)
    }
  }

  return (
    <main className="page">
      <div className="bg-shape bg-shape-left" aria-hidden="true" />
      <div className="bg-shape bg-shape-right" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">React Library Demo</p>
        <h1>Gratte et Revele Une Surprise</h1>
        <p className="subtitle">
          Une experience scratch card moderne, fluide et simple a integrer dans vos projets React.
        </p>
      </section>

      <section className="card-shell">
        <div className="card-header">
          <div>
            <h2>Instant Win</h2>
            <p>Decouvre ton message cache en grattant la zone ci-dessous.</p>
          </div>
          <button type="button" className="reset-button" onClick={onClickReset}>
            Recommencer
          </button>
        </div>

        <div className="scratch-wrapper">
          <ScratchCard
            ref={ref}
            width={320}
            height={226}
            image={IMG}
            finishPercent={80}
            onComplete={() => setIsComplete(true)}
            brushSize={40}
            customBrush={CUSTOM_BRUSH_PRESET}
          >
            <div className="prize-content">
              <p className="prize-label">TU AS GAGNE</p>
              <h3>-20%</h3>
              <p className="prize-caption">sur ta prochaine commande</p>
            </div>
          </ScratchCard>
        </div>

        <p className={`status ${isComplete ? 'status-complete' : ''}`}>
          {isComplete ? 'Bravo, carte completee !' : 'Gratte 80% de la surface pour reveler le gain.'}
        </p>
      </section>
    </main>
  )
}

export default App
