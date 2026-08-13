import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AURA — Universal AI Learning Companion & Adaptive Education Platform',
  description: 'AI-driven personalized learning with character-driven persona mentor, multi-language speech, and cognitive progress tracking.',
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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--aura-bg)] text-[var(--aura-text)] antialiased font-sans flex flex-col">
        <LanguageProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
