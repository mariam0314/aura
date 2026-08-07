import { Link, Navigate, useParams } from 'react-router-dom'
import { featureIcons, featureSlugs, type FeatureSlug } from '../i18n/translations'
import { useLanguage } from '../context/LanguageContext'

export default function FeaturePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useLanguage()

  if (!slug || !featureSlugs.includes(slug as FeatureSlug)) {
    return <Navigate to="/" replace />
  }

  const feature = t.features.items[slug as FeatureSlug]
  const icon = featureIcons[slug as FeatureSlug]

  return (
    <section className="section feature-page">
      <div className="container">
        <Link to="/#features" className="feature-page__back">
          ← {t.featurePage.back}
        </Link>

        <div className="feature-page__hero">
          <span className="feature-page__icon">{icon}</span>
          <h1>{feature.title}</h1>
          <p className="feature-page__desc">{feature.detail}</p>
        </div>

        <div className="feature-page__highlights">
          <h2>{t.featurePage.highlights}</h2>
          <ul>
            {feature.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="feature-page__cta">
          <a href="/#cta" className="btn btn--primary btn--lg">
            {t.featurePage.tryIt}
          </a>
        </div>
      </div>
    </section>
  )
}
