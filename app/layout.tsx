import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'DEILA — DASAYO Entrepreneurship Innovation Leadership Academy',
  description: 'Developing People. Building Leaders. Inspiring Innovation. Creating Impact. DEILA is a leadership, entrepreneurship, innovation, and human-capacity development institution.',
  keywords: 'leadership, entrepreneurship, innovation, mentorship, DEILA, DASAYO',
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
