import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import AboutSection from '@/components/AboutSection'
import WhatWeDoSection from '@/components/WhatWeDoSection'
import VisionMissionSection from '@/components/VisionMissionSection'
import PhilosophySection from '@/components/PhilosophySection'
import ApproachSection from '@/components/ApproachSection'
import JoinSection from '@/components/JoinSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-black overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <WhatWeDoSection />
      <VisionMissionSection />
      <PhilosophySection />
      <ApproachSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
