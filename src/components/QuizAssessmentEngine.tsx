'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Flame,
  Target,
  AlertTriangle,
  Brain,
} from 'lucide-react'
import { QUIZ_BANK, type QuizQuestion } from '@/lib/quiz-data'
import { useLearning } from '@/context/LearningContext'
import { useLanguage } from '@/context/LanguageContext'
import type { VRMState } from '@/components/VRMAvatarCanvas'

interface QuizAssessmentEngineProps {
  initialTopicId?: string
  onCharacterReaction?: (state: VRMState) => void
  onFinishQuiz?: () => void
}

export default function QuizAssessmentEngine({
  initialTopicId = 'sql',
  onCharacterReaction,
  onFinishQuiz,
}: QuizAssessmentEngineProps) {
  const { lang, t } = useLanguage()
  const { englishMode, role, submitQuizResult, topics } = useLearning()
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answersLog, setAnswersLog] = useState<{ questionId: string; isCorrect: boolean; subtopic: string }[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const activeQuestions = QUIZ_BANK.filter((q) => q.topicId === selectedTopicId)
  const currentQuestion = activeQuestions[currentIdx] || activeQuestions[0]

  const isGenZ = englishMode === 'genz' || role === 'student'

  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null)

  const handleNextQuestion = (overrideAnswers?: typeof answersLog) => {
    if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer)
    setAutoAdvanceTimer(null)

    const currentLogs = overrideAnswers || answersLog

    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      if (onCharacterReaction) onCharacterReaction('explaining')
    } else {
      // Quiz completed!
      const correctCount = currentLogs.filter((a) => a.isCorrect).length
      const totalCount = activeQuestions.length
      const scorePct = Math.round((correctCount / Math.max(1, totalCount)) * 100)

      setQuizCompleted(true)

      // Submit to LearningContext
      submitQuizResult(
        selectedTopicId,
        currentQuestion.subtopicName,
        scorePct,
        correctCount,
        totalCount
      )

      if (onCharacterReaction) {
        if (scorePct >= 75) {
          onCharacterReaction('celebrating')
        } else if (scorePct < 50) {
          onCharacterReaction('concerned')
        } else {
          onCharacterReaction('happy')
        }
      }

      if (onFinishQuiz) onFinishQuiz()
    }
  }

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return
    setSelectedOption(idx)
    setIsAnswered(true)

    const correct = idx === currentQuestion.correctIndex
    const subtopic = currentQuestion.subtopicName

    const updatedLogs = [...answersLog, { questionId: currentQuestion.id, isCorrect: correct, subtopic }]
    setAnswersLog(updatedLogs)

    // Trigger 3D Character Reaction
    if (onCharacterReaction) {
      if (correct) {
        onCharacterReaction('celebrating')
      } else {
        onCharacterReaction('concerned')
      }
    }

    // Automatically progress to next question after 1200ms
    const timer = setTimeout(() => {
      handleNextQuestion(updatedLogs)
    }, 1200)
    setAutoAdvanceTimer(timer)
  }

  const handleRestart = (topicId?: string) => {
    if (topicId) setSelectedTopicId(topicId)
    setCurrentIdx(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setAnswersLog([])
    setQuizCompleted(false)
    if (onCharacterReaction) onCharacterReaction('idle')
  }

  // Topic selector pills
  const availableTopics = [
    { id: 'sql', label: 'SQL JOINs & Queries', gap: 'Critical Gap (42%)' },
    { id: 'dbms', label: 'DBMS Normalization', gap: 'Needs Improvement (48%)' },
    { id: 'networking', label: 'Networks & Subnetting', gap: 'Critical Gap (34%)' },
    { id: 'python', label: 'Python Lambdas & OOP', gap: 'Good (82%)' },
    { id: 'git', label: 'Git & Version Control', gap: 'Skill Gap (43%)' },
    { id: 'aws', label: 'AWS Cloud Security', gap: 'Critical Gap (38%)' },
  ]

  if (!currentQuestion) {
    return (
      <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] text-center">
        <p className="text-sm text-[var(--aura-text-muted)]">No questions currently in bank for this topic.</p>
        <button
          onClick={() => handleRestart('sql')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#257874] text-white text-xs font-bold"
        >
          Load SQL Assessment
        </button>
      </div>
    )
  }

  const correctCount = answersLog.filter((a) => a.isCorrect).length
  const totalAttempted = answersLog.length
  const scorePercent = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* ─── Top Topic Switcher Ribbon ─── */}
      <div className="p-4 rounded-3xl bg-white/70 dark:bg-[#00171F]/80 backdrop-blur-xl border border-[#257874]/20 shadow-sm flex items-center justify-between gap-4 overflow-x-auto aura-scroll">
        <div className="flex items-center gap-2 shrink-0">
          <Zap className="w-4 h-4 text-[#35C88A]" />
          <span className="text-xs font-black uppercase tracking-wider text-[var(--aura-text)]">
            Active Assessment:
          </span>
        </div>
        <div className="flex items-center gap-2">
          {availableTopics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleRestart(t.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedTopicId === t.id
                  ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                  : 'bg-[var(--aura-surface)] border-[var(--aura-border)] text-[var(--aura-text-muted)] hover:border-[#257874]'
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main Assessment Card ─── */}
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 md:p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-xl relative overflow-hidden space-y-6"
          >
            {/* Header / Sub-topic & Difficulty */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--aura-border)]">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#257874]/15 text-[#257874] dark:text-[#35C88A] text-xs font-black uppercase tracking-wider">
                  {currentQuestion.subtopicName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                  {currentQuestion.difficulty}
                </span>
              </div>
              <div className="text-xs font-bold text-[var(--aura-text-muted)]">
                {t.quiz.question} {currentIdx + 1} / {activeQuestions.length}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-extrabold text-[var(--aura-text)] leading-snug">
                {currentQuestion.question}
              </h3>

              {currentQuestion.codeSnippet && (
                <div className="p-4 rounded-2xl bg-[#00171F] border border-[#257874]/30 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner">
                  <pre>{currentQuestion.codeSnippet}</pre>
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                const isCorrect = idx === currentQuestion.correctIndex

                let btnStyles = 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]'
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles = 'bg-[#35C88A]/20 border-[#35C88A] text-[#35C88A] font-bold shadow-md'
                  } else if (isSelected) {
                    btnStyles = 'bg-rose-500/20 border-rose-500 text-rose-500 font-bold'
                  } else {
                    btnStyles = 'opacity-50 border-[var(--aura-border)]'
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between group ${btnStyles}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[var(--aura-surface)] border border-[var(--aura-border)] text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-[#257874] group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>

                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#35C88A] shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Post-Answer Feedback Banner */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-5 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] space-y-3 shadow-md"
              >
                {/* Gen-Z Persona / Professional Reaction */}
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#257874]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#257874] dark:text-[#35C88A]">
                    AURA Mentor Feedback
                  </span>
                </div>

                <p className="text-sm font-semibold text-[var(--aura-text)]">
                  {selectedOption === currentQuestion.correctIndex
                    ? isGenZ
                      ? currentQuestion.genZSuccessComment
                      : 'Correct response. Concept verified.'
                    : isGenZ
                    ? currentQuestion.genZFailComment
                    : 'Incorrect. Review the detailed explanation below.'}
                </p>

                <p className="text-xs text-[var(--aura-text-muted)] leading-relaxed pt-2 border-t border-[var(--aura-border)]">
                  <span className="font-bold text-[var(--aura-text)]">Explanation: </span>
                  {currentQuestion.explanation}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleNextQuestion()}
                    className="px-6 py-2.5 rounded-full bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center gap-2"
                  >
                    <span>{currentIdx + 1 < activeQuestions.length ? 'Next Question' : 'View Assessment Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ─── Quiz Results & Knowledge Gap Summary Screen ─── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] shadow-2xl space-y-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#257874]/15 text-[#257874] dark:text-[#35C88A] text-xs font-bold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>{t.quiz.title}</span>
            </div>

            <div>
              <div className="text-5xl md:text-6xl font-black text-[var(--aura-text)] mb-2">
                {scorePercent}%
              </div>
              <p className="text-sm text-[var(--aura-text-muted)]">
                {t.quiz.score}: {scorePercent}% • {correctCount} {t.quiz.correct}
              </p>
            </div>

            {/* Gen-Z Summary Verdict */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-sm font-bold text-[var(--aura-text)]">
              {scorePercent >= 80 ? (
                <span className="text-[#35C88A]">
                  {isGenZ
                    ? "Okayyy, you absolutely cooked on this! That's a massive W 🔥"
                    : 'Mastery verified. Target skill achieved standard proficiency.'}
                </span>
              ) : scorePercent >= 60 ? (
                <span className="text-amber-500">
                  {isGenZ
                    ? "Solid effort! A couple concepts were fighting you, but we're getting there."
                    : 'Satisfactory performance. Targeted revision recommended on specific subtopics.'}
                </span>
              ) : (
                <span className="text-rose-500">
                  {isGenZ
                    ? "Don't stress 💀 This topic is tricky at first. Let's run it back with simpler visual stories."
                    : 'Critical Knowledge Gap identified. Remedial practice assigned.'}
                </span>
              )}
            </div>

            {/* Identified Subtopic Heatmap */}
            <div className="text-left space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)]">
                {t.quiz.areasToImprove}
              </h4>
              <div className="space-y-2">
                {activeQuestions.map((q) => {
                  const logged = answersLog.find((a) => a.questionId === q.id)
                  const isCorrect = logged?.isCorrect ?? false

                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#35C88A]" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-500" />
                        )}
                        <span className="font-semibold text-[var(--aura-text)]">{q.subtopicName}</span>
                      </div>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          isCorrect ? 'bg-[#35C88A]/10 text-[#35C88A]' : 'bg-rose-500/10 text-rose-500'
                        }`}
                      >
                        {isCorrect ? t.quiz.strongAreas : t.quiz.areasToImprove}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleRestart(selectedTopicId)}
                className="px-6 py-3 rounded-full bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.quiz.restartQuiz}</span>
              </button>

              <a
                href="/dashboard"
                className="px-6 py-3 rounded-full bg-[var(--aura-surface)] border border-[var(--aura-border)] text-[var(--aura-text)] text-xs font-semibold hover:border-[#257874] transition-all"
              >
                {t.dashboard.title}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
