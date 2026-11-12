'use client'

import { useMemo, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'

export type RevealFrom = 'left' | 'right' | 'up' | 'down' | 'zoom'

const hiddenState = (from: RevealFrom, d: number) => {
  switch (from) {
    case 'left':
      return { opacity: 0, x: -d }
    case 'right':
      return { opacity: 0, x: d }
    case 'up':
      return { opacity: 0, y: d }
    case 'down':
      return { opacity: 0, y: -d }
    default:
      return { opacity: 0, scale: 0.6 }
  }
}

/**
 * Plays every time the element scrolls into view and resets when it scrolls out,
 * so the animation replays when you scroll down AND back up.
 * from:  direction it comes from (zoom = grows from small)
 * delay: stagger between items (seconds)
 * intro: extra delay for the very first play only (e.g. waiting for the preloader)
 */
export default function Reveal({
  children,
  from = 'up',
  delay = 0,
  intro = 0,
  distance = 50,
  duration = 0.8,
  amount = 0.3,
  className,
  style,
}: {
  children: React.ReactNode
  from?: RevealFrom
  delay?: number
  intro?: number
  distance?: number
  duration?: number
  amount?: number
  className?: string
  style?: React.CSSProperties
}) {
  const played = useRef(false)

  const variants = useMemo<Variants>(
    () => ({
      hidden: { ...hiddenState(from, distance), transition: { duration: 0.35 } },
      show: () => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          delay: delay + (played.current ? 0 : intro),
          duration,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      }),
    }),
    [from, delay, intro, distance, duration]
  )

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount }}
      onAnimationComplete={(def) => {
        if (def === 'show') played.current = true
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}