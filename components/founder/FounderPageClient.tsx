'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  TrendingUp,
  Heart,
  Cross,
  Mic,
  Users,
  Globe,
  Phone,
  Quote,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

/* ─── Data ──────────────────────────────────────────────────────────── */

const expertise = [
  { icon: Users,      label: 'Leadership Development & Governance' },
  { icon: Briefcase,  label: 'Leadership Consulting & Advisory' },
  { icon: TrendingUp, label: 'Strategic Thinking & Decision-Making' },
  { icon: BookOpen,   label: 'Personal Development & Character Formation' },
  { icon: Globe,      label: 'Entrepreneurship & Business Development' },
  { icon: TrendingUp, label: 'Investment & Wealth Creation' },
  { icon: Mic,        label: 'Public Speaking & Communication' },
  { icon: Users,      label: 'Mentorship & Human Capacity Development' },
  { icon: Heart,      label: 'Youth Empowerment & Generational Development' },
  { icon: BookOpen,   label: 'Education & Intellectual Advancement' },
  { icon: Heart,      label: 'Humanitarian Development & Social Impact' },
  { icon: Globe,      label: 'Institutional Growth & Organisational Effectiveness' },
  { icon: Cross,      label: 'Christian Leadership & Biblical Principles' },
]

const organisations = [
  {
    name: 'Exceeding Expectations Foundation',
    description: 'Humanitarian and social impact initiatives that improve quality of life across communities.',
    color: 'var(--accent-red)',
    highlight: false,
  },
  {
    name: 'DASAYO ETERNAL EXPLOITS ENT LTD',
    description: 'Enterprise development and investment vehicle driving sustainable economic activities.',
    color: 'var(--accent)',
    highlight: false,
  },
  {
    name: 'Dasayo & Sons Highlands Golden Service',
    description: 'Service-oriented enterprise built on excellence, integrity, and generational value.',
    color: 'var(--accent-red)',
    highlight: false,
  },
  {
    name: 'DEILA — Dasayo Entrepreneurship Innovation Leadership Academy',
    description: 'The flagship institution for accessible learning, leadership development, and entrepreneurship education — including free monthly webinars since November 2024.',
    color: 'var(--accent)',
    highlight: true,
  },
]

const profileSections = [
  {
    id: 'leadership',
    badge: 'Leadership & Public Engagement',
    color: 'var(--accent-red)',
    body: `Alege, M.D. is deeply interested in the science and art of leadership, mentorship, strategic thinking, personal effectiveness and institutional development.

Through his writings, teachings, mentoring engagements and public contributions, he explores subjects that challenge conventional thinking, stimulate intellectual curiosity and encourage practical transformation.

His signature leadership reflections combine scriptural insights, intellectual perspectives, historical illustrations, practical experiences and contemporary realities. His writing seeks to bridge the gap between knowledge and application, conviction and conduct, vision and execution.

As a Leadership Consultant, he is interested in helping individuals, teams and organisations strengthen leadership capacity, improve decision-making, address organisational challenges and translate strategic vision into practical outcomes.`,
  },
  {
    id: 'entrepreneurship',
    badge: 'Entrepreneurship, Investment & Institutional Development',
    color: 'var(--accent)',
    body: `As a Serial Entrepreneur and Serial Investor, Alege, M.D. is interested in identifying opportunities, developing sustainable ventures, encouraging enterprise and promoting wealth creation through productive economic activities.

His entrepreneurial interests span business development, investment, agriculture, innovation, education and institutional capacity building.

He believes that entrepreneurship should go beyond personal financial advancement to include employment creation, economic empowerment, innovation, responsible wealth creation and sustainable societal development.`,
  },
  {
    id: 'humanitarian',
    badge: 'Humanitarian Commitment & Generational Impact',
    color: 'var(--accent-red)',
    body: `Alege, M.D. is passionate about humanitarian development, human dignity, social responsibility and initiatives that improve the quality of life of individuals and communities.

His humanitarian interests are informed by the conviction that meaningful development must be people-centred, sustainable and inclusive.

He is particularly interested in education, youth empowerment, leadership development, opportunity creation and practical interventions that enable individuals to discover and maximise their potential.`,
  },
  {
    id: 'faith',
    badge: 'Faith, Values & Personal Philosophy',
    color: 'var(--accent)',
    body: `Alege, M.D. is an unapologetic and uncompromising Influencer for Christ, with a strong commitment to biblical principles, Christian convictions and the advancement of the Gospel.

His Christian worldview significantly informs his understanding of leadership, integrity, responsibility, stewardship, service and human relationships.

He believes that genuine success should never be divorced from sound character, moral responsibility and accountability to God.

His philosophy is anchored on the conviction that influence must be purposeful, knowledge must be responsibly applied, leadership must be exercised with integrity, and success must translate into meaningful contributions to humanity.`,
  },
]

const mandateItems = [
  {
    label: 'Personal Mandate',
    quote: 'Raising Leaders. Shaping Destinies. Creating Opportunities. Inspiring Generations.',
    color: 'var(--accent-red)',
    icon: '01',
  },
  {
    label: 'Guiding Philosophy',
    quote: 'Developing Minds. Building Enterprises. Transforming Institutions. Influencing Generations.',
    color: 'var(--accent)',
    icon: '02',
  },
  {
    label: 'Personal Motto',
    quote: 'Inspiration. Integrity. Impact.',
    color: 'var(--accent-red)',
    icon: '03',
  },
]

const contacts = ['+234 810 371 1246', '+234 702 558 1966', '+234 806 254 1627']

/* ─── ANIMATION 1: Expertise card — staggered fade-up grid ─────────── */
function ExpertiseCard({ item, index }: { item: (typeof expertise)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const color = index % 2 !== 0 ? 'var(--accent-red)' : 'var(--accent)'
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.94 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
      className="flex items-start gap-4 rounded-2xl p-5 transition-[border-color] duration-300 hover:border-[var(--fg-dim)]"
    >
      <div
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: `color-mix(in srgb, ${color} 10%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
        }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <span className="block text-xs font-black uppercase tracking-wider" style={{ color }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-sm font-semibold text-[var(--fg)]">{item.label}</span>
      </div>
    </motion.div>
  )
}

/* ─── ANIMATION 2: Profile bio — alternating slide-in timeline ──────── */
function BioCard({
  sec, index,
}: {
  sec: { id: string; badge: string; color: string; paras: string[] }
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      id={sec.id}
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -60 : 60 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
    >
      {/* Left accent bar */}
      <div className="flex flex-col items-center pt-1 shrink-0">
        <div
          className="h-3 w-3 rounded-full ring-4 ring-[var(--bg)]"
          style={{ background: sec.color }}
        />
        <div
          className="mt-2 w-px flex-1"
          style={{ background: `color-mix(in srgb, ${sec.color} 25%, transparent)` }}
        />
      </div>

      {/* Card body */}
      <div
        className="mb-8 flex-1 rounded-2xl p-6 md:p-8"
        style={{
          background: 'var(--card-dark-bg)',
          border: `1px solid color-mix(in srgb, ${sec.color} 18%, var(--card-dark-border))`,
        }}
      >
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{
            color: sec.color,
            background: `color-mix(in srgb, ${sec.color} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${sec.color} 25%, transparent)`,
          }}
        >
          {sec.badge}
        </div>
        {sec.paras.map((para, pi) => (
          <p key={pi} className="copy-muted mt-3 text-base leading-relaxed first:mt-0">
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── ANIMATION 3: Org card — wipe-in from bottom with counter ──────── */
function OrgCard({ org, index }: { org: (typeof organisations)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-2xl p-6 md:p-8 transition-[box-shadow] duration-300"
      style={{
        background: org.highlight
          ? `linear-gradient(135deg, color-mix(in srgb, ${org.color} 12%, var(--bg-card)), var(--bg-card))`
          : 'var(--card-dark-bg)',
        border: org.highlight
          ? `1px solid color-mix(in srgb, ${org.color} 38%, transparent)`
          : '1px solid var(--card-dark-border)',
        boxShadow: inView ? `0 8px 32px rgba(0,0,0,0.2)` : 'none',
      }}
    >
      <div className="flex items-start gap-6">
        {/* Large counter */}
        <span
          className="shrink-0 text-6xl font-black leading-none tracking-tighter"
          style={{ color: `color-mix(in srgb, ${org.color} 22%, transparent)` }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1">
          <span
            className="mb-1 block text-[10px] font-black uppercase tracking-widest"
            style={{ color: org.color }}
          >
            Founded
          </span>
          <h3 className="mb-2 text-lg font-black leading-tight text-[var(--fg)] sm:text-xl">
            {org.name}
          </h3>
          <p className="copy-muted text-sm leading-relaxed">{org.description}</p>
          {org.highlight && (
            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                color: org.color,
                background: `color-mix(in srgb, ${org.color} 12%, transparent)`,
                border: `1px solid color-mix(in srgb, ${org.color} 30%, transparent)`,
              }}
            >
              ✦ Flagship Institution
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── ANIMATION 4: Mandate card — large centred quote with zoom + glow ─ */
function MandateCard({ item, index }: { item: (typeof mandateItems)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.35 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 24 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative rounded-3xl p-8 md:p-10"
      style={{
        background: 'var(--card-dark-bg)',
        border: `1px solid color-mix(in srgb, ${item.color} 28%, var(--card-dark-border))`,
        boxShadow: `0 0 40px color-mix(in srgb, ${item.color} 10%, transparent)`,
      }}
    >
      {/* Background number watermark */}
      <span
        className="pointer-events-none absolute right-5 top-4 select-none text-8xl font-black leading-none opacity-[0.07]"
        style={{ color: item.color }}
        aria-hidden
      >
        {item.icon}
      </span>

      {/* Quote icon */}
      <Quote size={28} className="mb-5" style={{ color: item.color, opacity: 0.7 }} />

      {/* Label */}
      <span
        className="mb-4 block text-[11px] font-black uppercase tracking-widest"
        style={{ color: item.color }}
      >
        {item.label}
      </span>

      {/* Quote text */}
      <p
        className="text-xl font-black leading-tight tracking-tight sm:text-2xl"
        style={{ color: 'var(--fg)' }}
      >
        {item.quote}
      </p>
    </motion.div>
  )
}

/* ─── Component ─────────────────────────────────────────────────────── */

export default function FounderPageClient() {
  const heroRef      = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Hero parallax only
  // offset: 0 = hero top at viewport top, 1 = hero bottom at viewport top (fully scrolled off)
  // Fade starts at 80% travel so content stays readable until nearly out of view
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY       = useTransform(heroScroll, [0, 1],   [0, -50])
  const heroOpacity = useTransform(heroScroll, [0.8, 1], [1, 0])

  return (
    <>
      <Navbar />

      <main className="relative overflow-x-clip">

        {/* ══════════════════════════════════════
            HERO — Parallax photo + kinetic text
        ══════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28"
          style={{ background: 'var(--bg)' }}
        >
          {/* Ambient crimson/navy glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 65% at 85% 15%, rgba(139,26,26,0.18) 0%, transparent 70%),' +
                'radial-gradient(ellipse 40% 50% at 10% 85%, rgba(27,40,84,0.35) 0%, transparent 70%)',
            }}
            aria-hidden
          />

          {/* Background kinetic text */}
          <div className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center overflow-hidden" aria-hidden>
            <motion.div
              className="flex w-max"
              animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
              transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
            >
              {[0, 1].map((c) => (
                <span
                  key={c}
                  className="shrink-0 whitespace-nowrap pr-[0.4em] text-[13vw] font-black leading-none tracking-tighter approach-watermark"
                >
                  DEVELOPING MINDS · BUILDING ENTERPRISES · TRANSFORMING INSTITUTIONS ·&nbsp;
                </span>
              ))}
            </motion.div>
          </div>

          {/* Back link */}
          <div className="absolute left-4 top-24 z-20 sm:left-8 lg:left-12">
            <Reveal from="left" distance={40}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--fg-muted)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--fg-dim)] hover:text-[var(--fg)]"
              >
                <ArrowLeft size={13} /> Back to DEILA
              </Link>
            </Reveal>
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
              {/* Photo — left col */}
              <Reveal from="left" delay={0.1} distance={80} className="lg:col-span-5">
                <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src="/founder-md.jpg"
                      alt="Amb. Dr. Alege Moses Dayo"
                      fill
                      sizes="(max-width:1024px) 90vw, 42vw"
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(139,26,26,0.35)] via-black/20 to-transparent" />
                    <div
                      className="absolute bottom-4 left-4 rounded-xl px-4 py-2 backdrop-blur-md"
                      style={{
                        background: 'rgba(10,14,32,0.72)',
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                    >
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D64545]">
                        Founder &amp; Managing Director
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-white">DEILA</p>
                    </div>
                  </div>

                  {/* Floating motto tag */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 text-center shadow-xl backdrop-blur-xl"
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)]">Personal Motto</p>
                    <p className="mt-0.5 text-xs font-bold text-[var(--fg)]">Inspiration · Integrity · Impact</p>
                  </motion.div>
                </div>
              </Reveal>

              {/* Headline — right col */}
              <div className="lg:col-span-7">
                <Reveal from="down" distance={30}>
                  <div
                    className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest"
                    style={{
                      background: 'rgba(139,26,26,0.14)',
                      border: '1px solid rgba(214,69,69,0.45)',
                      color: '#D64545',
                    }}
                  >
                    Founder &amp; Managing Director · DEILA
                  </div>
                </Reveal>

                <h1 className="mb-6 text-4xl font-black leading-[0.92] tracking-tighter sm:text-5xl lg:text-7xl xl:text-8xl">
                  <Reveal from="left" delay={0.1} distance={80}>
                    <span className="block">Amb. Dr.</span>
                  </Reveal>
                  <Reveal from="right" delay={0.22} distance={80}>
                    <span className="block text-gradient">Alege Moses</span>
                  </Reveal>
                  <Reveal from="left" delay={0.34} distance={80}>
                    <span className="block">Dayo</span>
                  </Reveal>
                </h1>

                <Reveal from="up" delay={0.46}>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {[
                      'Leadership Trainer', 'Leadership Consultant', 'Author',
                      'Serial Investor', 'Serial Entrepreneur', 'Strategic Thinker',
                      'Humanitarian', 'Public Speaker', 'Leadership Coach',
                      'Social Influencer', 'Influencer for Christ',
                    ].map((role) => (
                      <span key={role} className="chip rounded-full px-3.5 py-1.5 text-xs tracking-wide">
                        {role}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal from="up" delay={0.58}>
                  <p className="copy-muted mb-8 max-w-2xl text-base leading-relaxed">
                    Amb. Dr. Alege Moses Dayo is passionate about leadership development, intellectual
                    advancement, entrepreneurship, institutional growth, human capacity development and
                    transformational impact. He is committed to raising thoughtful, responsible and
                    resourceful individuals who can translate knowledge into meaningful action.
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.7}>
                  <blockquote
                    className="rounded-2xl p-5 text-sm font-semibold uppercase tracking-widest text-[var(--fg-muted)]"
                    style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}
                  >
                    <span className="text-gradient text-base font-black">
                      Developing Minds. Building Enterprises.<br />
                      Transforming Institutions. Influencing Generations.
                    </span>
                  </blockquote>
                </Reveal>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            PROFESSIONAL PROFILE
            ANIMATION: Alternating slide-in timeline (left/right)
            — Each card slides from alternating directions, never overlapping
        ══════════════════════════════════════ */}
        <section className="relative py-28 md:py-36 scroll-mt-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--cta), transparent)' }} />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-16 max-w-3xl">
              <Reveal from="down" distance={30}>
                <div className="chip-badge mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  Professional Profile
                </div>
              </Reveal>
              <h2 className="text-4xl font-black leading-[0.9] tracking-tighter lg:text-6xl">
                <Reveal from="right" delay={0.1} distance={70}>Who He Is</Reveal>
                <Reveal from="left" delay={0.22} distance={70}>
                  <span className="text-gradient">& What He Stands For</span>
                </Reveal>
              </h2>
              <Reveal from="up" delay={0.4}>
                <p className="copy-muted mt-4 text-base leading-relaxed">
                  A multifaceted leader whose life and work are anchored in purpose, conviction, and an enduring commitment to generational impact.
                </p>
              </Reveal>
            </div>

            {/* Overview intro card — full width, clean fade */}
            <Reveal from="up" delay={0.1} distance={40}>
              <div
                className="mb-10 rounded-2xl p-7 md:p-9"
                style={{
                  background: 'var(--card-dark-bg)',
                  border: `1px solid color-mix(in srgb, var(--accent) 18%, var(--card-dark-border))`,
                }}
              >
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    color: 'var(--accent)',
                    background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                  }}
                >
                  Overview
                </div>
                <p className="copy-muted text-base leading-relaxed">
                  Amb. Dr. Alege Moses Dayo is a Leadership Trainer, Leadership Consultant, Author, Prolific Writer, Serial Investor, Serial Entrepreneur, Strategic Thinker, Humanitarian, Public Speaker, Leadership Coach and Social Influencer.
                </p>
                <p className="copy-muted mt-3 text-base leading-relaxed">
                  He is particularly committed to raising thoughtful, responsible and resourceful individuals who can translate knowledge into meaningful action, transform challenges into opportunities and contribute positively to their communities and the wider society.
                </p>
                <p className="copy-muted mt-3 text-base leading-relaxed">
                  He believes that leadership is not merely a position to occupy but a responsibility to discharge; not simply an opportunity to exercise authority but a privilege to create value, develop people and leave enduring legacies.
                </p>
              </div>
            </Reveal>

            {/* Alternating timeline cards */}
            <div>
              {profileSections.map((sec, i) => (
                <BioCard
                  key={sec.id}
                  sec={{ ...sec, paras: sec.body.split('\n\n') }}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            EXPERTISE GRID
            ANIMATION: Staggered fade-up grid (already distinct)
        ══════════════════════════════════════ */}
        <section className="relative py-20 md:py-28 scroll-mt-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--cta), transparent)' }} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <Reveal from="down" distance={30}>
                <div className="chip-badge mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  Areas of Expertise
                </div>
              </Reveal>
              <h2 className="text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">
                <Reveal from="left" delay={0.1} distance={80}>Core</Reveal>
                <Reveal from="right" delay={0.22} distance={80}>
                  <span className="text-gradient"> Competencies</span>
                </Reveal>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expertise.map((item, i) => (
                <ExpertiseCard key={item.label} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ORGANISATIONS FOUNDED
            ANIMATION: Counter-left wipe-up cards with large number
            — Each card wipes up from below with a stagger; no stacking/overlapping
        ══════════════════════════════════════ */}
        <section className="relative py-20 md:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--cta), transparent)' }} />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <Reveal from="down" distance={30}>
                <div className="chip-badge mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  Institutions Founded
                </div>
              </Reveal>
              <h2 className="text-4xl font-black leading-[0.9] tracking-tighter lg:text-6xl">
                <Reveal from="right" delay={0.1} distance={80}>Building</Reveal>
                <Reveal from="left" delay={0.22} distance={80}>
                  <span className="text-gradient"> Institutions</span>
                </Reveal>
                <Reveal from="right" delay={0.34} distance={80}>That Last</Reveal>
              </h2>
              <Reveal from="up" delay={0.4}>
                <p className="copy-muted mt-4 text-base leading-relaxed">
                  Through these initiatives, Amb. Dr. Alege seeks to promote enterprise, education, leadership
                  development, innovation, opportunity creation and sustainable impact.
                </p>
              </Reveal>
            </div>

            {/* 2-column grid on desktop, stacked on mobile */}
            <div className="grid gap-6 sm:grid-cols-2">
              {organisations.map((org, i) => (
                <OrgCard key={org.name} org={org} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MANDATE & PHILOSOPHY
            ANIMATION: Zoom-in scale with quote card — clean, no transparency issues
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--cta), transparent)' }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--cta), transparent)' }} />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <Reveal from="down" distance={30}>
                <div className="chip-badge mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
                  Words to Live By
                </div>
              </Reveal>
              <h2 className="text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">
                <Reveal from="left" delay={0.1} distance={80}>Mandate &amp;</Reveal>
                <Reveal from="right" delay={0.22} distance={80}>
                  <span className="text-gradient"> Philosophy</span>
                </Reveal>
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {mandateItems.map((item, i) => (
                <MandateCard key={item.label} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SPEAKING & CONTACT CTA
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, var(--cta), transparent)' }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--cta), transparent)' }} />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Reveal from="down" distance={30}>
              <div className="chip-badge mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest">
                Speaking Engagements &amp; Collaborations
              </div>
            </Reveal>
            <h2 className="mb-6 text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">
              <Reveal from="left" delay={0.1} distance={80}>Engage,</Reveal>
              <Reveal from="right" delay={0.22} distance={80}>
                <span className="text-gradient"> Collaborate,</span>
              </Reveal>
              <Reveal from="left" delay={0.34} distance={80}> Transform.</Reveal>
            </h2>
            <Reveal from="up" delay={0.46}>
              <p className="copy-muted mx-auto mb-10 max-w-2xl text-base leading-relaxed">
                Amb. Dr. Alege Moses Dayo welcomes meaningful opportunities for speaking engagements,
                leadership training, mentorship, intellectual collaboration and humanitarian partnerships.
                His guiding conviction: every meaningful interaction should contribute something valuable
                to the people involved and, ultimately, to society.
              </p>
            </Reveal>

            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {contacts.map((tel, i) => (
                <Reveal key={tel} from="zoom" delay={0.1 * i} amount={0.5}>
                  <motion.a
                    href={`tel:${tel.replace(/\s/g, '')}`}
                    whileHover={{ y: -5, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="flex items-center justify-center gap-2 rounded-2xl p-5 text-sm font-semibold text-[var(--fg)] transition-[border-color] duration-300 hover:border-[var(--fg-dim)]"
                    style={{ background: 'var(--card-dark-bg)', border: '1px solid var(--card-dark-border)' }}
                  >
                    <Phone size={15} style={{ color: 'var(--accent-red)' }} />
                    {tel}
                  </motion.a>
                </Reveal>
              ))}
            </div>

            <Reveal from="up" delay={0.5}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-7 py-3.5 text-sm font-semibold text-[var(--fg)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--fg-dim)]"
              >
                <ArrowLeft size={15} /> Return to DEILA
              </Link>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
