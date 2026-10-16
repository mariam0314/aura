import { NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = (body.name || '').trim()
    const email = (body.email || '').trim().toLowerCase()
    const password = body.password || ''
    const selectedLanguage = body.selectedLanguage || 'en'
    const englishMode = body.englishMode || 'genz'
    const role = body.role || 'student'

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      )
    }

    const existingUser = getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in.' },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)
    createUser({
      name,
      email,
      passwordHash,
      emailVerified: true,
      selectedLanguage,
      englishMode,
      role,
    })

    return NextResponse.json({
      success: true,
      email,
      message: 'Account created successfully! Please sign in with your email and password.',
    })
  } catch (error: any) {
    console.error('[AURA Auth Signup] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during account creation.' },
      { status: 500 }
    )
  }
}
