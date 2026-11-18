'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { XIcon, Mail, ArrowUpRight, ArrowUp, Link2 } from 'lucide-react'
import Reveal, { type RevealFrom } from './Reveal'

const footerLinks: { title: string; from: RevealFrom; links: { label: string; href: string }[] }[] = [
  {
    title: 'Organisation',
    from: 'left',
    links: [
      { label: 'About DEILA', href: '#about' },
      { label: 'Vision & Mission', href: '#vision' },
      { label: 'Our Philosophy', href: '#philosophy' },
      { label: 'Our Approach', href: '#approach' },
      { label: 'Meet the Founders', href: '/founder' },
    ],
  },
  {
    title: 'Programs',
    from: 'up',
    links: [
      { label: 'Leadership Development', href: '#whatwedo' },
      { label: 'Entrepreneurship', href: '#whatwedo' },
      { label: 'Mentorship', href: '#whatwedo' },
      { label: 'Digital Learning', href: '#whatwedo' },
    ],
  },
  {
    title: 'Get Involved',
    from: 'right',
    links: [
      { label: 'Join the Movement', href: '#join' },
      { label: 'Become a Mentor', href: '#join' },
      { label: 'Partner with Us', href: '#join' },
      { label: 'Volunteer', href: '#join' },
    ],
  },
]

const socials = [
  { icon: XIcon, href: '#', label: 'X (Twitter)' },
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: Link2, href: '#', label: 'Instagram' },
  { icon: Link2, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' },
]

/** Signature: the footer is a full-screen curtain that slides up over the pinned Join section (and the 3D logo behind it).
 *  Everything inside appears one by one, from different directions, and replays whenever you scroll in or out. */
export default function Footer() {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0.2, 1], ['70%', '0%'])

  // The Join section is pinned (sticky) under the footer, so jump to the start of the finale instead.
  const goJoin = (e: React.MouseEvent) => {
    if (pathname !== '/') return
    e.preventDefault()
    const finale = document.getElementById('finale')
    if (finale) window.scrollTo({ top: finale.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
  }

  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      return pathname === '/' ? href : `/${href}`
    }
    return href
  }

  return (
    <footer
      ref={ref}
      className="site-footer relative z-10 flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Navy edge light along the top of the curtain */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1B2854]/[0.06] to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pt-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-5">
          {/* Brand column: logo zooms in, text slides in from the left, socials pop one by one */}
          <div className="lg:col-span-2">
            <Reveal from="zoom" duration={0.9}>
              <a href={pathname === '/' ? '#home' : '/'} className="mb-4 inline-flex items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 shadow-md">
                  <Image
                    src="/deila-brand-logo.jpg"
                    alt="DEILA Logo"
                    fill
                    sizes="40px"
                    className="object-cover object-center"
                  />
                </div>
                <span className="text-2xl font-black tracking-tighter">
                  DE<span className="text-gradient">ILA</span>
                </span>
              </a>
            </Reveal>
            <Reveal from="left" delay={0.12} distance={60}>
              <p className="copy-muted mb-6 max-w-xs text-sm leading-relaxed">
                DASAYO Entrepreneurship Innovation Leadership Academy. Developing People. Building Leaders. Inspiring
                Innovation. Creating Impact.
              </p>
            </Reveal>
            <Reveal from="left" delay={0.24} distance={60}>
              <p className="copy-muted text-xs font-medium italic leading-relaxed">
                &ldquo;One Vision. Many Gifts. Multiple Functions.
                <br />
                One Movement. Limitless Impact.&rdquo;
              </p>
            </Reveal>
            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <Reveal key={label} from="zoom" delay={0.35 + i * 0.08} amount={0.5}>
                  <motion.a
                    href={href}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="footer-icon flex h-9 w-9 items-center justify-center rounded-full"
                  >
                    <Icon size={15} />
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Link columns: each column has its own direction, and its links appear one after another */}
          {footerLinks.map((col, ci) => (
            <div key={col.title}>
              <Reveal from="down" delay={ci * 0.15} distance={25}>
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest">{col.title}</h4>
              </Reveal>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={link.label}>
                    <Reveal from={col.from} delay={ci * 0.15 + 0.1 + li * 0.09} distance={40} amount={0.5}>
                      <a
                        href={getHref(link.href)}
                        onClick={pathname === '/' && link.href === '#join' ? goJoin : undefined}
                        className="footer-link group flex items-center gap-1 text-sm"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                        <ArrowUpRight size={12} className="-translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                      </a>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar: copyright slides from the left, legal links drop in, back-to-top zooms in */}
        <div className="footer-rule flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <Reveal from="left" distance={50} amount={0.5}>
            <p className="copy-dim text-xs">
              © {new Date().getFullYear()} DEILA — DASAYO Entrepreneurship Innovation Leadership Academy. All rights reserved.
            </p>
          </Reveal>
          <div className="flex items-center gap-6">
            <Reveal from="up" delay={0.1} distance={25} amount={0.5}>
              <a href="#" className="footer-legal text-xs">Privacy Policy</a>
            </Reveal>
            <Reveal from="up" delay={0.2} distance={25} amount={0.5}>
              <a href="#" className="footer-legal text-xs">Terms of Use</a>
            </Reveal>
            <Reveal from="zoom" delay={0.3} amount={0.5}>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="footer-top-btn flex h-10 w-10 items-center justify-center rounded-full"
              >
                <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                  <ArrowUp size={16} />
                </motion.span>
              </motion.button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Giant wordmark: rises with your scroll, in both directions */}
      <div className="mt-auto select-none overflow-hidden pt-6" aria-hidden>
        <motion.div
          style={{ y: wordY }}
          animate={{ backgroundPosition: ['150% 0', '-50% 0'] }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
          className="footer-wordmark text-center text-[27vw] font-black leading-[0.8] tracking-tighter"
        >
          DEILA
        </motion.div>
      </div>
    </footer>
  )
}