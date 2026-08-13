export type OnboardingStep =
  | 'splash'
  | 'welcome'
  | 'language'
  | 'english-mode'
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
  emoji: string
  description: string
  example: string
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
    title: 'Professional English',
    emoji: '💼',
    description: 'Clear, polished and professional.',
    example: 'Hello! How can I help you today?',
  },
  {
    id: 'genz',
    title: 'Gen Z English',
    emoji: '😎',
    description: 'Fun, casual and expressive.',
    example: "Yo! What's up? Let's crush today's goals 🔥",
  },
]

export const roles: RoleOption[] = [
  {
    id: 'school',
    emoji: '🎒',
    title: 'School Student',
    description: 'Learn with fun explanations.',
    tags: ['Homework', 'Exams', 'Concepts'],
  },
  {
    id: 'college',
    emoji: '🎓',
    title: 'College Student',
    description: 'Assignments, coding, projects & placements.',
    tags: ['Assignments', 'Coding', 'Projects', 'Placements'],
  },
  {
    id: 'professional',
    emoji: '💼',
    title: 'Working Professional',
    description: 'Upskill, career growth & productivity.',
    tags: ['Upskill', 'Career', 'Productivity', 'AI'],
  },
]

export const loadingMessages = [
  'Creating your learning profile...',
  'Preparing your AI mentor...',
  'Loading language preferences...',
  'Almost ready...',
]
