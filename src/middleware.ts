import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken, AUTH_COOKIE_NAME } from '@/lib/session-token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static files, Next.js internal files, VRM assets, images, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/vrm') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Public API endpoints (Auth, TTS audio stream, AI mentor engine)
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/tts') ||
    pathname.startsWith('/api/ai')
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const session = token ? await verifySessionToken(token) : null
  const isAuthenticated = !!session

  // Protected API routes: return JSON 401 instead of HTML redirect
  if (pathname.startsWith('/api/')) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    return NextResponse.next()
  }

  // Public auth pages: /login, /signup, /verify-email, /forgot-password, /reset-password
  const isPublicAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/verify-email' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password'

  // If not authenticated and trying to access protected pages (including root /):
  if (!isAuthenticated && !isPublicAuthPage) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If already authenticated and trying to visit login/signup/auth pages or root /:
  if (isAuthenticated && (isPublicAuthPage || pathname === '/')) {
    const homeUrl = new URL('/home', request.url)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
