'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DE_PATH, ILA_PATH, LOGO_VIEWBOX } from '@/lib/logoPaths'

/**
 * Brand colors only (navy / crimson / white), and it follows the theme:
 *   DARK  (default): black screen with a soft navy glow, white "DE", crimson "ILA"
 *   LIGHT:           pale screen with a faint navy glow, navy "DE", crimson "ILA"
 * Page colors come from the CSS variables in globals.css (--bg, --accent, --fg-muted),
 * so the theme class on <html> switches it with no extra code.
 */
const PRELOADER_CSS = `
.deila-pre { --pre-ila: #C1272D; --pre-glow: rgba(37, 52, 112, 0.6); }
.light .deila-pre { --pre-ila: #8B1A1A; --pre-glow: rgba(27, 40, 84, 0.10); }
`

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
          className="deila-pre fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, var(--pre-glow), transparent 65%), var(--bg)',
          }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <style>{PRELOADER_CSS}</style>

          <svg viewBox={LOGO_VIEWBOX} className="h-auto w-[min(78vw,620px)]" aria-label="DEILA">
            {/* "DE": white in dark mode, navy in light mode (--accent) */}
            <motion.path
              d={DE_PATH}
              strokeWidth={10}
              style={{ stroke: 'var(--accent)', fill: 'var(--accent)' }}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{ pathLength: { duration: 1.4, ease: 'easeInOut' }, fillOpacity: { delay: 1.3, duration: 0.6 } }}
            />
            {/* "ILA": crimson */}
            <motion.path
              d={ILA_PATH}
              strokeWidth={10}
              style={{ stroke: 'var(--pre-ila)', fill: 'var(--pre-ila)' }}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{ pathLength: { duration: 1.4, delay: 0.15, ease: 'easeInOut' }, fillOpacity: { delay: 1.4, duration: 0.6 } }}
            />
          </svg>

          {/* Crimson line draws out under the logo */}
          <motion.div
            className="mt-6 h-[3px] w-28 origin-center rounded-full"
            style={{ background: 'var(--pre-ila)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-6 text-xs uppercase tracking-[0.4em]"
            style={{ color: 'var(--fg-muted)' }}
          >
            Developing People · Building Leaders
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}