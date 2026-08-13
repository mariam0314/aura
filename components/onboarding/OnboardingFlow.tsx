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

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('splash')
  const [language, setLanguage] = useState<LanguageCode | null>(null)
  const [englishMode, setEnglishMode] = useState<EnglishMode | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const handleSplashComplete = useCallback(() => setStep('welcome'), [])

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
    }
  }, [language, englishMode, role, onComplete])

  return (
    <div className="relative min-h-dvh bg-[var(--aura-bg)] overflow-hidden">
      {/* Persistent mini logo after splash morphs */}
      <AnimatePresence>
        {step !== 'splash' && step !== 'loading' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-5 left-5 z-40"
            aria-hidden
          >
            <img
              src="/aura-logo.png"
              alt=""
              className="w-9 h-9 object-contain opacity-80"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
