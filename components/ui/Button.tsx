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
    'shadow-[0_4px_24px_rgba(37,120,116,0.25)]',
    'hover:shadow-[0_8px_32px_rgba(37,120,116,0.4)]',
  ].join(' '),
  secondary: [
    'bg-[var(--aura-surface)] text-[var(--aura-text)]',
    'border border-[var(--aura-border)]',
    'hover:bg-[var(--aura-card-bg)]',
  ].join(' '),
  ghost: 'bg-transparent text-[var(--aura-text-secondary)] hover:text-[var(--aura-text)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  md: 'px-6 py-3 text-base min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[56px] font-semibold',
}

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
        {/* Glow sweep on primary buttons */}
        {glow && variant === 'primary' && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            initial={{ opacity: 0 }}
            whileTap={{ opacity: 1 }}
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
