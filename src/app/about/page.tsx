'use client'

import {
  CheckCircle,
  FileText,
  Cpu,
  Database,
  Award,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const audienceSegments = t.audience?.segments || [
    {
      segment: 'Primary / Middle School',
      approach: 'Story-driven, highly visual explanations, basic math/science, and intense gamification.',
      badge: 'Interactive & Visual',
    },
    {
      segment: 'High School & College',
      approach: 'Deep learning, exam preparation, programming practices (Python/DBMS), and document analysis.',
      badge: 'Deep Learning & Exams',
    },
    {
      segment: 'Working Professionals',
      approach: 'Skill gap analysis, 4-week career upskilling roadmaps, tool masteries (Docker, AWS, Node.js), and production architecture.',
      badge: 'Upskilling & Reskilling',
    },
    {
      segment: 'Lifelong Learners',
      approach: 'Flexible topic exploration, conversational audio tutoring, and cross-disciplinary concepts.',
      badge: 'Conversational Audio',
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#257874]/10 text-[#257874] font-bold text-xs uppercase tracking-widest mb-4">
            <Award className="w-4 h-4" />
            <span>{t.about.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 leading-tight">
            {t.about.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--aura-text-muted)]">
            {t.about.subtitle}
          </p>
        </div>

        {/* Executive Abstract Card */}
        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#257874]/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl font-extrabold text-[var(--aura-text)] mb-4 flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#257874]" />
            <span>{t.about.platformVisionTitle}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs font-semibold">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <span className="text-[var(--aura-text-muted)] block mb-1">Platform Name</span>
              <span className="text-[var(--aura-text)]">AURA Enterprise AI</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <span className="text-[var(--aura-text-muted)] block mb-1">Architecture Standard</span>
              <span className="text-[var(--aura-text)]">Commercial AI SaaS</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)]">
              <span className="text-[var(--aura-text-muted)] block mb-1">Target Environments</span>
              <span className="text-[var(--aura-text)]">Web Cloud & Mobile App</span>
            </div>
          </div>
          <p className="text-sm text-[var(--aura-text-muted)] leading-relaxed">
            {t.about.platformVisionDesc}
          </p>
        </div>

        {/* Problem vs Solution Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20">
            <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4 flex items-center gap-2">
              <span>{t.about.problemTitle}</span>
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-[var(--aura-text-muted)]">
              {t.about.problems.map((prob, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-8 rounded-3xl bg-[#257874]/5 border border-[#257874]/20">
            <h3 className="text-xl font-bold text-[#257874] dark:text-[#35C88A] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>{t.about.solutionTitle}</span>
            </h3>
            <ul className="space-y-3 text-xs md:text-sm text-[var(--aura-text-muted)]">
              {t.about.solutions.map((sol, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#35C88A] shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Target Audience Matrix */}
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--aura-text)] mb-6 text-center">
            {t.audience?.title || 'Target Audience & Learning Segment Matrix'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audienceSegments.map((seg, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#257874]/10 text-[#257874] font-bold text-[10px] uppercase mb-3">
                    {seg.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--aura-text)] mb-2">{seg.segment}</h3>
                  <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed">{seg.approach}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture Section */}
        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
          <h2 className="text-2xl font-extrabold text-[var(--aura-text)] mb-2 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#257874]" />
            <span>{t.about.architectureTitle}</span>
          </h2>
          <p className="text-sm text-[var(--aura-text-muted)] mb-8">
            {t.about.architectureSubtitle}
          </p>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono text-xs overflow-x-auto aura-scroll text-[var(--aura-text)] leading-relaxed">
            <pre>{`+-------------------------------------------------------------+
| FRONTEND CLIENT LAYER                                       |
| React + Next.js Platform (Wrapped via Capacitor Mobile)      |
+-------------------------------------------------------------+
                              |
                     HTTPS / JSON Payload
                              v
+-------------------------------------------------------------+
| ENTERPRISE API SERVICE LAYER                                |
| Node.js Runtime + Express Framework                         |
+-------------------------------------------------------------+
        |                     |                     |
   Data Queries          File Streams       Structured Prompts
        v                     v                     v
+------------------+  +-------------------+  +---------------+
| DATABASE ENGINE  |  | CLOUD STORAGE     |  | AI LLM LAYER  |
| MongoDB Atlas    |  | Cloudinary CDN    |  | Gemini / Groq |
+------------------+  +-------------------+  +---------------+`}</pre>
          </div>
        </div>

        {/* Implementation Lifecycle Timeline */}
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--aura-text)] mb-6 text-center">
            {t.about.timelineTitle}
          </h2>
          <div className="space-y-4">
            {t.about.phases.map((phase, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="px-4 py-2 rounded-2xl bg-[#257874] text-white font-bold text-xs shrink-0">
                  {phase.phase}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--aura-text)] mb-1">{phase.title}</h3>
                  <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Schemas Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
            <h3 className="text-base font-bold text-[var(--aura-text)] mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#257874]" />
              <span>Users Collection (MongoDB Schema)</span>
            </h3>
            <pre className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono text-[11px] text-[var(--aura-text-muted)] overflow-x-auto">
{`{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "educationLevel": "String",
  "preferredLanguage": "String",
  "preferredStyle": "String",
  "createdAt": "Timestamp"
}`}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
            <h3 className="text-base font-bold text-[var(--aura-text)] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#35C88A]" />
              <span>Progress Metrics Collection</span>
            </h3>
            <pre className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] font-mono text-[11px] text-[var(--aura-text-muted)] overflow-x-auto">
{`{
  "_id": "ObjectId",
  "userId": "Reference to Users",
  "currentXP": "Integer",
  "currentStreak": "Integer",
  "badgesEarned": ["String"],
  "identifiedWeakTopics": ["String"],
  "lastActiveDate": "Date"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
