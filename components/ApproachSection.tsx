'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const commitments = [
  'Continuous learning and development',
  'Practical knowledge and application',
  'Responsible and impactful leadership',
  'Entrepreneurship and innovation',
  'Collaboration and collective growth',
  'Service, integrity, and social responsibility',
  'Sustainable systems that reproduce success',
]

export default function ApproachSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Scrolling background text */}
      <motion.div
        style={{ x }}
        className="absolute inset-0 flex items-center whitespace-nowrap overflow-hidden select-none pointer-events-none"
        aria-hidden
      >
        <span className="text-[15vw] font-black tracking-tighter" style={{ color: 'rgba(255,255,255,0.03)' }}>
          APPROACH · COMMITMENT · IMPACT · GROWTH · APPROACH · COMMITMENT · IMPACT
        </span>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a]/30 to-black" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Bold statement */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-6"
            >
              Our Approach
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9 }}
              className="text-4xl lg:text-6xl font-black tracking-tighter leading-[1.1] mb-8"
            >
              Building a{' '}
              <span className="text-gradient">Functional</span>
              {' '}Ecosystem for{' '}
              <span className="text-gradient">Change</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-white/40 text-lg leading-relaxed"
            >
              At DEILA, we move beyond the conventional approach of simply organising
              programmes. Our goal is to build a functional institution where knowledge
              is converted into competence, competence into productivity, leadership into
              service, and innovation into measurable impact.
            </motion.p>
          </div>

          {/* Right: Commitments */}
          <div className="space-y-4">
            {commitments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                className="flex items-center gap-4 group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/5 transition-all duration-300">
                  <CheckCircle2 size={14} className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                <span className="text-white/50 group-hover:text-white/80 transition-colors duration-300 text-sm">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
