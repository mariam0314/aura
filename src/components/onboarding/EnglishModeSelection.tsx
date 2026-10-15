'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import type { EnglishMode } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'
import { CheckCircle2, MessageSquare } from 'lucide-react'

interface EnglishModeSelectionProps {
  selected: EnglishMode | null
  onSelectMode: (mode: EnglishMode) => void
}

/**
 * 🚨 CRITICAL REQUIRED SCREEN
 * "How should Aura talk to you?"
 * Visibly contains exactly two real clickable UI cards:
 * 1. Normal English (Clear, natural & professional)
 * 2. Gen-Z English (Casual, modern & playful)
 * Clicking either card automatically selects, highlights, saves, and moves to the next step without a Continue button.
 */
export default function EnglishModeSelection({
  selected,
  onSelectMode,
}: EnglishModeSelectionProps) {
  const [activeMode, setActiveMode] = useState<EnglishMode | null>(selected)

  const handleChoose = (modeId: EnglishMode) => {
    setActiveMode(modeId)

    // Smooth automatic transition (400ms) without needing a Continue button
    setTimeout(() => {
      onSelectMode(modeId)
    }, 400)
  }

  const toneOptions = [
    {
      id: 'professional' as EnglishMode,
      emoji: '🗣',
      title: 'Normal English',
      subtitle: 'Clear, natural & professional',
      description: 'Simple, clear and professional',
      example: 'You scored 72%. Your SQL fundamentals are strong, but JOIN operations need more practice.',
    },
    {
      id: 'genz' as EnglishMode,
      emoji: '✨',
      title: 'Gen-Z English',
      subtitle: 'Casual, modern & playful',
      description: 'Friendly, casual and a little fun',
      example: 'Okayyy, 72% is actually solid 🔥 Your SQL basics are good, but JOINs are kinda fighting you 😭. Let’s fix those.',
    },
  ]

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-14 pb-8 max-w-lg mx-auto"
    >
      <motion.div variants={fadeUp} className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] dark:text-[#35C88A] font-bold text-xs uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tone & Communication Preference</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--aura-text)] mb-3">
          How should Aura talk to you?
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          Select how you want Aura to communicate with you throughout your learning journey.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-4"
        role="radiogroup"
        aria-label="How should Aura talk to you?"
      >
        {toneOptions.map((mode) => {
          const isChosen = activeMode === mode.id

          return (
            <motion.div
              key={mode.id}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                selected={isChosen}
                onClick={() => handleChoose(mode.id)}
                aria-label={`Select ${mode.title}`}
                className={`py-5 px-6 transition-all cursor-pointer border-2 ${
                  isChosen
                    ? 'border-[#257874] bg-[#257874]/10 shadow-2xl scale-[1.01]'
                    : 'border-[var(--aura-border)] hover:border-[#257874]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden>
                        {mode.emoji}
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-[var(--aura-text)]">
                          {mode.title}
                        </h2>
                        <span className="text-xs font-semibold text-[#257874] dark:text-[#35C88A]">
                          {mode.subtitle}
                        </span>
                      </div>
                    </div>

                    {isChosen && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[#35C88A]"
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--aura-text-muted)] italic">
                    &ldquo;{mode.description}&rdquo;
                  </p>

                  <div className="rounded-2xl bg-white/70 dark:bg-[#00171F]/80 border border-[var(--aura-border)] px-4 py-3 shadow-inner">
                    <p className="text-[10px] font-bold text-[var(--aura-text-muted)] uppercase tracking-wider mb-1">
                      Example Feedback
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--aura-text)] leading-relaxed font-medium">
                      &ldquo;{mode.example}&rdquo;
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="pt-4 text-center">
        <span className="text-[11px] text-[var(--aura-text-muted)] font-medium">
          Clicking an option automatically saves your tone and advances
        </span>
      </div>
    </motion.div>
  )
}
