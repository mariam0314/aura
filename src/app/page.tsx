'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import DocumentProcessorSection from '@/components/DocumentProcessorSection'
import SmartQuizFlashcardMatrix from '@/components/SmartQuizFlashcardMatrix'
import ProgressGamificationSection from '@/components/ProgressGamificationSection'
import FloatingVRMAssistant from '@/components/FloatingVRMAssistant'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020b10] text-[#F6F8F9] selection:bg-emerald-500 selection:text-black">
      {/* 1. Hero Section with Personalized Pedagogy & 3D Hologram VRM Studio */}
      <HeroSection />

      {/* 2. Document Processor Section for PDF, PPTX, DOCX */}
      <DocumentProcessorSection />

      {/* 3. Smart Quiz & Flashcard Matrix Section */}
      <SmartQuizFlashcardMatrix />

      {/* 4. Real-Time Gamification, XP, Streaks & Leaderboard */}
      <ProgressGamificationSection />

      {/* 5. Floating VRM Assistant (becomes active on scroll) */}
      <FloatingVRMAssistant />
    </div>
  )
}
