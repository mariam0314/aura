'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  KeyRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.')
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          newPassword,
        }),
      })

      const data = await res.json()
      setIsLoading(false)

      if (res.ok && data.success) {
        setSuccessMessage('✓ Password updated successfully! Redirecting to login...')
        setTimeout(() => {
          router.push(`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`)
        }, 1200)
      } else {
        setErrorMessage(data.error || 'Failed to update password. Please check your email address.')
      }
    } catch {
      setIsLoading(false)
      setErrorMessage('Network connection error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] py-12 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      {/* Deep Obsidian & Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-tr from-emerald-600 via-[#10b981] to-teal-800 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#03151D]/90 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] relative z-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Password Reset</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black tracking-[0.25em] text-white">
              AURA
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-lg font-bold text-white">Reset Your Password</h1>
          <p className="text-xs text-gray-400">
            Enter your registered email and choose a new password
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@aura.ai"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#00171F] text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#00171F] border-t-transparent rounded-full animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Save New Password & Go to Login</span>
              </>
            )}
          </button>
        </form>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-gray-400">
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
            Remember Password? Sign In
          </Link>
          <Link href="/signup" className="text-emerald-400 font-bold hover:underline">
            New User? Register
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
