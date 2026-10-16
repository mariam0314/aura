import { NextResponse } from 'next/server'
import { getLatestActiveOtp, incrementOtpAttempts, markOtpUsed } from '@/lib/db'
import { hashOtp, signSessionToken } from '@/lib/auth'

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

    const activeOtp = getLatestActiveOtp(email, 'forgot_password')
    if (!activeOtp) {
      return NextResponse.json(
        { error: 'No active verification code found. Please request a new code.' },
        { status: 404 }
      )
    }

    // Check expiration
    if (Date.now() > activeOtp.expires_at) {
      markOtpUsed(activeOtp.id)
      return NextResponse.json(
        { error: 'This verification code has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check attempt limit
    const attempts = incrementOtpAttempts(activeOtp.id)
    if (attempts > 5) {
      markOtpUsed(activeOtp.id)
      return NextResponse.json(
        { error: 'Too many incorrect attempts. For your security, this code has been invalidated. Please request a new code.' },
        { status: 429 }
      )
    }

    // Compare hash
    const inputHash = hashOtp(otp)
    if (inputHash !== activeOtp.otp_hash) {
      const remaining = Math.max(0, 5 - attempts)
      return NextResponse.json(
        { error: `Invalid verification code. (${remaining} attempts remaining)` },
        { status: 400 }
      )
    }

    // OTP is valid! Mark as used to guarantee one-time use
    markOtpUsed(activeOtp.id)

    // Issue short-lived password reset authorization token (15 mins)
    const resetToken = await signSessionToken({
      userId: `reset_${activeOtp.id}`,
      email,
      exp: Date.now() + 15 * 60 * 1000,
    })

    return NextResponse.json({
      success: true,
      message: 'Verification successful. You can now reset your password.',
      resetToken,
    })
  } catch (error: any) {
    console.error('[AURA Auth Verify-OTP] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while verifying the code.' },
      { status: 500 }
    )
  }
}
