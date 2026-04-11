import React, { useState, useRef } from 'react'
import ScratchCard, { CUSTOM_BRUSH_PRESET } from 'react-scratchingcard'

import * as IMG from './img.jpg'

type Locale = 'fr' | 'en'

const copy = {
  fr: {
    eyebrow: 'Demo ReactScratchingCard',
    title: 'Carte a Gratter neon facon Las Vegas',
    subtitle: 'Gratte le ticket, revele ton lot, et profite d une ambiance casino neon facon Las Vegas.',
    sectionTitle: 'Neon Jackpot',
    sectionText: 'Gratte 80% de la zone pour allumer le reveal.',
    reset: 'Rejouer',
    reveal: 'Reveal instantane',
    lock: 'Verrouiller',
    unlock: 'Deverrouiller',
    progressLabel: 'Progression',
    completedAt: 'Termine a',
    notFinished: 'En cours',
    prizeLabel: 'TU REMPORTES',
    prizeText: '-20%',
    prizeCaption: 'sur ta prochaine commande',
    statusIdle: 'Gratte la surface pour decouvrir ton bonus.',
    statusDone: 'Jackpot neon ! Carte terminee.',
    statusLocked: 'Carte verrouillee. Clique sur deverrouiller pour reprendre.',
    langButton: 'English'
  },
  en: {
    eyebrow: 'ReactScratchingCard Demo',
    title: 'Vegas Neon Scratch Card',
    subtitle: 'Scratch the ticket, reveal your prize, and enjoy a bold Las Vegas neon atmosphere.',
    sectionTitle: 'Neon Jackpot',
    sectionText: 'Scratch 80% of the area to light up the reveal.',
    reset: 'Play Again',
    reveal: 'Instant Reveal',
    lock: 'Lock',
    unlock: 'Unlock',
    progressLabel: 'Progress',
    completedAt: 'Completed at',
    notFinished: 'In progress',
    prizeLabel: 'YOU WIN',
    prizeText: '-20%',
    prizeCaption: 'on your next order',
    statusIdle: 'Scratch the surface to reveal your bonus.',
    statusDone: 'Neon jackpot! Card completed.',
    statusLocked: 'Card is locked. Click unlock to continue.',
    langButton: 'Francais'
  }
} as const

const App = () => {
  const ref = useRef<ScratchCard>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completedPercent, setCompletedPercent] = useState<number | null>(null)
  const [locale, setLocale] = useState<Locale>('fr')
  const t = copy[locale]

  const onClickReset = () => {
    if (ref.current) {
      ref.current.reset()
      ref.current.unlock()
      setIsLocked(false)
      setIsComplete(false)
      setCompletedPercent(null)
      setProgress(0)
    }
  }

  const onClickReveal = () => {
    if (ref.current) {
      ref.current.reveal(true)
    }
  }

  const onToggleLock = () => {
    if (!ref.current) {
      return
    }

    if (isLocked) {
      ref.current.unlock()
    } else {
      ref.current.lock()
    }

    setIsLocked(!isLocked)
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
        <h1 className="neon-title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </section>

      <section className="card-shell">
        <div className="card-header">
          <div>
            <h2>{t.sectionTitle}</h2>
            <p>{t.sectionText}</p>
          </div>
          <div className="controls-grid">
            <button type="button" className="action-button" onClick={onClickReset}>
              {t.reset}
            </button>
            <button type="button" className="action-button" onClick={onClickReveal}>
              {t.reveal}
            </button>
            <button type="button" className="action-button" onClick={onToggleLock}>
              {isLocked ? t.unlock : t.lock}
            </button>
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-pill">
            <span>{t.progressLabel}</span>
            <strong>{progress}%</strong>
          </div>
          <div className="metric-pill">
            <span>{t.completedAt}</span>
            <strong>{completedPercent !== null ? `${completedPercent}%` : t.notFinished}</strong>
          </div>
        </div>

        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="scratch-wrapper">
          <ScratchCard
            ref={ref}
            width={320}
            height={226}
            image={IMG}
            finishPercent={80}
            onScratchProgress={(value) => setProgress(value)}
            onScratchEnd={(value) => {
              if (ref.current && ref.current.isRevealed()) {
                setCompletedPercent(value)
              }
            }}
            onComplete={() => {
              setIsComplete(true)
              setCompletedPercent(ref.current ? ref.current.getProgress() : 100)
            }}
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
          {isLocked ? t.statusLocked : isComplete ? t.statusDone : t.statusIdle}
        </p>
      </section>
    </main>
  )
}

export default App
