import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { AuthProvider } from '@/components/auth-provider'

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
      { url: '/apple-touch-icon.png?v=25', type: 'image/png' },
      { url: '/apple-touch-icon.png?v=25', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/apple-touch-icon.png?v=25',
    apple: '/apple-touch-icon.png?v=25',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Elite Trading Hub — Decision-Grade Market Intelligence',
    description: 'Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow & real-time risk analytics.',
    url: 'https://elite-tradinghub.com',
    siteName: 'Elite Trading Hub',
    images: [
      {
        url: 'https://elite-tradinghub.com/og-image.png?v=26',
        secureUrl: 'https://elite-tradinghub.com/og-image.png?v=26',
        width: 1200,
        height: 630,
        alt: 'Elite Trading Hub — Decision-Grade Market Intelligence',
        type: 'image/png',
      },
      {
        url: 'https://elite-tradinghub.com/square-og-logo.png?v=25',
        secureUrl: 'https://elite-tradinghub.com/square-og-logo.png?v=25',
        width: 600,
        height: 600,
        alt: 'Elite Trading Hub',
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
    images: ['https://elite-tradinghub.com/og-image.png?v=26'],
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Elite Trading Hub — Decision-Grade Market Intelligence</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow & real-time risk analytics." />
        <meta property="og:title" content="Elite Trading Hub — Decision-Grade Market Intelligence" />
        <meta property="og:description" content="Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow & real-time risk analytics." />
        <meta property="og:url" content="https://elite-tradinghub.com" />
        <meta property="og:site_name" content="Elite Trading Hub" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elite-tradinghub.com/og-image.png?v=26" />
        <meta property="og:image:secure_url" content="https://elite-tradinghub.com/og-image.png?v=26" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Elite Trading Hub — Decision-Grade Market Intelligence" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elite Trading Hub — Decision-Grade Market Intelligence" />
        <meta name="twitter:description" content="Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders." />
        <meta name="twitter:image" content="https://elite-tradinghub.com/og-image.png?v=26" />
        <meta itemProp="image" content="https://elite-tradinghub.com/og-image.png?v=26" />
        <link rel="image_src" href="https://elite-tradinghub.com/og-image.png?v=26" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=25" />
        <link rel="icon" href="/apple-touch-icon.png?v=25" />
      </head>
      <body className={`${interFont.variable} ${interFont.className}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
