import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/shared/Navbar'
import Providers from '@/lib/Providers'

// ── Font ─────────────────────────────────────────────────────────────────────
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
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

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  telephone: ['+977-071-591633', '+977-985-6025633'],
  email: 'info@bodhimontessori.edu.np',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'LCM-10, Lumbini Bazar',
    addressLocality: 'Rupandehi',
    addressRegion: 'Lumbini Province',
    addressCountry: 'NP',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '27.5291',
    longitude: '83.4505',
  },
  sameAs: [
    'https://facebook.com/bodhimontessori',
    'https://youtube.com/@bodhimontessori',
    'https://instagram.com/bodhimontessori',
  ],
  openingHours: 'Mo-Fr 09:00-16:00',
  foundingDate: '2010',
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
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/icons/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased min-h-screen bg-white text-gray-900`}
      >
        <Providers>
          <Navbar />

          {/* ── Page Content ── */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}