'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'

const headline = [
  { w: 'Join', g: false },
  { w: 'the', g: false },
  { w: 'Movement', g: true },
]

/** Button that leans toward the cursor. */
function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 14 })
  return (
    <motion.div
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Gold particles shooting outward (deterministic, so no hydration mismatch). */
function Burst() {
  const parts = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2
    const d = 90 + ((i * 37) % 80)
    return { x: Math.cos(a) * d, y: Math.sin(a) * d }
  })
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#F0D060]"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/** Signature: cursor spotlight, 3D letter flip, magnetic button, gold burst on submit, with enter and exit scroll animations.
 *  The section is exactly one full screen tall, so clicking "Join Us" in the nav lands on a full-viewport panel. */
export default function JoinSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '-12% 0px -12% 0px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Scroll enter and exit animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Enter when scrolling to it, exit when scrolling out
  const contentOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [70, 0, 0, -70])
  const contentScale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.93, 1, 1, 0.93])
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85])

  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(212,175,55,0.14), transparent 60%)`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section
      id="join"
      ref={ref}
      // h-[100svh]: exactly one screen. Text, gaps and inputs scale with the screen HEIGHT (vh), so the whole card fits on short laptop screens.
      // No scroll-margin: the nav link lands with the section top at the screen top.
      className="relative flex h-[100svh] min-h-[540px] scroll-mt-0 items-stretch overflow-hidden pt-[4.5rem] pb-3 sm:pb-4"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onPointerLeave={() => {
        mx.set(-1000)
        my.set(-1000)
      }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 60%)' }} />

      <motion.div style={{ scale: ringScale }} className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#D4AF37]/10"
            style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative mx-auto flex min-h-0 w-full max-w-4xl px-4 sm:px-6"
      >
        {/* Glass prism card: stretches to fill the full-screen section and centers its content */}
        <div className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-white/[0.08] via-black/55 to-black/75 px-5 py-[2.5vh] text-center shadow-[0_20px_60px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(255,255,255,0.4),0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-2xl sm:px-10 md:px-14">
          {/* Top prism specular highlight line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D060]/80 to-transparent" />

          {/* Ambient prism glow */}
          <div className="pointer-events-none absolute -inset-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.4),transparent_70%)] opacity-20" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="relative mb-[clamp(0.5rem,2.5vh,1.5rem)] inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} /> Be Part of Something Greater
          </motion.div>

          {/* Every letter flips in on its own */}
          <h2 className="relative mb-[clamp(0.5rem,2vh,1rem)] text-[clamp(2rem,min(9vh,11vw),4.5rem)] font-black leading-[1.05] tracking-tighter" style={{ perspective: 900 }} aria-label="Join the Movement">
            {headline.map((word, wi) => (
              <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
                {word.w.split('').map((ch, ci) => (
                  <motion.span
                    key={ci}
                    aria-hidden
                    initial={{ opacity: 0, rotateX: -100, y: 40 }}
                    animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 0, rotateX: -100, y: 40 }}
                    transition={{ delay: 0.1 + (wi * 4 + ci) * 0.045, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: '50% 100%', color: word.g ? '#F0D060' : undefined }}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative mx-auto mb-[clamp(0.75rem,4vh,2.5rem)] max-w-2xl text-[clamp(0.875rem,2.3vh,1.125rem)] leading-relaxed text-white/80"
          >
            Connect with a community of leaders, entrepreneurs, and innovators committed to developing people, building
            capacity, and creating lasting impact across communities and industries.
          </motion.p>

          {submitted ? (
            <div className="relative mx-auto max-w-md">
              <Burst />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="relative rounded-2xl border border-[#D4AF37]/40 p-8 backdrop-blur-md"
                style={{ background: 'rgba(212,175,55,0.08)' }}
              >
                <div className="mb-4 text-5xl text-[#D4AF37]">✓</div>
                <h3 className="mb-2 text-2xl font-bold text-white">You&apos;re In!</h3>
                <p className="text-white/70">Welcome to the DEILA movement. We&apos;ll be in touch soon.</p>
              </motion.div>
            </div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-full border border-white/20 bg-white/10 py-[clamp(0.6rem,1.8vh,1rem)] pl-11 pr-4 text-sm text-white placeholder-white/40 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white/[0.12] focus:outline-none"
                />
              </div>
              <Magnetic>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#D4AF37] px-8 py-[clamp(0.6rem,1.8vh,1rem)] text-sm font-bold tracking-wide text-black transition-colors duration-300 hover:bg-[#F0D060]"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Join the Movement <ArrowRight size={16} />
                </motion.button>
              </Magnetic>
            </motion.form>
          )}

          {/* High-visibility trust badges pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-[clamp(0.75rem,4vh,2.5rem)] inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-6 py-2.5 text-xs font-medium text-white/90 shadow-sm backdrop-blur-md sm:gap-6 sm:text-sm"
          >
            <span>No spam, ever.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            <span>Unsubscribe anytime.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            <span>Free to join.</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}