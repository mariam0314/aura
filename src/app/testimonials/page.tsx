'use client'

import { Star, MessageSquare } from 'lucide-react'

export default function TestimonialsPage() {
  const reviews = [
    { name: 'Aarav Sharma', role: 'Engineering Student', text: 'AURA explained System Design to me in Storytelling mode. It made complex microservice concepts so easy to understand!' },
    { name: 'Priya Patel', role: 'High School Student', text: 'The Hindi voice synthesis feature helped me study Physics in my native language without any barriers.' },
    { name: 'Rohan Mehta', role: 'Software Developer', text: 'I uploaded my DBMS textbook PDF and AURA generated a custom mock viva quiz targeting my weak areas instantly.' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Learner Feedback</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Student & Educator Stories
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            See how AURA is transforming personalized education for students and working professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-[var(--aura-text)] leading-relaxed italic">"{r.text}"</p>
              </div>
              <div className="pt-6 border-t border-[var(--aura-border)] mt-6">
                <div className="text-xs font-bold text-[var(--aura-text)]">{r.name}</div>
                <div className="text-[10px] text-[var(--aura-text-muted)]">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
