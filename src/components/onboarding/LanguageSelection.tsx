'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { languages, type LanguageCode } from '@/lib/onboarding-data'
import { useLanguage } from '@/context/LanguageContext'
import {
  fadeUp,
  screenVariants,
  staggerContainer,
  staggerItem,
} from '@/lib/animations'
import type { LangCode } from '@/i18n/translations'

interface LanguageSelectionProps {
  selected: LanguageCode | null
  onSelect: (code: LanguageCode) => void
  onNext: () => void
}

/** Step 3 — Language Selection Page immediately after Enter Aura */
export default function LanguageSelection({
  selected,
  onSelect,
  onNext,
}: LanguageSelectionProps) {
  const { setLang, t } = useLanguage()

  const handleChoose = (code: LanguageCode) => {
    onSelect(code)
    setLang(code as LangCode)
  }

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-14 pb-8 max-w-xl mx-auto"
    >
      <motion.div variants={fadeUp} className="mb-6 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] font-semibold text-xs uppercase tracking-wider mb-2">
          Step 1 of 3
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          {t.common.selectLanguage || 'Choose your preferred language'}
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          The entire interface will instantly adjust to your chosen language.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto aura-scroll pb-4 max-h-[60vh] -mx-1 px-1"
        role="listbox"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <motion.div
            key={lang.code}
            variants={staggerItem}
            role="option"
            aria-selected={selected === lang.code}
          >
            <Card
              selected={selected === lang.code}
              onClick={() => handleChoose(lang.code)}
              aria-label={`Select ${lang.name}`}
              className="h-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl shrink-0" aria-hidden>
                  {lang.flag}
                </span>
                <div>
                  <p className="text-base font-bold text-[var(--aura-text)]">
                    {lang.native}
                  </p>
                  <p className="text-xs text-[var(--aura-text-muted)] mt-0.5">
                    {lang.name}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="pt-4 mt-auto">
        <Button
          fullWidth
          disabled={!selected}
          onClick={onNext}
          aria-label="Continue with selected language"
        >
          {t.common.continueBtn || 'Continue to Application'}
        </Button>
      </motion.div>
    </motion.div>
  )
}
