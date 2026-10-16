'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogIn,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  User,
  UserPlus,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  KeyRound,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

type AuthView = 'login' | 'signup' | 'forgot-password' | 'forgot-success'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [view, setView] = useState<AuthView>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')

  // New User / Signup specific password fields
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  // Feedback states
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Listen for registration success via URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('created') === 'true' || params.get('created') === '1') {
        setSuccessMessage('✓ Account created successfully! Please enter your password to sign in.')
        const paramEmail = params.get('email')
        if (paramEmail) setEmail(paramEmail)
      }
    }
  }, [])

  // Reset errors when switching views
  const switchView = (newView: AuthView) => {
    setView(newView)
    setErrorMessage('')
    setSuccessMessage('')
  }

  // Quick fill demo credentials
  const fillDemoCredentials = () => {
    setEmail('student@aura.ai')
    setPassword('Aura@2026!')
    setErrorMessage('')
  }

  // 1. Handle Login (Direct database authentication, no OTP)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    const res = await login(email, password)
    setIsLoading(false)

    if (res.success) {
      window.location.href = '/home'
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please check your email and password.')
    }
  }

  // 2. Handle New User Signup (Direct database account creation, no OTP, then back to Login)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.')
      return
    }

    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: signupPassword,
        }),
      })

      const data = await res.json()
      setIsLoading(false)

      if (res.ok && data.success) {
        // Requirement: New user enters ID and Password -> Account created -> Back to Login Page!
        setSignupPassword('')
        setSignupConfirmPassword('')
        setPassword('')
        setView('login')
        setSuccessMessage('✓ Account created successfully! Please enter your password to sign in.')
      } else {
        setErrorMessage(data.error || 'Account creation failed.')
      }
    } catch {
      setIsLoading(false)
      setErrorMessage('Network connection error during registration.')
    }
  }

  // 3. Handle Forgot Password (Direct reset with registered email and new password, no OTP)
  const handleDirectPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!forgotEmail.trim()) {
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
          email: forgotEmail.trim().toLowerCase(),
          newPassword,
        }),
      })

      const data = await res.json()
      setIsLoading(false)

      if (res.ok && data.success) {
        setEmail(forgotEmail.trim().toLowerCase())
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setView('login')
        setSuccessMessage('✓ Password updated successfully! Please sign in with your new password.')
      } else {
        setErrorMessage(data.error || 'Failed to update password. Please check your email address.')
      }
    } catch {
      setIsLoading(false)
      setErrorMessage('Network error while resetting password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Deep Obsidian & Emerald Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-tr from-emerald-600 via-[#10b981] to-teal-800 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#03151D]/90 backdrop-blur-2xl border border-emerald-500/30 shadow-[0_20px_60px_rgba(0,18,23,0.8)] relative z-10"
      >
        {/* AURA Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Pedagogy & Knowledge Gap Platform</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-black tracking-[0.25em] text-white">
              AURA
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <p className="text-xs text-gray-400">
            {view === 'login' && 'Log in to your 3D AI Mentor workspace'}
            {view === 'signup' && 'Create your new student account (ID & Password)'}
            {view === 'forgot-password' && 'Direct Password Recovery (No OTP needed)'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs (Sign In / New User) */}
        {view !== 'forgot-password' && (
          <div className="flex rounded-2xl bg-[#00171F] p-1.5 border border-emerald-500/20 mb-6">
            <button
              type="button"
              onClick={() => switchView('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                view === 'login'
                  ? 'bg-emerald-500 text-[#00171F] shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => switchView('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                view === 'signup'
                  ? 'bg-emerald-500 text-[#00171F] shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>New User / Register</span>
            </button>
          </div>
        )}

        {/* Global Error Banner */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Global Success Banner */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="font-medium">{successMessage}</span>
          </motion.div>
        )}

        {/* ────────── VIEW 1: LOGIN ────────── */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5 flex items-center justify-between">
                <span>User ID / Email Address</span>
                <span className="text-[10px] text-emerald-400 font-mono">Gmail / Educational</span>
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email)
                    switchView('forgot-password')
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Enter AURA Workspace</span>
                </>
              )}
            </button>

            {/* Quick Demo Credentials Autofill Pill */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-emerald-300 text-[11px] font-mono border border-white/10 transition-colors"
              >
                <span>Demo Account:</span>
                <span className="text-emerald-400 font-bold">student@aura.ai</span>
              </button>
            </div>

            <div className="border-t border-white/10 pt-4 text-center text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchView('signup')}
                className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>New User? Create Account</span>
              </button>
            </div>
          </form>
        )}

        {/* ────────── VIEW 2: SIGNUP / CREATE ACCOUNT ────────── */}
        {view === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                User ID / Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-name@gmail.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showSignupConfirmPassword ? 'text' : 'password'}
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                  className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showSignupConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  <span>Creating Account in Database...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account & Go to Login</span>
                </>
              )}
            </button>

            <div className="border-t border-white/10 pt-4 text-center text-xs text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchView('login')}
                className="text-emerald-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* ────────── VIEW 3: FORGOT PASSWORD (DIRECT RESET, NO OTP) ────────── */}
        {view === 'forgot-password' && (
          <form onSubmit={handleDirectPasswordReset} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-gray-300">
              Enter your registered Gmail or email address and create a new password. Your password will be updated directly in the database.
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
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
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#00171F] border border-emerald-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  className="p-1 text-gray-400 hover:text-white transition-colors absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  <span>Updating Password in Database...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Save New Password & Go to Login</span>
                </>
              )}
            </button>

            <div className="border-t border-white/10 pt-4 text-center text-xs text-gray-400">
              <button
                type="button"
                onClick={() => switchView('login')}
                className="text-emerald-400 font-bold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
