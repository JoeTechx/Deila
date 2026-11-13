'use client'

import { Video } from 'lucide-react'
import Reveal from './Reveal'

type Webinar = { date: string; title: string }

const years: { year: string; items: Webinar[] }[] = [
  {
    year: '2024',
    items: [
      { date: 'Sep 21', title: 'Demystifying Emotional Intelligence for all Encompassing Enduring Significance' },
      { date: 'Oct 6', title: 'Journeying from Financial Education to Financial Emancipation' },
      { date: 'Oct 20', title: 'Investing in our Youth for Global Generational Building and Development' },
      { date: 'Nov 17', title: 'Resilience Reigns: Equipped, Empowered and Envisioned' },
      { date: 'Dec 8', title: 'Unlocking the Year 2025' },
    ],
  },
  {
    year: '2025',
    items: [
      { date: 'Jan 31', title: 'The Good, and the Bad of the year 2024, Strategic Planning for the year 2025' },
      { date: 'Feb 28', title: 'Managing Mental Health for Optimal Success' },
      { date: 'Apr 13', title: 'Cybersecurity: Protecting yourself and your business from cyber threats' },
      { date: 'May 11', title: 'Self Nurturing in Marriage & Rekindling the Spark of Love on our Family' },
      { date: 'Jun 29', title: 'The Importance of Mentoring: Finding and Working with a Mentor' },
      { date: 'Aug 24', title: 'Leadership that Inspire a Better World' },
      { date: 'Sep 28', title: 'The Future of Work: Preparing for the Challenges and Opportunities of the 21st Century' },
      { date: 'Nov 2', title: 'Diverse Agricultural Investments, and other Investment Windows' },
      { date: 'Dec 7', title: 'Say NO to Detty/Dirty December' },
    ],
  },
  {
    year: '2026',
    items: [
      { date: 'Jan 25', title: 'Making Excellence a Daily Habit' },
      { date: 'Feb 22', title: 'Beyond the Butterflies: Building Love that Lasts' },
      { date: 'Mar 22', title: 'Future Proven Careers: Upskilling for the Job of 2026 and Beyond' },
      { date: 'Apr 26', title: 'Mental Health Resilience in the Workplace' },
      { date: 'May 17', title: '360 Degree Influence' },
      { date: 'Jun 21', title: 'AI Breakthroughs and Ethical Frontiers' },
      { date: 'Jul 19', title: 'Sustainable Business Model in a Challenging Economy' },
      { date: 'Aug 16', title: 'Love without Limits: Balancing Marriage and Career Success' },
      { date: 'Oct 4', title: 'Nigeria Since Independence: Our Journey, Our Reality and Our Responsibilities' },
    ],
  },
]

const total = years.reduce((n, y) => n + y.items.length, 0)
const lastYear = years[years.length - 1]
const latest = lastYear.items[lastYear.items.length - 1].title // gets the "Latest" tag

/** Webinars from 2024 till date: a sticky year label on the left, rows on the right that reveal one by one (and replay). */
export default function WebinarsSection() {
  return (
    <section id="webinars" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal from="down" distance={30}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 px-3.5 py-1.5 text-xs uppercase tracking-widest text-[#D4AF37]">
                <Video size={13} />
                Webinars
              </div>
            </Reveal>
            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter lg:text-7xl">
              <Reveal from="right" delay={0.1} distance={80}>
                DEILA
              </Reveal>
              <Reveal from="left" delay={0.22} distance={80}>
                <span className="text-gradient">Webinars</span>
              </Reveal>
            </h2>
            <Reveal from="up" delay={0.4}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
                Since September 2024, DEILA has hosted webinars on leadership, finance, mental health, relationships,
                technology and nation building.
              </p>
            </Reveal>
          </div>

          <div className="flex gap-3 lg:col-span-5 lg:justify-end">
            <Reveal from="zoom" delay={0.3}>
              <div className="rounded-2xl border border-white/10 px-6 py-4" style={{ background: 'rgba(10,10,10,0.6)' }}>
                <div className="text-gradient text-4xl font-black">{total}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/40">Webinars hosted</div>
              </div>
            </Reveal>
            <Reveal from="zoom" delay={0.45}>
              <div className="rounded-2xl border border-white/10 px-6 py-4" style={{ background: 'rgba(10,10,10,0.6)' }}>
                <div className="text-gradient text-4xl font-black">{years.length}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/40">Years running</div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* One block per year */}
        {years.map((y) => (
          <div key={y.year} className="mb-14 grid gap-6 border-t border-white/10 pt-10 lg:mb-20 lg:grid-cols-12 lg:gap-14">
            <div className="self-start lg:sticky lg:top-32 lg:col-span-4">
              <Reveal from="zoom" duration={0.9}>
                <div className="text-gradient text-7xl font-black leading-none tracking-tighter lg:text-9xl">{y.year}</div>
                <div className="mt-3 text-xs uppercase tracking-widest text-white/40">
                  {y.items.length} {y.items.length === 1 ? 'webinar' : 'webinars'}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              {y.items.map((w, i) => (
                <Reveal key={w.title} from="right" distance={60} amount={0.4}>
                  <div className="group flex items-start gap-4 border-b border-white/10 py-5 transition-colors duration-300 hover:border-[#D4AF37]/50 sm:gap-8">
                    <span className="w-16 shrink-0 pt-1 text-sm font-semibold uppercase tracking-widest text-[#D4AF37] sm:w-24">
                      {w.date}
                    </span>
                    <span className="flex-1 text-lg font-semibold leading-snug text-white/90 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:text-2xl">
                      {w.title}
                      {w.title === latest && (
                        <span className="ml-3 inline-block translate-y-[-2px] rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#F0D060]">
                          Latest
                        </span>
                      )}
                    </span>
                    <span className="hidden text-4xl font-black leading-none text-white/[0.06] sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}