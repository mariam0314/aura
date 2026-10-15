'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { goals, type GoalOption } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'
import { Target, CheckCircle2 } from 'lucide-react'

interface GoalSelectionProps {
  selected: string | null
  onSelect: (goalId: string) => void
  onNext: () => void
}

/** Goal Selection: Click immediately selects and automatically advances (No Continue button) */
export default function GoalSelection({
  selected,
  onSelect,
  onNext,
}: GoalSelectionProps) {
  const [activeGoal, setActiveGoal] = useState<string | null>(selected)

  const handleChoose = (goalId: string) => {
    setActiveGoal(goalId)
    onSelect(goalId)

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
          <Target className="w-3.5 h-3.5" />
          <span>Primary Goal</span>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          What do you want to achieve?
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          Aura creates your personalized learning roadmap based on this target.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-3"
        role="radiogroup"
        aria-label="Select your primary goal"
      >
        {goals.map((g) => {
          const isChosen = activeGoal === g.id

          return (
            <motion.div
              key={g.id}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                selected={isChosen}
                onClick={() => handleChoose(g.id)}
                aria-label={`Select ${g.title}`}
                className={`py-4 transition-all cursor-pointer ${
                  isChosen ? 'ring-2 ring-[#257874] bg-[#257874]/10 shadow-xl' : ''
                }`}
              >
                <div className="flex items-center justify-between pr-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl shrink-0" aria-hidden>
                      {g.emoji}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--aura-text)]">
                        {g.title}
                      </h3>
                      <p className="text-xs text-[var(--aura-text-muted)] mt-0.5">
                        {g.description}
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
          Selecting a goal automatically sets up your path
        </span>
      </div>
    </motion.div>
  )
}
