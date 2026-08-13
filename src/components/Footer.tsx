'use client'

import Link from 'next/link'
import { Sparkles, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageOptions } from '@/i18n/translations'

export default function Footer() {
  const { lang, setLang, t } = useLanguage()

  const footerSections = [
    {
      title: 'Platform Overview',
      links: [
        { href: '/about', label: t.nav.about || 'About Platform' },
        { href: '/features', label: t.nav.features || 'Core Features' },
        { href: '/adaptive-learning', label: t.nav.adaptive || 'Adaptive Engine' },
        { href: '/ai-mentor', label: t.nav.mentor || 'AI Mentor' },
        { href: '/dashboard', label: t.nav.dashboard || 'Dashboard' },
      ],
    },
    {
      title: 'Architecture & Research',
      links: [
        { href: '/technology', label: t.nav.technology || 'System Architecture' },
        { href: '/research', label: t.nav.research || 'Cognitive Science' },
        { href: '/roadmap', label: t.nav.roadmap || 'Platform Roadmap' },
        { href: '/gallery', label: t.nav.gallery || 'Desktops Showcase' },
        { href: '/documentation', label: t.nav.docs || 'Documentation' },
      ],
    },
    {
      title: 'Support & Community',
      links: [
        { href: '/testimonials', label: t.nav.testimonials || 'Testimonials' },
        { href: '/faq', label: t.nav.faq || 'FAQ' },
        { href: '/support', label: t.nav.support || 'Support Ticket Center' },
        { href: '/contact', label: t.nav.contact || 'Contact Us' },
        { href: '/notifications', label: 'Activity Feed' },
      ],
    },
    {
      title: 'Account & Legal',
      links: [
        { href: '/settings', label: t.nav.settings || 'Settings' },
        { href: '/profile', label: t.nav.profile || 'Profile' },
        { href: '/language', label: 'Language Options' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/login', label: t.nav.login || 'Log In' },
      ],
    },
  ]

  return (
    <footer className="relative bg-[var(--aura-bg)] border-t border-[var(--aura-border)] pt-16 pb-12 overflow-hidden">
      {/* Soft background ambient blur */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(37,120,116,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--aura-border)]">
          {/* Brand Info Column */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              {/* Pure Typography Branding */}
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-black tracking-[0.25em] text-[#00171F] dark:text-white">
                  AURA
                </span>
              </Link>
              <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed mb-6">
                {t.footer.copy}
              </p>
            </div>

            {/* Quick Language Selection Badge */}
            <div className="p-3 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)]">
              <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-bold text-[var(--aura-text-muted)]">
                <Globe className="w-3 h-3 text-[#257874]" />
                <span>{t.common.selectLanguage}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      lang === opt.code
                        ? 'bg-[#257874] text-white shadow-sm'
                        : 'bg-white/50 dark:bg-black/20 text-[var(--aura-text-muted)] hover:text-[var(--aura-text)]'
                    }`}
                  >
                    {opt.flag} {opt.native}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-[var(--aura-text-muted)] hover:text-[#257874] dark:hover:text-[#35C88A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--aura-text-muted)]">
          <p>© {new Date().getFullYear()} AURA Inc. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#257874] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.statCost || 'Zero Operational Entry Cost'}</span>
            </span>
            <Link href="/privacy" className="hover:text-[var(--aura-text)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--aura-text)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
