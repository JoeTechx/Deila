'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Reveal from '@/components/Reveal'
import TiltCard from '@/components/TiltCard'

export default function FoundersTeaser() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Subtle ambient parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const photoY1 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const photoY2 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="relative overflow-x-clip py-28 md:py-36 lg:py-40 scroll-mt-28"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Ambient Brand Lighting (Rich navy & crimson atmospheric glow) ── */}
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-[10%] right-[-5%] h-[650px] w-[650px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #1B2854 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] -left-[10%] h-[550px] w-[550px] rounded-full blur-[130px] opacity-15"
          style={{ background: 'radial-gradient(circle, #8B1A1A 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-[10%] right-[25%] h-[500px] w-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #253470 0%, transparent 70%)' }}
        />
      </div>

      {/* Kinetic marquee watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 75, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map((c) => (
            <span
              key={c}
              className="shrink-0 whitespace-nowrap pr-[0.4em] text-[11vw] font-black leading-none tracking-tighter approach-watermark"
            >
              RAISING LEADERS · SHAPING DESTINIES · CREATING IMPACT ·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Full Width Container ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header (Full width, left-aligned) ── */}
        <div className="mb-14 max-w-3xl">
          <Reveal from="down" distance={30}>
            <div className="chip-badge mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              Meet the Founders
            </div>
          </Reveal>

          <h2 className="mb-5 text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl">
            <Reveal from="left" delay={0.08} distance={90}>
              The Minds
            </Reveal>
            <Reveal from="right" delay={0.2} distance={90}>
              <span className="text-gradient"> Behind DEILA</span>
            </Reveal>
          </h2>

          <Reveal from="up" delay={0.35}>
            <p className="copy-muted text-base leading-relaxed sm:text-lg">
              United by shared conviction, driven by purposeful leadership, and committed to developing minds,
              building sustainable enterprises, and transforming institutions for generations to come.
            </p>
          </Reveal>
        </div>

        {/* ── Two Founders Side-by-Side (Full Width Grid) ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">

          {/* ══════════════════════════════════════════
              CARD 1: Founder & Managing Director
          ══════════════════════════════════════════ */}
          <Reveal from="left" delay={0.1} distance={70}>
            <TiltCard className="h-full rounded-3xl">
              <Link href="/founder" className="group block h-full focus:outline-none">
                <div
                  className="founder-teaser-card relative flex h-[520px] sm:h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8"
                  style={{
                    boxShadow: '0 20px 50px rgba(13, 18, 38, 0.65), 0 0 35px rgba(139, 26, 26, 0.2)',
                  }}
                >
                  {/* Background Photo */}
                  <motion.div
                    style={{ y: photoY1 }}
                    className="absolute inset-0 h-[115%] w-full"
                  >
                    <Image
                      src="/founder-md.jpg"
                      alt="Amb. Dr. Alege Moses Dayo — Founder & Managing Director"
                      fill
                      sizes="(max-width:640px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </motion.div>

                  {/* Multi-stage Scrim Overlay (Rich Navy/Dark) */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, #0d1226 0%, rgba(13,18,38,0.92) 42%, rgba(17,26,56,0.60) 65%, rgba(17,26,56,0.12) 85%, transparent 100%)',
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(27,40,84,0.3) 0%, transparent 60%)',
                    }}
                  />

                  {/* Top Bar: Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="founder-card-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D64545] shadow-[0_0_8px_#D64545]" />
                      Founder &amp; Managing Director
                    </div>
                    <span className="founder-card-badge rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                      01 / 02
                    </span>
                  </div>

                  {/* Bottom Content: Details & Profile Action */}
                  <div className="relative z-10 pt-16">
                    <span className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#D64545]">
                      DEILA Leadership
                    </span>
                    <h3 className="founder-card-title mb-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                      Amb. Dr. Alege<br />Moses Dayo
                    </h3>
                    <p className="founder-card-desc mb-4 text-xs sm:text-sm leading-relaxed">
                      Leadership Trainer · Author · Serial Entrepreneur · Strategic Thinker · Humanitarian · Influencer for Christ
                    </p>

                    {/* Personal Motto Pill */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                      <Sparkles size={12} className="text-[#D64545]" />
                      <span>Inspiration · Integrity · Impact</span>
                    </div>

                    {/* CTA Link */}
                    <div className="founder-card-cta flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300">
                      <span>Explore Full Profile &amp; Mandate</span>
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Hover Rim Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-[#D64545] transition-opacity duration-500 group-hover:opacity-70" />
                </div>
              </Link>
            </TiltCard>
          </Reveal>

          {/* ══════════════════════════════════════════
              CARD 2: Co-Founder
          ══════════════════════════════════════════ */}
          <Reveal from="right" delay={0.22} distance={70}>
            <TiltCard className="h-full rounded-3xl">
              <div
                className="founder-teaser-card group relative flex h-[520px] sm:h-[560px] w-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8"
                style={{
                  boxShadow: '0 20px 50px rgba(13, 18, 38, 0.65), 0 0 35px rgba(27, 40, 84, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                }}
              >
                {/* Background Photo */}
                <motion.div
                  style={{ y: photoY2 }}
                  className="absolute inset-0 h-[115%] w-full"
                >
                  <Image
                    src="/founder-co.jpg"
                    alt="DEILA Co-Founder — Executive Leadership"
                    fill
                    sizes="(max-width:640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Multi-stage Scrim Overlay (Rich Navy/Dark) */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #0d1226 0%, rgba(13,18,38,0.92) 42%, rgba(17,26,56,0.60) 65%, rgba(17,26,56,0.12) 85%, transparent 100%)',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(27,40,84,0.3) 0%, transparent 60%)',
                  }}
                />

                {/* Top Bar: Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="founder-card-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1B2854] shadow-[0_0_8px_#253470]" />
                    Co-Founder &amp; Executive Leadership
                  </div>
                  <span className="founder-card-badge rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                    02 / 02
                  </span>
                </div>

                {/* Bottom Content: Details */}
                <div className="relative z-10 pt-16">
                  <span className="mb-1.5 block text-[11px] font-black uppercase tracking-widest text-[#D64545]">
                    DEILA Executive Leadership
                  </span>
                  <h3 className="founder-card-title mb-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                    DEILA Co-Founder
                  </h3>
                  <p className="founder-card-desc mb-4 text-xs sm:text-sm leading-relaxed">
                    Visionary Co-Leader · Partner in Purpose · Human Capacity Development &amp; Generational Impact
                  </p>

                  {/* Strategic Focus Pillars */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {['Human Capacity', 'Institutional Excellence', 'Community Impact'].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Vision Quote Box */}
                  <blockquote
                    className="rounded-2xl p-3.5 text-xs font-medium leading-relaxed text-white/85 backdrop-blur-md"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    &ldquo;Partnering to raise thoughtful leaders, nurture talent, and establish institutions that impact generations.&rdquo;
                  </blockquote>
                </div>

                {/* Hover Rim Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-[#253470] transition-opacity duration-500 group-hover:opacity-70" />
              </div>
            </TiltCard>
          </Reveal>

        </div>

      </div>
    </section>
  )
}
