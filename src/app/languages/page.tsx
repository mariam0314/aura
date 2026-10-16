'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Languages,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { languageOptions, type LangCode } from '@/i18n/translations'
import { speakAuraMentor, stopAuraMentor } from '@/lib/voice-config'

export default function LanguagesPage() {
  const { lang, setLang } = useLanguage()
  const { isAuthenticated, updateLanguagePreference } = useAuth()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [activeCode, setActiveCode] = useState<string | null>(null)

  const greetings: Record<string, { text: string; locale: string }> = {
    en: { text: "Hello! I am AURA, your 3D female AI educational mentor.", locale: 'en-US' },
    hi: { text: 'नमस्ते! मैं ऑरा हूँ, आपकी 3D AI मेंटर।', locale: 'hi-IN' },
    mr: { text: 'नमस्कार! मी ऑरा आहे, तुमची 3D AI मार्गदर्शक.', locale: 'mr-IN' },
    gu: { text: 'નમસ્તે! હું ઔરા છું, તમારી 3D AI મેન્ટર.', locale: 'gu-IN' },
    ta: { text: 'வணக்கம்! நான் ஆரா, உங்கள் 3D AI வழிகாட்டி.', locale: 'ta-IN' },
    te: { text: 'నమస్కారం! నేను ఔరా, మీ 3D AI మెంటర్.', locale: 'te-IN' },
    bn: { text: 'নমস্কার! আমি অरा, আপনার 3D AI মেন্টর।', locale: 'bn-IN' },
    kn: { text: 'ನಮಸ್ಕಾರ! ನಾನು ಔರಾ, ನಿಮ್ಮ 3D AI ಮಾರ್ಗದರ್ಶಿ.', locale: 'kn-IN' },
    ml: { text: 'നമസ്കാരം! ഞാൻ ഓറ, നിങ്ങളുടെ 3D AI മെന്റർ.', locale: 'ml-IN' },
    pa: { text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਔਰਾ ਹਾਂ, ਤੁਹਾਡੀ 3D AI ਮੈਂਟਰ।', locale: 'pa-IN' },
    ur: { text: 'السلام علیکم! میں اورا ہوں، آپ کی تھری ڈی اے آئی مینٹر۔', locale: 'ur-PK' },
  }

  const handleAudition = (code: string) => {
    if (isSpeaking && activeCode === code) {
      stopAuraMentor()
      setIsSpeaking(false)
      setActiveCode(null)
      return
    }

    const greetingObj = greetings[code] || greetings.en
    setActiveCode(code)
    setIsSpeaking(true)

    speakAuraMentor(greetingObj.text, {
      lang: greetingObj.locale,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false)
        setActiveCode(null)
      },
      onError: () => {
        setIsSpeaking(false)
        setActiveCode(null)
      },
    })
  }

  const handleSelect = async (code: LangCode) => {
    setLang(code)
    if (isAuthenticated) {
      await updateLanguagePreference(code)
    }
  }

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-widest font-mono">
            <Languages className="w-4 h-4 text-emerald-400" />
            <span>Multilingual Pedagogical Matrix</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            11 Supported Languages
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            AURA provides native female voice speech synthesis, interface adaptation, and pedagogical responses across 11 dialects. Select your preferred dialect or audition each voice.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languageOptions.map((opt) => (
            <div
              key={opt.code}
              className={`p-6 rounded-3xl border transition-all space-y-4 ${
                lang === opt.code
                  ? 'bg-emerald-500/15 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                  : 'bg-[#03151D]/80 border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{opt.flag}</span>
                {lang === opt.code && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-[#00171F] text-[10px] font-black uppercase font-mono">
                    Active
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{opt.native}</h3>
                <p className="text-xs text-gray-400">{opt.name}</p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAudition(opt.code)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeCode === opt.code && isSpeaking
                      ? 'bg-emerald-500 text-[#00171F]'
                      : 'bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{activeCode === opt.code && isSpeaking ? 'Speaking...' : 'Audition Voice'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    lang === opt.code
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-[#00171F]'
                  }`}
                >
                  {lang === opt.code ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/aura"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
          >
            <span>Return to AURA Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
