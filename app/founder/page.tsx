import type { Metadata } from 'next'
import FounderPageClient from '@/components/founder/FounderPageClient'

export const metadata: Metadata = {
  title: 'Meet the Founders — DEILA',
  description:
    'Amb. Dr. Alege Moses Dayo — Leadership Trainer, Author, Serial Entrepreneur, Strategic Thinker, and Founder of DEILA. Developing Minds. Building Enterprises. Transforming Institutions. Influencing Generations.',
  openGraph: {
    title: 'Meet the Founders — DEILA',
    description:
      'Amb. Dr. Alege Moses Dayo — Leadership Trainer, Author, Serial Entrepreneur, Strategic Thinker, and Founder of DEILA.',
    images: [{ url: '/founder-md.jpg', width: 735, height: 980 }],
  },
}

export default function FounderPage() {
  return <FounderPageClient />
}
