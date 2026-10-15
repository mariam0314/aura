'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  type TopicMastery,
  type LearningRoadmapStep,
  type ClassAnalytics,
  type ProfessionalSkillProfile,
  type CompanyTrainingAnalytics,
  type EarlyWarningAlert,
  type UserRole,
  type DifficultyLevel,
  INITIAL_STUDENT_TOPICS,
  DEFAULT_STUDENT_ROADMAP,
  DEFAULT_CLASS_ANALYTICS,
  DEFAULT_PROFESSIONAL_PROFILE,
  DEFAULT_COMPANY_TRAINING,
  classifyScore,
  detectEarlyWarning,
} from '@/lib/learning-engine'
import type { EnglishMode } from '@/lib/onboarding-data'

interface LearningContextValue {
  role: UserRole
  setRole: (role: UserRole) => void
  englishMode: EnglishMode
  setEnglishMode: (mode: EnglishMode) => void
  topics: TopicMastery[]
  roadmap: LearningRoadmapStep[]
  classAnalytics: ClassAnalytics
  professionalProfile: ProfessionalSkillProfile
  companyTraining: CompanyTrainingAnalytics
  earlyWarning: EarlyWarningAlert
  currentXP: number
  streakDays: number
  quizAccuracy: number
  totalQuizzesTaken: number
  activeTopicId: string
  setActiveTopicId: (id: string) => void
  submitQuizResult: (
    topicId: string,
    subtopicName: string,
    scorePercentage: number,
    correctCount: number,
    totalCount: number
  ) => void
  resetLearningProfile: () => void
}

const LearningContext = createContext<LearningContextValue | null>(null)

const STORAGE_KEY_LEARNING = 'aura_learning_profile_v2'

export function LearningProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('student')
  const [englishMode, setEnglishModeState] = useState<EnglishMode>('genz')
  const [topics, setTopics] = useState<TopicMastery[]>(INITIAL_STUDENT_TOPICS)
  const [roadmap, setRoadmap] = useState<LearningRoadmapStep[]>(DEFAULT_STUDENT_ROADMAP)
  const [classAnalytics, setClassAnalytics] = useState<ClassAnalytics>(DEFAULT_CLASS_ANALYTICS)
  const [professionalProfile, setProfessionalProfile] = useState<ProfessionalSkillProfile>(DEFAULT_PROFESSIONAL_PROFILE)
  const [companyTraining, setCompanyTraining] = useState<CompanyTrainingAnalytics>(DEFAULT_COMPANY_TRAINING)
  const [currentXP, setCurrentXP] = useState(3850)
  const [streakDays, setStreakDays] = useState(14)
  const [quizAccuracy, setQuizAccuracy] = useState(72)
  const [totalQuizzesTaken, setTotalQuizzesTaken] = useState(25)
  const [activeTopicId, setActiveTopicId] = useState('sql')

  // Early warning alert computed based on lowest topics and recent scores
  const [earlyWarning, setEarlyWarning] = useState<EarlyWarningAlert>(() =>
    detectEarlyWarning(61, 48, ['Computer Networks', 'DBMS Normalization', 'SQL JOINs'])
  )

  // Load persisted state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEARNING)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.role) setRoleState(parsed.role)
        if (parsed.englishMode) setEnglishModeState(parsed.englishMode)
        if (parsed.topics) setTopics(parsed.topics)
        if (parsed.currentXP) setCurrentXP(parsed.currentXP)
        if (parsed.streakDays) setStreakDays(parsed.streakDays)
        if (parsed.quizAccuracy) setQuizAccuracy(parsed.quizAccuracy)
      }
    } catch {
      // ignore
    }
  }, [])

  // Auto-save on modification
  const saveState = (updated: Partial<{
    role: UserRole
    englishMode: EnglishMode
    topics: TopicMastery[]
    currentXP: number
    streakDays: number
    quizAccuracy: number
  }>) => {
    try {
      const current = {
        role,
        englishMode,
        topics,
        currentXP,
        streakDays,
        quizAccuracy,
        ...updated,
      }
      localStorage.setItem(STORAGE_KEY_LEARNING, JSON.stringify(current))
    } catch {
      // ignore
    }
  }

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    saveState({ role: newRole })
  }

  const setEnglishMode = (newMode: EnglishMode) => {
    setEnglishModeState(newMode)
    saveState({ englishMode: newMode })
  }

  const submitQuizResult = (
    topicId: string,
    subtopicName: string,
    scorePercentage: number,
    correctCount: number,
    totalCount: number
  ) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((topic) => {
        if (topic.id !== topicId) return topic

        const updatedSubtopics = topic.subtopics.map((sub) => {
          if (sub.name !== subtopicName) return sub

          const newAttempted = sub.questionsAttempted + totalCount
          const newCorrect = sub.questionsCorrect + correctCount
          const rawScore = Math.round((newCorrect / Math.max(1, newAttempted)) * 100)
          const newMistakes = scorePercentage < 60 ? sub.repeatedMistakes + 1 : Math.max(0, sub.repeatedMistakes - 1)
          const newStatus = classifyScore(rawScore, newMistakes)

          return {
            ...sub,
            score: rawScore,
            questionsAttempted: newAttempted,
            questionsCorrect: newCorrect,
            repeatedMistakes: newMistakes,
            status: newStatus,
            lastTested: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        })

        const totalScore = Math.round(
          updatedSubtopics.reduce((acc, s) => acc + s.score, 0) / updatedSubtopics.length
        )

        return {
          ...topic,
          overallScore: totalScore,
          status: classifyScore(totalScore),
          subtopics: updatedSubtopics,
          trend: scorePercentage >= 70 ? topic.trend + 4 : topic.trend - 2,
        }
      })

      saveState({ topics: updatedTopics })
      return updatedTopics
    })

    // Update XP and stats
    const earnedXP = correctCount * 50 + 25
    setCurrentXP((prev) => {
      const next = prev + earnedXP
      saveState({ currentXP: next })
      return next
    })

    setTotalQuizzesTaken((prev) => prev + 1)
    setQuizAccuracy((prev) => {
      const next = Math.round((prev * totalQuizzesTaken + scorePercentage) / (totalQuizzesTaken + 1))
      saveState({ quizAccuracy: next })
      return next
    })

    // If student score improved on SQL JOINs, update roadmap step
    if (topicId === 'sql' && scorePercentage >= 75) {
      setRoadmap((prev) =>
        prev.map((step) =>
          step.id === 'step-3'
            ? { ...step, status: 'completed', badge: 'Resolved W 🔥' }
            : step.id === 'step-4'
            ? { ...step, status: 'current' }
            : step
        )
      )
    }
  }

  const resetLearningProfile = () => {
    setTopics(INITIAL_STUDENT_TOPICS)
    setRoadmap(DEFAULT_STUDENT_ROADMAP)
    setCurrentXP(3850)
    setStreakDays(14)
    setQuizAccuracy(72)
    setTotalQuizzesTaken(25)
    localStorage.removeItem(STORAGE_KEY_LEARNING)
  }

  return (
    <LearningContext.Provider
      value={{
        role,
        setRole,
        englishMode,
        setEnglishMode,
        topics,
        roadmap,
        classAnalytics,
        professionalProfile,
        companyTraining,
        earlyWarning,
        currentXP,
        streakDays,
        quizAccuracy,
        totalQuizzesTaken,
        activeTopicId,
        setActiveTopicId,
        submitQuizResult,
        resetLearningProfile,
      }}
    >
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  const ctx = useContext(LearningContext)
  if (!ctx) {
    throw new Error('useLearning must be used within a LearningProvider')
  }
  return ctx
}
