'use client'

import { useState, useEffect } from 'react'
import { Settings, Globe, Volume2, Shield, Moon, Sun, CheckCircle, Sparkles, Cpu, RotateCcw, User, MessageSquare, Play } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useLearning } from '@/context/LearningContext'
import { languageOptions } from '@/i18n/translations'
import type { UserRole } from '@/lib/learning-engine'
import { getBestVoice, EMOTION_PROFILES } from '@/lib/emotion-engine'
import { speakAuraMentor, stopAuraMentor, VOICE_GENDER, VOICE_CONFIG } from '@/lib/voice-config'

export default function SettingsPage() {
  const { lang, setLang, t, getSpeechLang } = useLanguage()
  const { role, setRole, englishMode, setEnglishMode, resetLearningProfile } = useLearning()
  const [speechRate, setSpeechRate] = useState(1.0)
  const [aiProvider, setAiProvider] = useState<'aura-adaptive' | 'gemini' | 'openai'>('aura-adaptive')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [saved, setSaved] = useState(false)
  const [profileResetMsg, setProfileResetMsg] = useState(false)
  const [auditioningPitch, setAuditioningPitch] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('aura_api_key') || ''
      const savedProvider = (localStorage.getItem('aura_ai_provider') as any) || 'aura-adaptive'
      setApiKeyInput(savedKey)
      setAiProvider(savedProvider)

      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices()
        const handleVoices = () => {
          window.speechSynthesis.getVoices()
        }
        window.speechSynthesis.addEventListener('voiceschanged', handleVoices)
        return () => {
          window.speechSynthesis.removeEventListener('voiceschanged', handleVoices)
        }
      }
    }
  }, [])

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_api_key', apiKeyInput)
      localStorage.setItem('aura_ai_provider', aiProvider)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const testVoicePitch = (pitch: number, samplePhrase: string) => {
    setAuditioningPitch(pitch)
    speakAuraMentor(samplePhrase, {
      lang: getSpeechLang(),
      pitch,
      rate: speechRate,
      onEnd: () => setAuditioningPitch(null),
      onError: () => setAuditioningPitch(null),
    })
  }

  const handleResetProfile = () => {
    if (confirm('Are you sure you want to reset your learning profile and start fresh?')) {
      resetLearningProfile()
      setProfileResetMsg(true)
      setTimeout(() => setProfileResetMsg(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--aura-bg)] text-[var(--aura-text)] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#257874]/10 text-[#257874] text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>{t.settings.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            {t.settings.title}
          </h1>
          <p className="text-sm text-[var(--aura-text-muted)]">
            {t.settings.subtitle}
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-[#35C88A]/10 border border-[#35C88A]/30 text-[#35C88A] text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{t.settings.savedSuccess || 'Preferences saved successfully!'}</span>
          </div>
        )}

        {profileResetMsg && (
          <div className="p-4 rounded-2xl bg-[#257874]/10 border border-[#257874]/30 text-[#257874] text-xs font-bold flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Learning Profile restored to default baseline.</span>
          </div>
        )}

        <div className="p-8 rounded-3xl bg-[var(--aura-surface)] border border-[var(--aura-border)] space-y-8">
          {/* Persona Tone Setting */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#257874]" />
              <span>AURA Conversational Personality & Tone</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEnglishMode('genz')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  englishMode === 'genz'
                    ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)]'
                }`}
              >
                <div className="text-sm font-bold mb-1">Gen-Z Study Mentor 😎</div>
                <div className="text-xs opacity-80 leading-relaxed">
                  Supportive, casual, smart, and motivating ("You cooked on this ngl", "That's a W 🔥").
                </div>
              </button>

              <button
                type="button"
                onClick={() => setEnglishMode('professional')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  englishMode === 'professional'
                    ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)]'
                }`}
              >
                <div className="text-sm font-bold mb-1">Professional / Academic 💼</div>
                <div className="text-xs opacity-80 leading-relaxed">
                  Concise, structured, and formal industry phrasing for corporate and university views.
                </div>
              </button>
            </div>
          </div>

          {/* User Role Setting */}
          <div className="pt-6 border-t border-[var(--aura-border)]">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[#257874]" />
              <span>Default Active Role</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'student' as UserRole, label: 'Student' },
                { id: 'college' as UserRole, label: 'College Faculty' },
                { id: 'professional' as UserRole, label: 'Professional' },
                { id: 'company' as UserRole, label: 'Enterprise Lead' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border ${
                    role === r.id
                      ? 'bg-[#257874] text-white border-[#257874] shadow-md'
                      : 'bg-white dark:bg-[#00171F] text-[var(--aura-text)] border-[var(--aura-border)]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Inferencing Provider & Cost Management */}
          <div className="pt-6 border-t border-[var(--aura-border)] space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#257874]" />
                <span>AI Inferencing Engine & Cost Management</span>
              </label>
              <span className="text-[10px] font-bold text-[#35C88A] bg-[#35C88A]/10 px-2 py-0.5 rounded-full">
                Cost-Aware
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAiProvider('aura-adaptive')}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold ${
                  aiProvider === 'aura-adaptive'
                    ? 'bg-[#257874] text-white border-[#257874]'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)]'
                }`}
              >
                <div className="font-extrabold mb-0.5">Aura Local Engine</div>
                <div className="text-[10px] opacity-80">Instant • Zero API Cost</div>
              </button>

              <button
                type="button"
                onClick={() => setAiProvider('gemini')}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold ${
                  aiProvider === 'gemini'
                    ? 'bg-[#257874] text-white border-[#257874]'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)]'
                }`}
              >
                <div className="font-extrabold mb-0.5">Google Gemini API</div>
                <div className="text-[10px] opacity-80">Cloud LLM Hybrid</div>
              </button>

              <button
                type="button"
                onClick={() => setAiProvider('openai')}
                className={`p-3.5 rounded-2xl border text-left text-xs font-bold ${
                  aiProvider === 'openai'
                    ? 'bg-[#257874] text-white border-[#257874]'
                    : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)]'
                }`}
              >
                <div className="font-extrabold mb-0.5">OpenAI GPT-4o</div>
                <div className="text-[10px] opacity-80">Enterprise Dedicated</div>
              </button>
            </div>

            {aiProvider !== 'aura-adaptive' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[var(--aura-text-muted)]">Custom API Key (Optional)</label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#00171F] border border-[var(--aura-border)] text-xs text-[var(--aura-text)]"
                />
              </div>
            )}
          </div>

          {/* Language Picker */}
          <div className="pt-6 border-t border-[var(--aura-border)]">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-[#257874]" />
              <span>{t.settings.languageLabel}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLang(opt.code)}
                  className={`p-3 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    lang === opt.code
                      ? 'bg-[#257874] text-white border-[#257874]'
                      : 'bg-white dark:bg-[#00171F] text-[var(--aura-text)] border-[var(--aura-border)]'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.native}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Web Speech Rate */}
          <div className="pt-6 border-t border-[var(--aura-border)] space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#257874]" />
              <span>{t.settings.voiceSpeedLabel} ({speechRate}x)</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-[#257874]"
            />
          </div>

          {/* Emotion Voice Pitch Audition */}
          <div className="pt-6 border-t border-[var(--aura-border)] space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#257874]/10 border border-[#257874]/30">
              <span className="text-xs font-bold text-[#257874] dark:text-[#35C88A] flex items-center gap-2">
                <span>♀ Female Voice Persona (Aura Studio Female Synthesis)</span>
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#257874] text-white px-2.5 py-1 rounded-full font-bold">
                Female Voice Locked
              </span>
            </div>

            <label className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text)] flex items-center justify-between pt-1">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#35C88A]" />
                <span>Audition Dynamic Emotion Voice Pitches</span>
              </span>
              <span className="text-[10px] text-[#35C88A] font-bold">Auto-Adaptive</span>
            </label>
            <p className="text-xs text-[var(--aura-text-muted)]">
              Click any emotion button below to hear how Aura's female voice pitch and cadence modulate in real-time:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { emotion: 'happy', pitch: 1.26, label: '😊 Happy', phrase: 'Hello! I am excited to help you master this topic today.' },
                { emotion: 'celebrating', pitch: 1.38, label: '🎉 Celebrating', phrase: 'Incredible work! You completely mastered this concept!' },
                { emotion: 'concerned', pitch: 1.04, label: '🤔 Supportive', phrase: 'Do not worry if this feels tricky. Let us break it down simply.' },
                { emotion: 'explaining', pitch: 1.14, label: '💡 Explaining', phrase: 'Let us analyze the relational structure and key dependencies.' },
              ].map((item) => (
                <button
                  key={item.emotion}
                  type="button"
                  onClick={() => testVoicePitch(item.pitch, item.phrase)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                    auditioningPitch === item.pitch
                      ? 'bg-[#257874] text-white border-[#257874] shadow-md animate-pulse'
                      : 'bg-white dark:bg-[#00171F] border-[var(--aura-border)] text-[var(--aura-text)] hover:border-[#257874]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75 font-mono">{item.pitch}x</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-[var(--aura-border)] flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-3.5 rounded-2xl bg-[#257874] text-white text-xs font-bold shadow-md hover:bg-[#1f6360] transition-all"
            >
              {t.settings.saveBtn || 'Save Settings'}
            </button>

            <button
              type="button"
              onClick={handleResetProfile}
              className="px-6 py-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.settings.resetProfileBtn || 'Reset Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
