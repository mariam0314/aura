'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, languageOptions, type LangCode, type Translations } from '../i18n/translations'

interface LanguageContextValue {
  lang: LangCode
  setLang: (code: LangCode) => void
  t: Translations
  isRTL: boolean
  getSpeechLang: () => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'aura_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null
      if (saved && translations[saved]) {
        setLangState(saved)
      }
    } catch {
      // localStorage may fail in SSR
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr'
    }
  }, [lang])

  const setLang = (code: LangCode) => {
    setLangState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // ignore
    }
  }

  const currentTranslations = translations[lang] || translations.en
  const isRTL = lang === 'ur'

  const getSpeechLang = () => {
    const opt = languageOptions.find((o) => o.code === lang)
    return opt ? opt.locale : 'en-US'
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: currentTranslations, isRTL, getSpeechLang }}>
      <div key={lang} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return {
      lang: 'en' as LangCode,
      setLang: () => {},
      t: translations.en,
      isRTL: false,
      getSpeechLang: () => 'en-US',
    }
  }
  return ctx
}
