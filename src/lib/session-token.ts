export const AUTH_COOKIE_NAME = 'aura_session'
const AUTH_SECRET = process.env.AUTH_SECRET || 'aura-ai-futuristic-super-secure-key-2026-xyz'

// Web Crypto API HMAC SHA-256 token signing (Edge & Node compatible)
function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4 !== 0) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export interface SessionTokenPayload {
  userId: string
  email: string
  exp: number
  iat: number
}

export async function signSessionToken(
  payload: Omit<SessionTokenPayload, 'iat'>,
  secret: string = AUTH_SECRET
): Promise<string> {
  const enc = new TextEncoder()
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const fullPayload: SessionTokenPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
  }
  const header = bytesToBase64Url(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const body = bytesToBase64Url(enc.encode(JSON.stringify(fullPayload)))
  const dataToSign = `${header}.${body}`
  const signature = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(dataToSign))
  const sigB64 = bytesToBase64Url(new Uint8Array(signature))
  return `${dataToSign}.${sigB64}`
}

export async function verifySessionToken(
  token: string,
  secret: string = AUTH_SECRET
): Promise<SessionTokenPayload | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, body, sig] = parts
    const enc = new TextEncoder()
    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    const dataToVerify = `${header}.${body}`
    const sigBytes = base64UrlToBytes(sig)
    const isValid = await globalThis.crypto.subtle.verify('HMAC', key, sigBytes as unknown as BufferSource, enc.encode(dataToVerify))
    if (!isValid) return null

    const dec = new TextDecoder()
    const payload: SessionTokenPayload = JSON.parse(dec.decode(base64UrlToBytes(body)))
    if (payload.exp && Date.now() > payload.exp) return null
    return payload
  } catch {
    return null
  }
}
