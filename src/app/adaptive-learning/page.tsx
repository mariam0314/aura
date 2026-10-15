'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles,
  BookOpen,
  Layers,
  Bot,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Brain,
  Repeat,
  RotateCcw,
  Award,
  AlertTriangle,
  Play,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'

export default function AdaptiveLearningPage() {
  const { lang, t } = useLanguage()
  const { role, englishMode } = useLearning()

  // Interactive 6-step Adaptive Cycle Simulator State
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0)
  const [selectedPedagogy, setSelectedPedagogy] = useState<'story' | 'visual' | 'deep' | 'exam' | 'practical'>('story')

  const cycleSteps = [
    {
      num: '1. ASSESS',
      title: 'Diagnostic Baseline Measurement',
      icon: Zap,
      desc: 'Student initiates a targeted SQL assessment covering SELECT, WHERE, GROUP BY, and JOIN operations.',
      stateSnapshot: {
        score: '62% Initial Baseline',
        detail: 'SELECT: 91% • WHERE: 86% • GROUP BY: 78% • JOINs: 42% (Weak)',
      },
    },
    {
      num: '2. ANALYZE',
      title: 'Knowledge-Gap Detection',
      icon: Brain,
      desc: 'Aura’s mathematical engine identifies that SQL JOINs fall below the 50% threshold with 3 repeated mistakes.',
      stateSnapshot: {
        flag: 'Critical Knowledge Gap: SQL JOIN Operations (INNER vs LEFT)',
        detail: 'System initiates remedial personalization cycle rather than advancing to subqueries.',
      },
    },
    {
      num: '3. PERSONALIZE',
      title: 'Dynamic Pedagogy Adaptation',
      icon: Layers,
      desc: 'Aura selects the student’s cognitive preference (Storytelling Mode + Gen-Z Mentor voice) to demystify relational joins.',
      stateSnapshot: {
        mode: 'Storytelling & Visual Analogies',
        detail: 'Explaining LEFT JOIN as a loyal table that never drops its records even if the other table leaves it on read with NULLs.',
      },
    },
    {
      num: '4. TEACH',
      title: 'Targeted Conceptual Instruction',
      icon: Sparkles,
      desc: '3D Aura character delivers an intuitive, interactive breakdown with live syntax highlights.',
      stateSnapshot: {
        example: 'SELECT students.name, courses.title FROM students LEFT JOIN courses ON students.course_id = courses.id;',
        detail: 'Visual Venn diagram + immediate conversational validation.',
      },
    },
    {
      num: '5. TEST',
      title: 'Adaptive Difficulty Re-Testing',
      icon: Target,
      desc: 'Aura administers an adaptive 2-question scenario drill scaled specifically to verify relational joins understanding.',
      stateSnapshot: {
        result: '2 of 2 Correct (100% Accuracy on JOINs)',
        detail: 'Student successfully identifies INNER vs LEFT vs FULL OUTER join behaviors.',
      },
    },
    {
      num: '6. MEASURE & ADAPT',
      title: 'Learning Profile Updated & Milestone Unlocked',
      icon: Repeat,
      desc: 'SQL mastery score jumps from 64% to 88%. Aura celebrates the win 🔥 and unlocks Database Normalization.',
      stateSnapshot: {
        delta: '+24% Topic Jump',
        nextStep: 'Unlocked: Step 4 — DBMS Normalization (1NF to BCNF)',
      },
    },
  ]

  const modes = [
    {
      id: 'story' as const,
      name: 'Storytelling Mode 📖',
      desc: 'Transforms complex abstractions into engaging visual metaphors and narrative arcs.',
      example: 'Explaining SQL LEFT JOIN as a party where Table A invites everyone, and Table B only fills missing seats with NULL placecards.',
    },
    {
      id: 'visual' as const,
      name: 'Visual Diagram Mode 🎨',
      desc: 'Breaks concepts down into flowchart logic, concept maps, and structural schemas.',
      example: 'Rendering Venn diagram intersections and relational Cartesian coordinate grids.',
    },
    {
      id: 'deep' as const,
      name: 'Deep Learning Mode 🧠',
      desc: 'Focuses on first-principles derivation, mathematical set theory proofs, and relational algebra.',
      example: 'Formal relational algebra expression: R ⟕ S = (R ⋈ S) ∪ ((R - π_R(R ⋈ S)) × {(null, ..., null)})',
    },
    {
      id: 'exam' as const,
      name: 'Exam Prep Mode 📝',
      desc: 'Highlights high-yield viva questions, key formulas, and concise memory mnemonics.',
      example: 'Viva Q: When does a LEFT JOIN produce NULLs? Ans: When Table B has no key matching Table A.',
    },
    {
      id: 'practical' as const,
      name: 'Practical Hands-on 🛠️',
      desc: 'Provides real-world code snippets, project schemas, and terminal execution sandboxes.',
      example: 'Building an e-commerce order-fulfillment query linking users, orders, and shipment tracking.',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* ─── Header ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] dark:text-[#35C88A] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Closed-Loop Pedagogy Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--aura-text)]">
            The AURA Adaptive Learning Cycle
          </h1>
          <p className="text-sm sm:text-base text-[var(--aura-text-muted)] leading-relaxed">
            <span className="font-bold text-[var(--aura-text)]">
              ASSESS → ANALYZE → PERSONALIZE → TEACH → TEST → MEASURE → ADAPT
            </span>
            <br />
            Experience how Aura continuously discovers what you don’t know, adapts instruction, and measures real improvement.
          </p>
        </div>

        {/* ─── Interactive 6-Step Cycle Simulator ─── */}
        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-xl space-y-8 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--aura-border)]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#257874] dark:text-[#35C88A] block">
                Interactive Walkthrough Simulator
              </span>
              <h2 className="text-xl font-extrabold text-[var(--aura-text)]">
                SQL Knowledge-Gap Resolution Cycle
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#257874] text-white text-xs font-bold">
              Step {activeCycleStep + 1} of 6
            </span>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {cycleSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCycleStep(idx)}
                className={`p-3 rounded-2xl border text-xs text-left transition-all flex flex-col justify-between gap-1.5 ${
                  activeCycleStep === idx
                    ? 'bg-[#257874] text-white border-[#257874] shadow-md scale-105'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <step.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{step.num.split('. ')[1]}</span>
                </div>
                <span className={`text-[10px] ${activeCycleStep === idx ? 'text-emerald-100' : 'text-[var(--aura-text-muted)]'}`}>
                  Phase {idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCycleStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#257874]/15 text-[#257874] dark:text-[#35C88A]">
                  {(() => {
                    const Icon = cycleSteps[activeCycleStep].icon
                    return <Icon className="w-6 h-6" />
                  })()}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#257874] dark:text-[#35C88A]">
                    {cycleSteps[activeCycleStep].num}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--aura-text)]">
                    {cycleSteps[activeCycleStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--aura-text-muted)] leading-relaxed">
                {cycleSteps[activeCycleStep].desc}
              </p>

              {/* Data Card */}
              <div className="p-4 rounded-xl bg-[var(--aura-surface)] border border-[var(--aura-border)] font-mono text-xs text-[var(--aura-text)] space-y-1">
                <div className="text-[#257874] dark:text-[#35C88A] font-bold">
                  {Object.values(cycleSteps[activeCycleStep].stateSnapshot)[0]}
                </div>
                <div className="text-[var(--aura-text-muted)] text-[11px]">
                  {Object.values(cycleSteps[activeCycleStep].stateSnapshot)[1]}
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  disabled={activeCycleStep === 0}
                  onClick={() => setActiveCycleStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-full border border-[var(--aura-border)] text-xs font-semibold disabled:opacity-30 hover:border-[#257874] transition-all"
                >
                  Previous Step
                </button>

                {activeCycleStep < 5 ? (
                  <button
                    onClick={() => setActiveCycleStep((prev) => Math.min(5, prev + 1))}
                    className="px-5 py-2 rounded-full bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center gap-1.5"
                  >
                    <span>Advance Cycle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href="/ai-mentor"
                    className="px-5 py-2 rounded-full bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Launch Live AI Mentor</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── 5 Pedagogy Modes Showcase ─── */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#257874] dark:text-[#35C88A] block mb-1">
              Dynamic Cognitive Delivery
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--aura-text)]">
              5 Adaptive Pedagogy Modes
            </h2>
            <p className="text-xs sm:text-sm text-[var(--aura-text-muted)] mt-1">
              One concept, five tailored pedagogical lenses. Switch seamlessly inside the AI Mentor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modes.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm hover:border-[#257874] transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <h3 className="text-lg font-bold text-[var(--aura-text)] mb-2">{m.name}</h3>
                  <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed mb-4">{m.desc}</p>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]">
                    <span className="font-bold text-[#257874] dark:text-[#35C88A] block mb-1">
                      Adaptive Example:
                    </span>
                    <span className="text-[11px] leading-relaxed text-[var(--aura-text-muted)]">{m.example}</span>
                  </div>
                </div>

                <Link
                  href="/ai-mentor"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#257874] hover:underline pt-2 border-t border-[var(--aura-border)]"
                >
                  <span>Experience in AI Mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#257874]/15 via-[var(--aura-surface)] to-[var(--aura-surface)] border-2 border-[#257874]/40 text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-[var(--aura-text)]">
            Ready to Map and Close Your Knowledge Gaps?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--aura-text-muted)] max-w-xl mx-auto">
            Take a 2-minute diagnostic assessment to generate your personalized learning profile and begin your adaptive journey.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/ai-mentor"
              className="px-8 py-4 rounded-full bg-[#257874] text-white text-sm font-bold shadow-lg hover:bg-[#1f6360] transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Start Adaptive Learning Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
