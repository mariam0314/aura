'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [resendCooldown, setResendCooldown] = useState(60)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const paramEmail = params.get('email')
      if (paramEmail) setEmail(paramEmail)
    }

    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!email) {
      setErrorMessage('Email address missing. Please return to Forgot Password.')
      return
    }

    if (otp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.')
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
      // Step 1: Verify OTP to get resetToken
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const verifyData = await verifyRes.json()
      if (!verifyRes.ok || !verifyData.success || !verifyData.resetToken) {
        setIsLoading(false)
        setErrorMessage(verifyData.error || 'Invalid or expired verification code.')
        return
      }

      // Step 2: Reset password with resetToken
      const resetRes = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          resetToken: verifyData.resetToken,
          newPassword,
        }),
      })

      const resetData = await resetRes.json()
      setIsLoading(false)

      if (resetRes.ok && resetData.success) {
        setSuccessMessage('✓ Password updated successfully! Returning to Login...')
        setTimeout(() => {
          router.push(`/login?reset=true&email=${encodeURIComponent(email)}`)
        }, 1200)
      } else {
        setErrorMessage(resetData.error || 'Password update failed.')
      }
    } catch {
      setIsLoading(false)
      setErrorMessage('Network connection error during password reset.')
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return
    setIsResending(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      setIsResending(false)

      if (res.ok && data.success) {
        setSuccessMessage('A fresh verification code has been dispatched.')
        setResendCooldown(60)
      } else {
        setErrorMessage(data.error || 'Failed to dispatch verification code.')
      }
    } catch {
      setIsResending(false)
      setErrorMessage('Network connection error while resending code.')
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Create New Password</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black tracking-[0.25em] text-white">
              AURA
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-lg font-bold text-white">Verify OTP & Update Password</h1>
          <p className="text-xs text-gray-400">
            Account: <span className="text-emerald-400 font-mono font-bold">{email}</span>
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5 text-center">
              6-Digit Verification Code
            </label>
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full py-3.5 text-center tracking-[0.55em] font-mono text-2xl font-black rounded-2xl bg-[#00171F] border border-emerald-500/30 text-emerald-400 placeholder-gray-700 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Expires in 10 minutes</span>
            {resendCooldown > 0 ? (
              <span className="text-gray-500 font-mono">Resend in {resendCooldown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <RotateCcw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                <span>Resend Code</span>
              </button>
            )}
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
                placeholder="Re-enter new password"
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
            disabled={isLoading || otp.length !== 6}
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
                <span>Reset Password & Go to Login</span>
              </>
            )}
          </button>
        </form>

        <div className="border-t border-white/10 pt-4 text-center text-xs text-gray-400">
          Remember your password?{' '}
          <Link href="/login" className="text-emerald-400 font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
