'use client'

import { useState } from 'react'
import { HelpCircle, Search, ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    { q: 'What is AURA?', a: 'AURA is an AI-driven personalized learning platform featuring an interactive character mentor that adapts its pedagogy, remembers your progress, and speaks 11 native languages.' },
    { q: 'Why is the Aura logo displayed only during the opening splash screen?', a: 'The Aura logo is an exclusive brand reveal element shown strictly during the application launch animation. Inside the platform, elegant text typography branding is used to maintain a clean, luxurious interface.' },
    { q: 'How does multilingual voice synthesis work?', a: 'AURA integrates Web Speech API and native Android Text-to-Speech (TTS) hooks to pronounce answers in your chosen regional language.' },
    { q: 'Can I upload my own PDF or PPTX textbook chapters?', a: 'Yes! AURA includes a document ingestion pipeline that parses uploaded PDF, PPTX, and DOCX files to extract key concepts and generate custom flashcards.' },
    { q: 'Is there any operational cost to start learning?', a: 'No, AURA is built on zero-operational-cost cloud architectures using free-tier services.' },
  ]

  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)] mb-6">
            Find answers to common questions about AURA's adaptive mentor, document parsing, and voice tutoring.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-[var(--aura-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQ questions..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-6 text-left font-bold text-sm md:text-base flex items-center justify-between gap-4 text-[var(--aura-text)]"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#257874] transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-xs md:text-sm text-[var(--aura-text-muted)] leading-relaxed border-t border-[var(--aura-border)]/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
