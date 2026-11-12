'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#whatwedo' },
  { label: 'Vision & Mission', href: '#vision' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Join Us', href: '#join' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#home')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Drops in after the preloader
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2800)
    return () => clearTimeout(t)
  }, [])

  // Hides on scroll down, returns on scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHidden(y > last && y > 240)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tracks which section is in view for the sliding highlight
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: !ready || (hidden && !mobileOpen) ? -100 : 0, opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,padding] duration-500 ${
        scrolled ? 'bg-black/70 backdrop-blur-xl py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a href="#home" className="flex items-center gap-2" whileHover={{ scale: 1.03 }}>
          <span className="text-2xl font-black tracking-tighter text-white">
            DE<span className="text-gradient">ILA</span>
          </span>
        </motion.a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                active === link.href ? 'text-[#F0D060]' : 'text-white/60 hover:text-white'
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <motion.a
            href="#join"
            className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#F0D060]"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Join the Movement
          </motion.a>
        </div>

        <button className="p-2 text-white lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/5 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-2 text-base text-white/70 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#join"
                className="mt-2 rounded-full bg-[#D4AF37] px-5 py-3 text-center text-sm font-semibold text-black"
                onClick={() => setMobileOpen(false)}
              >
                Join the Movement
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress line */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#D4AF37] via-[#F0D060] to-[#D4AF37]"
      />
    </motion.nav>
  )
}
