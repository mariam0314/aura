'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'
import { buttonHover, buttonTap, springSnappy } from '@/lib/animations'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'lg'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  glow?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[#257874] text-white',
    'btn-3d-tactile',
    'shadow-[0_6px_24px_rgba(15,118,110,0.32)]',
    'hover:shadow-[0_10px_32px_rgba(15,118,110,0.48)]',
  ].join(' '),
  secondary: [
    'bg-[var(--aura-surface)] text-[var(--aura-text)]',
    'border border-[var(--aura-border)]',
    'btn-3d-tactile',
    'hover:bg-[var(--aura-card-bg)] hover:border-[#4FA6A0]/50',
    'shadow-sm',
  ].join(' '),
  ghost: 'bg-transparent text-[var(--aura-text-muted)] hover:text-[var(--aura-text)] hover:bg-[#257874]/5 transition-colors',
}

const sizeStyles: Record<ButtonSize, string> = {
  md: 'px-6 py-3 text-base min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[56px] font-semibold',
}

/** Reusable CTA button with soft scale and glow on press */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      fullWidth = false,
      glow = true,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : buttonHover}
        whileTap={disabled ? undefined : buttonTap}
        transition={springSnappy}
        disabled={disabled}
        className={[
          'relative inline-flex items-center justify-center gap-2',
          'rounded-2xl font-medium tracking-tight',
          'transition-colors duration-200',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#257874]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          glow && variant === 'primary' ? 'overflow-hidden' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {/* Radial glow burst on press */}
        {glow && variant === 'primary' && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileTap={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
            }}
          />
        )}
        <span className="relative z-10">{children as React.ReactNode}</span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
