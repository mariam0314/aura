'use client'

import { BookOpen, Code, Terminal, FileText } from 'lucide-react'

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Reference</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Platform Documentation
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Technical guides, API endpoint schemas, and Capacitor mobile build instructions.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
            <h2 className="text-xl font-bold text-[var(--aura-text)] flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#257874]" />
              <span>Getting Started & Environment Setup</span>
            </h2>
            <pre className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono text-xs text-[var(--aura-text-muted)] overflow-x-auto">
{`# Clone repository
git clone https://github.com/mariam0314/aura.git

# Install dependencies
npm install

# Run local development server
npm run dev`}
            </pre>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
            <h2 className="text-xl font-bold text-[var(--aura-text)] flex items-center gap-2">
              <Code className="w-5 h-5 text-[#35C88A]" />
              <span>Express API Endpoint Matrix</span>
            </h2>
            <div className="space-y-3 text-xs text-[var(--aura-text-muted)]">
              <div className="p-3 rounded-xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono">
                <span className="text-[#257874] font-bold">POST</span> /api/v1/auth/login — Authenticates student session
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono">
                <span className="text-[#257874] font-bold">POST</span> /api/v1/mentor/chat — Routes prompt to Gemini/Groq LLM
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono">
                <span className="text-[#257874] font-bold">POST</span> /api/v1/documents/parse — Offloads file to Cloudinary & extracts text
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
