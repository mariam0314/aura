'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useLanguage } from './LanguageContext'
import type { LangCode } from '@/i18n/translations'

export interface AuthUser {
  id: string
  name: string
  email: string
  selected_language: string
  english_mode: string | null
  role: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateLanguagePreference: (lang: string, englishMode?: string) => Promise<boolean>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setLang } = useLanguage()

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
          if (data.user.selected_language) {
            setLang(data.user.selected_language as LangCode)
          }
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [setLang])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setUser(data.user)
        if (data.user.selected_language) {
          setLang(data.user.selected_language as LangCode)
        }
        return { success: true }
      }
      return {
        success: false,
        error: data.error || 'Login failed.',
        requiresVerification: !!data.requiresVerification,
        email: data.email,
      }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setUser(data.user)
        if (data.user.selected_language) {
          setLang(data.user.selected_language as LangCode)
        }
        return { success: true }
      }
      return { success: false, error: data.error || 'Signup failed.' }
    } catch {
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // ignore
    } finally {
      setUser(null)
      window.location.href = '/login'
    }
  }

  const updateLanguagePreference = async (lang: string, englishMode?: string) => {
    try {
      setLang(lang as LangCode)
      const res = await fetch('/api/user/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang, englishMode }),
        credentials: 'include',
      })

      if (res.ok) {
        setUser((prev) => (prev ? { ...prev, selected_language: lang, english_mode: englishMode || prev.english_mode } : null))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateLanguagePreference,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
