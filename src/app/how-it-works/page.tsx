'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass,
  UserPlus,
  ShieldCheck,
  Languages,
  Sparkles,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
} from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Create Account',
      subtitle: 'Fast, Encrypted Registration',
      desc: 'Sign up with your Name, Email, and Password. Passwords are never stored in plain text and are securely hashed with industry-standard bcrypt.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Instant Sign In',
      subtitle: 'Seamless Authentication',
      desc: 'Log in directly using your registered User ID/Email and Password. No waiting for email OTP codes — your workspace is ready immediately.',
    },
    {
      num: '03',
      icon: Languages,
      title: 'Choose Language',
      subtitle: 'Native Pedagogical Fluency',
      desc: 'Select your preferred language among 11 supported dialects (English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, Urdu). AURA switches both her interface and speech synthesis to match.',
    },
    {
      num: '04',
      icon: Sparkles,
      title: 'Start Learning',
      subtitle: '1-on-1 Personalized Mentorship',
      desc: 'Enter the 3D studio with AURA. Her full face, eyes, and expressions guide you step-by-step through any subject, detecting knowledge gaps and adapting to your pace.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-widest font-mono">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Architecture & Workflow</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            How AURA AI Works
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            From initial registration to interactive 3D AI mentorship, discover how AURA delivers personalized pedagogical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#03151D]/80 border border-emerald-500/25 space-y-4 hover:border-emerald-500/50 transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black font-mono text-emerald-400/40">{step.num}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{step.title}</h2>
              <div className="text-xs font-mono font-bold text-emerald-400">{step.subtitle}</div>
              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/aura"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
          >
            <span>Enter AURA Learning Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
