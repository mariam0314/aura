'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { roles, type UserRole } from '@/lib/onboarding-data'
import { fadeUp, screenVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface RoleSelectionProps {
  selected: UserRole | null
  onSelect: (role: UserRole) => void
  onNext: () => void
}

/** Animated mini-illustrations per role */
function RoleIllustration({ role }: { role: UserRole }) {
  if (role === 'school') {
    return (
      <motion.div
        className="flex gap-1 mt-3"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        {['📕', '📗', '📘'].map((book, i) => (
          <motion.span
            key={book}
            className="text-2xl"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            {book}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  if (role === 'college') {
    return (
      <motion.div
        className="mt-3 text-4xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        💻
      </motion.div>
    )
  }

  return (
    <motion.div
      className="mt-3 text-4xl"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      🗂️
    </motion.div>
  )
}

export default function RoleSelection({
  selected,
  onSelect,
  onNext,
}: RoleSelectionProps) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-12 pb-8 max-w-lg mx-auto"
    >
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-2">
          Tell Aura about yourself
        </h1>
        <p className="text-base text-[var(--aura-text-muted)]">
          We&apos;ll tailor your AI mentor to fit your journey.
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
        {roles.map((role) => (
          <motion.div key={role.id} variants={staggerItem}>
            <Card
              selected={selected === role.id}
              onClick={() => onSelect(role.id)}
              aria-label={`Select ${role.title}`}
              className={selected === role.id ? 'py-6' : 'py-5'}
            >
              <div className="flex items-start gap-4 pr-8">
                <span className="text-4xl shrink-0" aria-hidden>{role.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[var(--aura-text)] mb-1">
                    {role.title}
                  </h3>
                  <p className="text-sm text-[var(--aura-text-muted)] mb-2">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-[var(--aura-bg)] border border-[var(--aura-border)] text-[var(--aura-text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <RoleIllustration role={role.id} />
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
