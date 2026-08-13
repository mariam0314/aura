'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AuraLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

/**
 * Animated mandala stroke paths that overlay the logo
 * Creates the "drawn stroke-by-stroke" effect
 */
function MandalaStrokes({ size }: { size: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38

  // Eight petal paths radiating from center
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

  // Inner spiral paths
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

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 pointer-events-none"
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
          animate={{ pathLength: 1, opacity: [0, 0.8, 0.6] }}
          transition={{
            pathLength: { duration: 0.8, delay: 0.4 + i * 0.06, ease: 'easeInOut' },
            opacity: { duration: 0.4, delay: 0.4 + i * 0.06 },
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
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{
            pathLength: { duration: 0.6, delay: 1.0 + i * 0.1, ease: 'easeInOut' },
            opacity: { duration: 0.3, delay: 1.0 + i * 0.1 },
          }}
        />
      ))}
    </svg>
  )
}

export default function AuraLogo({
  size = 160,
  showText = true,
  className = '',
}: AuraLogoProps) {
  return (
    <div
      className={`relative flex flex-col items-center ${className}`}
      style={{ width: size, height: showText ? size + 48 : size }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <MandalaStrokes size={size} />
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
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-3 text-2xl font-bold tracking-[0.35em] text-[var(--aura-text)]"
        >
          AURA
        </motion.span>
      )}
    </div>
  )
}
