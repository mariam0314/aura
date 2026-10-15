export type OnboardingStep =
  | 'splash'
  | 'welcome'
  | 'language'
  | 'english-mode'
  | 'goal'
  | 'level'
  | 'role'
  | 'loading'
  | 'complete'

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'mr'
  | 'gu'
  | 'ta'
  | 'te'
  | 'bn'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'ur'

export type EnglishMode = 'professional' | 'genz'

export type UserRole = 'school' | 'college' | 'professional'

export interface LanguageOption {
  code: LanguageCode
  name: string
  native: string
  flag: string
}

export interface EnglishModeOption {
  id: EnglishMode
  title: string
  subtitle: string
  emoji: string
  description: string
  example: string
}

export interface GoalOption {
  id: string
  emoji: string
  title: string
  description: string
  reaction: string
}

export interface LevelOption {
  id: 'beginner' | 'intermediate' | 'advanced'
  emoji: string
  title: string
  description: string
  reaction: string
}

export interface RoleOption {
  id: UserRole
  emoji: string
  title: string
  description: string
  tags: string[]
}

export interface OnboardingState {
  step: OnboardingStep
  language: LanguageCode | null
  englishMode: EnglishMode | null
  goal: string | null
  level: string | null
  role: UserRole | null
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
]

export const englishModes: EnglishModeOption[] = [
  {
    id: 'professional',
    title: 'Normal English',
    subtitle: 'Clear & Natural',
    emoji: '💼',
    description: 'Clear, professional, natural, and easy to understand.',
    example: 'You scored 72%. Your SQL fundamentals are strong, but JOIN operations need more practice. Let’s work on that.',
  },
  {
    id: 'genz',
    title: 'Gen-Z English',
    subtitle: 'Casual & Playful',
    emoji: '😎',
    description: 'Casual, friendly, modern, smart, and slightly playful.',
    example: 'Okayyy, 72% is actually solid 🔥 Your SQL basics are good, but JOINs are kinda fighting you 😭. Let’s fix those.',
  },
]

export const goals: GoalOption[] = [
  {
    id: 'exams',
    emoji: '🎓',
    title: 'Prepare for Examinations',
    description: 'Targeted viva review, formula keys, and concept drills.',
    reaction: 'Exam mode locked in 📚 Let’s target your weak topics first.',
  },
  {
    id: 'coding',
    emoji: '💻',
    title: 'Master Coding & Software Design',
    description: 'Python, SQL, DSA, Algorithms, and System Architecture.',
    reaction: 'Coding track activated 💻 Let’s build real problem-solving intuition.',
  },
  {
    id: 'data',
    emoji: '📊',
    title: 'Data Science & AI Skills',
    description: 'DBMS Normalization, SQL Queries, Statistics, and ML concepts.',
    reaction: 'Data & AI track selected 📊 Time to master relational logic.',
  },
  {
    id: 'career',
    emoji: '🚀',
    title: 'Build Career & Upskilling Roadmap',
    description: 'Cloud, DevOps, Git workflows, and industry certification prep.',
    reaction: 'Career upskilling mode ready 🚀 Let’s close those critical skill gaps.',
  },
]

export const levels: LevelOption[] = [
  {
    id: 'beginner',
    emoji: '🌱',
    title: 'Beginner',
    description: 'Starting from the fundamentals with intuitive visual analogies.',
    reaction: 'Starting from the basics. Zero stress, let’s build from the ground up.',
  },
  {
    id: 'intermediate',
    emoji: '⚡',
    title: 'Intermediate',
    description: 'Comfortable with basics, looking to bridge specific knowledge gaps.',
    reaction: 'Solid baseline. We will pinpoint your exact weak areas.',
  },
  {
    id: 'advanced',
    emoji: '🔥',
    title: 'Advanced',
    description: 'Mastering edge-cases, first-principles proofs, and optimization.',
    reaction: 'High gear! Scaling up to complex challenges and architecture.',
  },
]

export const roles: RoleOption[] = [
  {
    id: 'school',
    emoji: '🎒',
    title: 'School Student',
    description: 'Learn with intuitive visual analogies and fun explanations.',
    tags: ['Homework', 'Concepts', 'Exams'],
  },
  {
    id: 'college',
    emoji: '🎓',
    title: 'College Student',
    description: 'Assignments, coding, projects, placements & viva prep.',
    tags: ['Assignments', 'Coding', 'Placements', 'DBMS/Networks'],
  },
  {
    id: 'professional',
    emoji: '💼',
    title: 'Working Professional',
    description: 'Upskill in Cloud, DevOps, Architecture & career progression.',
    tags: ['Upskill', 'AWS', 'Git', 'System Design'],
  },
]

export const loadingMessages = [
  'Mapping your cognitive baseline...',
  'Initializing persistent learning profile...',
  'Connecting 3D AI Mentor persona...',
  'Almost ready...',
]
