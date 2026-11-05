'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Award, Rocket, Puzzle, GitBranch, BarChart3 } from 'lucide-react'

const pillars = [
  { icon: Brain, keyword: 'Knowledge', produces: 'Competence', color: '#D4AF37' },
  { icon: Award, keyword: 'Leadership', produces: 'Service', color: '#F59E0B' },
  { icon: Rocket, keyword: 'Entrepreneurship', produces: 'Opportunities', color: '#D4AF37' },
  { icon: Puzzle, keyword: 'Innovation', produces: 'Solutions', color: '#F59E0B' },
  { icon: GitBranch, keyword: 'Collaboration', produces: 'Results', color: '#D4AF37' },
  { icon: BarChart3, keyword: 'Development', produces: 'Measurable Impact', color: '#F59E0B' },
]

export default function PhilosophySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="philosophy" ref={ref} className="relative py-32 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-6"
          >
            Our Core Beliefs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter"
          >
            Our <span className="text-gradient">Philosophy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-white/40 max-w-xl mx-auto"
          >
            We do not merely seek to inform people; we seek to inspire,
            instruct, equip, and empower them.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group p-8 rounded-2xl border border-white/5 overflow-hidden cursor-default"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${p.color}15, transparent 70%)` }}
                />

                {/* Border glow bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${p.color}60, transparent)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  <Icon size={22} style={{ color: p.color }} />
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl font-bold text-white">{p.keyword}</span>
                  <span className="text-white/30 text-sm">should produce</span>
                </div>
                <div className="mt-2 text-2xl font-black" style={{ color: p.color }}>
                  {p.produces}
                </div>

                <div className="mt-4 w-8 h-px" style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
