'use client'

import { Brain, Award, Rocket, Puzzle, GitBranch, BarChart3 } from 'lucide-react'
import Reveal from './Reveal'

const pillars = [
  { icon: Brain, keyword: 'Knowledge', produces: 'Competence', color: '#D4AF37' },
  { icon: Award, keyword: 'Leadership', produces: 'Service', color: '#F59E0B' },
  { icon: Rocket, keyword: 'Entrepreneurship', produces: 'Opportunities', color: '#D4AF37' },
  { icon: Puzzle, keyword: 'Innovation', produces: 'Solutions', color: '#F59E0B' },
  { icon: GitBranch, keyword: 'Collaboration', produces: 'Results', color: '#D4AF37' },
  { icon: BarChart3, keyword: 'Development', produces: 'Measurable Impact', color: '#F59E0B' },
]

/** Cards are `sticky` with a growing top offset, so they pile up like a deck as you scroll.
 *  Your design is unchanged; the reveal animations are layered on top and replay on scroll in/out. */
export default function PhilosophySection() {
  return (
    <section id="philosophy" className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Cards (left on desktop) */}
          <div className="order-2 space-y-4 lg:order-1 lg:col-span-7">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={p.keyword}
                  className="sticky flex min-h-[240px] flex-col justify-between rounded-3xl border border-[#382b15] p-7 shadow-2xl shadow-black md:p-9"
                  style={{ top: `calc(7.5rem + ${i * 1.1}rem)`, background: '#1d1c0e' }}
                >
                  <div className="flex items-start justify-between">
                    <Reveal from="zoom" amount={0.5}>
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                      >
                        <Icon size={24} style={{ color: p.color }} />
                      </div>
                    </Reveal>
                    <Reveal from="right" delay={0.1} distance={60} amount={0.5}>
                      <span className="block text-7xl font-black leading-none" style={{ color: 'rgba(255,255,255,0.05)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Reveal>
                  </div>
                  <div>
                    <Reveal from="left" delay={0.2} distance={50} amount={0.5}>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{p.keyword}</span>
                        <span className="text-sm text-white/30">should produce</span>
                      </div>
                    </Reveal>
                    <Reveal from="up" delay={0.35} distance={40} amount={0.5}>
                      <div className="mt-2 text-4xl font-black tracking-tight md:text-5xl" style={{ color: p.color }}>
                        {p.produces}
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Sticky title (right on desktop); starts below the navbar line */}
          <div className="order-1 self-start lg:sticky lg:top-28 lg:order-2 lg:col-span-5">
            <Reveal from="down" distance={30}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs uppercase tracking-widest text-[#D4AF37]">
                Our Core Beliefs
              </div>
            </Reveal>
            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter lg:text-7xl">
              <Reveal from="right" delay={0.1} distance={80}>
                Our
              </Reveal>
              <Reveal from="left" delay={0.22} distance={80}>
                <span className="text-gradient">Philo&shy;sophy</span>
              </Reveal>
            </h2>
            <Reveal from="up" delay={0.4}>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-white/60">
                We do not merely seek to inform people; we seek to inspire, instruct, equip, and empower them.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}