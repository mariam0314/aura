import { languageOptions } from '../i18n/translations'
import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-switcher">
      <p className="lang-switcher__label">{t.hero.languagesLabel}</p>
      <div className="lang-switcher__chips">
        {languageOptions.map(({ code, native }) => (
          <button
            key={code}
            type="button"
            className={`lang-switcher__chip ${lang === code ? 'lang-switcher__chip--active' : ''}`}
            onClick={() => setLang(code)}
          >
            {native}
          </button>
        ))}
      </div>
    </div>
  )
}
