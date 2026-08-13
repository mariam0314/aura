'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Play, Volume2, ArrowRight } from 'lucide-react'

interface SplashScreenProps {
  onComplete: () => void
}

/** Animated Particle Canvas where particles drift, gather, and form the core logo center */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const numParticles = 60
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      targetX: width / 2 + (Math.random() - 0.5) * 180,
      targetY: height / 2 + (Math.random() - 0.5) * 180,
      speedFactor: Math.random() * 0.02 + 0.01,
    }))

    let startTime = Date.now()

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000
      ctx.clearRect(0, 0, width, height)

      // Particles gather towards center after 1.5 seconds
      const isGathering = elapsed > 1.2

      particles.forEach((p) => {
        if (isGathering) {
          p.x += (p.targetX - p.x) * p.speedFactor
          p.y += (p.targetY - p.y) * p.speedFactor
        } else {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 166, 160, ${p.alpha})`
        ctx.shadowBlur = 12
        ctx.shadowColor = '#257874'
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
}

/** Background Music / Audio Visualizer Bar Component */
function AudioVisualizer() {
  const bars = [40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65]
  return (
    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <Volume2 className="w-3.5 h-3.5 text-[#35C88A] animate-pulse" />
      <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 mr-2">
        Ambient Audio Sync
      </span>
      <div className="flex items-end gap-0.5 h-4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-[#257874] to-[#35C88A]"
            animate={{ height: [`${h * 0.2}%`, `${h}%`, `${h * 0.3}%`] }}
            transition={{
              duration: 0.8 + (i % 3) * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<
    'black' | 'particles' | 'formLogo' | 'energyWave' | 'textReveal' | 'ready'
  >('black')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('particles'), 400),
      setTimeout(() => setPhase('formLogo'), 1400),
      setTimeout(() => setPhase('energyWave'), 2600),
      setTimeout(() => setPhase('textReveal'), 3600),
      setTimeout(() => setPhase('ready'), 4600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#00171F] text-white p-6 overflow-hidden select-none"
    >
      {/* Dynamic Canvas Particles */}
      {phase !== 'black' && <ParticleCanvas />}

      {/* Ambient Lighting radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{
          background:
            phase === 'energyWave' || phase === 'textReveal' || phase === 'ready'
              ? 'radial-gradient(circle, rgba(37,120,116,0.3) 0%, rgba(0,23,31,0) 70%)'
              : 'radial-gradient(circle, rgba(79,166,160,0.1) 0%, rgba(0,23,31,0) 70%)',
          scale: phase === 'ready' ? [1, 1.08, 1] : 1,
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Top Header Label */}
      <div className="relative z-10 pt-4 flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase !== 'black' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest text-[#35C88A] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Brand Reveal</span>
        </motion.div>
      </div>

      {/* Center Hero Logo & Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center max-w-2xl px-4">
        {/* Aura Logo (EXCLUSIVELY APPREARS HERE) */}
        <AnimatePresence>
          {(phase === 'formLogo' ||
            phase === 'energyWave' ||
            phase === 'textReveal' ||
            phase === 'ready') && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1, type: 'spring', stiffness: 120, damping: 15 }}
              className="relative w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center"
            >
              {/* Soft Glowing Backdrop Ring */}
              <div className="absolute inset-0 rounded-full bg-[#257874]/30 blur-2xl animate-pulse" />

              {/* Exclusive Aura Logo Image */}
              <div className="relative z-10 w-full h-full p-2">
                <Image
                  src="/aura-logo.png"
                  alt="AURA Brand Logo"
                  width={200}
                  height={200}
                  priority
                  className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(37,120,116,0.6)]"
                />
              </div>

              {/* Teal Energy Wave Pass Effect */}
              {phase === 'energyWave' && (
                <motion.div
                  initial={{ x: '-120%', opacity: 0 }}
                  animate={{ x: '120%', opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full"
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-[#257874] to-transparent opacity-80 blur-md transform skew-x-12" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typography: AURA */}
        <AnimatePresence>
          {(phase === 'textReveal' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.3em] text-white mb-3 drop-shadow-md">
                AURA
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-md font-light leading-relaxed mb-6">
                AI-Powered Adaptive Learning Platform with Character Mentor
              </p>
              <AudioVisualizer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button: Enter Aura */}
      <div className="relative z-10 pb-8 flex flex-col items-center">
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="relative group px-10 py-4 rounded-full bg-[#257874] text-white text-base font-bold tracking-wide shadow-[0_0_40px_rgba(37,120,116,0.6)] hover:shadow-[0_0_60px_rgba(37,120,116,0.9)] transition-all flex items-center gap-3 overflow-hidden border border-[#4FA6A0]/40"
            >
              {/* Ambient Pulsing Ring */}
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              <span className="relative z-10">Enter AURA</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
