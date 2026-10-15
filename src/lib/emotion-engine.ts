/**
 * AURA Emotion & Voice Acoustics Engine
 * 
 * Maps pedagogical and conversational states to 3D facial expressions,
 * body gestures, and acoustic voice modulation parameters (pitch, rate, timbre).
 */

export type EmotionType =
  | 'idle'
  | 'happy'
  | 'celebrating'
  | 'thinking'
  | 'concerned'
  | 'surprised'
  | 'confident'
  | 'explaining'
  | 'listening'
  | 'serious'
  | 'confused'

export interface EmotionProfile {
  id: EmotionType
  label: string
  emoji: string
  /**
   * Web Speech pitch (0.0 to 2.0). 1.0 is default baseline.
   * >1.0 sounds brighter, energetic, youthfully enthusiastic.
   * <1.0 sounds grounded, thoughtful, soothing, supportive.
   */
  pitch: number
  /**
   * Web Speech rate (0.1 to 10.0). Typical natural range: 0.90 to 1.15.
   */
  rate: number
  /**
   * Target VRM blendshape values (0.0 to 1.0).
   */
  blendshapes: {
    happy?: number
    sad?: number
    surprised?: number
    relaxed?: number
    angry?: number
  }
  /**
   * Head posture rotation offsets in radians [X, Y, Z]
   */
  headTilt: [number, number, number]
  /**
   * Description for UI / HUD
   */
  description: string
}

export const EMOTION_PROFILES: Record<EmotionType, EmotionProfile> = {
  idle: {
    id: 'idle',
    label: 'Calm & Attentive',
    emoji: '✨',
    pitch: 1.08,
    rate: 1.0,
    blendshapes: {
      relaxed: 0.2,
      happy: 0.1,
    },
    headTilt: [-0.045, 0, 0],
    description: 'Neutral baseline posture with gentle breathing and blinking.',
  },
  listening: {
    id: 'listening',
    label: 'Listening Closely',
    emoji: '🎙️',
    pitch: 1.10,
    rate: 1.0,
    blendshapes: {
      relaxed: 0.35,
      happy: 0.2,
    },
    headTilt: [-0.03, 0, 0.04],
    description: 'Slight head tilt showing active listening and engagement.',
  },
  thinking: {
    id: 'thinking',
    label: 'Deep Analysis',
    emoji: '🧠',
    pitch: 1.02,
    rate: 0.96,
    blendshapes: {
      sad: 0.25,
      surprised: 0.1,
    },
    headTilt: [-0.08, -0.06, -0.05],
    description: 'Contemplative look upward and to the side while processing.',
  },
  happy: {
    id: 'happy',
    label: 'Pleased & Encouraging',
    emoji: '😊',
    pitch: 1.26,
    rate: 1.06,
    blendshapes: {
      happy: 0.75,
      relaxed: 0.3,
    },
    headTilt: [-0.02, 0, 0.02],
    description: 'Bright warm smile, elevated voice pitch, and uplifting tone.',
  },
  celebrating: {
    id: 'celebrating',
    label: 'Celebrating Win!',
    emoji: '🎉',
    pitch: 1.38,
    rate: 1.12,
    blendshapes: {
      happy: 0.95,
      surprised: 0.25,
    },
    headTilt: [0.03, 0, 0],
    description: 'Joyful cheer with wide smile, high pitch, and animated gestures.',
  },
  concerned: {
    id: 'concerned',
    label: 'Empathetic & Supportive',
    emoji: '🤔',
    pitch: 1.04,
    rate: 0.98,
    blendshapes: {
      sad: 0.6,
      relaxed: 0.15,
    },
    headTilt: [-0.03, 0, 0.06],
    description: 'Gentle, comforting lower pitch to ease anxiety on hard concepts.',
  },
  surprised: {
    id: 'surprised',
    label: 'Intrigued & Curious',
    emoji: '😮',
    pitch: 1.30,
    rate: 1.1,
    blendshapes: {
      surprised: 0.75,
      happy: 0.2,
    },
    headTilt: [0.02, 0, -0.03],
    description: 'Wide expressive eyes and higher pitch on intriguing questions.',
  },
  confident: {
    id: 'confident',
    label: 'Mastery & Conviction',
    emoji: '⚡',
    pitch: 1.12,
    rate: 1.04,
    blendshapes: {
      happy: 0.35,
      relaxed: 0.4,
    },
    headTilt: [-0.04, 0, 0],
    description: 'Direct steady eye contact, measured affirmative cadence.',
  },
  explaining: {
    id: 'explaining',
    label: 'Teaching & Guiding',
    emoji: '💡',
    pitch: 1.14,
    rate: 1.02,
    blendshapes: {
      happy: 0.3,
      relaxed: 0.3,
    },
    headTilt: [-0.04, 0, 0],
    description: 'Dynamic conversational cadence with rhythmic nodding.',
  },
  serious: {
    id: 'serious',
    label: 'Serious & Focused',
    emoji: '🧐',
    pitch: 1.05,
    rate: 0.98,
    blendshapes: {
      relaxed: 0.1,
      angry: 0.15,
    },
    headTilt: [-0.05, 0, 0],
    description: 'Composed, direct, grounded focus for deep technical clarity.',
  },
  confused: {
    id: 'confused',
    label: 'Clarifying & Puzzled',
    emoji: '🤔',
    pitch: 1.18,
    rate: 1.0,
    blendshapes: {
      sad: 0.35,
      surprised: 0.25,
    },
    headTilt: [-0.04, 0.04, 0.08],
    description: 'Inquisitive head tilt seeking to understand and clarify user questions.',
  },
}

/**
 * Real-time question sentiment and intent analyzer.
 * Returns the immediate emotional reaction for the avatar the moment
 * the user submits their question.
 */
export function analyzeQuestionSentiment(question: string): {
  immediateReaction: EmotionType
  predictedAnswerEmotion: EmotionType
  pitch: number
  rate: number
} {
  const q = question.toLowerCase().trim()

  // 1. Success, celebratory, completion, score
  if (
    q.includes('solved') ||
    q.includes('100%') ||
    q.includes('got it') ||
    q.includes('worked') ||
    q.includes('passed') ||
    q.includes('nailed it') ||
    q.includes('awesome') ||
    q.includes('thank') ||
    q.includes('great') ||
    q.includes('congrats')
  ) {
    return {
      immediateReaction: 'celebrating',
      predictedAnswerEmotion: 'celebrating',
      pitch: EMOTION_PROFILES.celebrating.pitch,
      rate: EMOTION_PROFILES.celebrating.rate,
    }
  }

  // 2. Confusion, struggle, critical knowledge gap, error, failure
  if (
    q.includes("don't understand") ||
    q.includes('dont understand') ||
    q.includes('confused') ||
    q.includes('failing') ||
    q.includes('error') ||
    q.includes('hard') ||
    q.includes('difficult') ||
    q.includes('stuck') ||
    q.includes('wrong') ||
    q.includes('lost') ||
    q.includes('hate') ||
    q.includes('help me') ||
    q.includes('why null') ||
    q.includes('why is left join')
  ) {
    return {
      immediateReaction: 'concerned',
      predictedAnswerEmotion: 'explaining',
      pitch: EMOTION_PROFILES.concerned.pitch,
      rate: EMOTION_PROFILES.concerned.rate,
    }
  }

  // 3. Curiosity, what if, deep inquiry, surprise
  if (
    q.includes('what if') ||
    q.includes('really?') ||
    q.includes('how is that possible') ||
    q.includes('difference between') ||
    q.includes('why does') ||
    q.includes('secret') ||
    q.includes('hack')
  ) {
    return {
      immediateReaction: 'surprised',
      predictedAnswerEmotion: 'explaining',
      pitch: EMOTION_PROFILES.surprised.pitch,
      rate: EMOTION_PROFILES.surprised.rate,
    }
  }

  // 4. Theoretical, complex analytical, architecture queries
  if (
    q.includes('architecture') ||
    q.includes('algorithm') ||
    q.includes('subnet') ||
    q.includes('proof') ||
    q.includes('normalization') ||
    q.includes('calculate') ||
    q.includes('design') ||
    q.includes('compare')
  ) {
    return {
      immediateReaction: 'thinking',
      predictedAnswerEmotion: 'explaining',
      pitch: EMOTION_PROFILES.explaining.pitch,
      rate: EMOTION_PROFILES.explaining.rate,
    }
  }

  // 5. Greetings & Ready state
  if (
    q.includes('hello') ||
    q.includes('hi') ||
    q.includes('hey') ||
    q.includes('namaste') ||
    q.includes('sup') ||
    q.includes('start') ||
    q.includes('ready')
  ) {
    return {
      immediateReaction: 'happy',
      predictedAnswerEmotion: 'happy',
      pitch: EMOTION_PROFILES.happy.pitch,
      rate: EMOTION_PROFILES.happy.rate,
    }
  }

  // Default: engaging and confident
  return {
    immediateReaction: 'thinking',
    predictedAnswerEmotion: 'confident',
    pitch: EMOTION_PROFILES.confident.pitch,
    rate: EMOTION_PROFILES.confident.rate,
  }
}

/**
 * Known female voice indicators across Windows, macOS, iOS, Android, and Chromium.
 */
export const FEMALE_VOICE_NAMES = [
  // Microsoft Edge / Windows Online Natural Female Voices (Studio Grade)
  'microsoft jenny',
  'microsoft aria',
  'microsoft michelle',
  'microsoft ana',
  'microsoft sonia',
  'microsoft libby',
  'microsoft natasha',
  'microsoft clara',
  'microsoft neerja', // Indian English / Hindi
  'microsoft swara',  // Hindi female
  'microsoft heera',  // Indian English female

  // Windows Desktop SAPI Female Voices
  'microsoft zira',
  'microsoft hazel',
  'microsoft susan',
  'microsoft kalpana',

  // Google / Chrome / Android Female Voices
  'google us english',
  'google uk english female',
  'google हिन्दी',
  'en-us-x-sfg#female',
  'en-us-x-tpd#female',

  // Apple macOS / iOS Female Voices
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
]

/**
 * Known male voice indicators to strictly reject or penalize.
 */
export const MALE_VOICE_NAMES = [
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
]

/**
 * Evaluates whether a browser speech synthesis voice is explicitly female.
 */
export function isFemaleVoice(voice: SpeechSynthesisVoice): boolean {
  const combined = `${voice.name.toLowerCase()} ${voice.voiceURI.toLowerCase()}`

  // Check explicit male rejections
  for (const male of MALE_VOICE_NAMES) {
    if (combined.includes(male)) {
      return false
    }
  }

  // Explicit female keywords
  if (combined.includes('female') || combined.includes('woman') || combined.includes('girl')) {
    return true
  }

  // Check known female names
  for (const female of FEMALE_VOICE_NAMES) {
    if (combined.includes(female)) {
      return true
    }
  }

  return false
}

/**
 * Intelligent female voice selector for Web Speech API.
 * Guaranteed to prioritize high-fidelity natural female voices (e.g. Jenny, Aria, Zira, Samantha)
 * and strictly filters out male voices.
 */
export function getBestVoice(langCode: string = 'en'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null

  const voices = window.speechSynthesis.getVoices()
  if (!voices || voices.length === 0) return null

  const langPrefix = langCode.toLowerCase().split('-')[0]

  // Filter voices matching the requested language code
  const langVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith(langPrefix)
  )

  const pool = langVoices.length > 0 ? langVoices : voices

  // 1. Strict match: Female voices in the requested language pool
  const femaleVoices = pool.filter(isFemaleVoice)
  if (femaleVoices.length > 0) {
    let topVoice = femaleVoices[0]
    let topScore = -1

    for (const v of femaleVoices) {
      const name = v.name.toLowerCase()
      let score = 20

      // Exact language match (e.g. en-US vs en-US)
      if (v.lang.toLowerCase() === langCode.toLowerCase()) score += 40

      // High-definition natural online voice bonus
      if (name.includes('natural')) score += 50
      if (name.includes('online')) score += 25

      // Preferred studio-grade female personas
      if (name.includes('jenny') || name.includes('aria') || name.includes('zira') || name.includes('samantha')) {
        score += 60
      }

      if (score > topScore) {
        topScore = score
        topVoice = v
      }
    }
    return topVoice
  }

  // 2. Fallback: Search all system voices for any female voice
  const allFemaleVoices = voices.filter(isFemaleVoice)
  if (allFemaleVoices.length > 0) {
    return allFemaleVoices[0]
  }

  // 3. Fallback: Filter out all explicit male voices
  const nonMaleVoices = pool.filter((v) => {
    const combined = `${v.name.toLowerCase()} ${v.voiceURI.toLowerCase()}`
    return !MALE_VOICE_NAMES.some((m) => combined.includes(m))
  })

  if (nonMaleVoices.length > 0) {
    return nonMaleVoices[0]
  }

  // 4. Under no circumstances return a male voice
  return null
}
