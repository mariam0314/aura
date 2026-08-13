'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { englishModes, type EnglishMode } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface EnglishModeSelectionProps {
  selected: EnglishMode | null
  onSelect: (mode: EnglishMode) => void
  onNext: () => void
}

/** English tone selection — shown only when English is chosen */
export default function EnglishModeSelection({
  selected,
  onSelect,
  onNext,
}: EnglishModeSelectionProps) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-14 pb-8 max-w-lg mx-auto"
    >
      <motion.div variants={fadeUp} className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          How would you like Aura to speak?
        </h1>
        <p className="text-base text-[var(--aura-text-muted)]">
          Pick the tone that feels most natural to you.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-4"
        role="radiogroup"
        aria-label="English speaking style"
      >
        {englishModes.map((mode) => (
          <motion.div key={mode.id} variants={staggerItem}>
            <Card
              selected={selected === mode.id}
              onClick={() => onSelect(mode.id)}
              aria-label={`Select ${mode.title}`}
            >
              <div className="pr-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden>
                    {mode.emoji}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--aura-text)]">
                    {mode.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--aura-text-muted)] mb-4">
                  &ldquo;{mode.description}&rdquo;
                </p>
                <div className="rounded-2xl bg-[var(--aura-bg)] border border-[var(--aura-border)] px-4 py-3.5">
                  <p className="text-xs font-semibold text-[var(--aura-text-muted)] uppercase tracking-wider mb-1.5">
                    Example
                  </p>
                  <p className="text-sm text-[var(--aura-text)] leading-relaxed">
                    {mode.example}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="pt-6 mt-auto">
        <Button fullWidth disabled={!selected} onClick={onNext}>
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}
