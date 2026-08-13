'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Sparkles, Bot, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t } = useLanguage()

  const featureItem = t.features.items[slug] || {
    title: 'AURA Core Feature',
    desc: 'Advanced AI learning platform module.',
    detail: 'This module is integrated into the core AURA adaptive engine to enhance student retention and engagement.',
    points: [
      'Real-time cognitive tracking',
      'Multilingual output formatting',
      'Context-aware memory engine',
      'Seamless Capacitor mobile compatibility',
    ],
  }

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/features"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#257874] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Features Catalog</span>
        </Link>

        <div className="p-8 md:p-12 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#257874]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature Deep Dive</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--aura-text)]">
            {featureItem.title}
          </h1>

          <p className="text-base text-[var(--aura-text-muted)] leading-relaxed">
            {featureItem.detail}
          </p>

          <div className="pt-6 border-t border-[var(--aura-border)]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--aura-text)] mb-4">
              Key Architectural Capabilities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureItem.points.map((pt: string, i: number) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#35C88A] shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <Link
              href="/ai-mentor"
              className="px-6 py-3 rounded-full bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Try with AI Mentor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
