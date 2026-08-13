'use client'

import { Brain, Sparkles, BookOpen, CheckCircle } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Brain className="w-3.5 h-3.5" />
            <span>Pedagogical Cognitive Models</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Research & Cognitive Tracking
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            How AURA eliminates context amnesia by building persistent mental models of learner maturity.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-6">
          <h2 className="text-2xl font-bold text-[var(--aura-text)]">
            Shifting Beyond Generic Chatbots
          </h2>
          <p className="text-sm text-[var(--aura-text-muted)] leading-relaxed">
            Standard generative AI tools treat every user prompt as an isolated event. If a student asks for an explanation today and returns tomorrow, standard LLMs forget historical mistakes, baseline knowledge, and weak areas. AURA solves this mismatch by maintaining continuous cognitive tracking.
          </p>

          <div className="space-y-4 pt-4 border-t border-[var(--aura-border)]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--aura-text)]">
              Core Principles of AURA Pedagogy
            </h3>
            {[
              'Cognitive Maturity Shifting: Explanations scale dynamically from Grade 3 analogies to university research math.',
              'Historical Mistake Retention: Misconceptions from past quizzes directly inform future practice prompts.',
              'Pedagogy Mode Shifting: Students toggle between Storytelling, Visual Diagrams, Deep Proofs, Exam Keys, and Practical Code.',
              'Cross-Language Cognitive Mapping: Concepts grasped in native regional languages seamlessly map to academic English terms.',
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-[var(--aura-text)]">
                <CheckCircle className="w-4 h-4 text-[#35C88A] shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
