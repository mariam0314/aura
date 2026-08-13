'use client'

import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Security</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Privacy Policy
          </h1>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4 text-xs md:text-sm text-[var(--aura-text-muted)] leading-relaxed">
          <p>AURA is committed to protecting student data privacy. All uploaded document streams (PDF, PPTX, DOCX) and cognitive performance logs are stored securely using MongoDB Atlas encryption.</p>
          <p>Voice speech data recorded during AI Mentor sessions is processed locally using client Web Speech APIs and is never sold to third parties.</p>
        </div>
      </div>
    </div>
  )
}
