'use client'

import { useState } from 'react'
import { LifeBuoy, Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function SupportPage() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support Desk</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Help & Ticket Center
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Submit a support query to the AURA Technical Support & Product Team.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#35C88A] mx-auto" />
            <h2 className="text-xl font-extrabold text-[var(--aura-text)]">Support Ticket Submitted!</h2>
            <p className="text-xs text-[var(--aura-text-muted)]">
              Thank you! Your ticket ID #AURA-8492 has been logged into our enterprise system.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-full bg-[#257874] text-white text-xs font-bold"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">
                Your Name
              </label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="name@domain.com"
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">
                Issue Category
              </label>
              <select className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]">
                <option>Voice Synthesis & Localized Audio</option>
                <option>Document Parsing (PDF/PPTX)</option>
                <option>Language Selection & i18n</option>
                <option>General Feedback</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">
                Describe Your Issue
              </label>
              <textarea
                required
                rows={4}
                placeholder="Provide details about what happened..."
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t.common.submitTicket}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
