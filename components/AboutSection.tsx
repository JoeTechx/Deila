'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

function FloatingGeometry() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 5

    const geo = new THREE.OctahedronGeometry(1.5, 0)
    const mat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, wireframe: true, transparent: true, opacity: 0.5 })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 })
    )
    scene.add(inner)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.03, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.3 })
    )
    ring.rotation.x = Math.PI / 2.5
    scene.add(ring)

    let id: number
    const clock = new THREE.Clock()
    const animate = () => {
      id = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      mesh.rotation.x = t * 0.4
      mesh.rotation.y = t * 0.5
      inner.rotation.x = -t * 0.6
      inner.rotation.y = t * 0.4
      ring.rotation.z = t * 0.3
      mesh.position.y = Math.sin(t * 0.8) * 0.3
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(id)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
        <span className="text-[20vw] font-black tracking-tighter" style={{ color: 'rgba(255,255,255,0.02)' }}>DEILA</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs tracking-widest uppercase mb-6"
            >
              About DEILA
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter mb-6"
            >
              Bridging{' '}
              <span className="text-gradient">Knowledge</span>
              {' '}and{' '}
              <span className="text-gradient">Action</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-6"
            >
              DEILA exists to bridge the gap between knowledge and practical application by providing
              platforms for learning, leadership development, entrepreneurship education, mentorship,
              networking, and personal transformation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/40 text-base leading-relaxed mb-10"
            >
              We believe people should not merely acquire information but be equipped with the
              knowledge, skills, values, and capacity to translate ideas into action,
              opportunities into achievements, and potential into societal impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {['Webinars', 'Leadership Training', 'Mentorship', 'Networking'].map((tag, i) => (
                <span key={i} className="px-4 py-2 border border-[#D4AF37]/20 text-[#D4AF37]/70 text-xs tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <FloatingGeometry />
            <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: 'rgba(212,175,55,0.05)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
