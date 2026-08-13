import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import localFont from 'next/font/local'

const interFont = localFont({
  src: [
    {
      path: '../public/fonts/static/Inter_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/Inter_28pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/Inter_28pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/Inter_28pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/Inter_28pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://elite-tradinghub.com'),
  title: {
    default: 'Elite Trading Hub — Decision-Grade Market Intelligence',
    template: '%s | Elite Trading Hub',
  },
  description: 'Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow, algorithmic risk analytics, and real-time execution signals.',
  applicationName: 'Elite Trading Hub',
  authors: [{ name: 'Elite Trading Hub', url: 'https://elite-tradinghub.com' }],
  generator: 'Elite Trading Hub System',
  keywords: [
    'NIFTY 50',
    'BANK NIFTY',
    'SENSEX',
    'Options Flow',
    'Market Intelligence',
    'Institutional Trading',
    'Quant Trading',
    'Algorithmic Trading',
    'NSE India',
    'Option Chain Analysis'
  ],
  icons: {
    icon: [
      { url: '/only-bull-head-icon.png', type: 'image/png' },
      { url: '/only-bull-head-icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/only-bull-head-icon.png',
    apple: '/only-bull-head-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Elite Trading Hub — Decision-Grade Market Intelligence',
    description: 'Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow & real-time execution signals.',
    url: 'https://elite-tradinghub.com',
    siteName: 'Elite Trading Hub',
    images: [
      {
        url: 'https://elite-tradinghub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elite Trading Hub — Decision-Grade Market Intelligence',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Trading Hub — Decision-Grade Market Intelligence',
    description: 'Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders.',
    site: '@EliteTradingHub',
    creator: '@EliteTradingHub',
    images: ['https://elite-tradinghub.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
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
