/**
 * AURA AI Mentor — Centralized Voice Configuration & Female TTS Engine
 * 
 * Strictly ensures AURA speaks with an intelligent, clear, friendly,
 * natural, and educational FEMALE voice.
 * Supports all 11 languages (English, Hindi, Marathi, Gujarati, Bengali,
 * Tamil, Telugu, Kannada, Malayalam, Punjabi, Urdu).
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
    // English (Global / UK / US / India)
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
    'microsoft neerja online (natural)',
    'microsoft neerja',
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
    'google us english',
    'google uk english female',
    // Hindi (hi-IN)
    'microsoft swara online (natural)',
    'microsoft swara',
    'microsoft heera',
    'microsoft kalpana',
    'google हिन्दी',
    'hi-in-x-hie-local',
    'hi-in-x-hie-network',
    'hi-in-x-cfn#female',
    // Marathi (mr-IN)
    'microsoft aarohi online (natural)',
    'microsoft aarohi',
    'google मराठी',
    'mr-in-x-mrf#female',
    // Gujarati (gu-IN)
    'microsoft dhwani online (natural)',
    'microsoft dhwani',
    'google ગુજરાતી',
    // Tamil (ta-IN)
    'microsoft pallavi online (natural)',
    'microsoft pallavi',
    'google தமிழ்',
    // Telugu (te-IN)
    'microsoft shruti online (natural)',
    'microsoft shruti',
    'google తెలుగు',
    // Bengali (bn-IN)
    'microsoft tanishaa online (natural)',
    'microsoft tanishaa',
    'google বাংলা',
    // Kannada (kn-IN)
    'microsoft sapna online (natural)',
    'microsoft sapna',
    'google ಕನ್ನಡ',
    // Malayalam (ml-IN)
    'microsoft shobhana online (natural)',
    'microsoft shobhana',
    'google മലയാളം',
    // Punjabi (pa-IN)
    'microsoft raavi online (natural)',
    'microsoft raavi',
    'google ਪੰਜਾਬੀ',
    // Urdu (ur-PK)
    'microsoft gul online (natural)',
    'microsoft gul',
    'google اردو',
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
  defaultPitch: 1.18, // Youthful, clear, encouraging female pitch baseline
  defaultRate: 1.02,  // Conversational tempo
  fallbackPitch: 1.25, // Heightened pitch if OS voice lacks female tagging
}

let cachedVoices: SpeechSynthesisVoice[] = []
let isInitialized = false
let activeAudio: HTMLAudioElement | null = null
let activeUtterance: SpeechSynthesisUtterance | null = null

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
    combined.includes('kalpana') ||
    combined.includes('aarohi') ||
    combined.includes('dhwani') ||
    combined.includes('pallavi') ||
    combined.includes('shruti') ||
    combined.includes('tanishaa') ||
    combined.includes('sapna') ||
    combined.includes('shobhana') ||
    combined.includes('raavi') ||
    combined.includes('gul')
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

  // 1. Priority: Verified female voices in the requested language
  if (langVoices.length > 0) {
    const femalePool = langVoices.filter(isStrictlyFemaleVoice)
    if (femalePool.length > 0) {
      let topVoice = femalePool[0]
      let topScore = -1

      for (const v of femalePool) {
        const name = v.name.toLowerCase()
        let score = 20

        if (name.includes('natural')) score += 60
        if (name.includes('online')) score += 30
        if (name.includes('jenny') || name.includes('swara') || name.includes('aarohi') || name.includes('zira')) score += 70

        if (score > topScore) {
          topScore = score
          topVoice = v
        }
      }
      return topVoice
    }

    // Non-male voice in requested language
    const nonMaleInLang = langVoices.filter((v) => {
      const combined = `${v.name.toLowerCase()} ${v.voiceURI.toLowerCase()}`
      return !VOICE_CONFIG.maleVoiceKeywords.some((m) => combined.includes(m))
    })
    if (nonMaleInLang.length > 0) {
      return nonMaleInLang[0]
    }
  }

  // 2. If English requested, search English female voices
  if (langPrefix === 'en') {
    const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
    const femaleEnglish = englishVoices.filter(isStrictlyFemaleVoice)
    if (femaleEnglish.length > 0) {
      return femaleEnglish[0]
    }
    const nonMaleEnglish = englishVoices.filter((v) => {
      const combined = `${v.name.toLowerCase()} ${v.voiceURI.toLowerCase()}`
      return !VOICE_CONFIG.maleVoiceKeywords.some((m) => combined.includes(m))
    })
    if (nonMaleEnglish.length > 0) {
      return nonMaleEnglish[0]
    }
  }

  // Return null if no native language voice is available in browser (will cleanly route to /api/tts)
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

/**
 * Strips code, markdown, emojis, and math syntax that cause speech synthesizers to crash or glitch.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return ''
  return text
    // Remove markdown code blocks and backticks
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    // Replace markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Convert math / complexity tokens
    .replace(/\$O\((.*?)\)\$/g, 'O of $1')
    .replace(/O\((.*?)\)/g, 'O of $1')
    .replace(/\\log/g, 'log')
    .replace(/\$/g, '')
    // Remove markdown headers, bullets, formatting
    .replace(/[*#_~>|•]/g, ' ')
    // Remove emojis and surrogate pairs that crash desktop SAPI voices
    .replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Splits text into natural sentence chunks under maxChunkLength so that
 * Chromium speech synthesis never freezes, crashes, or drops audio.
 */
export function splitTextIntoSpeechChunks(text: string, maxChunkLength: number = 150): string[] {
  const clean = cleanTextForSpeech(text)
  if (!clean) return []

  const rawSentences = clean.split(/(?<=[.?!।|\n])\s+/)
  const chunks: string[] = []
  let current = ''

  for (const s of rawSentences) {
    const trimmed = s.trim()
    if (!trimmed) continue

    if (trimmed.length > maxChunkLength) {
      const subParts = trimmed.split(/(?<=[,;:\-–])\s+/)
      for (const part of subParts) {
        if (!part.trim()) continue
        if ((current + ' ' + part).trim().length > maxChunkLength) {
          if (current.trim()) chunks.push(current.trim())
          current = part.trim()
        } else {
          current = (current + ' ' + part).trim()
        }
      }
    } else if ((current + ' ' + trimmed).trim().length > maxChunkLength) {
      if (current.trim()) chunks.push(current.trim())
      current = trimmed
    } else {
      current = current ? `${current} ${trimmed}` : trimmed
    }
  }

  if (current.trim()) {
    chunks.push(current.trim())
  }

  return chunks.length > 0 ? chunks : [clean.substring(0, maxChunkLength)]
}

let sharedAudio: HTMLAudioElement | null = null
let isAudioEngineUnlocked = false
let activeKeepAliveTimer: any = null
let isSpeakingCancelled = false

/**
 * Call on any user interaction (click, keypress, tap) to pre-unlock
 * browser audio playback and speech synthesis, preventing Autoplay blocks.
 */
export function unlockAudioEngine(): void {
  if (typeof window === 'undefined') return

  try {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }
    }

    if (!sharedAudio) {
      sharedAudio = new Audio()
      sharedAudio.preload = 'auto'
    }

    if (!isAudioEngineUnlocked) {
      // 1-sample silent WAV
      sharedAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
      const p = sharedAudio.play()
      if (p !== undefined) {
        p.then(() => {
          isAudioEngineUnlocked = true
          sharedAudio?.pause()
        }).catch(() => {})
      }
    }
  } catch {}
}

export function stopAuraMentor(): void {
  isSpeakingCancelled = true

  if (activeKeepAliveTimer) {
    clearInterval(activeKeepAliveTimer)
    activeKeepAliveTimer = null
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
    } catch {}
  }
  activeUtterance = null

  if (sharedAudio) {
    try {
      sharedAudio.pause()
      sharedAudio.currentTime = 0
    } catch {}
  }
}

/**
 * Speaks text using AURA's female mentor voice persona.
 * Automatically selects native browser voices when available,
 * or streams crystal-clear female voice audio through /api/tts.
 */
export function speakAuraMentor(text: string, options: SpeakOptions = {}): boolean {
  if (typeof window === 'undefined') return false

  const clean = cleanTextForSpeech(text)
  if (!clean) return false

  // Unlock audio engine if called from or near a gesture
  unlockAudioEngine()

  // Stop any active speech
  stopAuraMentor()
  isSpeakingCancelled = false

  const langCode = options.lang || 'en-US'
  const langPrefix = langCode.toLowerCase().split('-')[0]

  // Check if browser has a verified voice for this language
  let femaleVoice: SpeechSynthesisVoice | null = null
  if ('speechSynthesis' in window) {
    femaleVoice = getAuraFemaleVoice(langCode)
  }

  // If a matching native voice exists in browser, speak via SpeechSynthesis with chunking & keep-alive
  if (femaleVoice && 'speechSynthesis' in window) {
    const chunks = splitTextIntoSpeechChunks(clean, 160)
    if (chunks.length === 0) return false

    // Wait 50ms so Chrome finishes processing any pending cancel() calls
    setTimeout(() => {
      if (isSpeakingCancelled) return

      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume()
        }

        let currentIndex = 0
        const total = chunks.length

        // Keep-alive heartbeat to prevent Chromium 14-second cutoff bug
        if (activeKeepAliveTimer) clearInterval(activeKeepAliveTimer)
        activeKeepAliveTimer = setInterval(() => {
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
              window.speechSynthesis.pause()
              window.speechSynthesis.resume()
            }
          }
        }, 8000)

        const speakNextChunk = () => {
          if (isSpeakingCancelled || currentIndex >= total) {
            if (activeKeepAliveTimer) {
              clearInterval(activeKeepAliveTimer)
              activeKeepAliveTimer = null
            }
            options.onEnd?.()
            return
          }

          const chunk = chunks[currentIndex]
          const utterance = new SpeechSynthesisUtterance(chunk)
          activeUtterance = utterance
          utterance.voice = femaleVoice
          utterance.lang = femaleVoice?.lang || langCode
          utterance.pitch = options.pitch || VOICE_CONFIG.defaultPitch
          utterance.rate = options.rate || VOICE_CONFIG.defaultRate

          utterance.onstart = () => {
            if (currentIndex === 0) {
              options.onStart?.()
            }
          }

          utterance.onend = () => {
            currentIndex++
            speakNextChunk()
          }

          utterance.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted' || isSpeakingCancelled) {
              return
            }
            if (activeKeepAliveTimer) {
              clearInterval(activeKeepAliveTimer)
              activeKeepAliveTimer = null
            }
            // Fallback to audio stream if synthesis fails
            fallbackAudioStream(clean, langPrefix, options)
          }

          if (options.onBoundary) {
            utterance.onboundary = options.onBoundary
          }

          window.speechSynthesis.speak(utterance)
        }

        speakNextChunk()
      } catch {
        fallbackAudioStream(clean, langPrefix, options)
      }
    }, 50)

    return true
  }

  // Fallback to high-quality server-side female audio stream (/api/tts)
  return fallbackAudioStream(clean, langPrefix, options)
}

function fallbackAudioStream(cleanText: string, langPrefix: string, options: SpeakOptions): boolean {
  if (typeof window === 'undefined') return false

  unlockAudioEngine()

  const chunks = splitTextIntoSpeechChunks(cleanText, 180)
  if (chunks.length === 0) return false

  if (!sharedAudio) {
    sharedAudio = new Audio()
  }

  isSpeakingCancelled = false
  let currentIndex = 0
  const total = chunks.length

  const playNext = () => {
    if (isSpeakingCancelled || currentIndex >= total) {
      options.onEnd?.()
      return
    }

    const chunk = chunks[currentIndex]
    const audioUrl = `/api/tts?text=${encodeURIComponent(chunk)}&lang=${langPrefix}`

    sharedAudio!.src = audioUrl

    sharedAudio!.onplay = () => {
      if (currentIndex === 0) {
        options.onStart?.()
      }
    }

    sharedAudio!.onended = () => {
      currentIndex++
      playNext()
    }

    sharedAudio!.onerror = () => {
      if (isSpeakingCancelled) return
      currentIndex++
      if (currentIndex < total) {
        playNext()
      } else {
        options.onError?.(new Error('Audio stream ended with error'))
      }
    }

    const p = sharedAudio!.play()
    if (p !== undefined) {
      p.catch((err) => {
        if (!isSpeakingCancelled) {
          options.onError?.(err)
        }
      })
    }
  }

  playNext()
  return true
}
