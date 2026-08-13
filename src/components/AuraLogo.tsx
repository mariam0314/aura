'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AuraLogoProps {
  size?: number
  showText?: boolean
  animateStrokes?: boolean
  className?: string
}

/**
 * Mandala stroke paths overlaying the logo.
 * Creates the "drawn stroke-by-stroke" effect on splash.
 */
function MandalaStrokes({ size, animate }: { size: number; animate: boolean }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38

  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    const x1 = cx + Math.cos(angle) * r * 0.15
    const y1 = cy + Math.sin(angle) * r * 0.15
    const x2 = cx + Math.cos(angle) * r
    const y2 = cy + Math.sin(angle) * r
    const cpAngle1 = angle - 0.4
    const cpAngle2 = angle + 0.4
    const cpx1 = cx + Math.cos(cpAngle1) * r * 0.6
    const cpy1 = cy + Math.sin(cpAngle1) * r * 0.6
    const cpx2 = cx + Math.cos(cpAngle2) * r * 0.6
    const cpy2 = cy + Math.sin(cpAngle2) * r * 0.6
    return `M ${x1} ${y1} Q ${cpx1} ${cpy1} ${x2} ${y2} Q ${cpx2} ${cpy2} ${x1} ${y1}`
  })

  const spirals = Array.from({ length: 4 }, (_, i) => {
    const startAngle = (i * 90 * Math.PI) / 180
    const sr = r * 0.25
    const er = r * 0.45
    const sx = cx + Math.cos(startAngle) * sr
    const sy = cy + Math.sin(startAngle) * sr
    const ex = cx + Math.cos(startAngle + 1.2) * er
    const ey = cy + Math.sin(startAngle + 1.2) * er
    return `M ${cx} ${cy} Q ${sx} ${sy} ${ex} ${ey}`
  })

  const innerLines = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180
    const x1 = cx + Math.cos(angle) * r * 0.2
    const y1 = cy + Math.sin(angle) * r * 0.2
    const x2 = cx + Math.cos(angle) * r * 0.55
    const y2 = cy + Math.sin(angle) * r * 0.55
    return `M ${x1} ${y1} L ${x2} ${y2}`
  })

  if (!animate) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 z-20 pointer-events-none"
      aria-hidden
    >
      {petals.map((d, i) => (
        <motion.path
          key={`petal-${i}`}
          d={d}
          fill="none"
          stroke="#4FA6A0"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.85, 0.55] }}
          transition={{
            pathLength: { duration: 0.7, delay: 0.35 + i * 0.05, ease: 'easeInOut' },
            opacity: { duration: 0.4, delay: 0.35 + i * 0.05 },
          }}
        />
      ))}
      {innerLines.map((d, i) => (
        <motion.path
          key={`inner-${i}`}
          d={d}
          fill="none"
          stroke="#4FA6A0"
          strokeWidth={0.8}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.6, 0.35] }}
          transition={{
            pathLength: { duration: 0.5, delay: 0.8 + i * 0.03, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay: 0.8 + i * 0.03 },
          }}
        />
      ))}
      {spirals.map((d, i) => (
        <motion.path
          key={`spiral-${i}`}
          d={d}
          fill="none"
          stroke="#257874"
          strokeWidth={1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{
            pathLength: { duration: 0.55, delay: 1.05 + i * 0.08, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay: 1.05 + i * 0.08 },
          }}
        />
      ))}
    </svg>
  )
}

export default function AuraLogo({
  size = 160,
  showText = true,
  animateStrokes = false,
  className = '',
}: AuraLogoProps) {
  return (
    <div
      className={`relative flex flex-col items-center ${className}`}
      style={{ width: size, height: showText ? size + 48 : size }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <MandalaStrokes size={size} animate={animateStrokes} />
        <Image
          src="/aura-logo.png"
          alt="AURA logo"
          width={size}
          height={size}
          priority
          className="relative z-10 object-contain"
          style={{ width: size, height: size }}
        />
      </div>

      {showText && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-3 text-2xl font-bold tracking-[0.35em] text-[var(--aura-text)]"
        >
          AURA
        </motion.span>
      )}
    </div>
  )
}
