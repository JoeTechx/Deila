'use client'

import Reveal from './Reveal'
import TiltCard from './TiltCard'

const tags = ['Webinars', 'Leadership Training', 'Mentorship', 'Networking']

/** Every piece comes in on its own, from a different direction, and replays each time you scroll back. */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: big editorial headline */}
          <div className="lg:col-span-7">
            <Reveal from="down" distance={30}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 px-3 py-1.5 text-xs uppercase tracking-widest text-[#D4AF37]/70">
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
              <p className="max-w-xl text-md leading-relaxed text-white/55">
                DEILA exists to bridge the gap between knowledge and practical application by providing platforms for
                learning, leadership development, entrepreneurship education, mentorship, networking, and personal
                transformation.
              </p>
            </Reveal>
          </div>

          {/* Right: the 3D logo floats above this column; the card sits below it */}
          <div className="lg:col-span-5 lg:pt-44">
            <Reveal from="right" delay={0.2} distance={90}>
              <TiltCard className="rounded-3xl border border-white/10 p-8 backdrop-blur-md" style={{ background: 'rgba(10,10,10,0.65)' }}>
                <Reveal from="up" delay={0.35}>
                  <p className="mb-8 leading-relaxed text-white/60">
                    We believe people should not merely acquire information but be equipped with the knowledge, skills,
                    values, and capacity to translate ideas into action, opportunities into achievements, and potential
                    into societal impact.
                  </p>
                </Reveal>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, i) => (
                    <Reveal key={tag} from="zoom" delay={0.5 + i * 0.1} amount={0.5}>
                      <span className="block rounded-full border border-[#D4AF37]/25 px-4 py-2 text-xs tracking-widest text-[#D4AF37]/80">
                        {tag}
                      </span>
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