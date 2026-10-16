'use client'

import ProgressGamificationSection from '@/components/ProgressGamificationSection'
import Link from 'next/link'
import { TrendingUp, ArrowLeft } from 'lucide-react'

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Learning Analytics</span>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Cognitive Progress & XP Matrix
          </h1>
          <p className="text-sm text-gray-400">
            Track your real-time XP accumulation, daily streaks, concept retention, and mastery benchmarks.
          </p>
        </div>

        <ProgressGamificationSection />
      </div>
    </div>
  )
}
