import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteSession } from '@/lib/db'
import { AUTH_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    if (token) {
      deleteSession(token)
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully.' })

    response.cookies.set(AUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error: any) {
    console.error('[AURA Auth Logout] Error:', error)
    return NextResponse.json({ success: true })
  }
}
