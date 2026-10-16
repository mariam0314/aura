import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import fs from 'node:fs'
import bcrypt from 'bcryptjs'

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = process.env.DATABASE_PATH || path.join(dataDir, 'aura.sqlite')

// Initialize SQLite database
let dbInstance: DatabaseSync | null = null

export function getDatabase(): DatabaseSync {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(dbPath)
    initSchema(dbInstance)
  }
  return dbInstance
}

function initSchema(db: DatabaseSync): void {
  // 1. Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email_verified INTEGER NOT NULL DEFAULT 0,
      selected_language TEXT NOT NULL DEFAULT 'en',
      english_mode TEXT DEFAULT 'genz',
      role TEXT DEFAULT 'student',
      preferences_json TEXT DEFAULT '{}',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `)

  try {
    db.exec(`ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0;`)
  } catch {}

  // 2. OTPs table for Email Verification & Forgot Password
  db.exec(`
    CREATE TABLE IF NOT EXISTS otps (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      otp_hash TEXT NOT NULL,
      purpose TEXT NOT NULL DEFAULT 'forgot_password',
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      used INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );
  `)

  try {
    db.exec(`ALTER TABLE otps ADD COLUMN purpose TEXT NOT NULL DEFAULT 'forgot_password';`)
  } catch {}

  // 3. Sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );
  `)

  // Create indexes for optimal lookup speed
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(email);
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
  `)

  // Seed default demo user if table is empty
  seedDefaultUser(db)
}

function seedDefaultUser(db: DatabaseSync): void {
  try {
    const query = db.prepare('SELECT COUNT(*) as count FROM users')
    const row = query.get() as { count: number } | undefined
    if (!row || row.count === 0) {
      const defaultSalt = bcrypt.genSaltSync(10)
      const defaultHash = bcrypt.hashSync('Aura@2026!', defaultSalt)
      const now = new Date().toISOString()
      
      const insert = db.prepare(`
        INSERT INTO users (id, name, email, password_hash, email_verified, selected_language, english_mode, role, preferences_json, created_at, updated_at)
        VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
      `)
      
      insert.run(
        'usr_demo_01',
        'Aarav Sharma',
        'student@aura.ai',
        defaultHash,
        'en',
        'genz',
        'student',
        JSON.stringify({ autoSpeech: true, soundEnabled: true }),
        now,
        now
      )
      console.log('[AURA DB] Seeded default demo account: student@aura.ai')
    } else {
      // Ensure all accounts are verified
      try {
        db.exec("UPDATE users SET email_verified = 1;")
      } catch {}
    }
  } catch (err) {
    console.error('[AURA DB] Seeding error:', err)
  }
}

export interface UserRecord {
  id: string
  name: string
  email: string
  password_hash: string
  email_verified: number
  selected_language: string
  english_mode: string | null
  role: string
  preferences_json: string
  created_at: string
  updated_at: string
}

export interface OtpRecord {
  id: string
  email: string
  otp_hash: string
  purpose: string
  expires_at: number
  attempts: number
  used: number
  created_at: number
}

export interface SessionRecord {
  id: string
  user_id: string
  token: string
  expires_at: number
  created_at: number
}

// User operations
export function getUserByEmail(email: string): UserRecord | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1')
  const user = stmt.get(email.trim().toLowerCase()) as unknown as UserRecord | undefined
  return user || null
}

export function getUserById(id: string): UserRecord | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM users WHERE id = ? LIMIT 1')
  const user = stmt.get(id) as unknown as UserRecord | undefined
  return user || null
}

export function createUser(data: {
  name: string
  email: string
  passwordHash: string
  emailVerified?: boolean
  selectedLanguage?: string
  englishMode?: string
  role?: string
}): UserRecord {
  const db = getDatabase()
  const now = new Date().toISOString()
  const id = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6)
  const lang = data.selectedLanguage || 'en'
  const mode = data.englishMode || 'genz'
  const role = data.role || 'student'
  const verified = data.emailVerified === false ? 0 : 1

  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, email_verified, selected_language, english_mode, role, preferences_json, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  stmt.run(
    id,
    data.name.trim(),
    data.email.trim().toLowerCase(),
    data.passwordHash,
    verified,
    lang,
    mode,
    role,
    JSON.stringify({ autoSpeech: true }),
    now,
    now
  )

  return getUserById(id)!
}

export function verifyUserEmail(email: string): boolean {
  const db = getDatabase()
  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE users 
    SET email_verified = 1, updated_at = ? 
    WHERE LOWER(email) = LOWER(?)
  `)
  const info = stmt.run(now, email.trim().toLowerCase())
  return (info as any).changes > 0
}

export function updateUserPassword(email: string, newPasswordHash: string): boolean {
  const db = getDatabase()
  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE users 
    SET password_hash = ?, updated_at = ? 
    WHERE LOWER(email) = LOWER(?)
  `)
  const info = stmt.run(newPasswordHash, now, email.trim().toLowerCase())
  return (info as any).changes > 0
}

export function updateUserLanguage(
  userId: string,
  selectedLanguage: string,
  englishMode?: string
): boolean {
  const db = getDatabase()
  const now = new Date().toISOString()
  const stmt = db.prepare(`
    UPDATE users 
    SET selected_language = ?, english_mode = COALESCE(?, english_mode), updated_at = ? 
    WHERE id = ?
  `)
  const info = stmt.run(selectedLanguage, englishMode || null, now, userId)
  return (info as any).changes > 0
}

// OTP operations
export function createOtp(
  email: string,
  otpHash: string,
  expiresAt: number,
  purpose: string = 'forgot_password'
): OtpRecord {
  const db = getDatabase()
  const id = 'otp_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6)
  const now = Date.now()

  // Mark all previous unexpired OTPs for this email and purpose as used
  const cancelOld = db.prepare('UPDATE otps SET used = 1 WHERE LOWER(email) = LOWER(?) AND purpose = ? AND used = 0')
  cancelOld.run(email.trim().toLowerCase(), purpose)

  const stmt = db.prepare(`
    INSERT INTO otps (id, email, otp_hash, purpose, expires_at, attempts, used, created_at)
    VALUES (?, ?, ?, ?, ?, 0, 0, ?)
  `)
  stmt.run(id, email.trim().toLowerCase(), otpHash, purpose, expiresAt, now)

  const getStmt = db.prepare('SELECT * FROM otps WHERE id = ?')
  return (getStmt.get(id) as unknown) as OtpRecord
}

export function getLatestActiveOtp(email: string, purpose: string = 'forgot_password'): OtpRecord | null {
  const db = getDatabase()
  const stmt = db.prepare(`
    SELECT * FROM otps 
    WHERE LOWER(email) = LOWER(?) AND purpose = ? AND used = 0 
    ORDER BY created_at DESC 
    LIMIT 1
  `)
  const otp = (stmt.get(email.trim().toLowerCase(), purpose) as unknown) as OtpRecord | undefined
  return otp || null
}

export function incrementOtpAttempts(id: string): number {
  const db = getDatabase()
  const stmt = db.prepare('UPDATE otps SET attempts = attempts + 1 WHERE id = ?')
  stmt.run(id)

  const getStmt = db.prepare('SELECT attempts FROM otps WHERE id = ?')
  const row = (getStmt.get(id) as unknown) as { attempts: number } | undefined
  return row ? row.attempts : 0
}

export function markOtpUsed(id: string): void {
  const db = getDatabase()
  const stmt = db.prepare('UPDATE otps SET used = 1 WHERE id = ?')
  stmt.run(id)
}

// Session operations
export function createSession(userId: string, token: string, expiresAt: number): SessionRecord {
  const db = getDatabase()
  const id = 'sess_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6)
  const now = Date.now()

  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `)
  stmt.run(id, userId, token, expiresAt, now)

  const getStmt = db.prepare('SELECT * FROM sessions WHERE id = ?')
  return (getStmt.get(id) as unknown) as SessionRecord
}

export function getSessionByToken(token: string): SessionRecord | null {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM sessions WHERE token = ? AND expires_at > ? LIMIT 1')
  const session = (stmt.get(token, Date.now()) as unknown) as SessionRecord | undefined
  return session || null
}

export function deleteSession(token: string): void {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM sessions WHERE token = ?')
  stmt.run(token)
}

export function deleteExpiredSessions(): void {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM sessions WHERE expires_at <= ?')
  stmt.run(Date.now())
}
