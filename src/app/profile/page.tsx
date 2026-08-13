'use client'

import { User, Award, Zap, Flame } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ProfilePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#257874]/15 border-2 border-[#257874] flex items-center justify-center mx-auto text-[#257874]">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--aura-text)]">AURA Master Scholar</h1>
          <p className="text-xs text-[var(--aura-text-muted)]">Enterprise Learner • Level 12 AI Scholar</p>
          <div className="flex justify-center gap-4 text-xs font-bold pt-2">
            <span className="px-3 py-1.5 rounded-full bg-[#257874]/10 text-[#257874]">3,850 XP</span>
            <span className="px-3 py-1.5 rounded-full bg-[#35C88A]/10 text-[#35C88A]">14 Day Streak 🔥</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4">
          <h2 className="text-lg font-bold text-[var(--aura-text)]">Earned Mastery Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold text-center">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <Award className="w-6 h-6 text-[#257874] mx-auto mb-2" />
              <span>Multilingual Champion</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <span>Quiz Master</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <Flame className="w-6 h-6 text-rose-500 mx-auto mb-2" />
              <span>14-Day Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
