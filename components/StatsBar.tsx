'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal'

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
  return (
    <section className="relative overflow-x-clip py-16 md:py-24">
      {/* Tilted gold marquee band sweeps in from the left */}
      <Reveal from="left" distance={400} duration={1.1} amount={0.2}>
        <div className="-ml-[5%] w-[110%] -rotate-2 overflow-hidden bg-[#D4AF37] py-3 text-black shadow-[0_0_60px_rgba(212,175,55,0.25)] md:py-4">
          <motion.div
            className="flex w-max whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((half) => (
              <div key={half} className="flex">
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

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <Reveal key={i} from={i % 2 === 0 ? 'up' : 'zoom'} delay={i * 0.12} amount={0.5} className="px-4 text-center lg:px-8">
              <div className="text-gradient mb-2 text-4xl font-black lg:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}