'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Send,
  Cpu,
  Zap,
  MessageSquare,
  Key,
  CheckCircle,
  X,
  VolumeX,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'
import { sendAIMessage } from '@/lib/ai-service'
import {
  EMOTION_PROFILES,
  analyzeQuestionSentiment,
  type EmotionType,
} from '@/lib/emotion-engine'
import {
  speakAuraMentor,
  stopAuraMentor,
  VOICE_GENDER,
  initVoiceEngine,
} from '@/lib/voice-config'
import dynamic from 'next/dynamic'
import type { VRMState } from '@/components/VRMAvatarCanvas'
import QuizAssessmentEngine from '@/components/QuizAssessmentEngine'

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
  const { role, englishMode, topics, activeTopicId, currentXP, streakDays } = useLearning()

  const [activeTab, setActiveTab] = useState<'mentor' | 'assessment'>('mentor')
  const [mentorState, setMentorState] = useState<VRMState>('idle')
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('happy')
  const [currentPitch, setCurrentPitch] = useState<number>(1.18)
  const [currentRate, setCurrentRate] = useState<number>(1.02)
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [isListening, setIsListening] = useState<boolean>(false)

  const [pedagogy, setPedagogy] = useState<PedagogyMode>('story')
  const [inputText, setInputText] = useState('')
  const [currentResponse, setCurrentResponse] = useState<string>('')
  const [displayedText, setDisplayedText] = useState<string>('')
  const [activePrompt, setActivePrompt] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // API Key & Provider configuration state
  const [showApiModal, setShowApiModal] = useState<boolean>(false)
  const [customApiKey, setCustomApiKey] = useState<string>('')
  const [selectedProvider, setSelectedProvider] = useState<'aura-adaptive' | 'gemini' | 'openai'>('aura-adaptive')
  const [tempApiKey, setTempApiKey] = useState<string>('')
  const [keySavedToast, setKeySavedToast] = useState<boolean>(false)

  const recognitionRef = useRef<any>(null)

  // Pre-warm Web Speech female voices & load saved API configurations
  useEffect(() => {
    initVoiceEngine()

    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('aura_api_key') || ''
      const savedProvider = (localStorage.getItem('aura_ai_provider') as any) || 'aura-adaptive'
      setCustomApiKey(savedKey)
      setTempApiKey(savedKey)
      setSelectedProvider(savedProvider)
    }

    return () => {
      stopAuraMentor()
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Initialize welcome message with persona-adapted tone
  useEffect(() => {
    let welcome = ''
    if (englishMode === 'genz' && lang === 'en') {
      welcome = "Yo! I'm AURA, your 3D AI mentor 🔥 I track what you know, find what's missing, and adapt how I teach you. What are we tackling today?"
    } else if (lang === 'hi') {
      welcome = 'नमस्ते! मैं ऑरा (AURA) हूँ, आपका 3D एआई मेंटर। आइए आज कुछ नया सीखें और अपनी कमियों को दूर करें!'
    } else if (lang === 'mr') {
      welcome = 'नमस्कार! मी ऑरा, तुमचा 3D एआय मार्गदर्शक. आज आपण कोणत्या विषयाचा सराव करणार आहोत?'
    } else {
      welcome = t.mentor.welcomeMessage || 'Hello! I am AURA, your adaptive 3D AI mentor. Ask a question or run a diagnostic test to begin.'
    }
    setCurrentResponse(welcome)
    setDisplayedText(welcome)
    setCurrentEmotion('happy')
    setCurrentPitch(EMOTION_PROFILES.happy.pitch)
    setCurrentRate(EMOTION_PROFILES.happy.rate)
    setMentorState('happy')
  }, [lang, englishMode, t.mentor.welcomeMessage])

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
    }, 20)

    return () => clearInterval(interval)
  }, [currentResponse])

  const pedagogyOptions = (t.mentor.modes || []).map((m) => ({
    id: m.id as PedagogyMode,
    name: m.name,
    desc: m.desc,
  }))

  const handleSaveApiKey = () => {
    setCustomApiKey(tempApiKey)
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_api_key', tempApiKey)
      localStorage.setItem('aura_ai_provider', selectedProvider)
    }
    setKeySavedToast(true)
    setTimeout(() => {
      setKeySavedToast(false)
      setShowApiModal(false)
    }, 1200)
  }

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText
    if (!textToSend.trim() || isLoading) return

    setActivePrompt(textToSend)
    if (!overrideText) setInputText('')
    setIsLoading(true)

    // Stop ongoing speech
    stopAuraMentor()
    setIsSpeaking(false)

    // ─── 1. Instant Reaction to User's Question (THINKING state) ───
    const sentiment = analyzeQuestionSentiment(textToSend)
    setCurrentEmotion(sentiment.immediateReaction)
    setCurrentPitch(sentiment.pitch)
    setCurrentRate(sentiment.rate)
    setMentorState('thinking')
    setCurrentResponse('')

    // Identify active gap context from learning store
    const activeTopic = topics.find((tp) => tp.id === activeTopicId) || topics[0]
    const criticalGap = activeTopic?.subtopics.find((st) => st.status === 'Critical Gap')

    try {
      const response = await sendAIMessage({
        prompt: textToSend,
        role,
        englishMode,
        language: lang,
        pedagogyMode: pedagogy,
        customApiKey: customApiKey || undefined,
        customProvider: selectedProvider !== 'aura-adaptive' ? selectedProvider : undefined,
        context: {
          activeTopic: activeTopic?.name,
          identifiedGap: criticalGap?.name,
          recentAccuracy: activeTopic?.overallScore,
        },
      })

      setCurrentResponse(response.text)
      setCurrentEmotion(response.emotion)
      setCurrentPitch(response.pitch)
      setCurrentRate(response.rate)

      // ─── 2. Adaptive Female AI Voice Output & Synchronized Lip-Sync ───
      speakAuraMentor(response.text, {
        lang: getSpeechLang(),
        pitch: response.pitch,
        rate: response.rate,
        onStart: () => {
          setIsSpeaking(true)
          setMentorState('speaking')
        },
        onEnd: () => {
          setIsSpeaking(false)
          setMentorState(response.suggestedState || 'idle')
        },
        onError: () => {
          setIsSpeaking(false)
          setMentorState('idle')
        },
      })
    } catch {
      const fallback = 'Concept analyzed. Let us explore this topic with targeted practice and examples.'
      setCurrentResponse(fallback)
      setCurrentEmotion('confident')
      setCurrentPitch(1.12)
      setMentorState('happy')

      speakAuraMentor(fallback, {
        lang: getSpeechLang(),
        pitch: 1.14,
        onStart: () => {
          setIsSpeaking(true)
          setMentorState('speaking')
        },
        onEnd: () => {
          setIsSpeaking(false)
          setMentorState('happy')
        },
        onError: () => {
          setIsSpeaking(false)
          setMentorState('idle')
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Live Speech Recognition (STT)
  const toggleListening = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
      setMentorState('idle')
      setCurrentEmotion('idle')
      return
    }

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser. Please type your query in the text box.')
      return
    }

    // Stop speaking when user wants to talk
    stopAuraMentor()
    setIsSpeaking(false)

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = getSpeechLang()
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
        setMentorState('listening')
        setCurrentEmotion('listening')
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript
        if (transcript) {
          setInputText(transcript)
          setIsListening(false)
          handleSend(transcript)
        }
      }

      recognition.onerror = () => {
        setIsListening(false)
        setMentorState('idle')
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (err) {
      console.warn('Speech recognition error:', err)
      setIsListening(false)
      setMentorState('idle')
    }
  }

  const stopVoice = () => {
    stopAuraMentor()
    setIsSpeaking(false)
    setMentorState(currentEmotion as any || 'idle')
  }

  const replayVoice = () => {
    if (!currentResponse) return
    speakAuraMentor(currentResponse, {
      lang: getSpeechLang(),
      pitch: currentPitch,
      rate: currentRate,
      onStart: () => {
        setIsSpeaking(true)
        setMentorState('speaking')
      },
      onEnd: () => {
        setIsSpeaking(false)
        setMentorState(currentEmotion as any || 'idle')
      },
      onError: () => {
        setIsSpeaking(false)
        setMentorState('idle')
      },
    })
  }

  // Interactive Click on Avatar
  const handleCharacterClick = () => {
    if (isSpeaking) {
      stopVoice()
      return
    }
    const greetings = [
      "I'm here and ready to help! What topic would you like to explore?",
      "Hello! Feel free to ask me questions, and I'll adapt my explanation to your style.",
      "Tracking your learning path in real time. Let me know where you feel stuck!",
    ]
    const chosen = greetings[Math.floor(Math.random() * greetings.length)]
    setCurrentResponse(chosen)
    setDisplayedText(chosen)
    setCurrentEmotion('happy')
    setMentorState('happy')

    speakAuraMentor(chosen, {
      lang: getSpeechLang(),
      pitch: 1.18,
      onStart: () => {
        setIsSpeaking(true)
        setMentorState('speaking')
      },
      onEnd: () => {
        setIsSpeaking(false)
        setMentorState('happy')
      },
      onError: () => {
        setIsSpeaking(false)
        setMentorState('idle')
      },
    })
  }

  // Live assessment reaction handler
  const handleQuizReaction = (state: VRMState) => {
    setMentorState(state)
    if (state === 'celebrating') {
      setCurrentEmotion('celebrating')
      setCurrentPitch(1.35)
      setCurrentRate(1.12)
    } else if (state === 'concerned') {
      setCurrentEmotion('concerned')
      setCurrentPitch(0.96)
      setCurrentRate(0.98)
    } else {
      setCurrentEmotion('explaining')
      setCurrentPitch(1.14)
    }
  }

  const activeProfile = EMOTION_PROFILES[currentEmotion] || EMOTION_PROFILES.idle

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* ─── Top Mode Selector HUD ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/70 dark:bg-[#00171F]/80 backdrop-blur-xl border border-[#257874]/20 shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#257874]/10 text-[#257874] dark:text-[#35C88A]">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[var(--aura-text)]">
              {t.mentor.title || 'AURA Adaptive AI Mentor'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#35C88A] animate-pulse" />
              <span className="text-xs text-[var(--aura-text-muted)]">
                Persona: {englishMode === 'genz' ? 'Gen-Z Senior Mentor' : 'Professional AI Mentor'}
              </span>
              <span className="text-[10px] font-mono text-[#35C88A] bg-[#35C88A]/10 px-2 py-0.5 rounded-full">
                {currentXP} XP • {streakDays} Day Streak 🔥
              </span>
              {/* Dynamic Emotion & Voice Gender HUD Pill */}
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span>{activeProfile.emoji}</span>
                <span>{activeProfile.label}</span>
                <span className="text-[10px] font-mono opacity-80">(♀ Female Voice • {currentPitch.toFixed(2)}x)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab & Settings Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* API Key Quick Button */}
          <button
            onClick={() => setShowApiModal(true)}
            className="px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]"
            title="Configure Cloud AI Provider & Custom API Key"
          >
            <Key className="w-3.5 h-3.5 text-[#35C88A]" />
            <span>
              {selectedProvider === 'aura-adaptive'
                ? 'Local Engine'
                : selectedProvider === 'gemini'
                ? 'Gemini Cloud'
                : 'OpenAI Cloud'}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('mentor')
              setCurrentEmotion('happy')
              setMentorState('happy')
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'mentor'
                ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                : 'bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text-muted)] hover:border-[#257874]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Interactive Mentor</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('assessment')
              setCurrentEmotion('explaining')
              setMentorState('explaining')
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'assessment'
                ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                : 'bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text-muted)] hover:border-[#257874]'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Diagnostic & Quiz Engine</span>
          </button>
        </div>
      </div>

      {activeTab === 'assessment' ? (
        /* ─── Embedded Quiz & Knowledge Gap Diagnostic Stage ─── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4">
            <VRMAvatarCanvas
              mentorState={mentorState}
              emotion={currentEmotion}
              isSpeaking={isSpeaking}
              isListening={isListening}
              currentPitch={currentPitch}
              onCharacterClick={handleCharacterClick}
            />
            <div className="p-4 mt-3 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs text-[var(--aura-text-muted)] text-center">
              <span className="font-bold text-[var(--aura-text)] block mb-1">Live Assessment Reactions</span>
              Aura's facial expressions and female voice pitch react dynamically to every question accuracy.
            </div>
          </div>
          <div className="lg:col-span-8">
            <QuizAssessmentEngine onCharacterReaction={handleQuizReaction} />
          </div>
        </div>
      ) : (
        /* ─── Interactive 3D Mentor Stage ─── */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch spatial-perspective">
            {/* Left / Center Stage: VRM 3D Viewport (7 Cols) */}
            <div className="lg:col-span-7 relative">
              <VRMAvatarCanvas
                mentorState={mentorState}
                emotion={currentEmotion}
                isSpeaking={isSpeaking}
                isListening={isListening}
                currentPitch={currentPitch}
                onCharacterClick={handleCharacterClick}
              />

              {/* Floating Spatial Telemetry: Active Topic Focus (Left) */}
              <div className="absolute top-16 left-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00171F]/75 backdrop-blur-md border border-[#257874]/30 text-[10px] font-mono text-[#35C88A] shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35C88A] animate-pulse" />
                <span>SPATIAL FOCUS: {topics.find((tp) => tp.id === activeTopicId)?.name || 'General Computer Science'}</span>
              </div>

              {/* Floating Spatial Telemetry: Voice Persona & Pitch Indicator (Right) */}
              <div className="absolute top-16 right-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00171F]/75 backdrop-blur-md border border-[#257874]/30 text-[10px] font-mono text-gray-300 shadow-md">
                <span className="text-[9px] uppercase tracking-wider text-[#35C88A] font-bold">♀ FEMALE AI VOICE</span>
                <span className="text-[9px] text-gray-400">|</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">PITCH</span>
                <span className="font-bold text-[#35C88A]">{currentPitch.toFixed(2)}x</span>
              </div>

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
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 rounded-3xl spatial-glass border border-[#257874]/35 shadow-2xl relative overflow-hidden spatial-surface-3d">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#257874]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Active User Prompt Pill */}
              {activePrompt && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-[#257874]/10 border border-[#257874]/30 text-xs font-semibold text-[#257874] dark:text-[#35C88A] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">"{activePrompt}"</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#257874]/20 shrink-0">
                    Query
                  </span>
                </motion.div>
              )}

              {/* Main Floating Speech Output Card */}
              <div className="flex-1 flex flex-col justify-center py-4">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--aura-border)] mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#35C88A]" />
                    <span className="text-xs font-black uppercase tracking-wider text-[#257874] dark:text-[#35C88A]">
                      AURA Mentor Response
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isSpeaking ? (
                      <button
                        onClick={stopVoice}
                        className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1 text-xs"
                        title="Stop speaking"
                      >
                        <VolumeX className="w-4 h-4" />
                        <span className="hidden sm:inline">Mute</span>
                      </button>
                    ) : (
                      <button
                        onClick={replayVoice}
                        className="p-2 rounded-xl bg-[var(--aura-surface)] border border-[var(--aura-border)] hover:border-[#257874] text-[var(--aura-text)] transition-all flex items-center gap-1 text-xs"
                        title="Replay Voice Speech with Pitch Modulation"
                      >
                        <Volume2 className="w-4 h-4 text-[#257874]" />
                        <span className="hidden sm:inline">Replay</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-sm sm:text-base leading-relaxed font-medium text-[var(--aura-text)] min-h-[140px] max-h-[320px] overflow-y-auto aura-scroll whitespace-pre-line pr-2">
                  {displayedText || t.mentor.welcomeMessage}
                  {displayedText.length < currentResponse.length && (
                    <span className="inline-block w-1.5 h-4 bg-[#35C88A] animate-pulse ml-1" />
                  )}
                </div>
              </div>

              {/* Quick Action Sample Prompts Targeting Knowledge Gaps */}
              <div className="space-y-2 pt-2 border-t border-[var(--aura-border)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block">
                  Interactive Emotion Test Prompts
                </span>
                <div className="flex flex-col gap-1.5">
                  {[
                    {
                      label: "I don't understand SQL joins, why is LEFT JOIN giving NULLs?",
                      tag: '🤔 Empathetic / Lower Pitch',
                    },
                    {
                      label: 'Explain Database Normalization (1NF to 3NF) with a simple example',
                      tag: '💡 Teaching / Clear Pitch',
                    },
                    {
                      label: 'I just solved the hardest problem and got 100%!',
                      tag: '🎉 Celebrate / High Pitch',
                    },
                    {
                      label: 'How does CIDR subnetting calculation work in Computer Networks?',
                      tag: '🧠 Deep Analysis',
                    },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p.label)}
                      className="text-left p-2.5 rounded-xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs text-[var(--aura-text-muted)] hover:text-[var(--aura-text)] hover:border-[#257874] transition-all flex items-center justify-between group"
                    >
                      <span className="truncate pr-2">{p.label}</span>
                      <span className="text-[10px] font-mono text-[#35C88A] bg-[#35C88A]/10 px-2 py-0.5 rounded-full shrink-0">
                        {p.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Bottom Floating Input Controls Bar ─── */}
          <div className="p-4 rounded-3xl bg-white/80 dark:bg-[#00171F]/90 backdrop-blur-2xl border border-[#257874]/30 shadow-2xl flex items-center gap-3">
            <button
              onClick={toggleListening}
              className={`p-3.5 rounded-2xl border transition-all ${
                isListening || mentorState === 'listening'
                  ? 'bg-rose-500 text-white border-rose-500 animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                  : 'bg-[var(--aura-surface)] text-[var(--aura-text)] border-[var(--aura-border)] hover:border-[#257874]'
              }`}
              title={isListening ? 'Listening (Click to stop)' : 'Voice Speech Input'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.mentor.askPlaceholder || 'Ask Aura anything or explore a difficult topic...'}
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs sm:text-sm text-[var(--aura-text)] placeholder-[var(--aura-text-muted)] focus:outline-none focus:border-[#257874]"
            />

            <button
              disabled={isLoading}
              onClick={() => handleSend()}
              className="px-6 py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold hover:bg-[#1f6360] transition-all shadow-lg shadow-[#257874]/30 flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.mentor.send || 'Send'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── AI Provider & API Key Modal ─── */}
      <AnimatePresence>
        {showApiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-2xl text-[var(--aura-text)] space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--aura-border)]">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#35C88A]" />
                  <h3 className="font-extrabold text-base">AI Engine & API Key Setup</h3>
                </div>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {keySavedToast && (
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>API Settings saved! Aura will use your custom key.</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-2 text-[var(--aura-text-muted)]">
                    Choose AI Engine:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProvider('aura-adaptive')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedProvider === 'aura-adaptive'
                          ? 'bg-[#257874] text-white border-[#257874]'
                          : 'bg-white/5 border-[var(--aura-border)] text-[var(--aura-text)]'
                      }`}
                    >
                      <div className="font-bold">Aura Local</div>
                      <div className="text-[10px] opacity-75">Zero Cost</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProvider('gemini')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedProvider === 'gemini'
                          ? 'bg-[#257874] text-white border-[#257874]'
                          : 'bg-white/5 border-[var(--aura-border)] text-[var(--aura-text)]'
                      }`}
                    >
                      <div className="font-bold">Google Gemini</div>
                      <div className="text-[10px] opacity-75">Recommended</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProvider('openai')}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedProvider === 'openai'
                          ? 'bg-[#257874] text-white border-[#257874]'
                          : 'bg-white/5 border-[var(--aura-border)] text-[var(--aura-text)]'
                      }`}
                    >
                      <div className="font-bold">OpenAI</div>
                      <div className="text-[10px] opacity-75">GPT-4o Mini</div>
                    </button>
                  </div>
                </div>

                {selectedProvider !== 'aura-adaptive' && (
                  <div className="space-y-2">
                    <label className="font-bold uppercase tracking-wider block text-[var(--aura-text-muted)]">
                      {selectedProvider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}:
                    </label>
                    <input
                      type="password"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                      placeholder={selectedProvider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
                    />
                    <p className="text-[10px] text-[var(--aura-text-muted)] leading-relaxed">
                      Your key is kept safe on your local browser and sent directly to the AI service.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--aura-border)]">
                <button
                  onClick={() => setShowApiModal(false)}
                  className="px-4 py-2.5 rounded-2xl border border-[var(--aura-border)] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApiKey}
                  className="px-5 py-2.5 rounded-2xl bg-[#257874] text-white text-xs font-bold hover:bg-[#1f6360] transition-all shadow-md"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
