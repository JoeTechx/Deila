'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Eye, Target, Compass } from 'lucide-react'
import Reveal from './Reveal'

const vision =
  'To become a leading institution for entrepreneurship, innovation, leadership development, and human-capacity building — raising individuals and leaders who transform ideas, businesses, communities, and society.'
const words = vision.split(' ')
const goldWords = new Set([3, 4]) // "leading institution"

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  gold: boolean
}) {
  const opacity = useTransform(progress, range, [0.35, 1])
  const y = useTransform(progress, range, [3, 0])
  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.24em] inline-block drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] ${
        gold ? 'text-gradient font-black' : 'text-white'
      }`}
    >
      {children}
    </motion.span>
  )
}

/** Your sticky Vision & Mission design, plus a big heading (same style as Philosophy) and reveal animations. */
export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Pin section for 260vh
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Word-by-word progress for Vision during first half
  const textProgress = useTransform(scrollYProgress, [0.04, 0.46], [0, 1])

  // Mission spotlight progress during second half
  const missionProgress = useTransform(scrollYProgress, [0.46, 0.85], [0, 1])
  const missionOpacity = useTransform(missionProgress, [0, 1], [0.65, 1])
  const missionY = useTransform(missionProgress, [0, 1], [15, 0])
  const missionBorder = useTransform(
    missionProgress,
    [0, 1],
    ['rgba(255,255,255,0.2)', 'rgba(212,175,55,0.65)']
  )
  const missionBg = useTransform(
    missionProgress,
    [0, 1],
    ['rgba(15,15,15,0.55)', 'rgba(212,175,55,0.07)']
  )

  // Vision softens slightly when Mission takes the primary spotlight
  const visionDim = useTransform(scrollYProgress, [0.48, 0.68], [1, 0.60])

  // Kinetic marquee lines now slide on their own (see the bottom of the JSX), not with scroll
  const reduceMotion = useReducedMotion()

  // Container fade at top/bottom
  const containerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [0.85, 1, 1, 0.85])

  const n = words.length

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative overflow-x-clip scroll-mt-28"
      style={{ height: '260vh' }}
    >
      {/* Sticky pinned container: pt-28 gives full clearance so navbar never covers content */}
      <div className="sticky top-0 flex flex-col justify-center overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-10">
        <motion.div
          style={{ opacity: containerOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            {/* NEW: big heading, same style as Philosophy. Sits on the left on desktop, above the cards on small screens. */}
            <div className="lg:col-span-5">
              <Reveal from="down" distance={30}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] backdrop-blur-md">
                  <Compass size={13} />
                  Guiding Principles
                </div>
              </Reveal>
              <h2 className="text-5xl font-black leading-[0.9] tracking-tighter lg:text-7xl">
                <Reveal from="right" delay={0.1} distance={80}>
                  Our
                </Reveal>
                <Reveal from="left" delay={0.22} distance={80}>
                  <span className="text-gradient">Vision &amp; Mission</span>
                </Reveal>
              </h2>
              <Reveal from="up" delay={0.4}>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
                  The destination we are working toward, and the practical commitments that carry us there.
                </p>
              </Reveal>
            </div>

            {/* Your cards (unchanged design) */}
            <div className="lg:col-span-7">
              {/* Header tracker */}
              <Reveal from="right" distance={40} amount={0.5}>
                <div className="mb-4 flex items-center justify-end">
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    <span className="text-[#D4AF37]">Sticky View</span> · Scroll to Advance
                  </div>
                </div>
              </Reveal>

              {/* Vision Frosted Luminous Card */}
              <Reveal from="left" delay={0.1} distance={80}>
                <motion.div
                  style={{ opacity: visionDim }}
                  className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.09] via-[#0d0d0d]/70 to-black/75 p-6 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)] transition-opacity duration-500 sm:p-8"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    <Eye size={15} />
                    01 / Our Vision
                  </div>
                  <p className="text-2xl font-black leading-[1.2] tracking-tighter text-white sm:text-3xl lg:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {words.map((w, i) => (
                      <Word
                        key={i}
                        progress={textProgress}
                        range={[i / (n + 1), (i + 2) / (n + 1)]}
                        gold={goldWords.has(i)}
                      >
                        {w}
                      </Word>
                    ))}
                  </p>
                </motion.div>
              </Reveal>

              {/* Mission Luminous Card with High Contrast Text */}
              <Reveal from="right" delay={0.25} distance={80}>
                <motion.div
                  style={{
                    opacity: missionOpacity,
                    y: missionY,
                    borderColor: missionBorder,
                    backgroundColor: missionBg,
                  }}
                  className="mt-5 rounded-3xl border p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_2px_rgba(255,255,255,0.25)] transition-all duration-300 sm:p-8"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#F0D060]">
                      <Target size={15} />
                      02 / Our Mission
                    </div>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/15">
                      <motion.div
                        style={{ scaleX: missionProgress }}
                        className="h-full origin-left bg-gradient-to-r from-[#D4AF37] to-[#F0D060]"
                      />
                    </div>
                  </div>
                  <p className="text-base font-medium leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] sm:text-lg md:text-xl">
                    To provide accessible learning platforms, practical training, mentorship, networking
                    opportunities, and developmental initiatives that equip individuals with the{' '}
                    <span className="text-[#F0D060] font-semibold">knowledge, skills, values, and capacity</span> to achieve{' '}
                    <span className="text-[#F0D060] font-semibold">personal excellence</span>, entrepreneurial success,
                    effective leadership, and meaningful societal impact.
                  </p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </motion.div>

        {/* Sliding Kinetic Typography along the bottom */}
        <div className="mt-auto select-none overflow-hidden pb-1" aria-hidden>
          {/* Each line is rendered twice and the track slides by exactly half its width, then loops,
              so there is no visible jump. Change `duration` (seconds per loop) to adjust speed. */}

          {/* Line 1: moves left */}
          <motion.div
            className="flex w-max"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="shrink-0 whitespace-nowrap pr-[0.4em] text-[9vw] font-black leading-none tracking-tighter text-white/10"
              >
                One Vision. Many Gifts. Multiple Functions.
              </span>
            ))}
          </motion.div>

          {/* Line 2: moves right (opposite direction) */}
          <motion.div
            className="flex w-max"
            animate={reduceMotion ? undefined : { x: ['-50%', '0%'] }}
            transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="text-gradient shrink-0 whitespace-nowrap pr-[0.4em] text-[9vw] font-black leading-none tracking-tighter opacity-80"
              >
                One Movement. Limitless Impact.
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}