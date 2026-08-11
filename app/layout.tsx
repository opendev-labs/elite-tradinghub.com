import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

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
  return <html lang="en" className="dark"><body className={`${display.variable} ${mono.variable}`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
