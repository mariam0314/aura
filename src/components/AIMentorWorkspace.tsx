'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Volume2,
  Sparkles,
  Send,
  Brain,
  Cpu,
  Smile,
  Zap,
  CheckCircle2,
  RotateCcw,
  MessageSquare,
  Award,
  Flame,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import dynamic from 'next/dynamic'
import type { VRMState } from '@/components/VRMAvatarCanvas'

const VRMAvatarCanvas = dynamic(() => import('@/components/VRMAvatarCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] sm:h-[500px] md:h-[550px] rounded-3xl bg-gradient-to-b from-[#002830] to-[#00171F] border border-[#257874]/30 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#35C88A] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-bold text-[#35C88A]">Initializing 3D VRM Stage...</span>
      </div>
    </div>
  ),
})

type PedagogyMode = 'story' | 'visual' | 'deep' | 'exam' | 'practical'

export default function AIMentorWorkspace() {
  const { lang, t, getSpeechLang } = useLanguage()
  const [mentorState, setMentorState] = useState<VRMState>('idle')
  const [pedagogy, setPedagogy] = useState<PedagogyMode>('story')
  const [inputText, setInputText] = useState('')
  const [currentResponse, setCurrentResponse] = useState<string>('')
  const [displayedText, setDisplayedText] = useState<string>('')
  const [activePrompt, setActivePrompt] = useState<string>('')

  // Supported VRM Character States for HUD Switcher
  const characterStates: { id: VRMState; label: string; icon: string }[] = [
    { id: 'idle', label: 'Idle', icon: '✨' },
    { id: 'listening', label: 'Listening', icon: '🎙️' },
    { id: 'thinking', label: 'Thinking', icon: '🧠' },
    { id: 'speaking', label: 'Speaking', icon: '🗣️' },
    { id: 'happy', label: 'Happy', icon: '😊' },
    { id: 'confident', label: 'Confident', icon: '✨' },
    { id: 'explaining', label: 'Explaining', icon: '💡' },
    { id: 'surprised', label: 'Surprised', icon: '😮' },
    { id: 'concerned', label: 'Concerned', icon: '🤔' },
    { id: 'celebrating', label: 'Celebrating', icon: '🎉' },
  ]

  useEffect(() => {
    const welcome = t.mentor.welcomeMessage || 'Hello! I am AURA, your personal 3D AI mentor. Ask me anything to begin!'
    setCurrentResponse(welcome)
    setDisplayedText(welcome)
    setMentorState('happy')
  }, [lang, t.mentor.welcomeMessage])

  // Typewriter effect for speech display card
  useEffect(() => {
    if (!currentResponse) return
    let i = 0
    setDisplayedText('')
    const interval = setInterval(() => {
      if (i < currentResponse.length) {
        setDisplayedText(currentResponse.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [currentResponse])

  const pedagogyOptions = (t.mentor.modes || []).map((m) => ({
    id: m.id as PedagogyMode,
    name: m.name,
    desc: m.desc,
  }))

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputText
    if (!textToSend.trim()) return

    setActivePrompt(textToSend)
    if (!overrideText) setInputText('')

    // Set Thinking state
    setMentorState('thinking')
    setCurrentResponse('')

    setTimeout(() => {
      // Determine reaction state based on query
      let nextState: VRMState = 'explaining'
      if (textToSend.toLowerCase().includes('great') || textToSend.toLowerCase().includes('awesome') || textToSend.toLowerCase().includes('congrats')) {
        nextState = 'celebrating'
      } else if (textToSend.toLowerCase().includes('why') || textToSend.toLowerCase().includes('problem') || textToSend.toLowerCase().includes('hard')) {
        nextState = 'concerned'
      } else if (textToSend.toLowerCase().includes('quantum') || textToSend.toLowerCase().includes('magic') || textToSend.toLowerCase().includes('wow')) {
        nextState = 'surprised'
      }

      setMentorState(nextState)

      let reply = ''
      const modeObj = pedagogyOptions.find((p) => p.id === pedagogy)
      const modeTitle = modeObj ? modeObj.name : pedagogy

      if (lang === 'hi') {
        reply = `[${modeTitle}]: ${textToSend} के संदर्भ में, ऑरा का एआई मॉडल निरंतर आपकी संज्ञानात्मक शैली का विश्लेषण करता है। आइए इसे गहराई से समझें...`
      } else if (lang === 'mr') {
        reply = `[${modeTitle}]: ${textToSend} संदर्भात, ऑरा तुमचे वैयक्तिक मार्गदर्शक म्हणून काम करते आणि सोप्या भाषेत स्पष्ट करते...`
      } else if (lang === 'ta') {
        reply = `[${modeTitle}]: ${textToSend} பற்றிய உங்கள் கேள்விக்கு, AURA AI ஆசிரியர் எளிய விளக்கத்தை வழங்குகிறார்...`
      } else if (lang === 'ur') {
        reply = `[${modeTitle}]: ${textToSend} کے متعلق، AURA آپ کے تعلیمی سفر میں ہر قدم پر رہنمائی فراہم کرتا ہے...`
      } else {
        reply = `[${modeTitle}]: Regarding "${textToSend}" — as your 3D AI companion, I continuously adapt my teaching style to match your cognitive velocity and exact domain goals.`
      }

      setCurrentResponse(reply)

      // Web Speech TTS Synthesis
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(reply)
        utterance.lang = getSpeechLang()
        utterance.rate = 1.0

        utterance.onstart = () => setMentorState('speaking')
        utterance.onend = () => setMentorState('confident')
        utterance.onerror = () => setMentorState('idle')

        window.speechSynthesis.speak(utterance)
      } else {
        setTimeout(() => setMentorState('confident'), 4000)
      }
    }, 1600)
  }

  const toggleListening = () => {
    if (mentorState === 'listening') {
      setMentorState('idle')
    } else {
      setMentorState('listening')
      setTimeout(() => {
        handleSend(t.mentor.sampleQuestion || 'Explain Quantum Superposition in simple terms')
      }, 3200)
    }
  }

  const replayVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && currentResponse) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentResponse)
      utterance.lang = getSpeechLang()
      utterance.rate = 1.0
      utterance.onstart = () => setMentorState('speaking')
      utterance.onend = () => setMentorState('confident')
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* ─── Top Stage Header ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/70 dark:bg-[#00171F]/80 backdrop-blur-xl border border-[#257874]/20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#257874]/15 flex items-center justify-center border border-[#257874]/30">
            <Cpu className="w-6 h-6 text-[#257874]" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[var(--aura-text)]">
              {t.mentor.title}
            </h2>
            <p className="text-xs text-[var(--aura-text-muted)] flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#35C88A] animate-pulse" />
              <span>{t.mentor.personaActive}</span>
            </p>
          </div>
        </div>

        {/* Quick Character Pose State Manual Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto aura-scroll max-w-xl py-1">
          {characterStates.map((st) => (
            <button
              key={st.id}
              onClick={() => setMentorState(st.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                mentorState === st.id
                  ? 'bg-[#257874] text-white border-[#257874] shadow-md scale-105'
                  : 'bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text-muted)] hover:border-[#257874]'
              }`}
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Futuristic 3D VRM Stage & Floating Speech Card ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Center Stage: VRM 3D Viewport (7 Cols) */}
        <div className="lg:col-span-7 relative">
          <VRMAvatarCanvas mentorState={mentorState} />

          {/* Pedagogy Floating Pills Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#00171F]/80 backdrop-blur-xl border border-[#257874]/30">
            {pedagogyOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPedagogy(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  pedagogy === opt.id
                    ? 'bg-[#257874] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Stage: Floating Glassmorphic Speech Card & Interaction HUD (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-3xl bg-white/80 dark:bg-[#00171F]/85 backdrop-blur-2xl border border-[#257874]/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#257874]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Active User Prompt Pill */}
          {activePrompt && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-[#257874]/10 border border-[#257874]/30 text-xs font-semibold text-[#257874] dark:text-[#35C88A] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>"{activePrompt}"</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#257874]/20">Active Query</span>
            </motion.div>
          )}

          {/* Main Floating Speech Output Card */}
          <div className="flex-1 flex flex-col justify-center py-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--aura-border)] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#35C88A]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#257874] dark:text-[#35C88A]">
                  AURA AI Companion Spoken Response
                </span>
              </div>
              <button
                onClick={replayVoice}
                className="p-2 rounded-xl bg-[var(--aura-surface)] border border-[var(--aura-border)] hover:border-[#257874] text-[var(--aura-text)] transition-all"
                title="Replay Voice Speech"
              >
                <Volume2 className="w-4 h-4 text-[#257874]" />
              </button>
            </div>

            <p className="text-sm sm:text-base leading-relaxed font-medium text-[var(--aura-text)] min-h-[120px] whitespace-pre-line">
              {displayedText || t.mentor.welcomeMessage}
              {displayedText.length < currentResponse.length && (
                <span className="inline-block w-1.5 h-4 bg-[#35C88A] animate-pulse ml-1" />
              )}
            </p>
          </div>

          {/* Quick Action Sample Prompts */}
          <div className="space-y-2 pt-2 border-t border-[var(--aura-border)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block">
              Suggested AI Prompts
            </span>
            <div className="flex flex-col gap-1.5">
              {[
                'Explain Quantum Superposition in simple terms',
                'What are the core design principles of AURA AI Engine?',
                'Give me a step-by-step roadmap for Machine Learning',
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="text-left p-2.5 rounded-xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs text-[var(--aura-text-muted)] hover:text-[var(--aura-text)] hover:border-[#257874] transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{p}</span>
                  <Zap className="w-3.5 h-3.5 text-[#257874] group-hover:scale-110 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Floating Spatial Input Controls Bar ─── */}
      <div className="p-4 rounded-3xl bg-white/80 dark:bg-[#00171F]/90 backdrop-blur-2xl border border-[#257874]/30 shadow-2xl flex items-center gap-3">
        <button
          onClick={toggleListening}
          className={`p-3.5 rounded-2xl border transition-all ${
            mentorState === 'listening'
              ? 'bg-rose-500 text-white border-rose-500 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.4)]'
              : 'bg-[var(--aura-surface)] text-[var(--aura-text)] border-[var(--aura-border)] hover:border-[#257874]'
          }`}
          title="Voice Speech Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.mentor.askPlaceholder}
          className="flex-1 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs sm:text-sm text-[var(--aura-text)] placeholder-[var(--aura-text-muted)] focus:outline-none focus:border-[#257874]"
        />

        <button
          onClick={() => handleSend()}
          className="px-6 py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold hover:bg-[#1f6360] transition-all shadow-lg shadow-[#257874]/30 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{t.mentor.send}</span>
        </button>
      </div>
    </div>
  )
}
