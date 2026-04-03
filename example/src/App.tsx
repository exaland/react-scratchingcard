import React, { useState, useRef } from 'react'
import ScratchCard, { CUSTOM_BRUSH_PRESET } from 'react-scratchingcard'

import * as IMG from './img.jpg'

type Locale = 'fr' | 'en'

const copy = {
  fr: {
    eyebrow: 'Demo React Component',
    title: 'Casino Retro Scratch Card',
    subtitle: 'Gratte la carte, revele ton lot et replonge dans l atmosphere des salles de jeux vintage.',
    sectionTitle: 'Jackpot Instantane',
    sectionText: 'Gratte 80% de la zone pour declencher la revelation.',
    reset: 'Rejouer',
    prizeLabel: 'TU REMPORTES',
    prizeText: '-20%',
    prizeCaption: 'sur ta prochaine commande',
    statusIdle: 'Gratte la surface pour decouvrir ton bonus.',
    statusDone: 'Jackpot ! Carte terminee.',
    langButton: 'English'
  },
  en: {
    eyebrow: 'React Component Demo',
    title: 'Retro Casino Scratch Card',
    subtitle: 'Scratch the ticket, reveal your prize, and dive into a classic casino vibe.',
    sectionTitle: 'Instant Jackpot',
    sectionText: 'Scratch 80% of the area to unlock the reveal.',
    reset: 'Play Again',
    prizeLabel: 'YOU WIN',
    prizeText: '-20%',
    prizeCaption: 'on your next order',
    statusIdle: 'Scratch the surface to reveal your bonus.',
    statusDone: 'Jackpot! Card completed.',
    langButton: 'Francais'
  }
} as const

const App = () => {
  const ref = useRef<ScratchCard>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [locale, setLocale] = useState<Locale>('fr')
  const t = copy[locale]

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
        <div className="hero-topbar">
          <p className="eyebrow">{t.eyebrow}</p>
          <button
            type="button"
            className="lang-button"
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
          >
            {t.langButton}
          </button>
        </div>
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </section>

      <section className="card-shell">
        <div className="card-header">
          <div>
            <h2>{t.sectionTitle}</h2>
            <p>{t.sectionText}</p>
          </div>
          <button type="button" className="reset-button" onClick={onClickReset}>
            {t.reset}
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
              <p className="prize-label">{t.prizeLabel}</p>
              <h3>{t.prizeText}</h3>
              <p className="prize-caption">{t.prizeCaption}</p>
            </div>
          </ScratchCard>
        </div>

        <p className={`status ${isComplete ? 'status-complete' : ''}`}>
          {isComplete ? t.statusDone : t.statusIdle}
        </p>
      </section>
    </main>
  )
}

export default App
