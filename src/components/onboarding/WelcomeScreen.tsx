'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { fadeUp, floatingAnimation, screenVariants } from '@/lib/animations'

interface WelcomeScreenProps {
  onNext: () => void
}

/** Futuristic AI mentor orb with orbiting particles */
function MentorIllustration() {
  return (
    <motion.div
      animate={floatingAnimation.animate}
      className="relative w-72 h-72 mx-auto"
      aria-hidden
    >
      {/* Outer glass ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[#D9E4E6]/80 dark:border-[#4FA6A0]/15 backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle orbit */}
      <motion.div
        className="absolute inset-6 rounded-full border border-dashed border-[#4FA6A0]/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core sphere with glass effect */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[#F6F8F9] to-white dark:from-[#002830] dark:to-[#00171F] shadow-[inset_0_2px_20px_rgba(79,166,160,0.08)] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#4FA6A0]/5 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4FA6A0] to-[#257874] flex items-center justify-center"
          animate={{
            boxShadow: [
              '0 8px 40px rgba(37,120,116,0.25)',
              '0 16px 56px rgba(37,120,116,0.45)',
              '0 8px 40px rgba(37,120,116,0.25)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-4xl">✨</span>
        </motion.div>
      </div>

      {/* Orbiting teal dots */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute w-2.5 h-2.5 rounded-full bg-[#4FA6A0] shadow-[0_0_8px_rgba(79,166,160,0.6)]"
          style={{ top: '50%', left: '50%', marginTop: -5, marginLeft: -5 }}
          animate={{
            x: Math.cos((deg * Math.PI) / 180) * 120,
            y: Math.sin((deg * Math.PI) / 180) * 120,
            opacity: [0.35, 1, 0.35],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            opacity: { duration: 2.5, delay: i * 0.4, repeat: Infinity },
            scale: { duration: 2.5, delay: i * 0.4, repeat: Infinity },
          }}
        />
      ))}

      {/* Ambient sparkles */}
      {[
        { x: '8%', y: '18%', delay: 0 },
        { x: '85%', y: '12%', delay: 0.6 },
        { x: '78%', y: '78%', delay: 1.2 },
        { x: '12%', y: '72%', delay: 1.8 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#257874]"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </motion.div>
  )
}

/** Step 2 — Welcome Screen */
export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-20 pb-8 max-w-lg mx-auto"
    >
      <div className="flex-1 flex flex-col justify-center">
        <motion.h1
          variants={fadeUp}
          className="text-[2.5rem] font-extrabold tracking-tight text-[var(--aura-text)] leading-[1.15] mb-4"
        >
          👋 Welcome to Aura
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-[var(--aura-text-muted)] leading-relaxed mb-14"
        >
          Your personal AI mentor that learns with you.
        </motion.p>

        <motion.div variants={fadeUp}>
          <MentorIllustration />
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="mt-auto pt-10">
        <Button fullWidth onClick={onNext} aria-label="Get started with Aura">
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  )
}
