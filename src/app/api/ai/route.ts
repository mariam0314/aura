import { NextResponse } from 'next/server'
import {
  generateLocalAdaptiveResponse,
  buildSystemPrompt,
  type AIMessageRequest,
  type AIMessageResponse,
} from '@/lib/ai-service'
import {
  EMOTION_PROFILES,
  analyzeQuestionSentiment,
  type EmotionType,
} from '@/lib/emotion-engine'

export async function POST(request: Request) {
  try {
    const body: AIMessageRequest = await request.json()

    // Key can come from environment variable OR client customApiKey
    const geminiKey =
      (body.customProvider === 'gemini' ? body.customApiKey : undefined) ||
      body.customApiKey ||
      process.env.GEMINI_API_KEY

    const openAIKey =
      (body.customProvider === 'openai' ? body.customApiKey : undefined) ||
      process.env.OPENAI_API_KEY

    // 1. Google Gemini Cloud LLM with emotion and pitch extraction
    if (geminiKey) {
      try {
        const sysPrompt = buildSystemPrompt(body)
        const emotionPrompt = `
${sysPrompt}

EMOTION & VOICE ACOUSTICS INSTRUCTION:
Analyze the emotional context of your response and learner's question.
You are AURA, an empathetic and intelligent female AI mentor.
At the very end of your response, add a hidden metadata JSON block on its own line:
<!--AURA_META:{"emotion":"happy"|"celebrating"|"concerned"|"surprised"|"confident"|"explaining","pitch":1.14,"rate":1.02}-->
Pitch range: 1.04 (comforting/gentle female voice) to 1.38 (celebratory/enthusiastic female voice). Baseline explaining pitch: 1.14. Rate range: 0.96 to 1.12.
`

        const geminiModels = [
          'gemini-3.5-flash-lite',
          'gemini-3.8-flash',
          'gemini-flash-latest',
        ]

        let rawText = ''
        for (const model of geminiModels) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    {
                      role: 'user',
                      parts: [{ text: `${emotionPrompt}\n\nUser Question:\n${body.prompt}` }],
                    },
                  ],
                  generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 650,
                  },
                }),
              }
            )

            if (geminiRes.ok) {
              const data = await geminiRes.json()
              const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
              if (candidateText) {
                rawText = candidateText
                break
              }
            }
          } catch {
            // continue to fallback model
          }
        }

          if (rawText) {
            let emotion: EmotionType = 'explaining'
            let pitch = 1.14
            let rate = 1.02
            let cleanText = rawText

            const metaMatch = rawText.match(/<!--AURA_META:(\{.*?\})-->/)
            if (metaMatch) {
              try {
                const parsed = JSON.parse(metaMatch[1])
                if (parsed.emotion && parsed.emotion in EMOTION_PROFILES) {
                  emotion = parsed.emotion
                }
                if (typeof parsed.pitch === 'number') pitch = parsed.pitch
                if (typeof parsed.rate === 'number') rate = parsed.rate
                cleanText = rawText.replace(/<!--AURA_META:\{.*?\}-->/, '').trim()
              } catch {
                // If parse fails, fallback to sentiment analyzer
              }
            } else {
              const sentiment = analyzeQuestionSentiment(body.prompt)
              emotion = sentiment.predictedAnswerEmotion
              pitch = sentiment.pitch
              rate = sentiment.rate
            }

            return NextResponse.json<AIMessageResponse>({
              text: cleanText,
              suggestedState: emotion as any,
              emotion,
              pitch,
              rate,
              providerUsed: 'gemini-cloud',
            })
          }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local engine:', geminiErr)
      }
    }

    // 2. OpenAI GPT with emotion tagging
    if (openAIKey) {
      try {
        const sysPrompt = buildSystemPrompt(body)
        const openAIRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAIKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `${sysPrompt}\nAt the end of your answer, attach: <!--AURA_META:{"emotion":"happy"|"concerned"|"celebrating"|"explaining"|"surprised"|"confident","pitch":1.05,"rate":1.0}-->`,
              },
              { role: 'user', content: body.prompt },
            ],
            max_tokens: 650,
          }),
        })

        if (openAIRes.ok) {
          const data = await openAIRes.json()
          const rawText: string = data.choices?.[0]?.message?.content || ''
          if (rawText) {
            let emotion: EmotionType = 'explaining'
            let pitch = 1.06
            let rate = 1.02
            let cleanText = rawText

            const metaMatch = rawText.match(/<!--AURA_META:(\{.*?\})-->/)
            if (metaMatch) {
              try {
                const parsed = JSON.parse(metaMatch[1])
                if (parsed.emotion && parsed.emotion in EMOTION_PROFILES) {
                  emotion = parsed.emotion
                }
                if (typeof parsed.pitch === 'number') pitch = parsed.pitch
                if (typeof parsed.rate === 'number') rate = parsed.rate
                cleanText = rawText.replace(/<!--AURA_META:\{.*?\}-->/, '').trim()
              } catch {}
            }

            return NextResponse.json<AIMessageResponse>({
              text: cleanText,
              suggestedState: emotion as any,
              emotion,
              pitch,
              rate,
              providerUsed: 'openai-cloud',
            })
          }
        }
      } catch (openAiErr) {
        console.warn('OpenAI API call failed, falling back to local engine:', openAiErr)
      }
    }

    // 3. Default: High-fidelity deterministic local adaptive engine (zero cost)
    const local = generateLocalAdaptiveResponse(body)
    return NextResponse.json<AIMessageResponse>(local)
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json<AIMessageResponse>(
      {
        text: 'AURA Adaptive Engine is actively managing your cognitive profile. Let us examine the core concept.',
        suggestedState: 'confident',
        emotion: 'confident',
        pitch: 1.05,
        rate: 1.02,
        providerUsed: 'aura-adaptive-engine',
      },
      { status: 200 }
    )
  }
}
