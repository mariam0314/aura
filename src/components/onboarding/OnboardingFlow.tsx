'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from '@/components/onboarding/SplashScreen'
import WelcomeScreen from '@/components/onboarding/WelcomeScreen'
import LanguageSelection from '@/components/onboarding/LanguageSelection'
import EnglishModeSelection from '@/components/onboarding/EnglishModeSelection'
import RoleSelection from '@/components/onboarding/RoleSelection'
import LoadingScreen from '@/components/onboarding/LoadingScreen'
import type {
  EnglishMode,
  LanguageCode,
  OnboardingStep,
  UserRole,
} from '@/lib/onboarding-data'

interface OnboardingFlowProps {
  onComplete: (data: {
    language: LanguageCode
    englishMode: EnglishMode | null
    role: UserRole
  }) => void
}

/**
 * Orchestrates the full AURA onboarding journey:
 * Splash → Language Selection (immediately after Enter Aura) → (English Mode) → Role → Loading → Application Home
 */
export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('splash')
  const [language, setLanguage] = useState<LanguageCode | null>(null)
  const [englishMode, setEnglishMode] = useState<EnglishMode | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  // Immediately after clicking Enter Aura in splash screen, transition to Language selection
  const handleSplashComplete = useCallback(() => setStep('language'), [])

  const handleLanguageNext = useCallback(() => {
    if (language === 'en') {
      setStep('english-mode')
    } else {
      setStep('role')
    }
  }, [language])

  const handleLoadingComplete = useCallback(() => {
    if (language && role) {
      onComplete({ language, englishMode, role })
    } else {
      onComplete({ language: language || 'en', englishMode, role: role || 'college' })
    }
  }, [language, englishMode, role, onComplete])

  const showHeaderBranding = step !== 'splash' && step !== 'loading'

  return (
    <div className="relative min-h-dvh bg-[var(--aura-bg)] overflow-hidden">
      {/* Text-only AURA Branding — strictly NO logo image after splash */}
      <AnimatePresence>
        {showHeaderBranding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-6 z-40 flex items-center gap-2"
          >
            <span className="text-xl font-black tracking-[0.25em] text-[#00171F] dark:text-white">
              AURA
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle ambient background on inner steps */}
      {showHeaderBranding && (
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,120,116,0.06) 0%, transparent 60%)',
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {step === 'splash' && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}

        {step === 'welcome' && (
          <WelcomeScreen key="welcome" onNext={() => setStep('language')} />
        )}

        {step === 'language' && (
          <LanguageSelection
            key="language"
            selected={language}
            onSelect={setLanguage}
            onNext={handleLanguageNext}
          />
        )}

        {step === 'english-mode' && (
          <EnglishModeSelection
            key="english-mode"
            selected={englishMode}
            onSelect={setEnglishMode}
            onNext={() => setStep('role')}
          />
        )}

        {step === 'role' && (
          <RoleSelection
            key="role"
            selected={role}
            onSelect={setRole}
            onNext={() => setStep('loading')}
          />
        )}

        {step === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </div>
  )
}
