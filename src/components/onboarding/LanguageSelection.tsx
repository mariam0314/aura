'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { languages, type LanguageCode } from '@/lib/onboarding-data'
import { useLanguage } from '@/context/LanguageContext'
import {
  fadeUp,
  screenVariants,
  staggerContainer,
  staggerItem,
} from '@/lib/animations'
import type { LangCode } from '@/i18n/translations'
import { Sparkles, CheckCircle2 } from 'lucide-react'

interface LanguageSelectionProps {
  selected: LanguageCode | null
  onSelectLanguage: (code: LanguageCode) => void
}

/** Step 1 — Language Selection: Click immediately selects and automatically advances */
export default function LanguageSelection({
  selected,
  onSelectLanguage,
}: LanguageSelectionProps) {
  const { setLang, t } = useLanguage()
  const [activeCode, setActiveCode] = useState<LanguageCode | null>(selected)

  const handleChoose = (code: LanguageCode) => {
    setActiveCode(code)
    setLang(code as LangCode)

    // Smooth automatic progression (350ms) without needing a Continue button
    setTimeout(() => {
      onSelectLanguage(code)
    }, 350)
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] dark:text-[#35C88A] font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1 • Platform Language</span>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          {t.common.selectLanguage || 'Choose your preferred language'}
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          Select your native language. Aura will adapt all UI, explanations, and spoken instruction.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto aura-scroll pb-4 max-h-[65vh] -mx-1 px-1"
        role="listbox"
        aria-label="Select language"
      >
        {languages.map((lang) => {
          const isChosen = activeCode === lang.code

          return (
            <motion.div
              key={lang.code}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="option"
              aria-selected={isChosen}
            >
              <Card
                selected={isChosen}
                onClick={() => handleChoose(lang.code)}
                aria-label={`Select ${lang.name}`}
                className={`h-full flex items-center justify-between transition-all cursor-pointer ${
                  isChosen ? 'ring-2 ring-[#257874] bg-[#257874]/10 shadow-lg' : ''
                }`}
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

                {isChosen && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[#35C88A]"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="pt-2 text-center">
        <span className="text-[11px] text-[var(--aura-text-muted)] font-medium">
          Selecting a language automatically progresses to the next step
        </span>
      </div>
    </motion.div>
  )
}
