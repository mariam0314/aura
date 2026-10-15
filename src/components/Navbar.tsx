'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Sparkles, Menu, X, Bot, LayoutDashboard, Layers, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageOptions, type LangCode } from '@/i18n/translations'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Explicit nav links as shown in screenshot Frame 2s
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/roadmap', label: 'Deadlines' },
    { href: '/adaptive-learning', label: 'Pedagogy' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Login' },
  ]

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 py-3 flex items-center justify-between backdrop-blur-xl ${
          scrolled
            ? 'bg-[#03151D]/90 border border-emerald-500/30 shadow-[0_10px_35px_rgba(0,18,23,0.7)]'
            : 'bg-[#03151D]/75 border border-white/10 shadow-[0_8px_25px_rgba(0,18,23,0.4)]'
        }`}
      >
        {/* Brand: Pure Typography AURA with Emerald Dot */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="font-black text-sm tracking-wider">A</span>
          </div>
          <span className="text-xl font-black tracking-[0.25em] text-white transition-colors group-hover:text-emerald-400">
            AURA
          </span>
          <span className="hidden sm:inline-block text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            AI PEDAGOGY
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-bold transition-all rounded-full ${
                  isActive
                    ? 'text-emerald-400 font-extrabold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Language Dropdown (English, हिन्दी, मराठी, etc.) */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 hover:border-emerald-500/50 hover:bg-white/10 transition-all"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs uppercase">{lang.toUpperCase()}</span>
              <span className="hidden sm:inline text-xs text-gray-300">({currentLangObj.native})</span>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#041620] border border-emerald-500/30 shadow-2xl p-2 z-50 max-h-72 overflow-y-auto aura-scroll backdrop-blur-2xl"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Select Language</span>
                    <span className="text-gray-400">11 Dialects</span>
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
                          ? 'bg-emerald-500 text-[#00171F] font-bold shadow-md'
                          : 'text-gray-200 hover:bg-white/10'
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

          {/* Sign Up / Launch Button */}
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all hover:scale-105 flex items-center gap-1.5"
          >
            <span>Sign Up</span>
          </Link>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-gray-200"
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
            className="md:hidden mt-2 max-w-md mx-auto rounded-3xl bg-[#03151D]/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl p-6 overflow-hidden space-y-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-white/5 text-xs font-bold text-gray-200 hover:bg-emerald-500/15 hover:text-emerald-400 transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              ))}

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-emerald-500 text-[#00171F] text-center font-black text-xs uppercase tracking-wider shadow-md mt-2"
              >
                Launch Workspace
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
