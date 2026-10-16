'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RootPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }
    }
  }, [isLoading, isAuthenticated, router])

  return (
    <div className="min-h-screen bg-[#020b10] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
          Entering AURA AI Platform...
        </span>
      </div>
    </div>
  )
}
