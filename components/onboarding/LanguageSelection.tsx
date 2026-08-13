'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { languages, type LanguageCode } from '@/lib/onboarding-data'
import {
  fadeUp,
  screenVariants,
  staggerContainer,
  staggerItem,
} from '@/lib/animations'

interface LanguageSelectionProps {
  selected: LanguageCode | null
  onSelect: (code: LanguageCode) => void
  onNext: () => void
}

export default function LanguageSelection({
  selected,
  onSelect,
  onNext,
}: LanguageSelectionProps) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-12 pb-8 max-w-lg mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          Choose your preferred language
        </h1>
        <p className="text-base text-[var(--aura-text-muted)]">
          You can change it anytime.
        </p>
      </motion.div>

      {/* Language cards — scrollable list */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 overflow-y-auto aura-scroll space-y-3 pb-4 -mx-1 px-1"
        role="listbox"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <motion.div key={lang.code} variants={staggerItem} role="option" aria-selected={selected === lang.code}>
            <Card
              selected={selected === lang.code}
              onClick={() => onSelect(lang.code)}
              aria-label={`Select ${lang.name}`}
            >
              <div className="flex items-center gap-4 pr-8">
                <span className="text-2xl" aria-hidden>{lang.flag}</span>
                <div>
                  <p className="text-base font-semibold text-[var(--aura-text)]">
                    {lang.name}
                  </p>
                  <p className="text-lg text-[var(--aura-text-muted)] mt-0.5">
                    {lang.native}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Continue */}
      <motion.div variants={fadeUp} className="pt-4 mt-auto">
        <Button
          fullWidth
          disabled={!selected}
          onClick={onNext}
          aria-label="Continue with selected language"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}
