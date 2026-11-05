'use client'

import { motion } from 'framer-motion'
import { XIcon, Mail, ArrowUpRight, Link2 } from 'lucide-react'

const footerLinks = {
  'Organisation': [
    { label: 'About DEILA', href: '#about' },
    { label: 'Vision & Mission', href: '#vision' },
    { label: 'Our Philosophy', href: '#philosophy' },
    { label: 'Our Approach', href: '#' },
  ],
  'Programs': [
    { label: 'Leadership Development', href: '#whatwedo' },
    { label: 'Entrepreneurship', href: '#whatwedo' },
    { label: 'Mentorship', href: '#whatwedo' },
    { label: 'Digital Learning', href: '#whatwedo' },
  ],
  'Get Involved': [
    { label: 'Join the Movement', href: '#join' },
    { label: 'Become a Mentor', href: '#join' },
    { label: 'Partner with Us', href: '#join' },
    { label: 'Volunteer', href: '#join' },
  ],
}

const socials = [
  { icon: XIcon, href: '#', label: 'X (Twitter)' },
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: Link2, href: '#', label: 'Instagram' },
  { icon: Link2, href: '#', label: 'YouTube' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="inline-block text-3xl font-black tracking-tighter text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              DE<span className="text-gradient">ILA</span>
            </motion.a>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              DASAYO Entrepreneurship Innovation Leadership Academy. Developing People.
              Building Leaders. Inspiring Innovation. Creating Impact.
            </p>
            <p className="text-[#D4AF37]/60 text-xs font-medium italic leading-relaxed">
              &ldquo;One Vision. Many Gifts. Multiple Functions.<br />
              One Movement. Limitless Impact.&rdquo;
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-8">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} DEILA — DASAYO Entrepreneurship Innovation Leadership Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
