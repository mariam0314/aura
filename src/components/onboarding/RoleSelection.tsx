'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { roles, type UserRole } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'
import { Sparkles, CheckCircle2, User } from 'lucide-react'

interface RoleSelectionProps {
  selected: UserRole | null
  onSelect: (role: UserRole) => void
  onNext: () => void
}

/** Step 3 — Role Selection: Click immediately selects and automatically advances (No Continue button) */
export default function RoleSelection({
  selected,
  onSelect,
  onNext,
}: RoleSelectionProps) {
  const [activeRole, setActiveRole] = useState<UserRole | null>(selected)

  const handleChoose = (roleId: UserRole) => {
    setActiveRole(roleId)
    onSelect(roleId)

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
          <User className="w-3.5 h-3.5" />
          <span>Step 3 • Learner Profile</span>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          Tell Aura about yourself
        </h1>
        <p className="text-sm text-[var(--aura-text-muted)]">
          We&apos;ll tailor your personalized learning path and diagnostic depth to your exact role.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex-1 space-y-4"
        role="radiogroup"
        aria-label="Select your role"
      >
        {roles.map((role) => {
          const isChosen = activeRole === role.id

          return (
            <motion.div
              key={role.id}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <Card
                selected={isChosen}
                onClick={() => handleChoose(role.id)}
                aria-label={`Select ${role.title}`}
                className={`py-5 transition-all cursor-pointer ${
                  isChosen ? 'ring-2 ring-[#257874] bg-[#257874]/10 shadow-xl' : ''
                }`}
              >
                <div className="flex items-start justify-between pr-2">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl shrink-0" aria-hidden>
                      {role.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[var(--aura-text)] mb-1">
                        {role.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--aura-text-muted)] mb-3">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--aura-bg)] border border-[var(--aura-border)] text-[var(--aura-text-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
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
          Selecting your role automatically sets up your learning environment
        </span>
      </div>
    </motion.div>
  )
}
