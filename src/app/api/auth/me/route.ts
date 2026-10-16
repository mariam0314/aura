import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByToken, getUserById } from '@/lib/db'
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const payload = await verifySessionToken(token)
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const dbSession = getSessionByToken(token)
    if (!dbSession) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = getUserById(dbSession.user_id)
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        selected_language: user.selected_language,
        english_mode: user.english_mode,
        role: user.role,
        preferences: JSON.parse(user.preferences_json || '{}'),
      },
    })
  } catch (error: any) {
    console.error('[AURA Auth Me] Error:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
