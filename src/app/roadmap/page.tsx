'use client'

import { Clock, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function RoadmapPage() {
  const { t } = useLanguage()

  const milestones = t.about.phases.map((p, i) => ({
    phase: p.phase,
    title: p.title,
    status: i < 3 ? 'Completed' : i === 3 ? 'Active' : 'Upcoming',
    date: `Q${i + 1} 2026`,
  }))

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Implementation Lifecycle</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Product Roadmap & Enterprise Scope
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Explore AURA's commercial product milestones and enterprise AI roadmap.
          </p>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-[var(--aura-text)] mb-4">{t.about.timelineTitle}</h2>
          {milestones.map((m, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-[#257874] text-white font-bold text-xs">{m.phase}</span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--aura-text)]">{m.title}</h3>
                  <span className="text-[10px] text-[var(--aura-text-muted)]">{m.date}</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${m.status === 'Completed' ? 'bg-[#35C88A]/10 text-[#35C88A]' : 'bg-[#257874]/10 text-[#257874]'}`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>

        {/* Future Scope */}
        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
          <h2 className="text-xl font-extrabold text-[var(--aura-text)]">{t.about.futureScopeTitle}</h2>
          <div className="space-y-3">
            {t.about.futurePoints.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-[var(--aura-text-muted)]">
                <CheckCircle className="w-4 h-4 text-[#257874] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
