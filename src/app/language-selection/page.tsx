'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Bot,
  Volume2,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { languageOptions, type LangCode } from '@/i18n/translations'
import { speakAuraMentor } from '@/lib/voice-config'

export default function LanguageSelectionPage() {
  const router = useRouter()
  const { lang, setLang, t } = useLanguage()
  const { user, updateLanguagePreference } = useAuth()

  const [selectedLang, setSelectedLang] = useState<LangCode>(lang || 'en')
  const [selectedTone, setSelectedTone] = useState<'genz' | 'professional'>('genz')
  const [isSaving, setIsSaving] = useState(false)

  // Voice audition preview when selecting language
  const handleSelectLanguage = (code: LangCode) => {
    setSelectedLang(code)
    setLang(code)

    // Audition AURA's female voice greeting in that language
    const greetings: Record<LangCode, string> = {
      en: "Hello! I am AURA, your 3D female AI mentor. Let's learn together!",
      hi: 'नमस्ते! मैं ऑरा हूँ, आपकी 3D AI मेंटर। आज आप क्या सीखना चाहते हैं?',
      mr: 'नमस्कार! मी ऑरा आहे, तुमची 3D AI मार्गदर्शक. आज आपण काय शिकणार आहोत?',
      gu: 'નમસ્તે! હું ઔરા છું, તમારી 3D AI મેન્ટર. આજે તમે શું શીખવા માંગો છો?',
      ta: 'வணக்கம்! நான் ஆரா, உங்கள் 3D AI வழிகாட்டி. இன்று நாம் என்ன கற்கலாம்?',
      te: 'నమస్కారం! నేను ఔరా, మీ 3D AI మెంటర్. ఈరోజు మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?',
      bn: 'নমস্কার! আমি অরা, আপনার 3D AI মেন্টর। আজ আপনি কি শিখতে চান?',
      kn: 'ನಮಸ್ಕಾರ! ನಾನು ಔರಾ, ನಿಮ್ಮ 3D AI ಮಾರ್ಗದರ್ಶಿ. ಇಂದು ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?',
      ml: 'നമസ്കാരം! ഞാൻ ഓറ, നിങ്ങളുടെ 3D AI മെന്റർ. ഇന്ന് നമ്മൾ എന്താണ് പഠിക്കാൻ പോകുന്നത്?',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਔਰਾ ਹਾਂ, ਤੁਹਾਡੀ 3D AI ਮੈਂਟਰ। ਅੱਜ ਤੁਸੀਂ ਕੀ ਸਿੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
      ur: 'السلام علیکم! میں اورا ہوں، آپ کی تھری ڈی اے آئی مینٹر۔ آج آپ کیا سیکھنا چاہتے ہیں؟',
    }

    const opt = languageOptions.find((l) => l.code === code)
    if (greetings[code] && opt) {
      speakAuraMentor(greetings[code], { lang: opt.locale })
    }
  }

  const handleConfirm = async () => {
    setIsSaving(true)
    const tone = selectedLang === 'en' ? selectedTone : null
    await updateLanguagePreference(selectedLang, tone || undefined)
    setIsSaving(false)
    router.push('/dashboard')
  }

  const toneOptions = [
    {
      id: 'professional' as const,
      emoji: '🗣',
      title: 'Normal English',
      subtitle: 'Clear, natural & professional',
      example: 'You scored 72%. Your SQL fundamentals are strong, but JOIN operations need more practice.',
    },
    {
      id: 'genz' as const,
      emoji: '✨',
      title: 'Gen-Z English',
      subtitle: 'Casual, modern & playful',
      example: 'Okayyy, 72% is actually solid 🔥 Your SQL basics are good, but JOINs are kinda fighting you 😭. Let’s fix those.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-14 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      {/* Deep Obsidian & Emerald Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-tr from-emerald-600 via-[#10b981] to-teal-800 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl p-6 sm:p-10 rounded-3xl bg-[#03151D]/90 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Step 2 • Localization & Mentor Persona</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Select Your Preferred Language
          </h1>

          <p className="text-xs sm:text-sm text-gray-400">
            AURA will adapt all UI components, 3D character speech, female voice TTS, and AI responses to your chosen language.
          </p>
        </div>

        {/* 11 Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {languageOptions.map((opt) => {
            const isSelected = selectedLang === opt.code

            return (
              <motion.button
                key={opt.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleSelectLanguage(opt.code)}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'bg-[#00171F] border-white/10 text-gray-300 hover:border-emerald-500/40 hover:bg-[#00222b]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0" aria-hidden>
                    {opt.flag}
                  </span>
                  <div>
                    <div className="text-sm font-black text-white">{opt.native}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{opt.name}</div>
                  </div>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-600" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Normal vs Gen-Z English Communication Tone (shown when English is active) */}
        <AnimatePresence>
          {selectedLang === 'en' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-white/10"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  How should AURA talk to you?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toneOptions.map((tone) => {
                  const isSelected = selectedTone === tone.id

                  return (
                    <div
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-400 ring-1 ring-emerald-400 shadow-lg'
                          : 'bg-[#00171F] border-white/10 text-gray-300 hover:border-emerald-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tone.emoji}</span>
                          <div>
                            <div className="text-sm font-bold text-white">{tone.title}</div>
                            <div className="text-[11px] text-emerald-400">{tone.subtitle}</div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <div className="p-3 rounded-xl bg-[#03151D] border border-white/5 text-[11px] text-gray-300 italic">
                        &ldquo;{tone.example}&rdquo;
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Audition voice plays automatically on language selection</span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSaving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-[#00171F] border-t-transparent rounded-full animate-spin" />
                <span>Saving Language Preference...</span>
              </>
            ) : (
              <>
                <span>Save & Enter AURA Experience</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
