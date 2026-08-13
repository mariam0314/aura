'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Sparkles, Menu, X, Bot, LayoutDashboard, Layers, BookOpen } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageOptions, type LangCode } from '@/i18n/translations'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { href: '/about', label: t.nav.about || 'About' },
    { href: '/features', label: t.nav.features || 'Features' },
    { href: '/technology', label: t.nav.technology || 'Architecture' },
    { href: '/adaptive-learning', label: t.nav.adaptive || 'Adaptive Engine' },
    { href: '/ai-mentor', label: t.nav.mentor || 'AI Mentor' },
    { href: '/dashboard', label: t.nav.dashboard || 'Dashboard' },
  ]

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 pointer-events-none"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div
        className={`max-w-7xl mx-auto rounded-full pointer-events-auto transition-all duration-300 px-6 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'bg-white/80 dark:bg-[#00171F]/85 backdrop-blur-xl border border-[#257874]/20 shadow-[0_8px_32px_rgba(0,23,31,0.08)]'
            : 'bg-white/50 dark:bg-[#00171F]/60 backdrop-blur-md border border-white/20 dark:border-white/10'
        }`}
      >
        {/* Brand: Pure Typography AURA */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-[0.25em] text-[#00171F] dark:text-white transition-colors group-hover:text-[#257874]">
            AURA
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#257874]/10 text-[#257874] border border-[#257874]/20">
            AI Mentor
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? 'text-[#257874] dark:text-[#35C88A]'
                    : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text)] hover:bg-[#257874]/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-[#257874]/10 border border-[#257874]/20 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs font-semibold text-[var(--aura-text)] hover:border-[#257874] transition-all"
              aria-label="Select Language"
            >
              <span>{currentLangObj.flag}</span>
              <span className="hidden sm:inline">{currentLangObj.native}</span>
              <ChevronDown className={`w-3 h-3 text-[var(--aura-text-muted)] transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] shadow-xl p-2 z-50 max-h-72 overflow-y-auto aura-scroll"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--aura-text-muted)] border-b border-[var(--aura-border)] mb-1">
                    {t.common.selectLanguage}
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code)
                        setLangOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${
                        lang === opt.code
                          ? 'bg-[#257874] text-white font-bold'
                          : 'text-[var(--aura-text)] hover:bg-[#257874]/10'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.native}</span>
                      </span>
                      <span className="text-[10px] opacity-75">{opt.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action CTAs */}
          <Link
            href="/ai-mentor"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#257874] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(37,120,116,0.3)] hover:bg-[#1f6360] transition-all hover:scale-105"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Mentor</span>
          </Link>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-[var(--aura-surface)] border border-[var(--aura-border)] text-[var(--aura-text)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pointer-events-auto mt-2 max-w-md mx-auto rounded-3xl bg-white/95 dark:bg-[#00171F]/95 backdrop-blur-2xl border border-[var(--aura-border)] shadow-2xl p-6 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-[var(--aura-surface)] text-sm font-semibold text-[var(--aura-text)] hover:bg-[#257874]/10 hover:text-[#257874] transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <Sparkles className="w-4 h-4 text-[#257874]" />
                </Link>
              ))}
              <div className="pt-3 border-t border-[var(--aura-border)] flex flex-col gap-2">
                <Link
                  href="/ai-mentor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#257874] text-white text-center font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>{t.nav.mentor}</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-[var(--aura-text)] text-center font-semibold text-sm"
                >
                  {t.nav.login} / {t.nav.signup}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
