'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Play, Cpu, Bot, CheckCircle2, Volume2, Shield } from 'lucide-react'
import VRMAvatarCanvas, { type VRMState } from '@/components/VRMAvatarCanvas'
import { useLanguage } from '@/context/LanguageContext'
import { speakAuraMentor, stopAuraMentor, unlockAudioEngine } from '@/lib/voice-config'

export default function HeroSection() {
  const { t, lang } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mentorState, setMentorState] = useState<VRMState>('idle')

  const handleGreet = () => {
    unlockAudioEngine()
    if (isSpeaking) {
      stopAuraMentor()
      setIsSpeaking(false)
      setMentorState('idle')
      return
    }

    const greetings: Record<string, { text: string; locale: string }> = {
      en: { text: "Hello! I am AURA, your 3D female AI mentor. Let's master something new today!", locale: 'en-US' },
      hi: { text: 'नमस्ते! मैं ऑरा हूँ, आपकी 3D AI मेंटर। आज आप क्या सीखना चाहते हैं?', locale: 'hi-IN' },
      mr: { text: 'नमस्कार! मी ऑरा आहे, तुमची 3D AI मार्गदर्शक. आज आपण काय शिकणार आहोत?', locale: 'mr-IN' },
      gu: { text: 'નમસ્તે! હું ઔરા છું, તમારી 3D AI મેન્ટર. આજે તમે શું શીખવા માંગો છો?', locale: 'gu-IN' },
      ta: { text: 'வணக்கம்! நான் ஆரா, உங்கள் 3D AI வழிகாட்டி. இன்று நாம் என்ன கற்கலாம்?', locale: 'ta-IN' },
      te: { text: 'నమస్కారం! నేను ఔరా, మీ 3D AI మెంటర్. ఈరోజు మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?', locale: 'te-IN' },
      bn: { text: 'নমস্কার! আমি অरा, আপনার 3D AI মেন্টর। আজ আপনি কি শিখতে চান?', locale: 'bn-IN' },
      kn: { text: 'ನಮಸ್ಕಾರ! ನಾನು ಔರಾ, ನಿಮ್ಮ 3D AI ಮಾರ್ಗದರ್ಶಿ. ಇಂದು ನೀವು ಏನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?', locale: 'kn-IN' },
      ml: { text: 'നമസ്കാരം! ഞാൻ ഓറ, നിങ്ങളുടെ 3D AI മെന്റർ. ഇന്ന് നമ്മൾ എന്താണ് പഠിക്കാൻ പോകുന്നത്?', locale: 'ml-IN' },
      pa: { text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਔਰਾ ਹਾਂ, ਤੁਹਾਡੀ 3D AI ਮੈਂਟਰ। ਅੱਜ ਤੁਸੀਂ ਕੀ ਸਿੱਖਣਾ ਚਾਹੁੰਦੇ ਹੋ?', locale: 'pa-IN' },
      ur: { text: 'السلام علیکم! میں اورا ہوں، آپ کی تھری ڈی اے آئی مینٹر۔ آج آپ کیا سیکھنا چاہتے ہیں؟', locale: 'ur-PK' },
    }

    const currentGreeting = greetings[lang] || greetings.en

    speakAuraMentor(currentGreeting.text, {
      lang: currentGreeting.locale,
      onStart: () => {
        setIsSpeaking(true)
        setMentorState('speaking')
      },
      onEnd: () => {
        setIsSpeaking(false)
        setMentorState('encouraging')
      },
      onError: () => {
        setIsSpeaking(false)
        setMentorState('idle')
      },
    })
  }

  const handleStartSession = () => {
    const docProcessor = document.getElementById('document-processor')
    if (docProcessor) {
      docProcessor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-8 pb-16 px-6 overflow-hidden">
      {/* Deep Obsidian & Emerald Radial Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-tr from-emerald-600 via-[#10b981] to-teal-800 -z-10" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Personalized Pedagogy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 text-left"
        >
          {/* System Online Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>[ * SYSTEM ONLINE ]</span>
          </div>

          {/* Large Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Personalized <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-[#35C88A] bg-clip-text text-transparent">
              Pedagogy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            {lang === 'hi'
              ? 'अनुकूलनीय शिक्षण आपके बौद्धिक स्तर, ऐतिहासिक गलतियों और व्यक्तिगत लक्ष्यों के अनुसार पढ़ाने की गति और गहराई को बदलता है।'
              : lang === 'mr'
              ? 'ॲडॉप्टिव्ह पेडॅगॉजी तुमच्या बौद्धिक पातळीनुसार, चुकांनुसार आणि ध्येयांनुसार शिकवण्याची पद्धत आणि गती बदलते.'
              : 'Adaptive pedagogy dynamically adjusts tone and depth based on cognitive maturity, historical performance, and target goals — providing persistent, character-driven personal instruction.'}
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartSession}
              className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-sm sm:text-base font-black uppercase tracking-wider shadow-[0_8px_32px_rgba(16,185,129,0.45)] transition-all hover:scale-105 flex items-center gap-2.5 group"
            >
              <span>Start Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#quiz-matrix"
              className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Explore Matrix</span>
            </a>
          </div>

          {/* Slide Indicator Dots */}
          <div className="pt-8 flex items-center gap-2.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === idx
                    ? 'w-8 bg-emerald-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Column: Glassmorphism 3D Hologram Studio Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-3xl bg-[#03151D]/80 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] overflow-hidden">
            {/* Hologram Card Top Header Bar */}
            <div className="px-5 py-3.5 bg-[#05202B]/90 border-b border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
                  AURA.VRM - 3D HOLOGRAM STUDIO
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGreet}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all shadow-sm"
                  title="Audition Aura's female mentor voice"
                >
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>{isSpeaking ? 'Speaking...' : 'Audition Female Voice'}</span>
                </button>
              </div>
            </div>

            {/* 3D VRM Canvas Container */}
            <div className="relative w-full h-[460px] sm:h-[520px]">
              <VRMAvatarCanvas
                mentorState={mentorState}
                isSpeaking={isSpeaking}
                onCharacterClick={handleGreet}
              />
            </div>

            {/* Bottom HUD Bar */}
            <div className="px-5 py-3 bg-[#031219]/90 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>SPATIAL PEDESTAL • REAL-TIME 60 FPS</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span>Adaptive Companion Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
