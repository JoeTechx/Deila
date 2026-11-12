'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { DE_PATH, ILA_PATH } from '@/lib/logoPaths'

/**
 * One fixed WebGL canvas behind the whole page.
 * Every <div data-scene="name"> in page.tsx has a pose below. As you scroll, the logo
 * holds the pose of the section you are in, then glides/spins into the next one.
 *
 * x, y  -> fraction of half the visible width/height (-1 … 1)
 * s     -> logo width as a fraction of the visible width
 * z     -> depth (negative = further away)
 * rx, ry, rz -> rotation in radians (ry keeps increasing so the logo keeps spinning forward)
 * o     -> opacity   h -> 1 only for the hero (used to keep the hero bright on phones)
 */
type Pose = { x: number; y: number; s: number; z: number; rx: number; ry: number; rz: number; o: number; h: number }

const TAU = Math.PI * 2
const POSES: Record<string, Pose> = {
  hero:       { x: 0,     y: 0.3,   s: 0.62, z: 0,  rx: 0.05,  ry: 0,             rz: 0,     o: 0.70,    h: 1 },
  stats:      { x: 0,     y: 0.6,   s: 0.3,  z: -2, rx: 0.2,   ry: 0.6,           rz: 0,     o: 1,  h: 0 },
  about:      { x: 0.5,   y: 0.12,  s: 0.42, z: 0,  rx: 0.12,  ry: TAU - 0.5,     rz: 0.04,  o: 1,    h: 0 },
  whatwedo:   { x: 0,     y: 0.25,  s: 1.1,  z: -6, rx: 0.4,   ry: TAU * 1.5,     rz: 0,     o: 0.32, h: 0 },
  vision:     { x: -0.6,  y: -0.3,   s: 0.36, z: 0,  rx: -0.1,  ry: TAU * 2 + 0.5, rz: -0.04, o: 0.32,    h: 0 },
  philosophy: { x: 0.55,  y: -0.1,  s: 0.36, z: -1, rx: 0.2,   ry: TAU * 3 - 0.45, rz: 0.03, o: 0.32, h: 0 },
  approach:   { x: 0,     y: 0,     s: 0.95, z: -4, rx: -0.15, ry: TAU * 3 + 0.5, rz: 0,     o: 0.32, h: 0 },
  join:       { x: 0,     y: 0,     s: 0.8,  z: -3, rx: 0.05,  ry: TAU * 4,       rz: 0,     o: 0.38,  h: 0 },
}
const KEYS = Object.keys(POSES.hero) as (keyof Pose)[]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const mix = (a: Pose, b: Pose, k: number): Pose => {
  const out = {} as Pose
  for (const key of KEYS) out[key] = a[key] + (b[key] - a[key]) * k
  return out
}

function samplePose(): Pose {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
  if (!els.length) return POSES.hero
  const mid = window.innerHeight * 0.5
  let i = 0
  for (let k = 0; k < els.length; k++) if (els[k].getBoundingClientRect().top <= mid) i = k
  const rect = els[i].getBoundingClientRect()
  const t = clamp01((mid - rect.top) / rect.height)
  const a = POSES[els[i].dataset.scene ?? 'hero'] ?? POSES.hero
  const next = els[i + 1]
  if (!next) return a
  const b = POSES[next.dataset.scene ?? 'hero'] ?? a
  return mix(a, b, smooth(0.6, 1, t)) // hold the pose for 60% of the section, then transition
}

function buildLogo(env: THREE.Texture) {
  const loader = new SVGLoader()
  const make = (d: string, color: number, roughness: number, emissive: number) => {
    const data = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`)
    const shapes = data.paths.flatMap((p) => p.toShapes())
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 420,
      bevelEnabled: true,
      bevelThickness: 26,
      bevelSize: 18,
      bevelSegments: 3,
      curveSegments: 10,
    })
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 1,
      roughness,
      envMap: env,
      envMapIntensity: 1.9,
      emissive,
      transparent: true,
    })
    return new THREE.Mesh(geo, mat)
  }

  const inner = new THREE.Group()
  const de = make(DE_PATH, 0xf2f2f2, 0.3, 0x2a2a2a) // slight self-glow so it never goes fully dark
  const ila = make(ILA_PATH, 0xd4af37, 0.22, 0x5a4300) // gold from globals.css, with self-glow
  inner.add(de, ila)

  // Center it, normalise width to 1 unit, and flip Y (SVG coordinates point down)
  const box = new THREE.Box3().setFromObject(inner)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  inner.position.set(-center.x, -center.y, -center.z)
  const flip = new THREE.Group()
  flip.add(inner)
  flip.scale.set(1 / size.x, -1 / size.x, 1 / size.x)
  return { flip, materials: [de.material, ila.material] as THREE.MeshStandardMaterial[] }
}

export default function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      return // no WebGL: the page still works without the 3D layer
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.45

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.z = 16

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 3)
    keyLight.position.set(3, 4, 6)
    const gold = new THREE.PointLight(0xd4af37, 120, 40)
    gold.position.set(-4, -2, 6)
    const fill = new THREE.DirectionalLight(0xfff1cc, 1.6) // soft front light
    fill.position.set(-2, 0, 8)
    scene.add(keyLight, gold, fill)

    // Logo + halo rings
    const pivot = new THREE.Group()
    const { flip, materials } = buildLogo(envTex)
    pivot.add(flip)

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true })
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.003, 8, 200), ringMat1)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.002, 8, 200), ringMat2)
    ring1.rotation.x = Math.PI / 2.6
    ring2.rotation.set(-Math.PI / 3, 0.4, 0)
    pivot.add(ring1, ring2)
    scene.add(pivot)

    // Particles
    const mobileCount = window.innerWidth < 768
    const count = mobileCount ? 900 : 2200
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70
      pos[i * 3 + 1] = (Math.random() - 0.5) * 70
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5
      const isGold = Math.random() > 0.6
      col[i * 3] = isGold ? 0.83 : 1
      col[i * 3 + 1] = isGold ? 0.69 : 1
      col[i * 3 + 2] = isGold ? 0.22 : 1
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Input + sizing
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let mx = 0
    let my = 0
    let smx = 0
    let smy = 0
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight, false)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)

    // Intro: waits for the preloader to leave (with a fallback timer)
    let introStart = -1
    const nowSec = () => performance.now() / 1000
    const onReady = () => {
      if (introStart < 0) introStart = nowSec()
    }
    window.addEventListener('deila:ready', onReady)
    const fallback = window.setTimeout(onReady, 4000)

    const cur: Pose = { ...POSES.hero }
    let last = nowSec()
    let lastY = window.scrollY
    let vel = 0
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const now = nowSec()
      const dt = Math.min(now - last, 0.05)
      last = now

      const target = samplePose()
      const k = reduce ? 1 : 1 - Math.exp(-dt * 4.5)
      for (const key of KEYS) cur[key] += (target[key] - cur[key]) * k

      const sy = window.scrollY
      vel += ((sy - lastY) / Math.max(dt, 0.001) - vel) * Math.min(1, dt * 8)
      lastY = sy
      const velTilt = reduce ? 0 : THREE.MathUtils.clamp(vel * 0.0003, -0.45, 0.45)

      smx += (mx - smx) * Math.min(1, dt * 3)
      smy += (my - smy) * Math.min(1, dt * 3)

      const e = introStart < 0 ? 0 : 1 - Math.pow(1 - clamp01((now - introStart) / 2.4), 3)

      const aspect = camera.aspect
      const mobile = aspect < 0.9
      const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const vw = vh * aspect
      const s = mobile ? Math.min(cur.s * 1.6, 0.92) : cur.s

      pivot.position.set(cur.x * (mobile ? 0.3 : 1) * (vw / 2), cur.y * (vh / 2), cur.z)
      pivot.scale.setScalar(s * vw * (0.55 + 0.45 * e))
      pivot.rotation.set(
        cur.rx + velTilt + smy * 0.12,
        cur.ry - (1 - e) * Math.PI * 1.5 + smx * 0.25,
        cur.rz
      )

      const dim = mobile ? 1 - (1 - cur.h) * 0.45 : 1
      const op = cur.o * e * dim
      for (const m of materials) m.opacity = op
      ringMat1.opacity = op * 0.35
      ringMat2.opacity = op * 0.12
      ring1.rotation.z += dt * 0.25
      ring2.rotation.z -= dt * 0.18

      if (!reduce) {
        particles.rotation.y = now * 0.02 + sy * 0.0003
        particles.rotation.x = sy * 0.00015
      }
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('deila:ready', onReady)
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const m = mesh.material as THREE.Material | undefined
        if (m) m.dispose()
      })
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none" aria-hidden />
}