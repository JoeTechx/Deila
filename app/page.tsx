import Preloader from '@/components/homepage/Preloader'
import SceneBackground from '@/components/homepage/SceneBackground'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/homepage/HeroSection'
import StatsBar from '@/components/homepage/StatsBar'
import AboutSection from '@/components/homepage/AboutSection'
import WhatWeDoSection from '@/components/homepage/WhatWeDoSection'
import VisionMissionSection from '@/components/homepage/VisionMissionSection'
import PhilosophySection from '@/components/homepage/PhilosophySection'
import ApproachSection from '@/components/homepage/ApproachSection'
import JoinSection from '@/components/homepage/JoinSection'
import Footer from '@/components/Footer'
import WebinarsSection from '@/components/homepage/webinarsSection'
import FoundersTeaser from '@/components/homepage/FoundersTeaser'

// Each data-scene wrapper tells the 3D logo which pose to use while that section is on screen.
// Poses are defined in components/SceneBackground.tsx.
export default function Home() {
  return (
    <>
      <Preloader />
      <SceneBackground />
      <main className="relative z-10 overflow-x-clip">
        <Navbar />
        <div data-scene="hero"><HeroSection /></div>
        <div data-scene="stats"><StatsBar /></div>
        <div data-scene="about"><AboutSection /></div>
        <div data-scene="whatwedo"><WhatWeDoSection /></div>
        <div data-scene="vision"><VisionMissionSection /></div>
        <div data-scene="philosophy"><PhilosophySection /></div>
        <div data-scene="approach"><ApproachSection /></div>
        <div data-scene="webinars"><WebinarsSection /></div>
        <div data-scene="founders"><FoundersTeaser /></div>
        {/* Curtain reveal: Join stays pinned while the footer slides up and covers it (and the 3D logo behind) */}
          <div data-scene="join" className="sticky top-0 z-0"><JoinSection /></div>
        <div id="finale" className="relative">
          <Footer />
        </div>
      </main>
    </>
  )
}