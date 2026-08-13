'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { Check } from 'lucide-react'
import { springGentle } from '@/lib/animations'

interface CardProps extends HTMLMotionProps<'button'> {
  selected?: boolean
  selectable?: boolean
  showCheck?: boolean
  children: React.ReactNode
}

export default function Card({
  selected = false,
  selectable = true,
  showCheck = true,
  children,
  className = '',
  ...props
}: CardProps) {
  const Component = selectable ? motion.button : motion.div

  return (
    <Component
      layout
      whileHover={selectable ? { scale: 1.015, y: -2 } : undefined}
      whileTap={selectable ? { scale: 0.985 } : undefined}
      transition={springGentle}
      aria-pressed={selectable ? selected : undefined}
      className={[
        'relative w-full text-left rounded-3xl p-5',
        'border transition-all duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#257874]',
        selected
          ? 'bg-[var(--aura-card-bg)] border-[#257874] shadow-[0_0_24px_rgba(37,120,116,0.12)] scale-[1.02]'
          : 'bg-[var(--aura-surface)] border-[var(--aura-border)] hover:border-[#4FA6A0]/40',
        selectable ? 'cursor-pointer' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(selectable ? props : {})}
    >
      {children}

      {/* Selected checkmark with glow */}
      {selected && showCheck && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springGentle}
          className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-[#257874] shadow-[0_0_12px_rgba(37,120,116,0.5)]"
          aria-hidden
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </motion.span>
      )}
    </Component>
  )
}
