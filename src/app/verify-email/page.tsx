'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
  const router = useRouter()

  useEffect(() => {
    // No OTP required: redirect to login
    router.replace('/login')
  }, [router])

  return (
    <div className="min-h-screen bg-[#020b10] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
          Redirecting to Login...
        </span>
      </div>
    </div>
  )
}
