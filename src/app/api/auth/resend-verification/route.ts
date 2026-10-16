import { NextResponse } from 'next/server'
import { getUserByEmail, createOtp } from '@/lib/db'
import { generateOtpCode, hashOtp } from '@/lib/auth'
import { sendEmailVerificationOtp } from '@/lib/email-service'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
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

    if (user.email_verified === 1) {
      return NextResponse.json(
        { message: 'This email is already verified. You can sign in directly.', alreadyVerified: true },
        { status: 200 }
      )
    }

    // Generate fresh 6-digit OTP
    const otpCode = generateOtpCode()
    const otpHash = hashOtp(otpCode)
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    createOtp(email, otpHash, expiresAt, 'email_verification')

    const emailResult = await sendEmailVerificationOtp(email, otpCode, user.name)

    return NextResponse.json({
      success: true,
      message: emailResult.success
        ? 'A new 6-digit verification code has been dispatched to your email address.'
        : `Email delivery status: ${emailResult.error}`,
      emailDelivered: emailResult.success,
      emailError: emailResult.error,
    })
  } catch (error: any) {
    console.error('[AURA Resend Verification] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while resending the code.' },
      { status: 500 }
    )
  }
}
