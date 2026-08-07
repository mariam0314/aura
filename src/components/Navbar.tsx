import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { t } = useLanguage()

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          <img src="/aura-logo.png" alt="" className="nav__logo" />
          <span>AURA</span>
        </Link>
        <ul className="nav__links">
          <li><Link to="/#features">{t.nav.features}</Link></li>
          <li><Link to="/#audience">{t.nav.audience}</Link></li>
          <li><Link to="/#cta">{t.nav.getStarted}</Link></li>
          <li><Link to="/#about">{t.nav.about}</Link></li>
        </ul>
        <Link to="/#cta" className="btn btn--primary">{t.nav.getStarted}</Link>
      </div>
    </nav>
  )
}
