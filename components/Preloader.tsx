'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DE_PATH, ILA_PATH, LOGO_VIEWBOX } from '@/lib/logoPaths'

export default function Preloader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      window.dispatchEvent(new Event('deila:ready')) // tells the 3D logo to fly in
      document.body.style.overflow = ''
      setShow(false)
    }, 2600)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg viewBox={LOGO_VIEWBOX} className="w-[min(78vw,620px)] h-auto" aria-label="DEILA">
            <defs>
              <linearGradient id="pre-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F0D060" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <motion.path
              d={DE_PATH}
              stroke="#ffffff"
              strokeWidth={10}
              initial={{ pathLength: 0, fillOpacity: 0, fill: '#ffffff' }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{ pathLength: { duration: 1.4, ease: 'easeInOut' }, fillOpacity: { delay: 1.3, duration: 0.6 } }}
            />
            <motion.path
              d={ILA_PATH}
              stroke="#D4AF37"
              strokeWidth={10}
              initial={{ pathLength: 0, fillOpacity: 0, fill: 'url(#pre-gold)' }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{ pathLength: { duration: 1.4, delay: 0.15, ease: 'easeInOut' }, fillOpacity: { delay: 1.4, duration: 0.6 } }}
            />
          </svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-8 text-[#D4AF37]/70 text-xs tracking-[0.4em] uppercase"
          >
            Developing People · Building Leaders
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
