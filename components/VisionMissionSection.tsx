'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Eye, Target } from 'lucide-react'

export default function VisionMissionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="vision" ref={ref} className="relative py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[25vw] font-black text-[#D4AF37] leading-none select-none">
            DEILA
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-6"
          >
            Our Direction
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter"
          >
            Vision & <span className="text-gradient">Mission</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative p-10 rounded-3xl border border-[#D4AF37]/20 group overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent)' }}
            whileHover={{ borderColor: 'rgba(212,175,55,0.5)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'rgba(212,175,55,0.05)' }} />

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <Eye size={26} className="text-[#D4AF37]" />
            </div>

            <div className="text-[#D4AF37]/60 text-xs tracking-widest uppercase font-semibold mb-4">Our Vision</div>
            <p className="text-2xl font-bold text-white leading-relaxed">
              To become a{' '}
              <span className="text-gradient">leading institution</span>
              {' '}for entrepreneurship, innovation, leadership development, and human-capacity building —
              raising individuals and leaders who transform ideas, businesses, communities, and society.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative p-10 rounded-3xl border border-white/5 group overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)' }}
            whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'rgba(212,175,55,0.03)' }} />

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Target size={26} className="text-white/60" />
            </div>

            <div className="text-white/40 text-xs tracking-widest uppercase font-semibold mb-4">Our Mission</div>
            <p className="text-xl text-white/70 leading-relaxed">
              To provide accessible learning platforms, practical training, mentorship,
              networking opportunities, and developmental initiatives that equip individuals
              with the knowledge, skills, values, and capacity to achieve personal excellence,
              entrepreneurial success, effective leadership, and meaningful societal impact.
            </p>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl lg:text-4xl font-black text-white/20 tracking-tighter">
            One Vision. Many Gifts. Multiple Functions.
          </p>
          <p className="text-2xl lg:text-4xl font-black text-gradient tracking-tighter">
            One Movement. Limitless Impact.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
