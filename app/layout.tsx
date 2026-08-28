export const dynamic = 'force-dynamic'

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
  verification: {
    google: 'HKqgjze8W-QJ5QabDBBhTHaC3JrRDi_xg5_u2Fb5WyU',
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
        <meta name="google-site-verification" content="HKqgjze8W-QJ5QabDBBhTHaC3JrRDi_xg5_u2Fb5WyU" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Next-generation quantitative market intelligence for NIFTY 50, BANK NIFTY & SENSEX traders. Institutional options flow & real-time risk analytics." />
        <meta name="developer" content="made by opendev-labs" />
        <meta name="author" content="opendev-labs.com" />
        <meta name="copyright" content="made by opendev-labs" />
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
        <link rel="icon" href="/apple-touch-icon.png?v=25" />

        {/* JSON-LD Structured Data Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                'name': 'Elite Trading Hub',
                'url': 'https://elite-tradinghub.com',
                'logo': 'https://elite-tradinghub.com/only-bull-head-icon.png',
                'sameAs': [
                  'https://t.me/+la1ShIiNHJ5mYzk1',
                  'https://twitter.com/EliteTradingHub'
                ],
                'description': 'Quantitative market intelligence and decision-grade options flow analytics for Indian market traders.'
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                'name': 'Elite Trading Hub',
                'url': 'https://elite-tradinghub.com',
                'potentialAction': {
                  '@type': 'SearchAction',
                  'target': 'https://elite-tradinghub.com/admin?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FinancialService',
                'name': 'Elite Trading Hub Portfolio Management Service',
                'url': 'https://elite-tradinghub.com/portfolio-management',
                'areaServed': 'IN',
                'serviceType': 'Personalized Portfolio Management & Quantitative Risk Analytics',
                'description': 'Customized investment approach based on client objectives and risk profile, market research & analysis, risk management, and transparent performance reporting aligned with SEBI framework.'
              },
              {
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                'name': 'Elite Trading Hub Free Knowledge',
                'url': 'https://elite-tradinghub.com/knowledge',
                'description': 'Free trading and investment education covering Technical Analysis, Fundamental Analysis, Chart Patterns, Market Trends, Risk/Reward Concepts, Position Sizing, Trading Psychology, and Portfolio Management.'
              }
            ])
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L5J86Q4T62"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-L5J86Q4T62', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Secret Developer Console Watermark */}
        <Script id="opendev-developer-watermark" strategy="afterInteractive">
          {`
            try {
              console.log(
                "%c⚡ website built by opendev-labs %copendev-labs.com",
                "color: #26d98a; background: #0c1716; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px; border: 1px solid #20342f;",
                "color: #9caab3; background: #121c24; font-size: 11px; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid #20342f; border-left: none;"
              );
            } catch(e) {}
          `}
        </Script>
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
