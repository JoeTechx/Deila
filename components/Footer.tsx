'use client'

import { useRef } from 'react'
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
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0.2, 1], ['70%', '0%'])

  // The Join section is pinned (sticky) under the footer, so jump to the start of the finale instead.
  const goJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    const finale = document.getElementById('finale')
    if (finale) window.scrollTo({ top: finale.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })
  }

  return (
    <footer
      ref={ref}
      className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden border-t border-[#D4AF37]/25 shadow-[0_-40px_120px_rgba(0,0,0,0.95)]"
      style={{ background: '#0a0a0a' }}
    >
      {/* Gold edge light along the top of the curtain */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F0D060] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#D4AF37]/[0.08] to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pt-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-5">
          {/* Brand column: logo zooms in, text slides in from the left, socials pop one by one */}
          <div className="lg:col-span-2">
            <Reveal from="zoom" duration={0.9}>
              <a href="#home" className="mb-4 inline-block text-3xl font-black tracking-tighter text-white">
                DE<span className="text-gradient">ILA</span>
              </a>
            </Reveal>
            <Reveal from="left" delay={0.12} distance={60}>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/40">
                DASAYO Entrepreneurship Innovation Leadership Academy. Developing People. Building Leaders. Inspiring
                Innovation. Creating Impact.
              </p>
            </Reveal>
            <Reveal from="left" delay={0.24} distance={60}>
              <p className="text-xs font-medium italic leading-relaxed text-[#D4AF37]/60">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors duration-300 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]"
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
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white">{col.title}</h4>
              </Reveal>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={link.label}>
                    <Reveal from={col.from} delay={ci * 0.15 + 0.1 + li * 0.09} distance={40} amount={0.5}>
                      <a
                        href={link.href}
                        onClick={link.href === '#join' ? goJoin : undefined}
                        className="group flex items-center gap-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <Reveal from="left" distance={50} amount={0.5}>
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} DEILA — DASAYO Entrepreneurship Innovation Leadership Academy. All rights reserved.
            </p>
          </Reveal>
          <div className="flex items-center gap-6">
            <Reveal from="up" delay={0.1} distance={25} amount={0.5}>
              <a href="#" className="text-xs text-white/25 transition-colors hover:text-white/50">Privacy Policy</a>
            </Reveal>
            <Reveal from="up" delay={0.2} distance={25} amount={0.5}>
              <a href="#" className="text-xs text-white/25 transition-colors hover:text-white/50">Terms of Use</a>
            </Reveal>
            <Reveal from="zoom" delay={0.3} amount={0.5}>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
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
          style={{
            y: wordY,
            backgroundImage:
              'linear-gradient(110deg, #B8961E 30%, #F0D060 42%, #ffffff 50%, #F0D060 58%, #B8961E 70%)',
            backgroundSize: '250% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{ backgroundPosition: ['150% 0', '-50% 0'] }}
          transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
          className="text-center text-[27vw] font-black leading-[0.8] tracking-tighter"
        >
          DEILA
        </motion.div>
      </div>
    </footer>
  )
}