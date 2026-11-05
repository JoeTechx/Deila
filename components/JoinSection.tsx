'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'

export default function JoinSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section id="join" ref={ref} className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)' }} />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 60%)' }} />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#D4AF37]/10"
            style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium tracking-widest uppercase mb-8"
          style={{ background: 'rgba(212,175,55,0.05)' }}
        >
          <Sparkles size={12} />
          Be Part of Something Greater
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight mb-6"
        >
          Join the{' '}
          <span className="text-gradient">Movement</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-white/50 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Connect with a community of leaders, entrepreneurs, and innovators committed
          to developing people, building capacity, and creating lasting impact across
          communities and industries.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl border border-[#D4AF37]/30"
            style={{ background: 'rgba(212,175,55,0.05)' }}
          >
            <div className="text-[#D4AF37] text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re In!</h3>
            <p className="text-white/50">Welcome to the DEILA movement. We&apos;ll be in touch soon.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-11 pr-4 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.07] transition-all duration-300 text-sm"
              />
            </div>
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-sm tracking-wide hover:bg-[#F0D060] transition-all duration-300 whitespace-nowrap"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Join the Movement
              <ArrowRight size={16} />
            </motion.button>
          </motion.form>
        )}

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-6 text-white/30 text-xs"
        >
          <span>No spam, ever.</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Unsubscribe anytime.</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Free to join.</span>
        </motion.div>
      </div>
    </section>
  )
}
