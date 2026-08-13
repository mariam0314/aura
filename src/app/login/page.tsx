'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          {/* Pure Typography Branding */}
          <span className="text-2xl font-black tracking-[0.25em] text-[#00171F] dark:text-white">
            AURA
          </span>
          <h1 className="text-xl font-extrabold text-[var(--aura-text)]">Log In to Your Workspace</h1>
          <p className="text-xs text-[var(--aura-text-muted)]">Access your AI Mentor & XP progress</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] block mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)] focus:outline-none focus:border-[#257874]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Enter Workspace</span>
          </button>
        </form>

        <div className="text-center text-xs text-[var(--aura-text-muted)]">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#257874] font-bold hover:underline">
            Register Student Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
