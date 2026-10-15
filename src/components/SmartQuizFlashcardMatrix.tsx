'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Target,
  RotateCw,
  CheckCircle2,
  XCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'

export interface QuizQuestionItem {
  id: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  xpReward: number
}

export interface FlashcardItem {
  id: string
  topic: string
  category: string
  front: string
  back: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  mastered?: boolean
}

const INITIAL_QUIZ_CARDS: QuizQuestionItem[] = [
  {
    id: 'mat_q1',
    topic: 'Database Systems',
    difficulty: 'Easy',
    question: 'Which SQL statement retrieves distinct non-duplicate values from a table column?',
    options: ['SELECT UNIQUE column FROM table', 'SELECT DISTINCT column FROM table', 'SELECT FILTER column FROM table', 'SELECT DIFFERENT column FROM table'],
    correctIndex: 1,
    explanation: 'SELECT DISTINCT filters out duplicate tuples, returning each distinct value exactly once.',
    xpReward: 50,
  },
  {
    id: 'mat_q2',
    topic: 'Computer Networks',
    difficulty: 'Medium',
    question: 'Which protocol in the TCP/IP suite maps an IP address to a physical MAC address?',
    options: ['DNS (Domain Name System)', 'DHCP (Dynamic Host Config)', 'ARP (Address Resolution Protocol)', 'ICMP (Internet Control Message)'],
    correctIndex: 2,
    explanation: 'ARP translates a 32-bit IPv4 address into a 48-bit physical MAC hardware address on a local link.',
    xpReward: 75,
  },
  {
    id: 'mat_q3',
    topic: 'System Architecture',
    difficulty: 'Hard',
    question: 'In ACID transactions, what mechanism guarantees Atomicity in case of sudden power crash?',
    options: ['Write-Ahead Logging (WAL)', 'Read committed isolation', 'Two-phase locking', 'Optimistic index rebuilds'],
    correctIndex: 0,
    explanation: 'WAL records all changes to durable log storage before applying them to database pages, enabling REDO/UNDO crash recovery.',
    xpReward: 100,
  },
]

const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'mat_fc1',
    topic: 'Operating Systems',
    category: 'Memory Management',
    front: 'What is Thrashing in Virtual Memory?',
    back: 'Thrashing occurs when the computer spends more time swapping pages between RAM and disk than executing user instructions, causing performance to drop near zero.',
    difficulty: 'Medium',
    mastered: false,
  },
  {
    id: 'mat_fc2',
    topic: 'Algorithms',
    category: 'Time Complexity',
    front: 'What is the average and worst-case time complexity of QuickSort?',
    back: 'Average Case: O(n log n)\nWorst Case: O(n²) (when pivot selection consistently results in maximally unbalanced partitions).',
    difficulty: 'Easy',
    mastered: false,
  },
  {
    id: 'mat_fc3',
    topic: 'Database Systems',
    category: 'Normalization',
    front: 'What is 3rd Normal Form (3NF)?',
    back: 'A relation is in 3NF if it is in 2NF and has NO transitive dependencies (every non-key attribute must depend directly on the primary key, the whole key, and nothing but the key).',
    difficulty: 'Hard',
    mastered: false,
  },
]

export default function SmartQuizFlashcardMatrix() {
  const { t } = useLanguage()
  const { submitQuizResult } = useLearning()

  // State for Quizzes
  const [quizzes, setQuizzes] = useState<QuizQuestionItem[]>(INITIAL_QUIZ_CARDS)
  const [activeQuizIndices, setActiveQuizIndices] = useState<Record<string, number | null>>({})
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({})
  const [earnedFeedback, setEarnedFeedback] = useState<Record<string, { correct: boolean; xp: number }>>({})

  // State for Flashcards
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>(INITIAL_FLASHCARDS)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})
  const [currentFcIndex, setCurrentFcIndex] = useState(0)

  // Handle Quiz Option Selection
  const handleSelectOption = (quizId: string, optionIndex: number) => {
    if (submittedAnswers[quizId]) return
    setActiveQuizIndices((prev) => ({ ...prev, [quizId]: optionIndex }))
  }

  // Handle Quiz Answer Submission
  const handleAnswerSubmit = (quiz: QuizQuestionItem) => {
    const selectedIdx = activeQuizIndices[quiz.id]
    if (selectedIdx === undefined || selectedIdx === null || submittedAnswers[quiz.id]) return

    const isCorrect = selectedIdx === quiz.correctIndex
    const earnedXp = isCorrect ? quiz.xpReward : 10

    setSubmittedAnswers((prev) => ({ ...prev, [quiz.id]: true }))
    setEarnedFeedback((prev) => ({ ...prev, [quiz.id]: { correct: isCorrect, xp: earnedXp } }))

    // Update global learning context
    submitQuizResult(
      quiz.topic.toLowerCase().includes('database') ? 'sql' : 'networks',
      quiz.topic,
      isCorrect ? 100 : 0,
      isCorrect ? 1 : 0,
      1
    )
  }

  // Handle Flip Flashcard
  const toggleFlip = (fcId: string) => {
    setFlippedCards((prev) => ({ ...prev, [fcId]: !prev[fcId] }))
  }

  // Mark Flashcard as Mastered
  const handleMarkMastered = (fcId: string) => {
    setFlashcards((prev) =>
      prev.map((fc) => (fc.id === fcId ? { ...fc, mastered: !fc.mastered } : fc))
    )
  }

  const activeCard = flashcards[currentFcIndex]
  const isCurrentFlipped = !!flippedCards[activeCard.id]

  return (
    <section id="quiz-matrix" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-xs font-bold uppercase tracking-wider mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Automated Evaluation & Active Recall</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Smart Quiz & Flashcard Matrix
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
          Test immediate conceptual recall, discover knowledge gaps before exams, and drill high-yield flashcards with real-time XP accumulation.
        </p>
      </div>

      {/* Matrix Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* ─── Quiz Card 1 ─── */}
        {quizzes.slice(0, 2).map((quiz, i) => {
          const selected = activeQuizIndices[quiz.id]
          const isSubmitted = !!submittedAnswers[quiz.id]
          const feedback = earnedFeedback[quiz.id]

          return (
            <div
              key={quiz.id}
              className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/25 flex flex-col justify-between space-y-4 shadow-[0_15px_40px_rgba(0,18,23,0.5)] transition-all hover:border-emerald-500/40"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {quiz.topic}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        quiz.difficulty === 'Easy'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : quiz.difficulty === 'Medium'
                          ? 'bg-amber-500/15 text-amber-300'
                          : 'bg-rose-500/15 text-rose-300'
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      +{quiz.xpReward} XP
                    </span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-4">
                  {quiz.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-2">
                  {quiz.options.map((option, optIdx) => {
                    const isChoiceSelected = selected === optIdx
                    let optionStyle =
                      'bg-[#04121A]/80 border-white/10 text-gray-300 hover:border-emerald-500/40 hover:bg-[#071f2b]'

                    if (isSubmitted) {
                      if (optIdx === quiz.correctIndex) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      } else if (isChoiceSelected) {
                        optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                      } else {
                        optionStyle = 'opacity-50 border-transparent bg-white/5 text-gray-500'
                      }
                    } else if (isChoiceSelected) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(quiz.id, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                      >
                        <span className="font-mono text-[11px] opacity-75 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{option}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Explanation on submit */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-1"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px]">
                      {feedback?.correct ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct! +{feedback.xp} XP</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Misconception identified (+10 XP)</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{quiz.explanation}</p>
                  </motion.div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {!isSubmitted ? (
                  <button
                    type="button"
                    onClick={() => handleAnswerSubmit(quiz)}
                    disabled={selected === null || selected === undefined}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-[#00171F] font-black text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Answer
                  </button>
                ) : (
                  <div className="text-center text-[11px] font-mono text-emerald-400 font-bold">
                    ✓ Completed & Logged to Profile
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* ─── Interactive 3D Flip Flashcard Studio ─── */}
        <div className="p-6 rounded-3xl bg-[#061822]/80 backdrop-blur-xl border border-[#10b981]/25 flex flex-col justify-between space-y-4 shadow-[0_15px_40px_rgba(0,18,23,0.5)] transition-all hover:border-emerald-500/40">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Flashcard {currentFcIndex + 1} of {flashcards.length}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                {activeCard.category}
              </span>
            </div>

            {/* 3D Flip Card Container */}
            <div
              onClick={() => toggleFlip(activeCard.id)}
              className="relative min-h-[220px] rounded-2xl p-6 bg-gradient-to-br from-[#051F2A] to-[#03131C] border border-[#10b981]/30 cursor-pointer flex flex-col items-center justify-center text-center shadow-inner hover:border-emerald-400/60 transition-all select-none"
            >
              <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-emerald-400" />
                <span>Flip</span>
              </div>

              {!isCurrentFlipped ? (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Front: Concept
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                    {activeCard.front}
                  </h4>
                  <span className="text-[10px] text-gray-400 block pt-2">
                    (Click anywhere to reveal definition)
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Back: Explanation
                  </span>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-line font-medium">
                    {activeCard.back}
                  </p>
                  <span className="text-[10px] text-emerald-400 block pt-1 font-mono font-bold">
                    ✓ Retention Checkpoint
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Flashcard Bottom Controls */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setFlippedCards({})
                  setCurrentFcIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1))
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                title="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setFlippedCards({})
                  setCurrentFcIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0))
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                title="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleMarkMastered(activeCard.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCard.mastered
                  ? 'bg-emerald-500 text-[#00171F]'
                  : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{activeCard.mastered ? 'Mastered' : 'Mark Mastered'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
