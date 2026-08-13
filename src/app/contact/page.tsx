'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactPage() {
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
            <Mail className="w-3.5 h-3.5" />
            <span>Enterprise Communication</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            {t.nav.contact}
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Get in touch with the AURA platform leadership & product team.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#35C88A] mx-auto" />
            <h2 className="text-xl font-extrabold text-[var(--aura-text)]">Message Sent!</h2>
            <p className="text-xs text-[var(--aura-text-muted)]">Thank you for reaching out to the AURA Product & Enterprise Support Team.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">Your Name</label>
              <input required type="text" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">Your Email</label>
              <input required type="email" placeholder="name@domain.com" className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">Message</label>
              <textarea required rows={4} placeholder="Your message here..." className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>{t.common.sendMessage}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
