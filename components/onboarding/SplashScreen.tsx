'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { springGentle, springSnappy } from '@/lib/animations'

interface SplashScreenProps {
  onComplete: () => void
}

/** Floating ambient particles for futuristic atmosphere */
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#4FA6A0]/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0.5],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/** SVG stroke overlay for mandala draw effect */
function StrokeOverlay({ size }: { size: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.42

  const paths = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180
    const x1 = cx + Math.cos(a) * r * 0.1
    const y1 = cy + Math.sin(a) * r * 0.1
    const x2 = cx + Math.cos(a) * r * 0.85
    const y2 = cy + Math.sin(a) * r * 0.85
    const cpx = cx + Math.cos(a + 0.5) * r * 0.55
    const cpy = cy + Math.sin(a + 0.5) * r * 0.55
    return `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 z-20 pointer-events-none"
      aria-hidden
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#4FA6A0"
          strokeWidth={1.2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.7] }}
          transition={{
            pathLength: { duration: 0.5, delay: 0.5 + i * 0.05, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay: 0.5 + i * 0.05 },
          }}
        />
      ))}
    </svg>
  )
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'draw' | 'pulse' | 'morph'>('intro')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('draw'), 300),
      setTimeout(() => setPhase('pulse'), 1800),
      setTimeout(() => setPhase('morph'), 2500),
      setTimeout(() => onComplete(), 3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const logoSize = phase === 'morph' ? 40 : 180

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#00171F]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Particles />

      {/* Ambient radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(79,166,160,0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(37,120,116,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(79,166,160,0.08) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 2, repeat: phase === 'pulse' ? Infinity : 0, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          className="relative flex flex-col items-center"
          animate={
            phase === 'morph'
              ? {
                  x: typeof window !== 'undefined' ? -window.innerWidth / 2 + 52 : -150,
                  y: typeof window !== 'undefined' ? -window.innerHeight / 2 + 52 : -300,
                  scale: 0.22,
                }
              : { x: 0, y: 0, scale: 1 }
          }
          transition={springSnappy}
        >
          {/* Central particle that expands */}
          <motion.div
            className="absolute rounded-full bg-[#4FA6A0]"
            initial={{ width: 4, height: 4, opacity: 1 }}
            animate={
              phase === 'intro'
                ? { width: 4, height: 4, opacity: 1 }
                : {
                    width: [4, logoSize * 1.2, logoSize * 1.1],
                    height: [4, logoSize * 1.2, logoSize * 1.1],
                    opacity: [1, 0.3, 0],
                  }
            }
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 20px rgba(79,166,160,0.6)',
            }}
          />

          {/* Logo container with rotation and glow */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: phase === 'intro' ? 0 : 1,
              scale: 1,
              rotate: phase === 'pulse' || phase === 'morph' ? 8 : 0,
            }}
            transition={{
              opacity: { duration: 0.4, delay: 0.3 },
              scale: springGentle,
              rotate: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            {/* Glow pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={
                phase === 'pulse' || phase === 'draw'
                  ? {
                      boxShadow: [
                        '0 0 30px rgba(37,120,116,0.2)',
                        '0 0 60px rgba(37,120,116,0.4)',
                        '0 0 30px rgba(37,120,116,0.2)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ borderRadius: '50%' }}
            />

            <motion.div
              style={{ width: logoSize, height: logoSize }}
              animate={{ width: logoSize, height: logoSize }}
              transition={springSnappy}
            >
              {(phase === 'draw' || phase === 'pulse') && (
                <StrokeOverlay size={logoSize} />
              )}
              <Image
                src="/aura-logo.png"
                alt="AURA"
                width={180}
                height={180}
                priority
                className="relative z-10 object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* AURA text fades upward */}
          <motion.span
            className="mt-4 text-3xl font-bold tracking-[0.4em] text-[#00171F] dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === 'morph'
                ? { opacity: 0, y: -20 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              opacity: { duration: 0.5, delay: 1.4 },
              y: { duration: 0.6, delay: 1.4, ease: 'easeOut' },
            }}
          >
            AURA
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
