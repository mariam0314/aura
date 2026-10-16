'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Bot,
  LayoutDashboard,
  Layers,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { languageOptions, type LangCode } from '@/i18n/translations'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { user, isAuthenticated, logout, updateLanguagePreference } = useAuth()
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

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password'

  if (isAuthPage && !isAuthenticated) {
    return null
  }

  // Navigation links connecting to all AURA AI pages
  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/aura', label: '3D Mentor' },
    { href: '/learn', label: 'Learn' },
    { href: '/progress', label: 'Progress' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/languages', label: 'Languages' },
    { href: '/contact', label: 'Contact' },
  ]

  const currentLangObj = languageOptions.find((l) => l.code === lang) || languageOptions[0]

  const handleSelectLanguage = (code: LangCode) => {
    setLang(code)
    setLangOpen(false)
    if (isAuthenticated) {
      updateLanguagePreference(code)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 py-3 flex items-center justify-between backdrop-blur-xl ${
          scrolled
            ? 'bg-[#03151D]/90 border border-emerald-500/30 shadow-[0_10px_35px_rgba(0,18,23,0.7)]'
            : 'bg-[#03151D]/75 border border-white/10 shadow-[0_8px_25px_rgba(0,18,23,0.4)]'
        }`}
      >
        {/* Brand: Left: AURA AI */}
        <Link href={isAuthenticated ? '/home' : '/login'} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="font-black text-sm tracking-wider">A</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-[0.25em] text-white transition-colors group-hover:text-emerald-400">
              AURA AI
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-xs font-bold transition-all rounded-full ${
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

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Start Learning Button */}
          {isAuthenticated && (
            <Link
              href="/aura"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-[0_2px_12px_rgba(16,185,129,0.3)] transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Learning</span>
            </Link>
          )}

          {/* Quick Language Dropdown */}
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
                      onClick={() => handleSelectLanguage(opt.code)}
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

          {/* User Session Buttons (Profile, Logout) */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold hover:bg-emerald-500/25 transition-all"
                title="Profile"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-300 font-black">
                  {user?.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <span className="max-w-[90px] truncate">{user?.name?.split(' ')[0] || 'Profile'}</span>
              </Link>

              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition-colors"
                title="Log Out of AURA"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <span>Log In</span>
            </Link>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-gray-200"
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
            className="lg:hidden mt-2 max-w-md mx-auto rounded-3xl bg-[#03151D]/95 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl p-6 overflow-hidden space-y-4"
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

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    logout()
                  }}
                  className="w-full py-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-center font-bold text-xs uppercase tracking-wider shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({user?.name || user?.email})</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-emerald-500 text-[#00171F] text-center font-black text-xs uppercase tracking-wider shadow-md mt-2"
                >
                  Enter Workspace
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
