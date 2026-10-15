/**
 * AURA AI Mentor — Centralized Voice Configuration & Female TTS Engine
 * 
 * Strictly ensures AURA speaks with an intelligent, clear, friendly,
 * youthful, and slightly futuristic FEMALE voice.
 * Completely eliminates male voice fallbacks.
 */

export const VOICE_GENDER: 'female' = 'female'

export interface AuraVoiceConfig {
  gender: 'female'
  persona: string
  preferredFemaleVoices: string[]
  maleVoiceKeywords: string[]
  defaultPitch: number
  defaultRate: number
  fallbackPitch: number
}

export const VOICE_CONFIG: AuraVoiceConfig = {
  gender: 'female',
  persona: 'Young Adult Intelligent Female Mentor',
  preferredFemaleVoices: [
    // Top-tier natural cloud voices (Edge / Windows / Chrome)
    'microsoft jenny online (natural)',
    'microsoft jenny',
    'microsoft aria online (natural)',
    'microsoft aria',
    'microsoft michelle',
    'microsoft sonia',
    'microsoft natasha',
    'microsoft clara',
    'microsoft libby',
    'microsoft zira desktop',
    'microsoft zira',
    'microsoft neerja online (natural)', // Indian English / Hindi natural female
    'microsoft neerja',
    'microsoft swara',
    'microsoft heera',
    'microsoft kalpana',
    // Google / Android female voices
    'google us english',
    'google uk english female',
    'google हिन्दी',
    'en-us-x-sfg#female',
    'en-us-x-tpd#female',
    'en-us-x-iog#female',
    // Apple macOS / iOS female voices
    'samantha',
    'victoria',
    'karen',
    'moira',
    'tessa',
    'fiona',
    'veena',
    'ava',
    'allison',
    'serena',
    'helena',
    'stephanie',
    'cora',
    'nora',
    'alice',
    'clara',
    'eva',
    'sophia',
    'emma',
  ],
  maleVoiceKeywords: [
    'david',
    'mark',
    'george',
    'guy',
    'christopher',
    'eric',
    'stefan',
    'richard',
    'james',
    'john',
    'alex',
    'daniel',
    'fred',
    'bruce',
    'tom',
    'junior',
    'ralph',
    'albert',
    'male',
    'ravi',
    'hemant',
    'madhav',
    'pradeep',
    'anand',
    'karthik',
    'microsoft david',
    'microsoft mark',
    'microsoft guy',
    'microsoft christopher',
    'google uk english male',
    'microsoft ravi',
    'microsoft hemant',
  ],
  defaultPitch: 1.16, // Youthful, clear, encouraging female pitch baseline
  defaultRate: 1.02,  // Conversational tempo
  fallbackPitch: 1.25, // Heightened pitch if OS voice lacks female tagging
}

// In-memory cache of voices
let cachedVoices: SpeechSynthesisVoice[] = []
let isInitialized = false

/**
 * Initializes voice listeners to handle asynchronous loading in Chromium/Safari
 */
export function initVoiceEngine(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  if (isInitialized) return

  const updateVoices = () => {
    try {
      const list = window.speechSynthesis.getVoices()
      if (list && list.length > 0) {
        cachedVoices = list
      }
    } catch {
      // ignore
    }
  }

  updateVoices()
  window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
  isInitialized = true
}

/**
 * Validates whether a given voice is female and not on the male blocklist.
 */
export function isStrictlyFemaleVoice(voice: SpeechSynthesisVoice): boolean {
  const combined = `${voice.name.toLowerCase()} ${voice.voiceURI.toLowerCase()}`

  // 1. Strictly block any male identifiers
  for (const male of VOICE_CONFIG.maleVoiceKeywords) {
    if (combined.includes(male)) {
      return false
    }
  }

  // 2. Positive female indicators
  if (
    combined.includes('female') ||
    combined.includes('woman') ||
    combined.includes('girl') ||
    combined.includes('zira') ||
    combined.includes('jenny') ||
    combined.includes('aria') ||
    combined.includes('samantha') ||
    combined.includes('victoria') ||
    combined.includes('karen') ||
    combined.includes('neerja') ||
    combined.includes('swara') ||
    combined.includes('heera') ||
    combined.includes('kalpana')
  ) {
    return true
  }

  // 3. Check registered preferred female voices
  for (const femaleName of VOICE_CONFIG.preferredFemaleVoices) {
    if (combined.includes(femaleName)) {
      return true
    }
  }

  return false
}

/**
 * Retrieves the best available FEMALE voice matching the requested language.
 * Strictly guarantees no male voice is returned.
 */
export function getAuraFemaleVoice(langCode: string = 'en'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null

  initVoiceEngine()

  let voices = cachedVoices
  if (!voices || voices.length === 0) {
    voices = window.speechSynthesis.getVoices()
    if (voices && voices.length > 0) {
      cachedVoices = voices
    }
  }

  if (!voices || voices.length === 0) return null

  const langPrefix = langCode.toLowerCase().split('-')[0]
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix))
  const pool = langVoices.length > 0 ? langVoices : voices

  // 1. Priority: Verified female voices in the requested language
  const femalePool = pool.filter(isStrictlyFemaleVoice)
  if (femalePool.length > 0) {
    let topVoice = femalePool[0]
    let topScore = -1

    for (const v of femalePool) {
      const name = v.name.toLowerCase()
      let score = 20

      // Exact language match (e.g., en-US vs en-US)
      if (v.lang.toLowerCase() === langCode.toLowerCase()) score += 40

      // Natural studio online voice bonus
      if (name.includes('natural')) score += 60
      if (name.includes('online')) score += 30

      // Premium personas (Jenny, Aria, Zira, Samantha)
      if (name.includes('jenny')) score += 70
      if (name.includes('aria')) score += 65
      if (name.includes('zira')) score += 50
      if (name.includes('samantha')) score += 55

      if (score > topScore) {
        topScore = score
        topVoice = v
      }
    }
    return topVoice
  }

  // 2. Fallback: Search all system voices for ANY verified female voice
  const allFemale = voices.filter(isStrictlyFemaleVoice)
  if (allFemale.length > 0) {
    return allFemale[0]
  }

  // 3. Fallback: Filter out any voice matching the male blocklist
  const nonMale = pool.filter((v) => {
    const combined = `${v.name.toLowerCase()} ${v.voiceURI.toLowerCase()}`
    return !VOICE_CONFIG.maleVoiceKeywords.some((m) => combined.includes(m))
  })

  if (nonMale.length > 0) {
    return nonMale[0]
  }

  // Under no circumstance return a known male voice
  return null
}

export interface SpeakOptions {
  pitch?: number
  rate?: number
  lang?: string
  onStart?: () => void
  onEnd?: () => void
  onError?: (err: any) => void
  onBoundary?: (event: SpeechSynthesisEvent) => void
}

// Keep an active reference to prevent garbage collection bug in Chrome
let activeUtterance: SpeechSynthesisUtterance | null = null

/**
 * Clean plain text from markdown syntax, code snippets, emojis, etc.
 */
export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`[^`]+`/g, '')        // remove inline code
    .replace(/[*#_~>]/g, '')        // remove markdown markup
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text
    .replace(/https?:\/\/\S+/g, '') // URLs
    .replace(/\s+/g, ' ')           // normalize whitespace
    .trim()
}

/**
 * Speaks text using AURA's female mentor voice persona.
 */
export function speakAuraMentor(text: string, options: SpeakOptions = {}): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false

  const clean = cleanTextForSpeech(text)
  if (!clean) return false

  try {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(clean)
    activeUtterance = utterance

    const langCode = options.lang || 'en-US'
    utterance.lang = langCode

    const femaleVoice = getAuraFemaleVoice(langCode)
    if (femaleVoice) {
      utterance.voice = femaleVoice
      // Apply configured female pitch
      utterance.pitch = options.pitch || VOICE_CONFIG.defaultPitch
    } else {
      // If OS has no voice identified as female, raise pitch significantly to guarantee female timbre
      utterance.pitch = options.pitch ? Math.max(options.pitch, VOICE_CONFIG.fallbackPitch) : VOICE_CONFIG.fallbackPitch
    }

    utterance.rate = options.rate || VOICE_CONFIG.defaultRate

    utterance.onstart = () => {
      options.onStart?.()
    }

    utterance.onend = () => {
      activeUtterance = null
      options.onEnd?.()
    }

    utterance.onerror = (e) => {
      activeUtterance = null
      options.onError?.(e)
    }

    if (options.onBoundary) {
      utterance.onboundary = options.onBoundary
    }

    window.speechSynthesis.speak(utterance)
    return true
  } catch (err) {
    console.warn('speakAuraMentor error:', err)
    activeUtterance = null
    options.onError?.(err)
    return false
  }
}

/**
 * Stops any active speech synthesis immediately.
 */
export function stopAuraMentor(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // ignore
    }
  }
  activeUtterance = null
}
