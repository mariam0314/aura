'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface SpatialCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  maxRotation?: number
  depth?: number
  depthElevation?: number
  glare?: boolean
  glowIntensity?: 'subtle' | 'medium' | 'high'
  onClick?: () => void
  disabled?: boolean
}

/**
 * SpatialCard: High-performance 3D spatial card with subtle cursor-tracking tilt,
 * realistic specular lighting in AURA's Deep Teal, and layered translateZ depth.
 * Automatically switches to lightweight flat mode on touch/mobile devices.
 */
export function SpatialCard({
  children,
  className = '',
  maxTilt = 6,
  maxRotation,
  depth = 16,
  depthElevation,
  glare = true,
  glowIntensity = 'subtle',
  onClick,
  disabled = false,
}: SpatialCardProps) {
  const effectiveTilt = maxRotation ?? maxTilt
  const effectiveDepth = depthElevation ?? depth
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch / non-hover devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      setIsTouchDevice(isTouch)
    }
  }, [])

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Glare percentage positions
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  // Smooth springs for rotation
  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [effectiveTilt, -effectiveTilt])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-effectiveTilt, effectiveTilt])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalized from -0.5 to 0.5
    const normX = x / rect.width - 0.5
    const normY = y / rect.height - 0.5

    mouseX.set(normX)
    mouseY.set(normY)

    if (glare) {
      glareX.set((x / rect.width) * 100)
      glareY.set((y / rect.height) * 100)
    }
  }

  const handleMouseEnter = () => {
    if (!disabled && !isTouchDevice) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Fallback for touch devices or disabled mode: clean, fast, zero GPU overhead
  if (isTouchDevice || disabled) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={`relative rounded-3xl p-6 bg-[var(--aura-card-bg)] border border-[var(--aura-border)] shadow-sm transition-all duration-300 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`relative rounded-3xl p-6 bg-[var(--aura-card-bg)] border border-[var(--aura-border)] spatial-surface-3d overflow-hidden ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Dynamic Specular Light Glare in AURA Teal */}
        {glare && isHovered && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-20"
            style={{
              background: `radial-gradient(circle 280px at ${glareX.get()}% ${glareY.get()}%, rgba(79, 166, 160, 0.16) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Content with translateZ for physical layered depth */}
        <div
          style={{
            transform: isHovered ? `translateZ(${effectiveDepth}px)` : 'translateZ(0px)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10"
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default SpatialCard
