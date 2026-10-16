import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { AuthProvider } from '@/context/AuthContext'
import { LearningProvider } from '@/context/LearningContext'
import CustomCursor from '@/components/ui/CustomCursor'
import SpatialEnvironment from '@/components/ui/SpatialEnvironment'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AURA — AI-Powered Adaptive Learning & Skill Gap Analysis Platform',
  description: 'Aura understands what you know, identifies what you are missing, adapts how it teaches you, measures your improvement, and decides what you should learn next.',
  icons: {
    icon: '/aura-logo.png',
    apple: '/aura-logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#00171F' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--aura-bg)] text-[var(--aura-text)] antialiased font-sans flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <LearningProvider>
              <SpatialEnvironment />
              <CustomCursor />
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </LearningProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
