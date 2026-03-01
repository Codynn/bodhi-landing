import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Providers from '@/lib/Providers'
import Navbar from '@/components/shared/navbar/Navbar'
import Footer from '@/components/shared/Footer'

// ── Font ─────────────────────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

// ── Site Config ───────────────────────────────────────────────────────────────
const siteConfig = {
  name: 'Bodhi International Montessori School',
  shortName: 'Bodhi Montessori',
  description:
    'Bodhi International Montessori School — Shaping confident learners for a better tomorrow. Nurturing young minds through Montessori education in Lumbini Bazar, Rupandehi, Nepal.',
  url: 'https://www.bodhimontessori.edu.np',
  ogImage: '/images/og-image.png',
  keywords: [
    'Bodhi International Montessori School',
    'Montessori school Nepal',
    'best school Rupandehi',
    'Lumbini Bazar school',
    'Montessori education Nepal',
    'preschool Nepal',
    'primary school Rupandehi',
    'admission open 2025',
    'quality education Nepal',
    'bodhi school',
  ],
  locale: 'en_NP',
  twitter: '@bodhimontessori',
  themeColor: '#C0392B',
}



// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Shaping Confident Learners`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
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
  icons: {
    icon: [
      { url: '/home/logo.svg', sizes: '16x16', type: 'image/png' },
      { url: '/home/logo.svg', sizes: '32x32', type: 'image/png' },
      { url: '/home/logo.svg', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/home/logo.svg', sizes: '180x180' }],
    shortcut: '/home/logo.svg',
  },
 
  formatDetection: { telephone: false, email: false, address: false },
  applicationName: siteConfig.shortName,
  category: 'education',
}

// ── Viewport ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: siteConfig.themeColor },
    { media: '(prefers-color-scheme: dark)', color: siteConfig.themeColor },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`font-outfit min-h-screen bg-white text-gray-900`}
      >
        <Providers>
          <Navbar />

          {/* ── Page Content ── */}
          <main className='flex-1'>{children}</main>
        </Providers>

         <Footer/>
      </body>
    </html>
  )
}