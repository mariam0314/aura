'use client'

import Link from 'next/link'
import { Sparkles, BookOpen, Layers, Bot, ArrowRight, CheckCircle } from 'lucide-react'

export default function AdaptiveLearningPage() {
  const modes = [
    {
      name: 'Storytelling Mode 📖',
      desc: 'Transforms complex abstractions into engaging visual metaphors and narrative arcs.',
      example: 'Explaining Quantum Superposition as a spinning coin before it lands.',
    },
    {
      name: 'Visual Diagram Mode 🎨',
      desc: 'Breaks concepts down into flowchart logic, concept maps, and structural diagrams.',
      example: 'Rendering memory allocation as a visual block grid.',
    },
    {
      name: 'Deep Learning Mode 🧠',
      desc: 'Focuses on first-principles derivation, mathematical proofs, and analytical rigor.',
      example: 'Deriving Backpropagation step-by-step using matrix partial derivatives.',
    },
    {
      name: 'Exam Prep Mode 📝',
      desc: 'Highlights key formulas, concise bullet points, and high-yield viva questions.',
      example: 'Top 5 viva questions on Normalization in DBMS.',
    },
    {
      name: 'Practical Hands-on 🛠️',
      desc: 'Provides real-world code snippets, project setup steps, and interactive sandboxes.',
      example: 'Building a REST API endpoint in Express.js with JWT auth.',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pedagogy Shifting Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Adaptive Learning Modes
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            AURA dynamically modifies its delivery style to match your cognitive preference and goals.
          </p>
        </div>

        <div className="space-y-6">
          {modes.map((m, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm">
              <h2 className="text-xl font-extrabold text-[var(--aura-text)] mb-2">{m.name}</h2>
              <p className="text-xs md:text-sm text-[var(--aura-text-muted)] leading-relaxed mb-4">{m.desc}</p>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]">
                <span className="font-bold text-[#257874] block mb-1">Live Example Response:</span>
                {m.example}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/ai-mentor"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#257874] text-white text-sm font-bold shadow-lg hover:bg-[#1f6360] transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Try All Modes in AI Mentor Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
