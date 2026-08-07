import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/aura-logo.png" alt="" className="footer__logo" />
          <span>AURA</span>
        </div>
        <p className="footer__copy">{t.footer.copy}</p>
        <p className="footer__authors">{t.footer.authors}</p>
      </div>
    </footer>
  )
}
