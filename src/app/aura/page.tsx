'use client'

import AIMentorWorkspace from '@/components/AIMentorWorkspace'
import { Sparkles, Bot } from 'lucide-react'

export default function AuraMentorStudioPage() {
  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-widest mb-2 font-mono">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Interactive 3D Female AI Mentor Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            AURA Studio
          </h1>
          <p className="text-sm text-gray-400">
            Interact with AURA via voice or text. Watch her facial expressions, lip-sync, and personalized pedagogical explanations in your selected language.
          </p>
        </div>

        <AIMentorWorkspace />
      </div>
    </div>
  )
}
