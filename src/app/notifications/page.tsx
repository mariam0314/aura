'use client'

import { Bell, Sparkles, CheckCircle2 } from 'lucide-react'

export default function NotificationsPage() {
  const notifications = [
    { title: 'Daily Streak Maintained! 🔥', desc: 'You logged 14 consecutive days on AURA.', time: '2 hours ago' },
    { title: 'New Quiz Ready: DBMS Indexing', desc: 'AURA created a custom 5-question viva based on your weak areas.', time: 'Yesterday' },
    { title: 'Language Switch Saved', desc: 'Default system language updated to Hindi.', time: '3 days ago' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Notifications & Alerts
          </h1>
        </div>

        <div className="space-y-4">
          {notifications.map((n, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#257874]/10 text-[#257874] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[var(--aura-text)] mb-1">{n.title}</h3>
                <p className="text-xs text-[var(--aura-text-muted)] mb-2">{n.desc}</p>
                <span className="text-[10px] text-[var(--aura-text-muted)]">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
