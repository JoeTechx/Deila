'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Users, TrendingUp, Lightbulb, BookOpen, Network, Heart, Globe, type LucideIcon } from 'lucide-react'
import TiltCard from './TiltCard'
import Reveal from './Reveal'

type Area = { icon: LucideIcon; title: string; desc: string; color: string }

const areas: Area[] = [
  { icon: Users, title: 'Leadership Development', desc: 'Leadership training, development programmes, and mentorship to equip individuals with mindset, competence, and practical skills.', color: '#D4AF37' },
  { icon: TrendingUp, title: 'Entrepreneurship & Business', desc: 'Entrepreneurial thinking, business education, innovation, and enterprise development for sustainable ventures.', color: '#F59E0B' },
  { icon: Lightbulb, title: 'Innovation & Research', desc: 'Research, critical thinking, creativity, and innovative solutions to contemporary challenges.', color: '#D4AF37' },
  { icon: BookOpen, title: 'Professional Development', desc: 'Webinars, seminars, and workshops that enhance professional competence and personal effectiveness.', color: '#F59E0B' },
  { icon: Network, title: 'Mentorship & Networking', desc: 'Connecting emerging leaders with experienced professionals for meaningful collaboration and collective advancement.', color: '#D4AF37' },
  { icon: Heart, title: 'Community Development', desc: 'Medical outreach, welfare initiatives, health education, and community-oriented interventions for broader impact.', color: '#F59E0B' },
  { icon: Globe, title: 'Digital Learning', desc: 'Leveraging digital platforms to make knowledge accessible beyond physical and geographical boundaries.', color: '#D4AF37' },
]

/**
 * One card in the horizontal track. Its reveal is tied to the SIDEWAYS movement:
 * as the card slides in from the right edge of the screen, it swings in (3D) and its
 * icon, number, title and description appear one after another. Scroll back and they un-reveal.
 */
function HCard({ area, i, x, tick }: { area: Area; i: number; x: MotionValue<number>; tick: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)
  const base = useRef(0) // the card's left edge when the track is not moved (x = 0)

  useEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      base.current = el.getBoundingClientRect().left - x.get()
      tick.set(tick.get() + 1)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [x, tick])

  // 0 = card still off the right edge, 1 = card fully slid into view
  const p = useTransform([x, tick], (v: number[]) => {
    const left = base.current + v[0]
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
    return Math.min(1, Math.max(0, (vw * 0.98 - left) / (vw * 0.3)))
  })

  const cardOpacity = useTransform(p, [0, 0.35], [0, 1])
  const cardY = useTransform(p, [0, 1], [70, 0])
  const cardRotate = useTransform(p, [0, 1], [28, 0])
  const iconScale = useTransform(p, [0.1, 0.5], [0, 1])
  const numOpacity = useTransform(p, [0.2, 0.6], [0, 1])
  const numX = useTransform(p, [0.2, 0.6], [50, 0])
  const titleOpacity = useTransform(p, [0.35, 0.75], [0, 1])
  const titleX = useTransform(p, [0.35, 0.75], [-40, 0])
  const descOpacity = useTransform(p, [0.5, 1], [0, 1])
  const descY = useTransform(p, [0.5, 1], [24, 0])

  const Icon = area.icon
  return (
    <div ref={ref} className="w-[78vw] shrink-0 sm:w-[52vw] md:w-[34vw] lg:w-[26vw]" style={{ perspective: 1100 }}>
      <motion.div style={{ opacity: cardOpacity, y: cardY, rotateY: cardRotate, transformOrigin: '0% 50%' }}>
        <TiltCard>
          <div
            className="group relative flex h-[56vh] min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-7 backdrop-blur-md transition-colors duration-500 hover:border-[#D4AF37]/40 lg:p-9"
            style={{ background: 'rgba(10,10,10,0.72)' }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at 50% 0%, ${area.color}1f 0%, transparent 65%)` }}
            />
            <div className="relative flex items-start justify-between">
              <motion.div
                style={{ scale: iconScale, background: `${area.color}15`, border: `1px solid ${area.color}30` }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
              >
                <Icon size={24} style={{ color: area.color }} />
              </motion.div>
              <motion.span
                style={{ opacity: numOpacity, x: numX, color: 'rgba(255,255,255,0.07)' }}
                className="text-7xl font-black leading-none"
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
            </div>
            <div className="relative">
              <motion.h3 style={{ opacity: titleOpacity, x: titleX }} className="mb-3 text-2xl font-bold text-white">
                {area.title}
              </motion.h3>
              <motion.p style={{ opacity: descOpacity, y: descY }} className="text-sm leading-relaxed text-white/50">
                {area.desc}
              </motion.p>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  )
}

/** Vertical scroll drives a horizontal track of cards (the section is pinned while it moves). */
export default function WhatWeDoSection() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | null>(null)
  const tick = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setHeight(Math.max(0, track.scrollWidth - window.innerWidth) + window.innerHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(scrollYProgress, (v) => {
    const track = trackRef.current
    if (!track) return 0
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
    return -Math.max(0, track.scrollWidth - vw) * v
  })

  return (
    <section id="whatwedo" ref={ref} style={{ height: height ?? '400vh' }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-5 px-[6vw] will-change-transform md:gap-8">
          {/* Intro panel: its lines appear one by one, and replay when you scroll back up */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-4 md:w-[36vw]">
            <Reveal from="down" distance={30}>
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/20 px-3 py-1.5 text-xs uppercase tracking-widest text-[#D4AF37]/70">
                Our Major Focus Areas
              </div>
            </Reveal>
            <h2 className="text-6xl font-black leading-[0.9] tracking-tighter lg:text-8xl">
              <Reveal from="left" delay={0.1} distance={80}>
                What We
              </Reveal>
              <Reveal from="right" delay={0.22} distance={80}>
                <span className="text-gradient">Do</span>
              </Reveal>
            </h2>
            <Reveal from="up" delay={0.35}>
              <p className="mt-6 max-w-sm text-lg text-white/45">
                Seven pillars of transformative impact, designed to develop the whole person and build agents of positive
                change.
              </p>
            </Reveal>
            <Reveal from="up" delay={0.5}>
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/30">Keep scrolling →</p>
            </Reveal>
          </div>

          {areas.map((area, i) => (
            <HCard key={area.title} area={area} i={i} x={x} tick={tick} />
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        {/* Progress line */}
        <div className="absolute inset-x-[6vw] bottom-8 h-px bg-white/10">
          <motion.div className="h-full origin-left bg-[#D4AF37]" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  )
}