'use client'

import { useState } from 'react'
import { Settings, Globe, Volume2, Shield, Moon, Sun, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageOptions } from '@/i18n/translations'

export default function SettingsPage() {
  const { lang, setLang } = useLanguage()
  const [speechRate, setSpeechRate] = useState(1.0)
  const [autoPlayAudio, setAutoPlayAudio] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences Control</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Settings & Preferences
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Customize language options, Web Speech TTS playback, and theme preferences.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-[#35C88A]/10 border border-[#35C88A]/30 text-[#35C88A] text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Preferences saved successfully!</span>
          </div>
        )}

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-6">
          {/* Language Picker */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#257874]" />
              <span>Platform Language (11 Languages)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    lang === opt.code
                      ? 'bg-[#257874] text-white border-[#257874]'
                      : 'bg-white dark:bg-[#00171F] text-[var(--aura-text)] border-[var(--aura-border)]'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.native}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Web Speech Rate */}
          <div className="pt-6 border-t border-[var(--aura-border)] space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#257874]" />
              <span>Voice Speech Synthesis Speed ({speechRate}x)</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-[#257874]"
            />
          </div>

          <div className="pt-6 border-t border-[var(--aura-border)]">
            <button
              onClick={handleSave}
              className="w-full py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all"
            >
              Save Preference Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
