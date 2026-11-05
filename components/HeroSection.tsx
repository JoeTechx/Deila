'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { ArrowRight, Play } from 'lucide-react'

const words = ['DEVELOPING', 'PEOPLE.', 'BUILDING', 'LEADERS.']

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Particle system
    const particleCount = 3000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100

      const isGold = Math.random() > 0.6
      colors[i3] = isGold ? 0.83 : 1
      colors[i3 + 1] = isGold ? 0.69 : 1
      colors[i3 + 2] = isGold ? 0.22 : 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Orbiting torus
    const torusGeo = new THREE.TorusGeometry(8, 0.08, 16, 200)
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.3 })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.rotation.x = Math.PI / 3
    scene.add(torus)

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(12, 0.04, 16, 200),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 })
    )
    torus2.rotation.x = -Math.PI / 4
    torus2.rotation.y = Math.PI / 6
    scene.add(torus2)

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3, 1)
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, wireframe: true, transparent: true, opacity: 0.15 })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    scene.add(ico)

    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    let animationId: number
    const clock = new THREE.Clock()
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      particles.rotation.y = elapsed * 0.03
      particles.rotation.x = elapsed * 0.01
      torus.rotation.z = elapsed * 0.2
      torus.rotation.y = elapsed * 0.1
      torus2.rotation.z = -elapsed * 0.15
      torus2.rotation.x = elapsed * 0.08
      ico.rotation.x = elapsed * 0.3
      ico.rotation.y = elapsed * 0.2

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } }
  }
  const wordVariant = {
    hidden: { y: 100, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(212,175,55,0.05)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium tracking-widest uppercase mb-8"
          style={{ background: 'rgba(212,175,55,0.05)' }}
        >
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
          DASAYO Entrepreneurship Innovation Leadership Academy
        </motion.div>

        {/* Main heading */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="overflow-hidden"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-black leading-[0.9] tracking-tighter mb-6">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-4 last:mr-0">
                <motion.span
                  variants={wordVariant}
                  className={`inline-block ${i === 2 || i === 3 ? 'text-gradient' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed mb-10"
        >
          Inspiring Innovation. Creating Impact. We bridge the gap between knowledge and
          practical application — equipping individuals to transform ideas into action
          and potential into lasting societal impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#join"
            className="flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-sm tracking-wide hover:bg-[#F0D060] transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Join the Movement
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#about"
            className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full text-sm tracking-wide hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play size={14} className="fill-current" />
            Explore DEILA
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
