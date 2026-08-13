import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { featureSlugs, featureIcons } from '../i18n/translations'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <header className="hero">
        <div className="hero__glow" />
        <div className="hero__inner">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__title">
            {t.hero.title}{' '}
            <span className="hero__accent">AURA</span>
          </h1>

          <LanguageSwitcher />

          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <a href="#cta" className="btn btn--primary btn--lg">{t.hero.startFree}</a>
            <a href="#features" className="btn btn--outline btn--lg">{t.hero.exploreFeatures}</a>
          </div>
          <div className="hero__stats">
            <div className="stat">
              <span className="stat__value">9+</span>
              <span className="stat__label">{t.hero.statLanguages}</span>
            </div>
            <div className="stat">
              <span className="stat__value">AI</span>
              <span className="stat__label">{t.hero.statTutor}</span>
            </div>
            <div className="stat">
              <span className="stat__value">0₹</span>
              <span className="stat__label">{t.hero.statCost}</span>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">{t.features.tag}</span>
            <h2>{t.features.title}</h2>
            <p>{t.features.subtitle}</p>
          </div>
          <div className="features-grid">
            {featureSlugs.map((slug) => {
              const f = t.features.items[slug]
              return (
                <article key={slug} className="feature-card">
                  <span className="feature-card__icon">{featureIcons[slug]}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <Link to={`/features/${slug}`} className="btn btn--outline feature-card__btn">
                    {t.features.explore} →
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="audience" className="section section--audience">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">{t.audience.tag}</span>
            <h2>{t.audience.title}</h2>
            <p>{t.audience.subtitle}</p>
          </div>
          <div className="audience-grid">
            {t.audience.segments.map((a) => (
              <div key={a.segment} className="audience-card">
                <h3>{a.segment}</h3>
                <p>{a.approach}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="section section--cta">
        <div className="container">
          <div className="cta-box">
            <img src="/aura-logo.png" alt="" className="cta-box__logo" />
            <h2>{t.cta.title}</h2>
            <p>{t.cta.subtitle}</p>
            <a href="#" className="btn btn--primary btn--lg">{t.cta.button}</a>
          </div>
        </div>
      </section>

      <section id="about" className="section section--about">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">{t.about.tag}</span>
            <h2>{t.about.title}</h2>
            <p>{t.about.subtitle}</p>
          </div>
          <div className="problem-grid">
            <div className="problem-card">
              <h3>{t.about.problem}</h3>
              <ul>
                {t.about.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="problem-card problem-card--solution">
              <h3>{t.about.solution}</h3>
              <ul>
                {t.about.solutions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
