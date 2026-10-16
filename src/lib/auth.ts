import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'

export * from './session-token'

// Password helpers (Node.js runtime only)
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// OTP helpers (Node.js runtime only)
export function generateOtpCode(): string {
  // Cryptographically secure 6-digit numeric OTP
  return crypto.randomInt(100000, 999999).toString()
}

export function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp.trim()).digest('hex')
}
