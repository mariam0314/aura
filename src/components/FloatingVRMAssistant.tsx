'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Send,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Zap,
} from 'lucide-react'
import VRMAvatarCanvas, { type VRMState } from './VRMAvatarCanvas'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'
import type { EmotionType } from '@/lib/emotion-engine'
import { speakAuraMentor, stopAuraMentor } from '@/lib/voice-config'

interface FloatingVRMAssistantProps {
  forceVisible?: boolean
}

export default function FloatingVRMAssistant({ forceVisible = false }: FloatingVRMAssistantProps) {
  const { lang, getSpeechLang } = useLanguage()
  const { currentXP } = useLearning()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputText, setInputText] = useState('')
  const [lastSpeech, setLastSpeech] = useState<string>(
    'Hi! I am AURA. I am tracking your learning progress as you explore. Ask me anything!'
  )
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [mentorEmotion, setMentorEmotion] = useState<EmotionType>('confident')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const recognitionRef = useRef<any>(null)

  // Scroll detection to show floating assistant when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Web Speech Synthesis (TTS) - Guaranteed Female Voice
  const speakText = (text: string) => {
    if (!soundEnabled) return

    speakAuraMentor(text, {
      lang: getSpeechLang(),
      onStart: () => {
        setIsSpeaking(true)
        setMentorEmotion('explaining')
      },
      onEnd: () => {
        setIsSpeaking(false)
        setMentorEmotion('confident')
      },
      onError: () => {
        setIsSpeaking(false)
        setMentorEmotion('idle')
      },
    })
  }

  // Web Speech Recognition (STT)
  const toggleListening = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use keyboard input.')
      return
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = getSpeechLang()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
        setMentorEmotion('thinking')
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
        handleAsk(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (err) {
      console.warn('Speech recognition start failed:', err)
      setIsListening(false)
    }
  }

  const handleAsk = async (queryText?: string) => {
    const query = (queryText || inputText).trim()
    if (!query || isLoading) return

    setIsLoading(true)
    setInputText('')
    setMentorEmotion('thinking')
    setLastSpeech('Analyzing context with AURA AI...')

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          language: lang,
          role: 'student',
          pedagogyMode: 'story',
          englishMode: 'genz',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const reply = data.text || 'Understood! Let me know if you would like to explore this further.'
        setLastSpeech(reply)
        setMentorEmotion(data.emotion || 'explaining')
        speakText(reply)
      } else {
        throw new Error('API failed')
      }
    } catch {
      const fallback = `I've analyzed your question: "${query}". We are continuously adapting your curriculum based on your performance.`
      setLastSpeech(fallback)
      setMentorEmotion('confident')
      speakText(fallback)
    } finally {
      setIsLoading(false)
    }
  }

  const shouldRender = forceVisible || isScrolled

  if (!shouldRender || !isOpen) return null

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-[90vw] sm:w-[360px] pointer-events-auto">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="rounded-3xl bg-[#03151D]/90 backdrop-blur-2xl border border-[#10b981]/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#05202B]/80 border-b border-[#10b981]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <div className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>AURA.VRM</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/15 text-emerald-300 font-mono font-bold">
                Online
              </span>
            </div>

            <div className="flex items-center gap-1 text-gray-400">
              <button
                onClick={() => {
                  if (soundEnabled) stopAuraMentor()
                  setSoundEnabled(!soundEnabled)
                }}
                className="p-1 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title={soundEnabled ? 'Mute Voice' : 'Unmute Voice'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  stopAuraMentor()
                  setIsOpen(false)
                }}
                className="p-1 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="p-3 space-y-3">
              {/* 3D VRM Canvas Window */}
              <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#001f26] to-[#001015] border border-[#10b981]/20 shadow-inner">
                <VRMAvatarCanvas
                  mentorState={isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle'}
                  emotion={mentorEmotion}
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                />
              </div>

              {/* Speech Bubble */}
              <div className="p-3 rounded-2xl bg-[#06222e]/80 border border-[#10b981]/20 text-xs text-gray-200 leading-relaxed shadow-sm max-h-28 overflow-y-auto aura-scroll">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AURA Companion</span>
                </div>
                <p>{lastSpeech}</p>
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto aura-scroll pb-1">
                {[
                  { label: 'Explain this section', text: 'Can you explain the main concept of this section in simple terms?' },
                  { label: 'Quiz me', text: 'Give me a quick 1-question quiz on the current topic.' },
                  { label: 'Study tip', text: 'What is the best way to master this topic quickly?' },
                ].map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(pill.text)}
                    className="px-2.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[10px] font-medium text-emerald-300 hover:bg-[#10b981]/20 whitespace-nowrap transition-all"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Input & Voice Controls */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAsk()
                }}
                className="flex items-center gap-2 pt-1"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask AURA anything..."
                    className="w-full px-3 py-2 pr-8 rounded-xl bg-[#051c26] border border-[#10b981]/30 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
                      isListening ? 'text-rose-400 animate-pulse' : 'text-gray-400 hover:text-emerald-400'
                    }`}
                    title={isListening ? 'Stop listening' : 'Speak to AURA'}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-md transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
