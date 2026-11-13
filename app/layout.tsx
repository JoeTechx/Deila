import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Set NEXT_PUBLIC_SITE_URL in your hosting env (e.g. https://deila.org).
// Social platforms need absolute image URLs, and this is what makes them absolute.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deila.org'

const title = 'DEILA — DASAYO Entrepreneurship Innovation Leadership Academy'
const description =
  'Developing People. Building Leaders. Inspiring Innovation. Creating Impact. DEILA is a leadership, entrepreneurship, innovation, and human-capacity development institution.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: 'leadership, entrepreneurship, innovation, mentorship, DEILA, DASAYO',
  applicationName: 'DEILA',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'DEILA',
    title,
    description,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DEILA — DASAYO Entrepreneurship Innovation Leadership Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}