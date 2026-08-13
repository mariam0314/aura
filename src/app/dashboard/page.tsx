'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Award,
  Zap,
  Target,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Flame,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function DashboardPage() {
  const { t } = useLanguage()

  const metrics = [
    { title: t.dashboard.xpLabel || 'Total XP Earned', value: '3,850 XP', icon: Zap, color: '#257874' },
    { title: t.dashboard.streakLabel || 'Active Streak', value: '14 Days 🔥', icon: Flame, color: '#35C88A' },
    { title: t.dashboard.badgeLabel || 'Rank Level', value: 'Level 12 Scholar', icon: Award, color: '#4FA6A0' },
    { title: 'Mastery Index', value: '92%', icon: Target, color: '#705D56' },
  ]

  const focusTopics = [
    { topic: 'Data Structures & Algorithms', mastery: '68%', status: 'Needs Review', color: 'text-amber-500' },
    { topic: 'Quantum Mechanics Basics', mastery: '45%', status: 'Focus Area', color: 'text-rose-500' },
    { topic: 'Organic Reaction Mechanisms', mastery: '82%', status: 'Proficient', color: 'text-[#35C88A]' },
    { topic: 'Linear Algebra & Matrices', mastery: '94%', status: 'Mastered', color: 'text-[#257874]' },
  ]

  const recentSessions = [
    { name: 'Quantum Physics via Storytelling', date: 'Today, 2:40 PM', xp: '+150 XP' },
    { name: 'Document Ingestion: Computer Networks PDF', date: 'Yesterday, 6:15 PM', xp: '+220 XP' },
    { name: 'Mock Viva: DBMS Indexing & Normalization', date: '12 Aug 2026', xp: '+300 XP' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Unified Student Progress</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
            {t.dashboard.title || 'Learning Progress Dashboard'}
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            {t.dashboard.subtitle || 'Track your cognitive velocity, active streak, earned badges, and weak topic heatmaps.'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${m.color}15` }}
              >
                <m.icon className="w-6 h-6" style={{ color: m.color }} />
              </div>
              <div>
                <span className="text-xs text-[var(--aura-text-muted)] font-medium block">{m.title}</span>
                <span className="text-xl font-extrabold text-[var(--aura-text)]">{m.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Focus Areas & Recent Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weak Topics Heatmap */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
            <h2 className="text-xl font-extrabold text-[var(--aura-text)] mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#257874]" />
                <span>{t.dashboard.weakTopicsTitle || 'Identified Focus Areas & Heatmap'}</span>
              </span>
              <span className="text-xs text-[#257874] font-bold">100% Adaptive Memory</span>
            </h2>

            <div className="space-y-5">
              {focusTopics.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
                  <div className="flex items-center justify-between text-xs md:text-sm font-bold mb-2">
                    <span>{item.topic}</span>
                    <span className={item.color}>{item.status} ({item.mastery})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--aura-surface)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#257874]"
                      style={{ width: item.mastery }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
            <h2 className="text-xl font-extrabold text-[var(--aura-text)] mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#35C88A]" />
              <span>{t.dashboard.recentActivityTitle || 'Recent Sessions'}</span>
            </h2>

            <div className="space-y-4">
              {recentSessions.map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
                  <div className="text-xs font-bold text-[var(--aura-text)] mb-1">{s.name}</div>
                  <div className="flex items-center justify-between text-[10px] text-[var(--aura-text-muted)]">
                    <span>{s.date}</span>
                    <span className="font-bold text-[#35C88A]">{s.xp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
