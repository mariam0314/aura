'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Bot,
  Volume2,
  CheckCircle2,
  Languages,
  ShieldCheck,
  TrendingUp,
  Brain,
  Layers,
  GraduationCap,
  Play,
  Smile,
  LogOut,
  User,
  Globe,
  ChevronDown,
  Menu,
  X,
  Compass,
  MessageSquare,
} from 'lucide-react'
import VRMAvatarCanvas, { type VRMState } from '@/components/VRMAvatarCanvas'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { languageOptions, type LangCode } from '@/i18n/translations'
import { speakAuraMentor, stopAuraMentor } from '@/lib/voice-config'

export default function AuraHomePage() {
  const router = useRouter()
  const { lang, setLang, t } = useLanguage()
  const { user, isAuthenticated, isLoading, logout, updateLanguagePreference } = useAuth()

  const [mentorState, setMentorState] = useState<VRMState>('idle')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [activeExpression, setActiveExpression] = useState<VRMState>('smile')

  // Check if first-time user needs to choose language
  useEffect(() => {
    if (user && !user.selected_language && typeof window !== 'undefined') {
      const hasChosen = localStorage.getItem('aura_lang_chosen')
      if (!hasChosen) {
        setShowLanguageModal(true)
      }
    }
  }, [user])

  // Language greeting texts
  const greetings: Record<string, { text: string; locale: string }> = {
    en: { text: "Hello! I am AURA, your 3D female AI educational mentor. What would you like to master today?", locale: 'en-US' },
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

  const handleAuditionVoice = (targetLang?: string) => {
    if (isSpeaking) {
      stopAuraMentor()
      setIsSpeaking(false)
      setMentorState('idle')
      return
    }

    const currentCode = targetLang || lang
    const greetingObj = greetings[currentCode] || greetings.en

    speakAuraMentor(greetingObj.text, {
      lang: greetingObj.locale,
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

  const handleSelectLanguage = async (code: LangCode) => {
    setLang(code)
    setShowLanguageModal(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_lang_chosen', 'true')
    }
    if (isAuthenticated) {
      await updateLanguagePreference(code)
    }
    // Greet in the new language
    setTimeout(() => {
      handleAuditionVoice(code)
    }, 400)
  }

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0]

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] selection:bg-emerald-500 selection:text-black relative">


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION WITH FULL AURA FACE (Requirements 8 & 9)   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Obsidian & Emerald Atmosphere */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-tr from-emerald-600 via-[#10b981] to-teal-800 -z-10" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* System Online Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>[ ● SYSTEM ONLINE ]</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Personalized <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-[#35C88A] bg-clip-text text-transparent">
                Pedagogy
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              AURA is an intelligent, character-driven AI educational mentor. She adapts dynamically to your learning pace, detects cognitive knowledge gaps, and provides 1-on-1 tutoring with natural female voice synthesis in 11 languages.
            </p>

            {/* Buttons: Start Learning, Curriculum, Progress */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/aura"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-sm sm:text-base font-black uppercase tracking-wider shadow-[0_8px_32px_rgba(16,185,129,0.45)] transition-all hover:scale-105 flex items-center gap-2.5 group"
              >
                <span>Start Learning (3D Mentor)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/learn"
                className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold transition-all flex items-center gap-2 hover:border-emerald-500/50"
              >
                <Brain className="w-4 h-4 text-emerald-400" />
                <span>Explore Curriculum</span>
              </Link>

              <Link
                href="/progress"
                className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-bold transition-all flex items-center gap-2 hover:border-emerald-500/50"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Track Progress</span>
              </Link>
            </div>

            {/* Quick Status Bar */}
            <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Female Voice Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="uppercase">{currentLangObj.name} Mode</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column: AURA Character 3D Hologram Studio (FULL FACE VISIBILITY) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl bg-[#03151D]/80 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] overflow-hidden">
              {/* Studio Header Bar */}
              <div className="px-5 py-3.5 bg-[#05202B]/90 border-b border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
                    AURA.VRM • FULL FACE PERSPECTIVE
                  </div>
                </div>

                <button
                  onClick={() => handleAuditionVoice()}
                  className="px-3 py-1.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all shadow-sm"
                  title="Audition Aura's female mentor voice"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isSpeaking ? 'Speaking...' : 'Audition Female Voice'}</span>
                </button>
              </div>

              {/* 3D Canvas Container: Full Face Priority */}
              <div className="relative w-full h-[480px] sm:h-[540px]">
                <VRMAvatarCanvas
                  mentorState={mentorState}
                  isSpeaking={isSpeaking}
                  onCharacterClick={() => handleAuditionVoice()}
                />
              </div>

              {/* Bottom HUD */}
              <div className="px-5 py-3 bg-[#031219]/90 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HEAD-AND-SHOULDERS FRAMING • REAL-TIME 60 FPS</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                  <span>10 Natural Expressions</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CONNECTED AURA WORKSPACES & PAGES (Direct Navigation)         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative border-t border-white/5 bg-[#01090e]/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Application Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              AURA Workspaces & Pages
            </h2>
            <p className="text-sm text-gray-400">
              Direct access to all 3D studios, curriculum modules, mastery analytics, and platform resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '3D AI Character Mentor',
                href: '/aura',
                badge: 'Live 3D Studio',
                icon: Bot,
                desc: 'Enter the interactive 3D VRM workspace. Converse with AURA with full facial visibility, emotional expressions, and live female voice output.',
                cta: 'Enter 3D Mentor Studio',
                highlight: true,
              },
              {
                title: 'Adaptive Learning Engine',
                href: '/learn',
                badge: 'Curriculum & Lessons',
                icon: Brain,
                desc: 'Personalized curriculum lessons, cognitive gap identification, and concept scaffolding adapted to your learning velocity.',
                cta: 'Explore Curriculum',
                highlight: true,
              },
              {
                title: 'Progress & Cognitive Analytics',
                href: '/progress',
                badge: 'Mastery Metrics',
                icon: TrendingUp,
                desc: 'Real-time XP tracking, daily study streaks, retention curve diagnostics, and concept mastery breakdown.',
                cta: 'View Progress Analytics',
                highlight: false,
              },
              {
                title: 'How It Works Guide',
                href: '/how-it-works',
                badge: 'Architecture',
                icon: Compass,
                desc: 'Discover the complete 4-step pedagogical lifecycle, from initial registration to continuous reinforcement.',
                cta: 'View Workflow Guide',
                highlight: false,
              },
              {
                title: 'Multilingual Voice Lab',
                href: '/languages',
                badge: '11 Dialects Active',
                icon: Languages,
                desc: 'Audition AURA’s natural female speech synthesis in English, Hindi, Marathi, Gujarati, Tamil, Telugu, and more.',
                cta: 'Audition All Languages',
                highlight: false,
              },
              {
                title: 'Intelligent Features Matrix',
                href: '/features',
                badge: 'Core Capabilities',
                icon: Cpu,
                desc: 'Explore the 7 foundational pillars powering AURA pedagogical intelligence and VRM emotion engine.',
                cta: 'Explore All Features',
                highlight: false,
              },
              {
                title: 'About AURA Platform',
                href: '/about',
                badge: 'Cognitive Research',
                icon: Sparkles,
                desc: 'Learn about the cognitive science, pedagogical research, and multimodal AI architecture behind AURA.',
                cta: 'Read Mission & Research',
                highlight: false,
              },
              {
                title: 'Contact & Student Support',
                href: '/contact',
                badge: 'Help & Inquiries',
                icon: MessageSquare,
                desc: 'Get in touch with the AURA team for student support, curriculum inquiries, or technical feedback.',
                cta: 'Contact Support',
                highlight: false,
              },
              {
                title: 'Student Profile & Settings',
                href: '/profile',
                badge: 'Preferences',
                icon: User,
                desc: 'Configure your active dialect, learning style, female voice pitch, and personal account settings.',
                cta: 'Manage Profile Settings',
                highlight: false,
              },
            ].map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  module.highlight
                    ? 'bg-gradient-to-b from-[#031d27] to-[#02141c] border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:border-emerald-400 hover:scale-[1.02]'
                    : 'bg-[#03151D]/70 border-white/10 hover:border-emerald-500/40 hover:bg-[#03151D] hover:scale-[1.01]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <module.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-emerald-300">
                      {module.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mt-2">
                      {module.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-emerald-400 mt-4">
                  <span>{module.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. ABOUT AURA SECTION (Requirement 10)                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>About The Platform</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              About AURA AI
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Designed from pedagogical first principles to replace static textbooks with an empathetic, personalized 3D cognitive tutor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-[#03151D]/70 border border-emerald-500/20 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Adaptive Cognitive Engine</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                AURA identifies the exact cognitive bottlenecks where you hesitate, dynamically modulating explanation depth from high-level intuition down to rigorous mathematical proofs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#03151D]/70 border border-emerald-500/20 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Multilingual Pedagogy</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Language should never be a barrier to STEM mastery. AURA explains complex computer science, mathematics, and science concepts natively in 11 Indian and global languages.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#03151D]/70 border border-emerald-500/20 space-y-4 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3D Character Presence</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                A life-like female VRM mentor who blinks, displays emotions (thinking, smile, encouraging, confused), and moves her mouth in sync with live synthesized speech.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all hover:scale-105"
            >
              <span>Explore In-Depth About Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. CORE FEATURES SECTION (Requirement 10)                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 relative bg-[#01090e]/60 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Capabilities Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Intelligent Features
            </h2>
            <p className="text-sm text-gray-400">
              Explore the 7 foundational pillars powering the AURA educational intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Personalized Learning',
                desc: 'Tailors every curriculum lesson, practice question, and pace to your individual knowledge gaps.',
              },
              {
                icon: Bot,
                title: 'AI Educational Assistant',
                desc: 'Context-aware 24/7 mentor answering questions, decomposing code, and solving complex problems.',
              },
              {
                icon: Languages,
                title: 'Multilingual Learning',
                desc: 'Native support across English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, Urdu.',
              },
              {
                icon: Volume2,
                title: 'Voice Interaction',
                desc: 'Clear, natural female audio output with high-fidelity pitch calibration and real-time auditory synthesis.',
              },
              {
                icon: Smile,
                title: 'Interactive AURA Character',
                desc: 'Full-face 3D avatar exhibiting 10 expressions (smile, thinking, encouraging, confused, happy) and speech lip sync.',
              },
              {
                icon: Brain,
                title: 'Adaptive Learning Engine',
                desc: 'Automatic question matrix tuning, cognitive reinforcement intervals, and real-time concept scaffolding.',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                desc: 'Real-time XP calculations, daily streak shields, mastery heatmaps, and milestone certifications.',
              },
            ].map((feat, idx) => (
              <div
                key={feat.title}
                className="p-6 rounded-3xl bg-[#03151D]/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all hover:scale-105"
            >
              <span>Explore Full Features Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. HOW IT WORKS SECTION (Requirement 10)                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step-by-Step Journey</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-gray-400">
              The seamless path from registration to 1-on-1 personalized AI learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Create Account',
                desc: 'Sign up with your Name, Email, and Password. All credentials are encrypted with bcrypt.',
              },
              {
                num: '02',
                title: 'Instant Sign In',
                desc: 'Log in directly with your Email and Password. No OTP or email verification wait times.',
              },
              {
                num: '03',
                title: 'Choose Language',
                desc: 'Select your preferred dialect among 11 supported languages and choose your learning tone.',
              },
              {
                num: '04',
                title: 'Start Learning',
                desc: 'Meet AURA in 3D, upload materials, ask questions, and learn with full-face interaction and voice speech.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-3xl bg-[#03151D]/70 border border-emerald-500/20 space-y-3 relative overflow-hidden"
              >
                <div className="text-3xl font-black font-mono text-emerald-400/30 mb-2">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all hover:scale-105"
            >
              <span>Explore Detailed Workflow & Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. LANGUAGES SHOWCASE SECTION (Requirement 10 & 12)           */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="languages" className="py-24 px-6 relative bg-[#01090e]/60 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multilingual Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Supported Languages
            </h2>
            <p className="text-sm text-gray-400">
              AURA speaks, listens, and responds fluently with female speech synthesis in all 11 languages. Click any dialect to audition her voice.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {languageOptions.map((opt) => (
              <div
                key={opt.code}
                onClick={() => handleSelectLanguage(opt.code)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 text-left group ${
                  lang === opt.code
                    ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#03151D]/70 border-white/10 hover:border-emerald-500/40 hover:bg-[#03151D]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{opt.flag}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAuditionVoice(opt.code)
                    }}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-emerald-400"
                    title={`Audition female ${opt.name} voice`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{opt.native}</h4>
                  <p className="text-[11px] text-gray-400">{opt.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/languages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all hover:scale-105"
            >
              <span>Open Dedicated Multilingual Voice Lab</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 7. AURA CHARACTER SHOWCASE (FULL FACE & EXPRESSIONS)          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Face & Facial Expressions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Meet Your 3D AI Mentor
            </h2>
            <p className="text-sm text-gray-400">
              Notice the complete face visibility — forehead, eyes, eyebrows, nose, mouth, cheeks, and chin are fully framed. Test her natural expressions:
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-[#03151D]/90 border border-emerald-500/30 p-6 shadow-2xl space-y-6">
            {/* Expression Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { state: 'smile', label: 'Smile' },
                { state: 'happy', label: 'Happy' },
                { state: 'thinking', label: 'Thinking' },
                { state: 'listening', label: 'Listening' },
                { state: 'encouraging', label: 'Encouraging' },
                { state: 'confused', label: 'Confused' },
                { state: 'excited', label: 'Excited' },
                { state: 'neutral', label: 'Neutral' },
              ].map((btn) => (
                <button
                  key={btn.state}
                  type="button"
                  onClick={() => {
                    setActiveExpression(btn.state as VRMState)
                    setMentorState(btn.state as VRMState)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeExpression === btn.state
                      ? 'bg-emerald-500 text-[#00171F] shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Character Container: 520px height for complete facial clarity */}
            <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden bg-[#020b10]">
              <VRMAvatarCanvas
                mentorState={activeExpression}
                isSpeaking={isSpeaking}
                onCharacterClick={() => handleAuditionVoice()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8. CTA SECTION (Requirement 10)                               */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-[#01090e]/60 to-[#03151D]/90 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Ready To Excel?</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Start Your Learning Session
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Enter the interactive 3D AI Mentor studio, upload textbooks or PDFs, and experience personalized pedagogy in {currentLangObj.name}.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/aura"
              className="px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-base font-black uppercase tracking-wider shadow-[0_8px_32px_rgba(16,185,129,0.5)] transition-all hover:scale-105 flex items-center gap-3"
            >
              <span>Launch AURA 3D Workspace</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 9. CHOOSE YOUR LANGUAGE MODAL (Requirement 11)                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLanguageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-xl p-8 rounded-3xl bg-[#03151D] border border-emerald-500/40 shadow-2xl space-y-6 text-center max-h-[90vh] overflow-y-auto aura-scroll"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                  <Languages className="w-4 h-4" />
                  <span>Personalized Linguistic Preference</span>
                </div>
                <h3 className="text-2xl font-black text-white">Choose Your Language</h3>
                <p className="text-xs text-gray-400">
                  Select your primary language. AURA will adapt her interface, female voice speech, and AI responses to this language.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => handleSelectLanguage(opt.code)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      lang === opt.code
                        ? 'bg-emerald-500 text-[#00171F] font-bold border-emerald-400 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-200 hover:border-emerald-500/40 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">{opt.flag}</span>
                    <div className="truncate">
                      <div className="text-xs font-bold">{opt.native}</div>
                      <div className="text-[10px] opacity-75">{opt.name}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="px-6 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white"
                >
                  Keep Current ({currentLangObj.name})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
