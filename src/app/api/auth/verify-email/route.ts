import { NextResponse } from 'next/server'
import {
  getUserByEmail,
  getLatestActiveOtp,
  incrementOtpAttempts,
  markOtpUsed,
  verifyUserEmail,
  createSession,
} from '@/lib/db'
import { hashOtp, signSessionToken, AUTH_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()
    const otp = (body.otp || '').trim()

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and 6-digit verification code are required.' },
        { status: 400 }
      )
    }

    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 404 }
      )
    }

    // Retrieve active OTP with purpose 'email_verification'
    const activeOtp = getLatestActiveOtp(email, 'email_verification')
    if (!activeOtp) {
      return NextResponse.json(
        { error: 'No active verification code found. Please request a new code.' },
        { status: 400 }
      )
    }

    // Check expiration
    if (Date.now() > activeOtp.expires_at) {
      markOtpUsed(activeOtp.id)
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      )
    }

    // Rate-limiting: lock out after 5 attempts
    if (activeOtp.attempts >= 5) {
      markOtpUsed(activeOtp.id)
      return NextResponse.json(
        { error: 'Too many incorrect attempts. For security, please request a new verification code.' },
        { status: 429 }
      )
    }

    // Check OTP hash
    const inputHash = hashOtp(otp)
    if (inputHash !== activeOtp.otp_hash) {
      const attempts = incrementOtpAttempts(activeOtp.id)
      const remaining = 5 - attempts
      return NextResponse.json(
        {
          error: `Invalid verification code. (${remaining > 0 ? `${remaining} attempts remaining` : 'No attempts remaining'})`,
        },
        { status: 400 }
      )
    }

    // OTP is valid!
    markOtpUsed(activeOtp.id)
    verifyUserEmail(email)

    // Issue authenticated session
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
      message: 'Account confirmed successfully! Welcome to AURA AI.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        selected_language: user.selected_language,
        english_mode: user.english_mode,
        role: user.role,
      },
    })

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error: any) {
    console.error('[AURA Verify Email] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred during email verification.' },
      { status: 500 }
    )
  }
}
