'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const lines = [
  ['DEVELOPING', 'PEOPLE.'],
  ['BUILDING', 'LEADERS.'],
]
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

type C = { n: number; b: number }
const show = (extra: object) => (c: C) => ({
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  ...extra,
  transition: { delay: c.b + c.n * 0.11, duration: 0.85, ease },
})
const fast = { duration: 0.3 }

// One variant per direction. Each item gets a number (n) so they appear one by one.
const v: Record<'mask' | 'left' | 'up' | 'down' | 'zoom', Variants> = {
  mask: { hidden: { y: '110%', transition: fast }, show: show({ y: 0 }) },
  left: { hidden: { opacity: 0, x: -60, transition: fast }, show: show({}) },
  up: { hidden: { opacity: 0, y: 40, transition: fast }, show: show({}) },
  down: { hidden: { opacity: 0, y: -30, transition: fast }, show: show({}) },
  zoom: { hidden: { opacity: 0, scale: 0.6, transition: fast }, show: show({}) },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Replays every time the hero comes back into view
  const inView = useInView(ref, { amount: 0.4 })
  const state = inView ? 'show' : 'hidden'

  // First play waits for the preloader (3s). Replays start almost immediately.
  const base = useRef(3)
  useEffect(() => {
    const t = setTimeout(() => {
      base.current = 0.05
    }, 4300)
    return () => clearTimeout(t)
  }, [])
  const a = (kind: keyof typeof v, n: number) => ({
    variants: v[kind],
    initial: 'hidden',
    animate: state,
    custom: { n, b: base.current } as C,
  })

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-12 md:pb-16">
      {/* The 3D DEILA logo lives in the fixed scene behind this section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Badge sits in the same container as the content so it lines up on the left */}
      <div className="pointer-events-none absolute inset-x-0 top-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            {...a('down', 0)}
            className="inline-flex items-center gap-2 rounded-2xl border border-[#D4AF37] px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-[#f0d060] sm:whitespace-nowrap sm:rounded-full sm:text-xs"
            style={{ background: 'rgba(212,175,55,0.05)' }}
          >
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#D4AF37]" />
            DASAYO Entrepreneurship Innovation Leadership Academy
          </motion.div>
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left column holds all the text. The right half is left empty for the 3D logo. */}
        <div className="grid border-t border-white/10 pt-8 lg:grid-cols-12">
          <div className="text-left lg:col-span-6">
          <h1 className="mb-6 text-4xl font-black leading-[0.95] tracking-tighter sm:text-6xl xl:text-7xl">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <span key={wi} className="mr-3 inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                    <motion.span {...a('mask', 1 + li * 2 + wi)} className={`inline-block ${li === 1 ? 'text-gradient' : 'text-white'}`}>
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div>
            <motion.p {...a('left', 5)} className="mb-7 max-w-xl text-md leading-relaxed text-white/90 sm:text-md">
              Inspiring Innovation. Creating Impact. We bridge the gap between knowledge and practical application —
              turning potential into lasting societal impact.
            </motion.p>
            <div className="flex flex-wrap items-center gap-3">
              <motion.div {...a('zoom', 6)}>
                <motion.a
                  href="#join"
                  className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold tracking-wide text-black transition-colors duration-300 hover:bg-[#F0D060]"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join the Movement <ArrowRight size={16} />
                </motion.a>
              </motion.div>
              <motion.div {...a('zoom', 7)}>
                <motion.a
                  href="#about"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={14} className="fill-current" /> Explore DEILA
                </motion.a>
              </motion.div>
            </div>
          </div>
          </div>
        </div>

        <motion.div
          {...a('up', 8)}
          className="mt-10 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/30"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-8 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)' }}
          />
          <span>01 / 08</span>
        </motion.div>
      </motion.div>
    </section>
  )
}