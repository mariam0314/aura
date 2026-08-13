'use client'

import { languageOptions } from '../i18n/translations'
import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-switcher">
      <p className="lang-switcher__label">{t.hero.languagesLabel || 'Select Platform Language'}</p>
      <div className="lang-switcher__chips">
        {languageOptions.map(({ code, native, flag }) => (
          <button
            key={code}
            type="button"
            className={`lang-switcher__chip flex items-center gap-1.5 ${lang === code ? 'lang-switcher__chip--active' : ''}`}
            onClick={() => setLang(code)}
          >
            <span>{flag}</span>
            <span>{native}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
