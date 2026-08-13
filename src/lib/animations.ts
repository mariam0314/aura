import type { Transition, Variants } from 'framer-motion'

/** Shared spring presets for premium feel */
export const springGentle: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.8,
}

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.6,
}

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 18,
  mass: 0.9,
}

export const easePremium = [0.22, 1, 0.36, 1] as const

/** Screen transition variants with soft blur */
export const screenVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easePremium },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: 'blur(6px)',
    transition: { duration: 0.4, ease: easePremium },
  },
}

/** Stagger children for card lists */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 36 },
  animate: {
    opacity: 1,
    y: 0,
    transition: springGentle,
  },
}

/** Fade up for text elements */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
}

/** Scale in for cards */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
}

/** Glow pulse keyframes helper */
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(37, 120, 116, 0.15)',
      '0 0 40px rgba(37, 120, 116, 0.35)',
      '0 0 20px rgba(37, 120, 116, 0.15)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

/** Floating animation for illustrations */
export const floatingAnimation = {
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
  },
}

/** Button press scale */
export const buttonTap = { scale: 0.96 }
export const buttonHover = { scale: 1.02 }

/** Logo morph shared layout transition */
export const logoMorphTransition: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 0.7,
}
