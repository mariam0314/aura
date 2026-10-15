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

/** Reusable selection card with hover lift and glowing checkmark */
export default function Card({
  selected = false,
  selectable = true,
  showCheck = true,
  children,
  className = '',
  ...props
}: CardProps) {
  const baseClassName = [
    'relative w-full text-left rounded-3xl p-5',
    'border transition-all duration-300 spatial-surface-3d',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#257874]',
    selected
      ? 'bg-[var(--aura-card-bg)] border-[#257874] shadow-[0_0_28px_rgba(37,120,116,0.18)]'
      : 'bg-[var(--aura-surface)] border-[var(--aura-border)] hover:border-[#4FA6A0]/50 shadow-sm',
    selectable ? 'cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
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
    </>
  )

  if (!selectable) {
    return (
      <motion.div layout className={baseClassName}>
        {content}
      </motion.div>
    )
  }

  return (
    <motion.button
      layout
      whileHover={selected ? { scale: 1.02, y: -2 } : { scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.985 }}
      animate={selected ? { scale: 1.02 } : { scale: 1 }}
      transition={springGentle}
      aria-pressed={selected}
      className={baseClassName}
      {...props}
    >
      {content}
    </motion.button>
  )
}
