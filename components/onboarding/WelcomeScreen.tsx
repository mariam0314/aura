'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { fadeUp, floatingAnimation, screenVariants } from '@/lib/animations'

interface WelcomeScreenProps {
  onNext: () => void
}

/** Friendly AI mentor illustration built with pure CSS/SVG */
function MentorIllustration() {
  return (
    <motion.div
      {...floatingAnimation}
      className="relative w-64 h-64 mx-auto"
      aria-hidden
    >
      {/* Outer orbit ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[#D9E4E6] dark:border-[#4FA6A0]/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle glow sphere */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#F6F8F9] to-[#D9E4E6] dark:from-[#002830] dark:to-[#00171F] shadow-inner flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4FA6A0] to-[#257874] flex items-center justify-center shadow-[0_8px_32px_rgba(37,120,116,0.3)]"
          animate={{
            boxShadow: [
              '0 8px 32px rgba(37,120,116,0.3)',
              '0 16px 48px rgba(37,120,116,0.5)',
              '0 8px 32px rgba(37,120,116,0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-3xl">🧠</span>
        </motion.div>
      </div>

      {/* Orbiting dots */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute w-3 h-3 rounded-full bg-[#4FA6A0]"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -6,
            marginLeft: -6,
          }}
          animate={{
            x: Math.cos((deg * Math.PI) / 180) * 110,
            y: Math.sin((deg * Math.PI) / 180) * 110,
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            x: { duration: 0 },
            y: { duration: 0 },
            opacity: { duration: 2, delay: i * 0.6, repeat: Infinity },
          }}
        />
      ))}

      {/* Floating sparkles */}
      {[
        { x: '10%', y: '20%', delay: 0 },
        { x: '80%', y: '15%', delay: 0.5 },
        { x: '75%', y: '75%', delay: 1 },
        { x: '15%', y: '70%', delay: 1.5 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#257874]"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </motion.div>
  )
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-dvh px-6 pt-16 pb-8 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-extrabold tracking-tight text-[var(--aura-text)] leading-tight mb-4"
        >
          👋 Welcome to Aura
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg text-[var(--aura-text-muted)] leading-relaxed mb-12"
        >
          Your personal AI mentor that learns with you.
        </motion.p>

        <motion.div variants={fadeUp}>
          <MentorIllustration />
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        className="mt-auto pt-8"
      >
        <Button fullWidth onClick={onNext} aria-label="Get started with Aura">
          Get Started
        </Button>
      </motion.div>
    </motion.div>
  )
}
