'use client'

import { FileText } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Usage Terms</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Terms of Service & EULA
          </h1>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-4 text-xs md:text-sm text-[var(--aura-text-muted)] leading-relaxed">
          <p>By accessing or using AURA, you agree to comply with our Commercial SaaS Terms of Service and End User License Agreement.</p>
          <p>Users must not upload copyrighted or restricted textbook material for unauthorized redistribution. All AI generated content is subject to cognitive evaluation policies.</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </div>
  )
}
