import { NextResponse } from 'next/server'
import { getUserByEmail, createSession } from '@/lib/db'
import { comparePassword, signSessionToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()
    const password = body.password || ''

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    const isMatch = await comparePassword(password, user.password_hash)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // 7 days expiration
    const expMs = 7 * 24 * 60 * 60 * 1000
    const expiresAt = Date.now() + expMs

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      exp: expiresAt,
    })

    createSession(user.id, token, expiresAt)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        selected_language: user.selected_language,
        english_mode: user.english_mode,
        role: user.role,
      },
    })

    // Set secure HTTP-only cookie
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    console.error('[AURA Auth Login] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    )
  }
}
