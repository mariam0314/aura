'use client'

import AIMentorWorkspace from '@/components/AIMentorWorkspace'
import { Sparkles, Bot, Shield } from 'lucide-react'

export default function AIMentorPage() {
  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#257874]/10 text-[#257874] font-bold text-xs uppercase tracking-widest mb-4">
            <Bot className="w-4 h-4" />
            <span>Interactive AI Character Workspace</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            AURA Character Mentor
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Speak or type to experience persona-driven instruction, real-time Web Speech TTS, and instant pedagogy mode shifting.
          </p>
        </div>

        <AIMentorWorkspace />
      </div>
    </div>
  )
}
