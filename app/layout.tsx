import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const interFont = localFont({
  src: '../public/fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Elite Trading Hub — Decision-grade market intelligence',
  description: 'A premium market intelligence platform for Indian traders seeking structured analysis, quantified risk and better decisions.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090e13',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${interFont.variable} ${interFont.className}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
