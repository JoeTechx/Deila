'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Reveal, { type RevealFrom } from './Reveal'

const commitments = [
  'Continuous learning and development',
  'Practical knowledge and application',
  'Responsible and impactful leadership',
  'Entrepreneurship and innovation',
  'Collaboration and collective growth',
  'Service, integrity, and social responsibility',
  'Sustainable systems that reproduce success',
]

const headline: { w: string; g: boolean; from: RevealFrom }[] = [
  { w: 'Building', g: false, from: 'left' },
  { w: 'a', g: false, from: 'down' },
  { w: 'Functional', g: true, from: 'up' },
  { w: 'Ecosystem', g: false, from: 'left' },
  { w: 'for', g: false, from: 'down' },
  { w: 'Change', g: true, from: 'right' },
]

/** One commitment step. Its checkmark and card illuminate as the scroll reaches it,
 *  and the commitment text is revealed only once the step is checked. */
function Step({
  text,
  i,
  n,
  progress,
}: {
  text: string
  i: number
  n: number
  progress: MotionValue<number>
}) {
  const at = (i + 0.3) / n
  const lit = useTransform(progress, [at - 0.05, at + 0.02], [0, 1])
  // Hidden until checked, then it wipes in from the left
  const textOpacity = useTransform(lit, [0, 0.6], [0, 1])
  const textX = useTransform(lit, [0, 1], [-24, 0])
  const textClip = useTransform(lit, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const ringScale = useTransform(lit, [0, 0.5, 1], [0.85, 1.15, 1])
  const glow = useTransform(lit, [0, 1], ['0 0 0px rgba(212,175,55,0)', '0 0 16px rgba(212,175,55,0.6)'])
  const bgOpacity = useTransform(lit, [0, 1], [0, 0.08])

  return (
    <motion.div
      style={{ backgroundColor: useTransform(bgOpacity, (v) => `rgba(212,175,55,${v})`) }}
      className="relative flex w-full items-center rounded-2xl border border-white/10 bg-white/[0.03] py-2.5 pl-14 pr-4 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/40 sm:py-3 sm:pl-16 md:py-3.5"
    >
      {/* Node circle on the timeline */}
      <motion.div
        style={{ scale: ringScale, boxShadow: glow }}
        className="absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0d0d0d] sm:left-3.5 sm:h-9 sm:w-9"
      >
        <motion.span
          style={{ opacity: lit }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F0D060]"
        />
        <motion.span
          style={{ opacity: lit }}
          className="relative text-black"
        >
          <Check size={16} strokeWidth={3} />
        </motion.span>
        {/* Step index shown when not yet checked */}
        <motion.span
          style={{ opacity: useTransform(lit, (v) => 1 - v) }}
          className="absolute text-[10px] font-semibold text-white/50 sm:text-xs"
        >
          {String(i + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      <motion.span
        style={{ opacity: textOpacity, x: textX, clipPath: textClip }}
        className="block text-sm font-medium tracking-tight text-white sm:text-base md:text-sm"
      >
        {text}
      </motion.span>
    </motion.div>
  )
}

/** Your sticky Approach design (pinned, drawing the timeline and checking off commitments),
 *  with reveal animations layered on top. */
export default function ApproachSection() {
  const ref = useRef<HTMLElement>(null)

  // Section pins for the duration of this scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Line progress mapped cleanly within the pin
  const line = useTransform(scrollYProgress, [0.06, 0.88], [0, 1])
  const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [0.85, 1, 1, 0.85])

  return (
    <section id="approach" ref={ref} className="relative overflow-x-clip scroll-mt-28" style={{ height: '280vh' }}>
      {/* Sticky viewport container: vertically and horizontally centered with clearance below navbar */}
      <div className="sticky top-0 flex h-[100svh] min-h-[600px] flex-col justify-center items-center overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-10">
        {/* Kinetic ambient background */}
        <motion.div
          style={{ x: bgX }}
          className="pointer-events-none absolute inset-0 flex select-none items-center whitespace-nowrap"
          aria-hidden
        >
          {/* Outlined gold watermark. Raise 0.28 for more visibility, lower it for less. */}
          <span
            className="text-[14vw] font-black tracking-tighter"
            style={{ color: 'rgba(255,255,255,0.03)', WebkitTextStroke: '1.5px rgba(212,175,55,0.28)' }}
          >
            APPROACH · COMMITMENT · IMPACT · GROWTH · APPROACH · COMMITMENT · IMPACT
          </span>
        </motion.div>

        {/* Centered with justify-between for balanced space in the middle */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-4 sm:px-6 lg:px-8"
        >
          {/* Left Column: Heading & Context */}
          <div className="w-full lg:w-[46%] flex flex-col justify-center">
            <Reveal from="down" distance={30}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                <Sparkles size={13} />
                Our Approach
              </div>
            </Reveal>

            <h2 className="mb-4 text-3xl font-black leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {headline.map((h, i) => (
                <Reveal
                  key={i}
                  from={h.from}
                  delay={0.08 + i * 0.09}
                  distance={50}
                  amount={0.2}
                  className={`mr-[0.25em] inline-block ${h.g ? 'text-gradient' : 'text-white'}`}
                >
                  {h.w}
                </Reveal>
              ))}
            </h2>

            <Reveal from="left" delay={0.6} distance={60}>
              <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base md:text-sm">
                At DEILA, we move beyond conventional programming. Our goal is to build a functional institution where
                knowledge converts into competence, leadership into service, and innovation into measurable impact.
              </p>
            </Reveal>

            {/* Scroll progress meter */}
            <Reveal from="up" delay={0.75} distance={40}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
                  <span>Interactive Verification</span>
                  <span className="text-[#D4AF37]">Scroll down to activate</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    style={{ scaleX: line }}
                    className="h-full origin-left bg-gradient-to-r from-[#D4AF37] to-[#F0D060]"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Sticky Timeline Checklist */}
          <div className="relative w-full lg:w-[48%] flex flex-col justify-center">
            {/* Vertical guideline track */}
            <div className="absolute bottom-5 left-[23px] top-5 w-[2px] bg-white/10 sm:left-[29px]" />

            {/* Glowing animated scroll progress line */}
            <motion.div
              style={{ scaleY: line }}
              className="absolute bottom-5 left-[23px] top-5 w-[2px] origin-top bg-gradient-to-b from-[#F0D060] via-[#D4AF37] to-[#F59E0B] shadow-[0_0_12px_rgba(212,175,55,0.9)] sm:left-[29px]"
            />

            <div className="space-y-2 sm:space-y-2.5">
              {commitments.map((c, i) => (
                <Reveal key={c} from="right" delay={0.1 + i * 0.08} distance={70} amount={0.3}>
                  <Step text={c} i={i} n={commitments.length} progress={line} />
                </Reveal>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}