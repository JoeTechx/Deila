'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: MotionStyle
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
