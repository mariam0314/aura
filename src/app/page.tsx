'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Sparkles,
  BookOpen,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Bot,
  Layers,
  Cpu,
  CheckCircle,
  FileText,
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import AIMentorWorkspace from '@/components/AIMentorWorkspace'
import type { EnglishMode, LanguageCode, UserRole } from '@/lib/onboarding-data'
import { useLanguage } from '@/context/LanguageContext'
import { fadeUp } from '@/lib/animations'

interface UserProfile {
  language: LanguageCode
  englishMode: EnglishMode | null
  role: UserRole
}

function MainApplicationContent({ profile }: { profile: UserProfile }) {
  const { t } = useLanguage()

  const featureCards = [
    {
      slug: 'ai-tutor',
      icon: Bot,
      title: t.features.items['ai-tutor']?.title || 'AI Character Tutor',
      desc: t.features.items['ai-tutor']?.desc || 'Interactive persona with dynamic expressions and voice.',
      color: '#257874',
    },
    {
      slug: 'document-explainer',
      icon: FileText,
      title: t.features.items['document-explainer']?.title || 'Document Explainer & Summarizer',
      desc: t.features.items['document-explainer']?.desc || 'Parse PDF, PPTX & DOCX for instant concept breakdown.',
      color: '#4FA6A0',
    },
    {
      slug: 'quiz-generator',
      icon: Zap,
      title: t.features.items['quiz-generator']?.title || 'Smart Quiz Generator',
      desc: t.features.items['quiz-generator']?.desc || 'Automated evaluation targeting weak cognitive areas.',
      color: '#35C88A',
    },
    {
      slug: 'virtual-desktops',
      icon: Layers,
      title: t.features.items['virtual-desktops']?.title || 'Virtual Desktops & Canvas',
      desc: t.features.items['virtual-desktops']?.desc || 'Workspaces for live coding sandboxes and drawing.',
      color: '#705D56',
    },
    {
      slug: 'gamification',
      icon: Sparkles,
      title: t.features.items['gamification']?.title || 'Gamification Engine',
      desc: t.features.items['gamification']?.desc || 'XP progression, daily streaks, shields, and badges.',
      color: '#257874',
    },
    {
      slug: 'progress-dashboard',
      icon: TrendingUp,
      title: t.features.items['progress-dashboard']?.title || 'Unified Progress Dashboard',
      desc: t.features.items['progress-dashboard']?.desc || 'Centralized analytics tracking weak topics and velocity.',
      color: '#4FA6A0',
    },
  ]

  const stats = [
    { value: '11+', label: t.hero.statLanguages || 'Supported Languages' },
    { value: '100%', label: t.hero.statTutor || 'Adaptive AI Persona' },
    { value: '$0', label: t.hero.statCost || 'Operational Entry Cost' },
    { value: '60 FPS', label: 'Cinematic Visual Performance' },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)]">
      {/* ─── Hero Section ─── */}
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        {/* Background Ambient Lighting Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-25 blur-3xl bg-gradient-to-tr from-[#257874] via-[#4FA6A0] to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          {/* Text-only AURA Badge */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#257874]/10 border border-[#257874]/20 text-[#257874] dark:text-[#35C88A] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.eyebrow}</span>
          </motion.div>

          {/* Large Cinematic Headline */}
          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6"
          >
            {t.hero.titleLine1}{' '}
            <span className="bg-gradient-to-r from-[#257874] via-[#4FA6A0] to-[#705D56] bg-clip-text text-transparent">
              {t.hero.titleLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="text-base sm:text-xl text-[var(--aura-text-muted)] max-w-2xl leading-relaxed mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Glass CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/ai-mentor"
              className="px-8 py-4 rounded-full bg-[#257874] text-white text-base font-bold shadow-[0_8px_32px_rgba(37,120,116,0.35)] hover:bg-[#1f6360] transition-all hover:scale-105 flex items-center gap-2"
            >
              <Bot className="w-5 h-5" />
              <span>{t.hero.startFree}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-[var(--aura-surface)] text-[var(--aura-text)] border border-[var(--aura-border)] text-base font-semibold hover:border-[#257874] transition-all hover:scale-105"
            >
              {t.hero.exploreFeatures}
            </Link>
          </motion.div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {stats.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-center shadow-sm"
              >
                <div className="text-3xl font-extrabold text-[#257874] mb-1">{st.value}</div>
                <div className="text-xs text-[var(--aura-text-muted)] font-medium">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Mentor Interactive Teaser Section ─── */}
      <section className="py-20 px-6 bg-[var(--aura-surface)] border-y border-[var(--aura-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#257874] mb-2 block">
              Interactive Workspace
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--aura-text)] mb-4">
              {t.mentor.title}
            </h2>
            <p className="text-sm md:text-base text-[var(--aura-text-muted)]">
              {t.mentor.subtitle}
            </p>
          </div>

          <AIMentorWorkspace />
        </div>
      </section>

      {/* ─── Core Features Showcase Grid ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#257874] mb-2 block">
            {t.features.tag}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--aura-text)] mb-4">
            {t.features.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--aura-text-muted)]">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat) => (
            <motion.div
              key={feat.slug}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] hover:border-[#257874] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feat.color}15` }}
                >
                  <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-xl font-bold text-[var(--aura-text)] mb-3 group-hover:text-[#257874] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--aura-text-muted)] leading-relaxed mb-6">
                  {feat.desc}
                </p>
              </div>

              <Link
                href={`/features/${feat.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#257874] hover:underline"
              >
                <span>{t.features.explore}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Product Overview Teaser ─── */}
      <section className="py-20 px-6 bg-[var(--aura-surface)] border-t border-[var(--aura-border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#257874] mb-2 block">
              {t.about.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--aura-text)] mb-6">
              {t.about.title}
            </h2>
            <p className="text-sm md:text-base text-[var(--aura-text-muted)] leading-relaxed mb-6">
              {t.about.subtitle}
            </p>
            <div className="space-y-3 mb-8">
              {t.about.solutions.map((pt, i) => (
                <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-semibold text-[var(--aura-text)]">
                  <CheckCircle className="w-4 h-4 text-[#35C88A] shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#257874] text-white text-sm font-bold shadow-md hover:bg-[#1f6360] transition-all"
            >
              <span>{t.common.learnMore}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#257874]/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-bold text-[var(--aura-text)] mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#257874]" />
              <span>{t.about.architectureTitle}</span>
            </h3>
            <div className="space-y-4 text-xs text-[var(--aura-text-muted)]">
              <div className="p-4 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
                <span className="font-bold text-[var(--aura-text)] block mb-1">Frontend Layer</span>
                React + Next.js Platform (Wrapped via Capacitor Mobile)
              </div>
              <div className="p-4 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
                <span className="font-bold text-[var(--aura-text)] block mb-1">Backend Service Layer</span>
                Node.js Runtime + Express Framework APIs
              </div>
              <div className="p-4 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
                <span className="font-bold text-[var(--aura-text)] block mb-1">AI & Data Engine</span>
                Google Gemini API & Groq LLM + MongoDB Atlas + Cloudinary CDN
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  if (!profile) {
    return <OnboardingFlow onComplete={setProfile} />
  }

  return <MainApplicationContent profile={profile} />
}
