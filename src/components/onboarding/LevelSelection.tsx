'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { levels, type LevelOption } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'
import { Zap, CheckCircle2 } from 'lucide-react'

interface LevelSelectionProps {
  selected: string | null
  onSelect: (levelId: string) => void
  onNext: () => void
}

/** Level Selection: Click immediately selects and automatically advances (No Continue button) */
export default function LevelSelection({
  selected,
  onSelect,
  onNext,
}: LevelSelectionProps) {
  const [activeLevel, setActiveLevel] = useState<string | null>(selected)

  const handleChoose = (levelId: string) => {
    setActiveLevel(levelId)
    onSelect(levelId)

    // Smooth automatic transition (500ms) without needing a Continue button
    setTimeout(() => {
      onNext()
    }, 500)
  }

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
          <Zap className="w-3.5 h-3.5" />
          <span>Current Proficiency</span>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          What&apos;s your current level?
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          Aura automatically adjusts initial question difficulty and explanation depth.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-3"
        role="radiogroup"
        aria-label="Select your experience level"
      >
        {levels.map((lvl) => {
          const isChosen = activeLevel === lvl.id

          return (
            <motion.div
              key={lvl.id}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                selected={isChosen}
                onClick={() => handleChoose(lvl.id)}
                aria-label={`Select ${lvl.title}`}
                className={`py-5 transition-all cursor-pointer ${
                  isChosen ? 'ring-2 ring-[#257874] bg-[#257874]/10 shadow-xl' : ''
                }`}
              >
                <div className="flex items-center justify-between pr-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl shrink-0" aria-hidden>
                      {lvl.emoji}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[var(--aura-text)]">
                        {lvl.title}
                      </h3>
                      <p className="text-xs text-[var(--aura-text-muted)] mt-0.5 leading-relaxed">
                        {lvl.description}
                      </p>
                    </div>
                  </div>

                  {isChosen && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#35C88A] shrink-0 ml-2"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="pt-4 text-center">
        <span className="text-[11px] text-[var(--aura-text-muted)] font-medium">
          Selecting a level sets your starting cognitive difficulty
        </span>
      </div>
    </motion.div>
  )
}
