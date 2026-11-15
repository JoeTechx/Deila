'use client'

import { Brain, Award, Rocket, Puzzle, GitBranch, BarChart3 } from 'lucide-react'
import Reveal from './Reveal'

const pillars = [
  { icon: Brain,    keyword: 'Knowledge',       produces: 'Competence',        color: 'var(--accent)' },
  { icon: Award,    keyword: 'Leadership',      produces: 'Service',           color: 'var(--accent-red)' },
  { icon: Rocket,   keyword: 'Entrepreneurship',produces: 'Opportunities',     color: 'var(--accent)' },
  { icon: Puzzle,   keyword: 'Innovation',      produces: 'Solutions',         color: 'var(--accent-red)' },
  { icon: GitBranch,keyword: 'Collaboration',   produces: 'Results',           color: 'var(--accent)' },
  { icon: BarChart3,keyword: 'Development',     produces: 'Measurable Impact', color: 'var(--accent-red)' },
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
                  className="philo-card sticky flex min-h-[240px] flex-col justify-between rounded-3xl p-7 md:p-9"
                  style={{ top: `calc(7.5rem + ${i * 1.1}rem)` }}
                >
                  <div className="flex items-start justify-between">
                    <Reveal from="zoom" amount={0.5}>
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: `color-mix(in srgb, ${p.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 19%, transparent)` }}
                      >
                        <Icon size={24} style={{ color: p.color }} />
                      </div>
                    </Reveal>
                    <Reveal from="right" delay={0.1} distance={60} amount={0.5}>
                      <span className="block text-7xl font-black leading-none" style={{ color: 'var(--border)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Reveal>
                  </div>
                  <div>
                    <Reveal from="left" delay={0.2} distance={50} amount={0.5}>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-2xl font-bold">{p.keyword}</span>
                        <span className="copy-dim text-sm">should produce</span>
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
              <div className="chip-badge mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs uppercase tracking-widest">
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
              <p className="copy-muted mt-4 max-w-sm text-base leading-relaxed">
                We do not merely seek to inform people; we seek to inspire, instruct, equip, and empower them.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}