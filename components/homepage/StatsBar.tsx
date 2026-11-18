'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Reveal from '@/components/Reveal'

const stats = [
  { value: 7, suffix: '', label: 'Focus Areas' },
  { value: 12, suffix: '+', label: 'Monthly Webinars Per Year' },
  { value: 1, suffix: '', label: 'Unified Movement' },
  { value: 100, suffix: '%', label: 'Commitment to Impact' },
]
const phrases = ['Developing People', 'Building Leaders', 'Inspiring Innovation', 'Creating Impact']

// Counts up every time it scrolls into view, and resets when it leaves
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6 })

  useEffect(() => {
    if (!inView) {
      setCount(0)
      return
    }
    let start = 0
    const step = value / (1600 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-x-clip py-16 md:py-24">
      {/* Tilted crimson marquee band sweeps in from the left.
          The text is repeated 4 times and the track slides by exactly one copy (25%),
          so it never runs short, even on very wide screens. Colors live in .stats-band (globals.css). */}
      <Reveal from="left" distance={400} duration={1.1} amount={0.2}>
        <div className="stats-band -ml-[5%] w-[110%] -rotate-2 overflow-hidden py-3 md:py-4">
          <motion.div
            className="flex w-max whitespace-nowrap"
            animate={reduceMotion ? undefined : { x: ['0%', '-25%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1, 2, 3].map((copy) => (
              <div key={copy} className="flex">
                {phrases.map((p) => (
                  <span key={p} className="text-xl font-black uppercase tracking-tight md:text-3xl">
                    <span className="mx-6">{p}</span>
                    <span className="opacity-50">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* One panel holding all four stats. Dividers and colors come from .stats-panel (globals.css),
          so dark and light mode both work with no extra overrides. */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="stats-panel grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={i}
              from={i % 2 === 0 ? 'up' : 'zoom'}
              delay={i * 0.12}
              amount={0.5}
              className="px-4 py-8 text-center lg:px-8 lg:py-12"
            >
              <span className="stat-accent mx-auto mb-4 block h-0.5 w-8 rounded-full" />
              <div className="text-gradient mb-2 text-4xl font-black lg:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label text-xs uppercase tracking-widest">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}