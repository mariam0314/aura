import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByToken, updateUserLanguage, getUserById } from '@/lib/db'
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifySessionToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbSession = getSessionByToken(token)
    if (!dbSession) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }

    const body = await request.json()
    const language = (body.language || 'en').trim().toLowerCase()
    const englishMode = body.englishMode || (language === 'en' ? 'genz' : null)

    const updated = updateUserLanguage(dbSession.user_id, language, englishMode)
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update language' }, { status: 500 })
    }

    const updatedUser = getUserById(dbSession.user_id)

    return NextResponse.json({
      success: true,
      selected_language: updatedUser?.selected_language || language,
      english_mode: updatedUser?.english_mode || englishMode,
    })
  } catch (error: any) {
    console.error('[AURA User Language API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
