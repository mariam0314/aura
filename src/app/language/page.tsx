'use client'

import { Globe, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageOptions } from '@/i18n/translations'

export default function StandaloneLanguagePage() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Platform Localization</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Language System Selection
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Selecting a language instantly updates all navigation, menus, cards, dashboard metrics, and AI mentor outputs across the entire application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {languageOptions.map((opt) => (
            <button
              key={opt.code}
              onClick={() => setLang(opt.code)}
              className={`p-6 rounded-3xl text-left border transition-all flex items-center justify-between ${
                lang === opt.code
                  ? 'bg-[#257874] text-white border-[#257874] shadow-lg'
                  : 'bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{opt.flag}</span>
                <div>
                  <div className="text-base font-bold">{opt.native}</div>
                  <div className="text-xs opacity-80">{opt.name}</div>
                </div>
              </div>
              {lang === opt.code && <CheckCircle className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
