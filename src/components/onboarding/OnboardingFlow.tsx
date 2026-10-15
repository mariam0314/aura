'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from '@/components/onboarding/SplashScreen'
import LanguageSelection from '@/components/onboarding/LanguageSelection'
import EnglishModeSelection from '@/components/onboarding/EnglishModeSelection'
import GoalSelection from '@/components/onboarding/GoalSelection'
import LevelSelection from '@/components/onboarding/LevelSelection'
import RoleSelection from '@/components/onboarding/RoleSelection'
import LoadingScreen from '@/components/onboarding/LoadingScreen'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'
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
 * Orchestrates the full AURA zero-friction onboarding journey:
 * Splash → Language Selection → (🚨 English Mode: Normal vs Gen-Z if English) → Goal → Level → Role → Loading → Application Home
 * Every valid selection immediately and automatically advances to the next screen.
 */
export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { setLang } = useLanguage()
  const { setRole: setGlobalRole, setEnglishMode: setGlobalEnglishMode } = useLearning()
  const [step, setStep] = useState<OnboardingStep>('splash')
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [englishMode, setEnglishMode] = useState<EnglishMode>('genz')
  const [goal, setGoal] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  // Immediately after clicking Enter Aura in splash screen, transition to Language selection
  const handleSplashComplete = useCallback(() => {
    setStep('language')
  }, [])

  // 🚨 When a language is selected:
  // If 'en', IMMEDIATELY open the dedicated "How should Aura talk to you?" screen!
  const handleLanguageSelect = useCallback((selectedCode: LanguageCode) => {
    setLanguage(selectedCode)
    setLang(selectedCode)

    if (selectedCode === 'en') {
      setStep('english-mode')
    } else {
      setStep('goal')
    }
  }, [setLang])

  const handleEnglishModeSelect = useCallback((selectedMode: EnglishMode) => {
    setEnglishMode(selectedMode)
    setGlobalEnglishMode(selectedMode)
    setStep('goal')
  }, [setGlobalEnglishMode])

  const handleGoalSelect = useCallback((selectedGoal: string) => {
    setGoal(selectedGoal)
    setStep('level')
  }, [])

  const handleLevelSelect = useCallback((selectedLevel: string) => {
    setLevel(selectedLevel)
    setStep('role')
  }, [])

  const handleRoleSelect = useCallback((selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep('loading')
  }, [])

  const handleLoadingComplete = useCallback(() => {
    const finalLang = language || 'en'
    const finalRole = role || 'college'
    const finalMode = englishMode || 'genz'

    setLang(finalLang)
    setGlobalRole(finalRole === 'school' ? 'student' : finalRole === 'college' ? 'student' : 'professional')
    setGlobalEnglishMode(finalMode)

    onComplete({ language: finalLang, englishMode: finalMode, role: finalRole })
  }, [language, englishMode, role, setLang, setGlobalRole, setGlobalEnglishMode, onComplete])

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

        {step === 'language' && (
          <LanguageSelection
            key="language"
            selected={language}
            onSelectLanguage={handleLanguageSelect}
          />
        )}

        {step === 'english-mode' && (
          <EnglishModeSelection
            key="english-mode"
            selected={englishMode}
            onSelectMode={handleEnglishModeSelect}
          />
        )}

        {step === 'goal' && (
          <GoalSelection
            key="goal"
            selected={goal}
            onSelect={handleGoalSelect}
            onNext={() => setStep('level')}
          />
        )}

        {step === 'level' && (
          <LevelSelection
            key="level"
            selected={level}
            onSelect={handleLevelSelect}
            onNext={() => setStep('role')}
          />
        )}

        {step === 'role' && (
          <RoleSelection
            key="role"
            selected={role}
            onSelect={handleRoleSelect}
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
