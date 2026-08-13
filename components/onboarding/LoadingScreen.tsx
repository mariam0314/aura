'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { loadingMessages } from '@/lib/onboarding-data'
import { fadeUp, screenVariants } from '@/lib/animations'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Rotate messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Progress ring animation over ~8 seconds
  useEffect(() => {
    const duration = 8000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct < 1) {
        requestAnimationFrame(tick)
      } else {
        onComplete()
      }
    }
    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-dvh px-6 max-w-lg mx-auto text-center"
      role="status"
      aria-live="polite"
      aria-label="Preparing your AI mentor"
    >
      <motion.h1
        variants={fadeUp}
        className="text-3xl font-extrabold tracking-tight text-[var(--aura-text)] mb-3"
      >
        Awesome!
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-base text-[var(--aura-text-muted)] mb-16 max-w-xs"
      >
        Aura is preparing your personal AI mentor.
      </motion.p>

      {/* Logo with animated loading ring */}
      <div className="relative mb-12">
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 40px rgba(37,120,116,0.15)',
              '0 0 80px rgba(37,120,116,0.3)',
              '0 0 40px rgba(37,120,116,0.15)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* SVG progress ring */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 120 120"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[10px]"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--aura-border)"
            strokeWidth="3"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#257874"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>

        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <Image
            src="/aura-logo.png"
            alt="AURA"
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Rotating status messages */}
      <div className="h-8 relative w-full max-w-xs">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 text-sm text-[var(--aura-text-muted)]"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-8 h-1 rounded-full bg-[var(--aura-border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#4FA6A0] to-[#257874]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </motion.div>
  )
}
