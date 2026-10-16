import nodemailer from 'nodemailer'

export interface SendOtpResult {
  success: boolean
  messageId?: string
  error?: string
}

function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const user = process.env.SMTP_USER || process.env.GMAIL_USER
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })
  }

  return null
}

async function sendViaResend(toEmail: string, subject: string, htmlContent: string): Promise<SendOtpResult | null> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null

  try {
    const fromAddress = process.env.SMTP_FROM || 'AURA AI <onboarding@resend.dev>'
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toEmail],
        subject,
        html: htmlContent,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, messageId: data.id }
    }
    const errData = await res.json().catch(() => ({}))
    return { success: false, error: errData.message || 'Resend API dispatch failed' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Resend API error' }
  }
}

async function sendViaBrevo(toEmail: string, subject: string, htmlContent: string): Promise<SendOtpResult | null> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return null

  try {
    const fromEmail = process.env.SMTP_USER || process.env.SMTP_FROM || 'noreply@aura.ai'
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'AURA AI Platform', email: fromEmail },
        to: [{ email: toEmail }],
        subject,
        htmlContent,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, messageId: data.messageId }
    }
    const errData = await res.json().catch(() => ({}))
    return { success: false, error: errData.message || 'Brevo API dispatch failed' }
  } catch (err: any) {
    return { success: false, error: err?.message || 'Brevo API error' }
  }
}

/**
 * 1. Send Email Verification OTP for New Account Registration
 */
export async function sendEmailVerificationOtp(
  toEmail: string,
  otpCode: string,
  userName?: string
): Promise<SendOtpResult> {
  const subject = 'Your AURA AI Email Verification Code'
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email — AURA AI</title>
      <style>
        body { margin: 0; padding: 0; background-color: #020b10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #F6F8F9; }
        .container { max-width: 540px; margin: 40px auto; background-color: #03151D; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 18, 23, 0.8); }
        .logo { font-size: 28px; font-weight: 900; letter-spacing: 0.25em; color: #10B981; text-align: center; margin-bottom: 24px; }
        .badge { display: inline-block; padding: 4px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 999px; color: #35C88A; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        h1 { font-size: 22px; font-weight: 800; color: #FFFFFF; margin-top: 0; margin-bottom: 12px; text-align: center; }
        p { font-size: 14px; line-height: 1.6; color: #94A3B8; margin-bottom: 20px; }
        .code-box { background: rgba(0, 23, 31, 0.85); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; padding: 24px; text-align: center; margin: 28px 0; }
        .code { font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 900; letter-spacing: 0.35em; color: #35C88A; }
        .expiry { font-size: 12px; color: #F59E0B; margin-top: 10px; font-weight: 600; }
        .footer { font-size: 12px; color: #64748B; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">AURA AI</div>
        <div style="text-align: center;">
          <span class="badge">Account Verification</span>
        </div>
        <h1>Welcome to AURA AI${userName ? `, ${userName}` : ''}!</h1>
        <p>Thank you for creating your account. Please enter the 6-digit confirmation code below to verify your email address (<strong>${toEmail}</strong>) and activate your 3D AI Mentor:</p>
        <div class="code-box">
          <div class="code">${otpCode}</div>
          <div class="expiry">Expires in 10 minutes • One-time use only</div>
        </div>
        <p style="font-size: 13px;">If you did not register for an AURA AI account, please disregard this email. Your email address will not be used without verification.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} AURA AI Adaptive Learning Platform. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `

  return dispatchEmail(toEmail, subject, htmlContent)
}

/**
 * 2. Send Password Reset OTP
 */
export async function sendPasswordResetOtp(toEmail: string, otpCode: string): Promise<SendOtpResult> {
  const subject = 'Your AURA AI Password Reset Verification Code'
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AURA AI Password Reset Code</title>
      <style>
        body { margin: 0; padding: 0; background-color: #020b10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #F6F8F9; }
        .container { max-width: 540px; margin: 40px auto; background-color: #03151D; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(0, 18, 23, 0.8); }
        .logo { font-size: 28px; font-weight: 900; letter-spacing: 0.25em; color: #10B981; text-align: center; margin-bottom: 24px; }
        .badge { display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 999px; color: #35C88A; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        h1 { font-size: 22px; font-weight: 800; color: #FFFFFF; margin-top: 0; margin-bottom: 12px; }
        p { font-size: 14px; line-height: 1.6; color: #94A3B8; margin-bottom: 24px; }
        .code-box { background: rgba(0, 23, 31, 0.85); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; padding: 24px; text-align: center; margin: 30px 0; }
        .code { font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 900; letter-spacing: 0.35em; color: #35C88A; }
        .expiry { font-size: 12px; color: #F59E0B; margin-top: 10px; font-weight: 600; }
        .footer { font-size: 12px; color: #64748B; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">AURA AI</div>
        <div style="text-align: center;">
          <span class="badge">Security Verification</span>
        </div>
        <h1>Password Reset Request</h1>
        <p>We received a request to reset the password for your AURA AI account associated with <strong>${toEmail}</strong>.</p>
        <p>Use the 6-digit verification code below to complete your password reset:</p>
        <div class="code-box">
          <div class="code">${otpCode}</div>
          <div class="expiry">Expires in 10 minutes • One-time use only</div>
        </div>
        <p style="font-size: 13px;">If you did not request this password reset, please ignore this email. Your account remains completely secure.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} AURA AI Adaptive Learning Platform. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `

  return dispatchEmail(toEmail, subject, htmlContent)
}

/**
 * Backwards compatibility helper
 */
export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<SendOtpResult> {
  return sendPasswordResetOtp(toEmail, otpCode)
}

/**
 * Universal Dispatcher: tries Resend -> Brevo -> Nodemailer SMTP
 */
async function dispatchEmail(toEmail: string, subject: string, htmlContent: string): Promise<SendOtpResult> {
  const fromAddress = process.env.SMTP_FROM || '"AURA AI Platform" <noreply@aura.ai>'

  // Strategy 1: Resend HTTP API (if configured)
  const resendResult = await sendViaResend(toEmail, subject, htmlContent)
  if (resendResult) return resendResult

  // Strategy 2: Brevo HTTP API (if configured)
  const brevoResult = await sendViaBrevo(toEmail, subject, htmlContent)
  if (brevoResult) return brevoResult

  // Strategy 3: Nodemailer SMTP / Gmail
  const transporter = getTransporter()
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject,
        html: htmlContent,
      })
      console.log(`[AURA Email] Real OTP delivered to ${toEmail}. Message ID: ${info.messageId}`)
      return { success: true, messageId: info.messageId }
    } catch (smtpErr: any) {
      console.error('[AURA Email Service] SMTP delivery failed:', smtpErr)
      return {
        success: false,
        error: `SMTP delivery failed: ${smtpErr?.message || 'Check credentials in .env.local'}`,
      }
    }
  }

  // If no email delivery credentials are set:
  return {
    success: false,
    error: 'Outbound email delivery is not configured. Please add SMTP credentials (e.g. SMTP_USER and SMTP_PASS or GMAIL_APP_PASSWORD) in .env.local to deliver live emails.',
  }
}
