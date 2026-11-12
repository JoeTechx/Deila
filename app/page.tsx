import Preloader from '@/components/Preloader'
import SceneBackground from '@/components/SceneBackground'
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
        {/* Curtain reveal: Join stays pinned while the footer slides up and covers it (and the 3D logo behind) */}
          <div data-scene="join" className="sticky top-0 z-0"><JoinSection /></div>
        <div id="finale" className="relative">
          <Footer />
        </div>
      </main>
    </>
  )
}