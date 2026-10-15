'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Flame,
  Zap,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
  Activity,
  Layers,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'

interface LeaderboardUser {
  rank: number
  id: string
  name: string
  avatar: string
  xp: number
  streak: number
  badge: string
  isCurrentUser?: boolean
}

export default function ProgressGamificationSection() {
  const { t } = useLanguage()
  const { currentXP, streakDays, quizAccuracy, topics } = useLearning()

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([
    { rank: 1, id: 'u1', name: 'Aarav Sharma', avatar: '👨‍🎓', xp: 6420, streak: 28, badge: 'Master Scholar' },
    { rank: 2, id: 'u2', name: 'Ananya Deshmukh', avatar: '👩‍💻', xp: 5890, streak: 21, badge: 'Logic Architect' },
    { rank: 3, id: 'u3', name: 'Rohan Patel', avatar: '🧑‍🔬', xp: 5240, streak: 19, badge: 'Code Synthesizer' },
    { rank: 4, id: 'u4', name: 'Sneha Kulkarni', avatar: '👩‍🏫', xp: 4950, streak: 17, badge: 'Network Specialist' },
    { rank: 5, id: 'u_curr', name: 'You (Maria)', avatar: '🌟', xp: currentXP, streak: streakDays, badge: 'Scholar', isCurrentUser: true },
  ])

  useEffect(() => {
    // Keep current user updated
    setLeaderboard((prev) =>
      prev.map((u) => (u.isCurrentUser ? { ...u, xp: currentXP, streak: streakDays } : u))
    )
  }, [currentXP, streakDays])

  const currentLevel = Math.floor(currentXP / 300) + 1
  const levelProgress = Math.min(100, Math.round(((currentXP % 300) / 300) * 100))

  const daysOfWeek = [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: true },
    { day: 'S', active: true },
    { day: 'S', active: true },
  ]

  return (
    <section id="gamification-progress" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Real-Time Cognitive Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Learning Progress & Gamification
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
          Centralized monitoring for earned experience points (XP), daily streak shields, cognitive recall accuracy, and global leaderboard rankings.
        </p>
      </div>

      {/* Analytics 4-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
        {/* Card 1: Current XP */}
        <div className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/30 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,18,23,0.5)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current XP</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                Level {currentLevel} Scholar
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentXP.toLocaleString()} <span className="text-base text-emerald-400 font-bold">XP</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {300 - (currentXP % 300)} XP until Level {currentLevel + 1}
              </p>
            </div>

            {/* Level Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>Lvl {currentLevel}</span>
                <span>{levelProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#35C88A] rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            {/* Recent XP Activity */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Recent XP:</span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-gray-300">
                  <span>• Smart Quiz Completed</span>
                  <span className="text-emerald-400 font-bold">+50 XP</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span>• Document Synthesized</span>
                  <span className="text-emerald-400 font-bold">+100 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Bar Chart */}
          <div className="pt-4 border-t border-white/10 flex items-end justify-between h-14 gap-2">
            {[45, 60, 30, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-emerald-500/30 hover:bg-emerald-500 rounded-t-md transition-all"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[8px] font-mono text-gray-500">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: 7-Day Streak */}
        <div className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/30 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,18,23,0.5)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">7-Day Streak</span>
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{streakDays} Days</span>
                <span className="text-lg">🔥</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Streak shield active • No missed sessions
              </p>
            </div>

            {/* Week Indicators */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Active Schedule:</span>
              <div className="grid grid-cols-7 gap-1.5">
                {daysOfWeek.map((d, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center"
                  >
                    <span className="text-[10px] font-mono font-bold text-emerald-300 block">{d.day}</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#04121A]/80 border border-white/5 space-y-1">
              <div className="flex justify-between text-xs font-medium text-gray-300">
                <span>Study Velocity:</span>
                <span className="font-bold text-white">28.5 hrs logged</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-300">
                <span>Retention Target:</span>
                <span className="font-bold text-emerald-400">94.2%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-[11px] font-bold text-emerald-400">Streak Reward: +50 XP Bonus Tomorrow</span>
          </div>
        </div>

        {/* Card 3: Leaderboard */}
        <div className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/30 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,18,23,0.5)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Leaderboard</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((user) => (
                <div
                  key={user.id}
                  className={`p-2.5 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                    user.isCurrentUser
                      ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold ring-1 ring-emerald-500/40'
                      : 'bg-[#04121A]/80 border-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-400 w-4">#{user.rank}</span>
                    <span className="text-sm">{user.avatar}</span>
                    <span className="truncate max-w-[95px]">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400">{user.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-center">
            <span className="text-[11px] text-gray-400">Top 5% of Academic Cohort</span>
          </div>
        </div>

        {/* Card 4: Training Matrix */}
        <div className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/30 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,18,23,0.5)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Training Matrix</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Circular Recall Gauge */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10B981"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.967)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-white">96.7%</span>
                  <span className="text-[8px] font-mono text-gray-400 uppercase">Recall</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Strong Concepts</span>
                </span>
                <span className="font-bold text-white">4 Topics</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Needs Review</span>
                </span>
                <span className="font-bold text-amber-300">1 Topic</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Critical Gaps</span>
                </span>
                <span className="font-bold text-rose-400">1 Topic</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-center">
            <span className="text-[11px] text-emerald-400 font-bold">100% Adaptive Closed-Loop</span>
          </div>
        </div>
      </div>

      {/* Prominent Glowing "Launch AURA Workspace" Button */}
      <div className="text-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-emerald-500 via-[#35C88A] to-emerald-400 text-[#00171F] text-base sm:text-lg font-black uppercase tracking-wider shadow-[0_12px_45px_rgba(16,185,129,0.5)] transition-all hover:scale-105 hover:shadow-[0_15px_60px_rgba(16,185,129,0.7)]"
        >
          <Layers className="w-5 h-5 text-[#00171F]" />
          <span>Launch AURA Workspace</span>
          <ArrowRight className="w-5 h-5 text-[#00171F]" />
        </Link>
      </div>
    </section>
  )
}
