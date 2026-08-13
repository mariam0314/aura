'use client'

import Link from 'next/link'
import { Bot, FileText, Zap, Layers, Sparkles, TrendingUp, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FeaturesCatalogPage() {
  const { t } = useLanguage()

  const items = [
    {
      slug: 'ai-tutor',
      icon: Bot,
      title: 'AI Character Tutor',
      desc: 'Interactive persona with dynamic expressions, 11-language voice synthesis, and persistent learning memory.',
    },
    {
      slug: 'document-explainer',
      icon: FileText,
      title: 'Document Explainer & Summarizer',
      desc: 'Advanced parsing for PDF, PPTX, and DOCX files to summarize materials and extract granular concepts.',
    },
    {
      slug: 'quiz-generator',
      icon: Zap,
      title: 'Smart Quiz Generator',
      desc: 'Automated evaluation mechanics generating targeted question sets for weak cognitive areas.',
    },
    {
      slug: 'virtual-desktops',
      icon: Layers,
      title: 'Virtual Desktops & Whiteboards',
      desc: 'Dedicated workspaces supporting code execution sandboxes, vector drawing canvas, and visual tools.',
    },
    {
      slug: 'gamification',
      icon: Sparkles,
      title: 'Gamification Engine',
      desc: 'XP points, daily streak shields, rank badges, global leaderboards, and skill tree roadmap unlocks.',
    },
    {
      slug: 'progress-dashboard',
      icon: TrendingUp,
      title: 'Unified Progress Dashboard',
      desc: 'Centralized analytics tracking cognitive levels, identified weak topics, and personalized study roadmaps.',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Modules</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Core Features Matrix
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            Explore the specialized modules powering AURA's adaptive learning operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.slug}
              className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm hover:border-[#257874] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#257874]/10 text-[#257874] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--aura-text)] mb-3">{item.title}</h3>
                <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed mb-6">{item.desc}</p>
              </div>

              <Link
                href={`/features/${item.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#257874] hover:underline"
              >
                <span>View Full Module Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
