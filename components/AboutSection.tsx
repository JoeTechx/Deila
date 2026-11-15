'use client'

import Reveal from './Reveal'
import TiltCard from './TiltCard'

const tags = ['Webinars', 'Leadership Training', 'Mentorship', 'Networking']

/** Every piece comes in on its own, from a different direction, and replays each time you scroll back.
 *  Colors come from theme classes in globals.css (.chip-badge, .chip, .copy-muted, .theme-card),
 *  so dark and light mode both work with no .light overrides. */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: big editorial headline */}
          <div className="lg:col-span-7">
            <Reveal from="down" distance={30}>
              <div className="chip-badge mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs uppercase tracking-widest">
                About DEILA
              </div>
            </Reveal>
            <h2 className="mb-8 text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-8xl">
              <Reveal from="left" delay={0.1} distance={90}>
                Bridging <span className="text-gradient">Knowledge</span>
              </Reveal>
              <Reveal from="right" delay={0.25} distance={90}>
                and <span className="text-gradient">Action</span>
              </Reveal>
            </h2>
            <Reveal from="up" delay={0.4}>
              <p className="copy-muted max-w-xl text-base leading-relaxed">
                DEILA exists to bridge the gap between knowledge and practical application by providing platforms for
                learning, leadership development, entrepreneurship education, mentorship, networking, and personal
                transformation.
              </p>
            </Reveal>
          </div>

          {/* Right: the 3D logo floats above this column; the card sits below it */}
          <div className="lg:col-span-5 lg:pt-44">
            <Reveal from="right" delay={0.2} distance={90}>
              <TiltCard className="theme-card rounded-3xl p-8 backdrop-blur-md">
                <Reveal from="up" delay={0.35}>
                  <p className="copy-muted mb-8 leading-relaxed">
                    We believe people should not merely acquire information but be equipped with the knowledge, skills,
                    values, and capacity to translate ideas into action, opportunities into achievements, and potential
                    into societal impact.
                  </p>
                </Reveal>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, i) => (
                    <Reveal key={tag} from="zoom" delay={0.5 + i * 0.1} amount={0.5}>
                      <span className="chip block rounded-full px-4 py-2 text-xs tracking-widest">{tag}</span>
                    </Reveal>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}