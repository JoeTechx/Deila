'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  // { label: 'What We Do', href: '#whatwedo' },
  // { label: 'Vision & Mission', href: '#vision' },
  { label: 'Webinars', href: '#webinars' },
  // { label: 'Philosophy', href: '#philosophy' },
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
        scrolled ? 'bg-[var(--bg-nav)] backdrop-blur-xl py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a href="#home" className="flex items-center gap-2.5" whileHover={{ scale: 1.03 }}>
          {/* Actual brand logo image */}
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--border-subtle)] shadow-sm">
            <Image
              src="/deila-brand-logo.jpg"
              alt="DEILA Logo"
              fill
              sizes="36px"
              className="object-cover object-center"
              priority
            />
          </div>
          {/* Wordmark sits beside it */}
          <span className="text-xl font-black tracking-tighter text-[var(--fg)]">
            DE<span className="text-gradient">ILA</span>
          </span>
        </motion.a>

        {/* Desktop links. Colors come from the .nav-link rules in globals.css (dark = white, light = navy). */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-active={active === link.href}
              className="nav-link relative rounded-full px-4 py-2 text-sm"
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
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

        {/* Theme toggle — desktop */}
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>

      </div>

        {/* Mobile row: theme toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button className="p-2 text-[var(--fg)] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-[var(--border-nav)] bg-[var(--bg-mobile)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {/* Mobile menu header with logo */}
              <div className="mb-2 flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--border-subtle)]">
                  <Image src="/deila-brand-logo.jpg" alt="DEILA" fill sizes="32px" className="object-cover object-center" />
                </div>
                <span className="text-lg font-black tracking-tighter text-[var(--fg)]">
                  DE<span className="text-gradient">ILA</span>
                </span>
              </div>
              <div className="mb-2 h-px bg-[var(--border)]" />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  data-active={active === link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="nav-link py-2 text-base"
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

      {/* Scroll progress line — accent color adapts to theme */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{ scaleX: progress, background: 'linear-gradient(to right, var(--accent), var(--accent-light), var(--accent))' }}
      />
    </motion.nav>
  )
}