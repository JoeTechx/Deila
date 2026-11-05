'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 7, suffix: '', label: 'Focus Areas' },
  { value: 12, suffix: '+', label: 'Monthly Webinars Per Year' },
  { value: 1, suffix: '', label: 'Unified Movement' },
  { value: 100, suffix: '%', label: 'Commitment to Impact' },
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section className="relative py-16 border-y border-white/5" style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.05), transparent, rgba(212,175,55,0.05))' }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center px-8"
            >
              <div className="text-4xl lg:text-5xl font-black text-gradient mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
