'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, TrendingUp, Lightbulb, BookOpen, Network, Heart, Globe } from 'lucide-react'

const areas = [
  {
    icon: Users,
    title: 'Leadership Development',
    desc: 'Leadership training, development programmes, and mentorship to equip individuals with mindset, competence, and practical skills.',
    color: '#D4AF37',
  },
  {
    icon: TrendingUp,
    title: 'Entrepreneurship & Business',
    desc: 'Entrepreneurial thinking, business education, innovation, and enterprise development for sustainable ventures.',
    color: '#F59E0B',
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Research',
    desc: 'Research, critical thinking, creativity, and innovative solutions to contemporary challenges.',
    color: '#D4AF37',
  },
  {
    icon: BookOpen,
    title: 'Professional Development',
    desc: 'Webinars, seminars, and workshops that enhance professional competence and personal effectiveness.',
    color: '#F59E0B',
  },
  {
    icon: Network,
    title: 'Mentorship & Networking',
    desc: 'Connecting emerging leaders with experienced professionals for meaningful collaboration and collective advancement.',
    color: '#D4AF37',
  },
  {
    icon: Heart,
    title: 'Community Development',
    desc: 'Medical outreach, welfare initiatives, health education, and community-oriented interventions for broader impact.',
    color: '#F59E0B',
  },
  {
    icon: Globe,
    title: 'Digital Learning',
    desc: 'Leveraging digital platforms to make knowledge accessible beyond physical and geographical boundaries.',
    color: '#D4AF37',
  },
]

export default function WhatWeDoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="whatwedo" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black via-dark-100/50 to-black" />
      <div className="absolute left-1/2 top-0 w-px h-32 bg-linear-to-b from-transparent to-gold/30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 text-gold/70 text-xs tracking-widest uppercase mb-6"
          >
            Our Major Focus Areas
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight"
          >
            What We{' '}
            <span className="text-gradient">Do</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-white/40 max-w-2xl mx-auto text-lg"
          >
            Seven pillars of transformative impact, designed to develop
            the whole person and build agents of positive change.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon
            const isLast = i === areas.length - 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative group p-8 rounded-2xl border border-white/5 transition-all duration-500 cursor-default
                  ${isLast ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                style={{ background: 'rgba(255,255,255,0.02)' }}
                whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.3)' }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${area.color}10 0%, transparent 60%)` }} />

                {/* Number */}
                <span className="absolute top-4 right-6 text-5xl font-black select-none" style={{ color: 'rgba(255,255,255,0.04)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${area.color}15`, border: `1px solid ${area.color}30` }}
                >
                  <Icon size={22} style={{ color: area.color }} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {area.desc}
                </p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${area.color}50, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
