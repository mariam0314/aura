'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Home,
  Bot,
  FileText,
  HelpCircle,
  Layers,
  TrendingUp,
  MessageSquare,
  Settings,
  Search,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  RotateCw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Mic,
  Send,
  Download,
  AlertTriangle,
  User,
  Shield,
  BookOpen,
} from 'lucide-react'
import VRMAvatarCanvas from '@/components/VRMAvatarCanvas'
import DocumentProcessorSection from '@/components/DocumentProcessorSection'
import SmartQuizFlashcardMatrix from '@/components/SmartQuizFlashcardMatrix'
import ProgressGamificationSection from '@/components/ProgressGamificationSection'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'
import type { EmotionType } from '@/lib/emotion-engine'
import { speakAuraMentor } from '@/lib/voice-config'

type WorkspaceTab =
  | 'home'
  | 'my-aura'
  | 'documents'
  | 'smart-quiz'
  | 'flashcards'
  | 'learning-path'
  | 'progress'
  | 'ai-assistant'
  | 'settings'

interface DocumentRecord {
  id: string
  name: string
  type: 'PDF' | 'PPTX' | 'DOCX'
  score: string
  date: string
  status: 'Mastered' | 'In Progress' | 'Review Needed'
}

export default function StudentWorkspacePage() {
  const { lang, setLang, t, getSpeechLang } = useLanguage()
  const { currentXP, streakDays, quizAccuracy, topics, roadmap } = useLearning()

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [mentorSpeech, setMentorSpeech] = useState(
    'Welcome to your AURA Student Workspace! You have a 7-day streak active. What concept should we tackle today?'
  )
  const [mentorEmotion, setMentorEmotion] = useState<EmotionType>('happy')
  const [chatInput, setChatInput] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isChatLoading, setIsChatLoading] = useState(false)

  // Document format data table (shown in Frame 10s)
  const [documentRecords, setDocumentRecords] = useState<DocumentRecord[]>([
    {
      id: 'doc_1',
      name: 'Cloud_Architecture_Syllabus.pdf',
      type: 'PDF',
      score: '96.7%',
      date: 'Today, 2:30 PM',
      status: 'Mastered',
    },
    {
      id: 'doc_2',
      name: 'DBMS_Normalization_Chapter_4.docx',
      type: 'DOCX',
      score: '78.4%',
      date: 'Yesterday',
      status: 'In Progress',
    },
    {
      id: 'doc_3',
      name: 'Subnetting_CIDR_Lecture_Slides.pptx',
      type: 'PPTX',
      score: '54.2%',
      date: '3 days ago',
      status: 'Review Needed',
    },
    {
      id: 'doc_4',
      name: 'Operating_Systems_Concurrency.pdf',
      type: 'PDF',
      score: '88.5%',
      date: '5 days ago',
      status: 'Mastered',
    },
  ])

  // Speak text via TTS - Guaranteed Female Voice
  const speakText = (text: string) => {
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
      },
    })
  }

  // Handle Assistant Chat
  const handleAssistantSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isChatLoading) return

    const userMsg = chatInput.trim()
    setChatInput('')
    setIsChatLoading(true)
    setMentorEmotion('thinking')
    setMentorSpeech('Analyzing context with AURA AI...')

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          language: lang,
          role: 'student',
          pedagogyMode: 'deep',
          englishMode: 'genz',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const reply = data.text || 'Understood! I have logged this to your study plan.'
        setMentorSpeech(reply)
        setMentorEmotion(data.emotion || 'explaining')
        speakText(reply)
      } else {
        throw new Error('API failed')
      }
    } catch {
      const fallback = `Great question regarding "${userMsg}". In AURA, we deconstruct challenging topics into prerequisite sub-skills to guarantee complete cognitive retention.`
      setMentorSpeech(fallback)
      setMentorEmotion('confident')
      speakText(fallback)
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] flex">
      {/* ─── LEFT SIDEBAR (FRAME 10s) ─── */}
      <aside className="w-64 bg-[#03151D] border-r border-emerald-500/20 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-6 space-y-8">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="font-black text-sm tracking-wider">A</span>
            </div>
            <span className="text-xl font-black tracking-[0.25em] text-white">AURA</span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: 'home' as const, label: 'Home', icon: Home },
              { id: 'my-aura' as const, label: 'My AURA', icon: Bot },
              { id: 'documents' as const, label: 'Documents', icon: FileText },
              { id: 'smart-quiz' as const, label: 'Smart Quiz', icon: HelpCircle },
              { id: 'flashcards' as const, label: 'Flashcards', icon: RotateCw },
              { id: 'learning-path' as const, label: 'Learning Path', icon: Layers },
              { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
              { id: 'ai-assistant' as const, label: 'AI Assistant', icon: MessageSquare },
              { id: 'settings' as const, label: 'Settings', icon: Settings },
            ].map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-emerald-500 text-[#00171F] font-black shadow-[0_4px_16px_rgba(16,185,129,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#00171F]' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* User Profile Badge at Sidebar Bottom */}
        <div className="p-4 m-4 rounded-2xl bg-[#05202B]/80 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sm font-bold text-emerald-400">
              M
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-none">Maria</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Scholar (Lvl 12)</div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
            PRO
          </span>
        </div>
      </aside>

      {/* ─── MAIN WORKSPACE CONTENT ─── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto aura-scroll">
        {/* Top Header Bar */}
        <header className="h-16 px-6 bg-[#03151D]/80 border-b border-emerald-500/20 backdrop-blur-xl flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Mobile menu pill toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/" className="font-black text-emerald-400 tracking-wider">
              AURA
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Resources, topics, flashcards..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#051C26] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Live Learning status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Learning</span>
            </div>

            {/* Report Button */}
            <button
              onClick={() => {
                alert('Academic Progress Report generated! All diagnostic metrics are up to date.')
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 transition-colors"
            >
              <span>Report</span>
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-black text-[#00171F] shadow-md">
              M
            </div>
          </div>
        </header>

        {/* Tab 1: HOME (FRAME 10s STUDENT DASHBOARD) */}
        {activeTab === 'home' && (
          <div className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Student Dashboard
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Active semester: Computer Science & Systems Engineering • Cognitive Retention Matrix
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('documents')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* ─── Metric Gauges Row (Frame 10s: Overall Progress, Daily Streaks, Completed Tasks) ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Overall Progress Gauge */}
              <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/25 flex items-center gap-5 shadow-lg">
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10B981"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 * (1 - 0.967)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-white">96.7%</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Overall Progress</span>
                  <div className="text-xl font-black text-white mt-0.5">96.7% Recall</div>
                  <span className="text-[11px] text-emerald-400 font-bold block mt-1">+14% Growth Trend</span>
                </div>
              </div>

              {/* Daily Streak */}
              <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/25 flex items-center gap-5 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <Flame className="w-10 h-10 text-rose-500 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Daily Streak</span>
                  <div className="text-xl font-black text-white mt-0.5">{streakDays} Days 🔥</div>
                  <span className="text-[11px] text-emerald-400 font-bold block mt-1">Shield Active</span>
                </div>
              </div>

              {/* Completed Tasks */}
              <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/25 flex items-center gap-5 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Completed Tasks</span>
                  <div className="text-xl font-black text-white mt-0.5">24 / 28.5 hrs</div>
                  <span className="text-[11px] text-emerald-400 font-bold block mt-1">4 Modules Done</span>
                </div>
              </div>
            </div>

            {/* ─── Main Interactive Content & VRM Character (Frame 10s) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left / Center: Recent Files, Quizzes, Course Overview (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quick Action Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Recent Files card */}
                  <div
                    onClick={() => setActiveTab('documents')}
                    className="p-4 rounded-2xl bg-[#051D28] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer space-y-2 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-white">Recent Files</h3>
                    <p className="text-[10px] text-gray-400">Upload & parse PDF, DOCX, PPTX</p>
                  </div>

                  {/* Daily Quizzes card */}
                  <div
                    onClick={() => setActiveTab('smart-quiz')}
                    className="p-4 rounded-2xl bg-[#051D28] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer space-y-2 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-white">Daily Quizzes</h3>
                    <p className="text-[10px] text-gray-400">Drill knowledge-gap questions</p>
                  </div>

                  {/* Course Overview card */}
                  <div
                    onClick={() => setActiveTab('learning-path')}
                    className="p-4 rounded-2xl bg-[#051D28] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer space-y-2 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-white">Course Overview</h3>
                    <p className="text-[10px] text-gray-400">Inspect prerequisite roadmap</p>
                  </div>
                </div>

                {/* Course Overview & Prerequisite Progress */}
                <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>Active Course Roadmap</span>
                    </h2>
                    <span className="text-[10px] font-mono text-emerald-400">Step 3 of 5</span>
                  </div>

                  <div className="space-y-3">
                    {roadmap.slice(0, 3).map((step, idx) => (
                      <div
                        key={step.id}
                        className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
                          step.status === 'completed'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : step.status === 'current'
                            ? 'bg-[#041B24] border-emerald-400 text-white font-bold'
                            : 'bg-white/5 border-white/5 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] text-gray-400">0{idx + 1}</span>
                          <div>
                            <div className="text-white font-semibold">{step.title}</div>
                            <div className="text-[10px] text-gray-400">{step.duration}</div>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">
                          {step.badge || step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Integrated 3D VRM Mentor in Workspace (5 Cols - Frame 10s) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#061822]/90 border border-emerald-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      AURA Mentor Live
                    </span>
                  </div>
                  <button
                    onClick={() => speakText(mentorSpeech)}
                    className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                    title="Speak text"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3D Canvas Box */}
                <div className="relative w-full h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#001c24] to-[#000f14] border border-emerald-500/20">
                  <VRMAvatarCanvas
                    mentorState={isSpeaking ? 'speaking' : 'idle'}
                    emotion={mentorEmotion}
                    isSpeaking={isSpeaking}
                  />
                </div>

                {/* Live Mentor Speech Bubble */}
                <div className="p-3.5 rounded-2xl bg-[#041620] border border-emerald-500/20 text-xs text-gray-200 leading-relaxed shadow-sm">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>AURA Insight</span>
                  </div>
                  <p>{mentorSpeech}</p>
                </div>

                {/* Quick Chat Input with Mentor */}
                <form onSubmit={handleAssistantSubmit} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AURA to clarify a concept..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#051C26] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#00171F] font-bold transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* ─── Document & Assessment History Table (Frame 10s Bottom) ─── */}
            <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    Document & Assessment Telemetry
                  </h2>
                  <p className="text-xs text-gray-400">
                    Processed syllabus files, extracted quizzes, and historical retention scores.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {documentRecords.length} Files Processed
                </span>
              </div>

              <div className="overflow-x-auto aura-scroll">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase font-mono text-[10px]">
                      <th className="pb-3 font-bold">Document Name</th>
                      <th className="pb-3 font-bold">Format</th>
                      <th className="pb-3 font-bold">Accuracy</th>
                      <th className="pb-3 font-bold">Processed Date</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {documentRecords.map((doc) => (
                      <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-400" />
                          <span>{doc.name}</span>
                        </td>
                        <td className="py-3.5 font-mono text-[11px] text-gray-300">
                          <span className="px-2 py-0.5 rounded-md bg-white/10 font-bold">{doc.type}</span>
                        </td>
                        <td className="py-3.5 font-bold text-emerald-400 font-mono">{doc.score}</td>
                        <td className="py-3.5 text-gray-400 font-mono text-[11px]">{doc.date}</td>
                        <td className="py-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              doc.status === 'Mastered'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : doc.status === 'In Progress'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => setActiveTab('smart-quiz')}
                            className="px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-[11px] font-bold transition-all"
                          >
                            Practice Quiz
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MY AURA */}
        {activeTab === 'my-aura' && (
          <div className="p-8 max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-white">My AURA • 3D Hologram Stage</h1>
            <p className="text-xs text-gray-400">
              Personalized mentor avatar with dynamic voice pitch modulation, adaptive pedagogical modes, and facial expressions.
            </p>
            <div className="relative w-full h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#001f26] to-[#001015] border border-emerald-500/30">
              <VRMAvatarCanvas mentorState="idle" />
            </div>
          </div>
        )}

        {/* Tab 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <DocumentProcessorSection
              onQuizGenerated={(newQuizzes) => {
                alert(`AURA extracted ${newQuizzes.length} quizzes from your document!`)
              }}
            />
          </div>
        )}

        {/* Tab 4: SMART QUIZ */}
        {activeTab === 'smart-quiz' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <SmartQuizFlashcardMatrix />
          </div>
        )}

        {/* Tab 5: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <SmartQuizFlashcardMatrix />
          </div>
        )}

        {/* Tab 6: LEARNING PATH */}
        {activeTab === 'learning-path' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-white">Your AURA Learning Roadmap</h1>
            <p className="text-xs text-gray-400">
              Dynamically sequenced based on your prerequisite mastery and diagnostic scores.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roadmap.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-3 ${
                    step.status === 'completed'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : step.status === 'current'
                      ? 'bg-[#041F2B] border-emerald-400 shadow-md ring-1 ring-emerald-400'
                      : 'bg-[#061822]/80 border-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>STEP {idx + 1} • {step.duration}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 font-bold">
                        {step.badge || step.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                  {step.prerequisites.length > 0 && (
                    <div className="pt-2 border-t border-white/10 text-[10px] text-gray-400">
                      <span className="text-white font-bold">Prerequisites: </span>
                      {step.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: PROGRESS */}
        {activeTab === 'progress' && (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <ProgressGamificationSection />
          </div>
        )}

        {/* Tab 8: AI ASSISTANT */}
        {activeTab === 'ai-assistant' && (
          <div className="p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-white">Conversational Voice & AI Mentor</h1>
            <p className="text-xs text-gray-400">
              Speak or chat directly with AURA using Web Speech synthesis and Google Gemini inference.
            </p>
            <div className="p-6 rounded-3xl bg-[#061822]/90 border border-emerald-500/30 space-y-4">
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#001c24] to-[#000f14] border border-emerald-500/20">
                <VRMAvatarCanvas
                  mentorState={isSpeaking ? 'speaking' : 'idle'}
                  emotion={mentorEmotion}
                  isSpeaking={isSpeaking}
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#041620] border border-emerald-500/20 text-xs text-gray-200 leading-relaxed">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">AURA Response:</span>
                <p>{mentorSpeech}</p>
              </div>

              <form onSubmit={handleAssistantSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask AURA anything (e.g. Explain Normalization with examples)..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#051C26] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#00171F] font-bold text-xs uppercase"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 9: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="p-8 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-black text-white">Platform Settings & Localization</h1>
            <div className="p-6 rounded-3xl bg-[#061822]/80 border border-emerald-500/20 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Interface Language</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { code: 'en' as const, name: 'English', native: 'English' },
                    { code: 'hi' as const, name: 'Hindi', native: 'हिन्दी' },
                    { code: 'mr' as const, name: 'Marathi', native: 'मराठी' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                        lang === l.code
                          ? 'bg-emerald-500 text-[#00171F]'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div>{l.native}</div>
                      <div className="text-[10px] opacity-75">{l.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>AI Inferencing Engine:</span>
                <span className="font-mono text-emerald-400 font-bold">Google Gemini Cloud</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
