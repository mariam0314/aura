import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const text = (searchParams.get('text') || '').trim()
    const lang = (searchParams.get('lang') || 'en').toLowerCase().split('-')[0]

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 })
    }

    // Truncate to reasonable length for TTS
    const sanitized = text.substring(0, 300)
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(sanitized)}&tl=${lang}&client=tw-ob`

    const ttsRes = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!ttsRes.ok) {
      return NextResponse.json({ error: 'TTS provider error' }, { status: ttsRes.status })
    }

    const audioBuffer = await ttsRes.arrayBuffer()

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (error: any) {
    console.error('[AURA TTS API] Error:', error)
    return NextResponse.json({ error: 'Internal TTS error' }, { status: 500 })
  }
}
