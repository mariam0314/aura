import { useEffect, useState } from 'react'
import './SplashScreen.css'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 1200)
    const exitTimer = setTimeout(() => setPhase('exit'), 3200)
    const doneTimer = setTimeout(() => onComplete(), 4000)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div className={`splash ${phase}`}>
      <div className="splash__bg">
        <div className="splash__ring splash__ring--1" />
        <div className="splash__ring splash__ring--2" />
        <div className="splash__ring splash__ring--3" />
      </div>

      <div className="splash__content">
        <div className="splash__logo-wrap">
          <div className="splash__glow" />
          <img
            src="/aura-logo.png"
            alt="AURA"
            className="splash__logo"
          />
        </div>
        <p className="splash__tagline">AI-Driven Personalized Learning</p>
        <div className="splash__loader">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
