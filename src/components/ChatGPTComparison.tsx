'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Target,
  Repeat,
  Shield,
  Zap,
} from 'lucide-react'

export default function ChatGPTComparison() {
  const [activeStep, setActiveStep] = useState(0)

  const auraCycle = [
    { title: '1. ASSESS', desc: 'Runs diagnostic micro-quizzes to map conceptual baseline', icon: Zap },
    { title: '2. ANALYZE', desc: 'Pinpoints specific sub-topic knowledge gaps with mathematical precision', icon: Brain },
    { title: '3. PERSONALIZE', desc: 'Adapts pedagogy (Story, Visual, First-Principles, Practical)', icon: Layers },
    { title: '4. TEACH', desc: 'Guides understanding with 3D AI character mentor and Gen-Z study companion tone', icon: Sparkles },
    { title: '5. TEST', desc: 'Re-tests with dynamic difficulty scaling (Beginner to Advanced)', icon: Target },
    { title: '6. MEASURE', desc: 'Quantifies exact score delta (+14%) and updates persistent profile', icon: TrendingUp },
    { title: '7. ADAPT', desc: 'Recommends prerequisites or unlocks the next milestone on your learning roadmap', icon: Repeat },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Differentiator</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--aura-text)] mb-4">
          Why AURA is Not Just Another Chatbot
        </h2>
        <p className="text-sm md:text-base text-[var(--aura-text-muted)] leading-relaxed">
          ChatGPT gives an answer. <span className="font-bold text-[var(--aura-text)]">AURA manages the complete learning journey.</span>
        </p>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: General AI Chatbot (ChatGPT) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-500/10 text-gray-500 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--aura-text)]">General-Purpose AI (e.g. ChatGPT)</h3>
                <p className="text-xs text-[var(--aura-text-muted)]">Passive Question-and-Answer Tool</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] space-y-3 font-mono text-xs text-[var(--aura-text-muted)]">
              <div className="text-gray-400">User: "Explain SQL joins"</div>
              <div className="text-[var(--aura-text)]">AI: [Dumps 5 paragraphs of static text]</div>
              <div className="text-gray-400 pt-2 border-t border-[var(--aura-border)]">
                Next Day: AI has zero memory of what you understood, what you got wrong, or where your knowledge gap is.
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--aura-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">✕</span>
                <span>No diagnostic assessment or baseline measurement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">✕</span>
                <span>Treats every prompt as an isolated event (context amnesia)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">✕</span>
                <span>Cannot verify whether you actually understood or retained the concept</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">✕</span>
                <span>No persistent skill profile, early warning system, or institutional analytics</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-gray-500/5 text-center text-xs font-semibold text-[var(--aura-text-muted)]">
            Linear Flow: <span className="text-[var(--aura-text)]">Question → Answer</span>
          </div>
        </div>

        {/* Right Card: AURA Adaptive Platform */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-[#257874]/15 via-[var(--aura-surface)] to-[var(--aura-surface)] border-2 border-[#257874]/40 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#257874]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#257874] text-white flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[var(--aura-text)]">AURA Adaptive Learning Platform</h3>
                <p className="text-xs text-[#257874] dark:text-[#35C88A] font-bold">Continuous Cognitive Cycle</p>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[#257874]/30 text-xs sm:text-sm font-medium text-[var(--aura-text)] leading-relaxed italic">
              "Aura doesn't just answer what you ask. It understands what you know, identifies what you're missing, adapts how it teaches you, measures whether you improved, and decides what you should learn next."
            </blockquote>

            {/* 7-Step Interactive Cycle Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {auraCycle.map((st, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`p-3 rounded-2xl border text-xs transition-all cursor-pointer ${
                    activeStep === i
                      ? 'bg-[#257874] text-white border-[#257874] shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <st.icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{st.title}</span>
                  </div>
                  <p className={`text-[11px] leading-tight ${activeStep === i ? 'text-emerald-100' : 'text-[var(--aura-text-muted)]'}`}>
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#257874]/15 border border-[#257874]/30 flex items-center justify-between text-xs font-bold text-[#257874] dark:text-[#35C88A]">
            <span>Closed-Loop Cognitive Mastery</span>
            <span>Measurable Learning Outcomes 🔥</span>
          </div>
        </div>
      </div>
    </div>
  )
}
