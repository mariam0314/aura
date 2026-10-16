import { NextResponse } from 'next/server'
import { updateUserPassword, getUserByEmail } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()
    const newPassword = body.newPassword || ''

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required.' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
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

    const newHash = await hashPassword(newPassword)
    const updated = updateUserPassword(email, newHash)

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update password. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
    })
  } catch (error: any) {
    console.error('[AURA Auth Reset-Password] Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while resetting your password.' },
      { status: 500 }
    )
  }
}
