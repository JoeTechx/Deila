'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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

  return (
    <motion.div
      className="step-card relative isolate flex w-full items-center rounded-2xl py-2.5 pl-14 pr-4 transition-all duration-300 sm:py-3 sm:pl-16 md:py-3.5"
    >
      {/* Tint that fades in when the step is checked (an overlay, because framer-motion
          cannot animate between theme variables) */}
      <motion.div style={{ opacity: lit }} className="step-lit pointer-events-none absolute inset-0 -z-10 rounded-2xl" />

      {/* Node circle on the timeline */}
      <motion.div
        style={{ scale: ringScale }}
        className="step-node absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full sm:left-3.5 sm:h-9 sm:w-9"
      >
        <motion.span style={{ opacity: lit }} className="step-glow absolute inset-0 rounded-full" />
        <motion.span
          style={{ opacity: lit }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8B1A1A] to-[#A82222]"
        />
        <motion.span
          style={{ opacity: lit, color: '#ffffff' }}
          className="relative"
        >
          <Check size={16} strokeWidth={3} />
        </motion.span>
        {/* Step index shown when not yet checked */}
        <motion.span
          style={{ opacity: useTransform(lit, (v) => 1 - v) }}
          className="copy-muted absolute text-[10px] font-semibold sm:text-xs"
        >
          {String(i + 1).padStart(2, '0')}
        </motion.span>
      </motion.div>

      <motion.span
        style={{ opacity: textOpacity, x: textX, clipPath: textClip }}
        className="block text-sm font-medium tracking-tight sm:text-base md:text-sm"
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
  const reduceMotion = useReducedMotion()
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [0.85, 1, 1, 0.85])

  return (
    <section id="approach" ref={ref} className="relative overflow-x-clip scroll-mt-28" style={{ height: '280vh' }}>
      {/* Sticky viewport container: vertically and horizontally centered with clearance below navbar */}
      <div className="sticky top-0 flex h-[100svh] min-h-[600px] flex-col justify-center items-center overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-10">
        {/* Kinetic ambient background */}
        <div
          className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden whitespace-nowrap"
          aria-hidden
        >
          {/* Self-moving marquee: the text is rendered twice and the track slides left by exactly
              half its width, then loops, so there is no visible jump. Change `duration` (seconds
              per loop) to make it faster or slower. */}
          <motion.div
            className="flex w-max shrink-0"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              // Outlined watermark. Colors live in .approach-watermark (globals.css).
              <span
                key={copy}
                className="approach-watermark shrink-0 pr-[0.4em] text-[14vw] font-black tracking-tighter"
              >
                APPROACH · COMMITMENT · IMPACT · GROWTH ·
              </span>
            ))}
          </motion.div>
        </div>

        {/* Centered with justify-between for balanced space in the middle */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 px-4 sm:px-6 lg:px-8"
        >
          {/* Left Column: Heading & Context */}
          <div className="w-full lg:w-[46%] flex flex-col justify-center">
            <Reveal from="down" distance={30}>
              <div className="copy-muted mb-2 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
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
                  className={`mr-[0.25em] inline-block ${h.g ? 'text-gradient' : ''}`}
                >
                  {h.w}
                </Reveal>
              ))}
            </h2>

            <Reveal from="left" delay={0.6} distance={60}>
              <p className="copy-muted mb-6 max-w-lg text-sm leading-relaxed sm:text-base md:text-sm">
                At DEILA, we move beyond conventional programming. Our goal is to build a functional institution where
                knowledge converts into competence, leadership into service, and innovation into measurable impact.
              </p>
            </Reveal>

            {/* Scroll progress meter */}
            <Reveal from="up" delay={0.75} distance={40}>
              <div className="surface-card rounded-2xl p-4 backdrop-blur-sm">
                <div className="copy-muted mb-2 flex items-center justify-between text-xs uppercase tracking-wider">
                  <span>Interactive Verification</span>
                  <span className="accent-text">Scroll down to activate</span>
                </div>
                <div className="progress-track h-1.5 w-full overflow-hidden rounded-full">
                  <motion.div
                    style={{ scaleX: line }}
                    className="meter-fill h-full origin-left"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Sticky Timeline Checklist */}
          <div className="relative w-full lg:w-[48%] flex flex-col justify-center">
            {/* Vertical guideline track */}
            <div className="progress-track absolute bottom-5 left-[23px] top-5 w-[2px] sm:left-[29px]" />

            {/* Glowing animated scroll progress line */}
            <motion.div
              style={{ scaleY: line }}
              className="timeline-fill absolute bottom-5 left-[23px] top-5 w-[2px] origin-top sm:left-[29px]"
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