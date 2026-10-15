'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function SpatialEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* ─── Layer 1: Background Subtle Spatial Coordinate Grid ─── */}
      <div className="absolute inset-0 spatial-grid opacity-60" />

      {/* ─── Layer 2: Deep Teal Ambient Atmospheric Glow Pools ─── */}
      {/* Top Center Main Depth Light */}
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 10, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[550px] rounded-full opacity-20 dark:opacity-30 blur-[130px] bg-gradient-to-b from-[#0F766E] via-[#257874] to-transparent"
      />

      {/* Midground Floating Teal Ambient Orb (Left) */}
      <motion.div
        animate={{
          y: [0, 35, -20, 0],
          x: [0, -25, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] left-[-8%] w-[480px] h-[480px] rounded-full opacity-10 dark:opacity-20 blur-[120px] bg-[#4FA6A0]"
      />

      {/* Midground Floating Teal Ambient Orb (Right) */}
      <motion.div
        animate={{
          y: [0, -40, 25, 0],
          x: [0, 30, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[65%] right-[-10%] w-[520px] h-[520px] rounded-full opacity-10 dark:opacity-20 blur-[140px] bg-[#0F766E]"
      />

      {/* ─── Layer 3: Subtle Floating Spatial Geometry Nodes (Midground) ─── */}
      <div className="hidden lg:block absolute inset-0">
        {/* Spatial Node 1: Floating Cube Wireframe / Data Badge */}
        <motion.div
          animate={{
            y: [0, -16, 0],
            rotateZ: [0, 8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[22%] left-[6%] p-3 rounded-2xl bg-white/40 dark:bg-[#00171F]/40 backdrop-blur-md border border-[#257874]/20 shadow-[0_8px_24px_rgba(0,23,31,0.06)] flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-[#35C88A] animate-pulse" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#257874] dark:text-[#4FA6A0]">
            NODE: RETENTION 94.2%
          </span>
        </motion.div>

        {/* Spatial Node 2: Orbital Coordinate Pill */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateZ: [0, -6, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute top-[32%] right-[6%] p-3 rounded-2xl bg-white/40 dark:bg-[#00171F]/40 backdrop-blur-md border border-[#257874]/20 shadow-[0_8px_24px_rgba(0,23,31,0.06)] flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-[#4FA6A0] animate-ping" />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#257874] dark:text-[#4FA6A0]">
            3D SPATIAL SYNC • 60 FPS
          </span>
        </motion.div>

        {/* Spatial Node 3: Micro Telemetry Node Lower */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute top-[75%] left-[8%] px-3 py-1.5 rounded-xl bg-white/30 dark:bg-[#00171F]/30 backdrop-blur-sm border border-[#257874]/15 text-[9px] font-mono text-[var(--aura-text-muted)]"
        >
          AURA COGNITIVE GRAPH v3.2
        </motion.div>
      </div>
    </div>
  )
}
