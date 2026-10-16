import { NextResponse } from 'next/server'
import { getUserByEmail, updateUserPassword } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()
    const newPassword = body.newPassword || ''

    if (!email) {
      return NextResponse.json(
        { error: 'Please provide your registered email address.' },
        { status: 400 }
      )
    }

    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email address. Please check and try again.' },
        { status: 404 }
      )
    }

    // If newPassword is provided directly, update password without OTP
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        )
      }
      const newHash = await hashPassword(newPassword)
      updateUserPassword(email, newHash)
      return NextResponse.json({
        success: true,
        message: 'Password has been updated successfully! Please sign in with your new password.',
      })
    }

    // Otherwise confirm that the account exists and allow setting a new password
    return NextResponse.json({
      success: true,
      message: 'Account verified. You can now set your new password.',
      email: user.email,
    })
  } catch (error: any) {
    console.error('[AURA Auth Forgot-Password] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
