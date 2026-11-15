'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { DE_PATH, ILA_PATH } from '@/lib/logoPaths'

/**
 * HOW DARK / LIGHT MODE WORKS FOR THE 3D LOGO
 * -------------------------------------------
 * 1. The theme button (next-themes) puts a class on <html>: "dark" or "light".
 *    Your CSS reads that class and flips the page colors.
 * 2. The 3D logo is drawn on a <canvas>, so CSS can't recolor it. Instead this file asks
 *    next-themes for the current theme (resolvedTheme) and eases every color toward the
 *    matching LOOK below (about 0.7s cross-fade), so it never "pops".
 * 3. To change how the logo looks, edit LOOKS below. Nothing else needs touching.
 *
 * DARK  (black page):  white "DE" + crimson "ILA", glossy, with a crimson glow.
 * LIGHT (pale page):   navy  "DE" + crimson "ILA", glossy. Both are dark enough to stand out on a light page.
 */
type Look = {
  de: string          // color of "DE"
  ila: string         // color of "ILA"
  deGlow: string      // faint self-glow so shaded sides never go black
  ilaGlow: string
  metal: number       // 0 = painted/plastic, 1 = mirror metal (lower keeps the true color visible)
  rough: number       // 0 = mirror shiny, 1 = matte
  env: number         // strength of the reflections
  ring1: string       // halo ring colors
  ring2: string
  dust: string        // floating particle color
  dustOpacity: number
  accentLight: string // colored light from the lower left
  fillLight: string   // soft light from the front
  exposure: number    // overall brightness of the 3D scene
  opacity: number     // multiplies every pose opacity below
}

const LOOKS: Record<'dark' | 'light', Look> = {
  dark: {
    de: '#ffffff',
    ila: '#C1272D',
    deGlow: '#1a1f33',
    ilaGlow: '#3a0709',
    metal: 0.25,
    rough: 0.28,
    env: 1.5,
    ring1: '#C1272D',
    ring2: '#ffffff',
    dust: '#ffffff',
    dustOpacity: 0.5,
    accentLight: '#C1272D',
    fillLight: '#cfd8ff',
    exposure: 1.3,
    opacity: 1,
  },
  light: {
    de: '#1B2854',
    ila: '#8B1A1A',
    deGlow: '#0b1230',
    ilaGlow: '#2a0505',
    metal: 0.2,
    rough: 0.32,
    env: 1.1,
    ring1: '#1B2854',
    ring2: '#8B1A1A',
    dust: '#1B2854',
    dustOpacity: 0.22,
    accentLight: '#ffffff',
    fillLight: '#ffffff',
    exposure: 1.0,
    opacity: 1,
  },
}

/**
 * One fixed WebGL canvas behind the whole page.
 * Pose system: each data-scene div maps to a Pose below.
 */
type Pose = { x: number; y: number; s: number; z: number; rx: number; ry: number; rz: number; o: number; h: number }

const TAU = Math.PI * 2
const POSES: Record<string, Pose> = {
  hero:       { x: 0.48,  y: 0.05,  s: 0.42, z: 0,  rx: 0.05,  ry: 0,              rz: 0,     o: 0.70, h: 1 },
  stats:      { x: 0,     y: 0.6,   s: 0.3,  z: -2, rx: 0.2,   ry: 0.6,            rz: 0,     o: 1,    h: 0 },
  about:      { x: 0.5,   y: 0.12,  s: 0.42, z: 0,  rx: 0.12,  ry: TAU - 0.5,      rz: 0.04,  o: 1,    h: 0 },
  whatwedo:   { x: 0,     y: 0.25,  s: 1.1,  z: -6, rx: 0.4,   ry: TAU * 1.5,      rz: 0,     o: 0.32, h: 0 },
  vision:     { x: -0.6,  y: -0.3,  s: 0.36, z: 0,  rx: -0.1,  ry: TAU * 2 + 0.5,  rz: -0.04, o: 0.32, h: 0 },
  philosophy: { x: 0.55,  y: -0.1,  s: 0.36, z: -1, rx: 0.2,   ry: TAU * 3 - 0.45, rz: 0.03,  o: 0.32, h: 0 },
  approach:   { x: 0,     y: 0,     s: 0.95, z: -4, rx: -0.15, ry: TAU * 3 + 0.5,  rz: 0,     o: 0.32, h: 0 },
  webinars:   { x: 0,     y: 0,     s: 1,    z: -6, rx: 0.2,   ry: TAU * 3.9,      rz: 0,     o: 0.22, h: 0 },
  join:       { x: 0,     y: 0,     s: 0.8,  z: -3, rx: 0.05,  ry: TAU * 4,        rz: 0,     o: 0.38, h: 0 },
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
  return mix(a, b, smooth(0.6, 1, t))
}

function buildLogo(env: THREE.Texture) {
  const loader = new SVGLoader()
  const make = (d: string) => {
    const data = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`)
    const shapes = data.paths.flatMap((p) => p.toShapes())
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 420,
      bevelEnabled: true,
      bevelThickness: 26,
      bevelSize: 18,
      bevelSegments: 4,
      curveSegments: 10,
    })
    // Physical material = painted-metal look with a glossy clear coat on top.
    // Colors/values here are placeholders; the render loop sets them from LOOKS every frame.
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.25,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMap: env,
      envMapIntensity: 1.5,
      transparent: true,
    })
    return new THREE.Mesh(geo, mat)
  }

  const inner = new THREE.Group()
  const de = make(DE_PATH)
  const ila = make(ILA_PATH)
  inner.add(de, ila)

  const box = new THREE.Box3().setFromObject(inner)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  inner.position.set(-center.x, -center.y, -center.z)
  const flip = new THREE.Group()
  flip.add(inner)
  flip.scale.set(1 / size.x, -1 / size.x, 1 / size.x)

  return {
    flip,
    deMat: de.material as THREE.MeshPhysicalMaterial,
    ilaMat: ila.material as THREE.MeshPhysicalMaterial,
  }
}

export default function SceneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  // Latest theme, readable inside the animation loop without restarting it
  const themeRef = useRef(resolvedTheme)
  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

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

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.z = 16

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 3)
    keyLight.position.set(3, 4, 6)
    const accentLight = new THREE.PointLight(0xffffff, 110, 40)
    accentLight.position.set(-4, -2, 6)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.6)
    fillLight.position.set(-2, 0, 8)
    scene.add(keyLight, accentLight, fillLight)

    // Logo + halo rings
    const pivot = new THREE.Group()
    const { flip, deMat, ilaMat } = buildLogo(envTex)
    pivot.add(flip)

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.003, 8, 200), ringMat1)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.002, 8, 200), ringMat2)
    ring1.rotation.x = Math.PI / 2.6
    ring2.rotation.set(-Math.PI / 3, 0.4, 0)
    pivot.add(ring1, ring2)
    scene.add(pivot)

    // Particles (vertex colors stay white; the material color tints them per theme)
    const isMobileCount = window.innerWidth < 768
    const count = isMobileCount ? 900 : 2200
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3).fill(1)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70
      pos[i * 3 + 1] = (Math.random() - 0.5) * 70
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 5
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.5, depthWrite: false })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Precomputed THREE.Colors for both looks, so the loop never allocates
    const toColors = (l: Look) => ({
      de: new THREE.Color(l.de),
      ila: new THREE.Color(l.ila),
      deGlow: new THREE.Color(l.deGlow),
      ilaGlow: new THREE.Color(l.ilaGlow),
      ring1: new THREE.Color(l.ring1),
      ring2: new THREE.Color(l.ring2),
      dust: new THREE.Color(l.dust),
      accent: new THREE.Color(l.accentLight),
      fill: new THREE.Color(l.fillLight),
    })
    const CD = toColors(LOOKS.dark)
    const CL = toColors(LOOKS.light)
    const lerp = THREE.MathUtils.lerp

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

    // 0 = fully dark look, 1 = fully light look. Eases toward the current theme.
    let tl = themeRef.current === 'light' ? 1 : 0

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

      // ── Theme blend ────────────────────────────────────
      const want = themeRef.current === 'light' ? 1 : 0
      tl += (want - tl) * (reduce ? 1 : 1 - Math.exp(-dt * 4))
      const D = LOOKS.dark
      const L = LOOKS.light

      deMat.color.copy(CD.de).lerp(CL.de, tl)
      ilaMat.color.copy(CD.ila).lerp(CL.ila, tl)
      deMat.emissive.copy(CD.deGlow).lerp(CL.deGlow, tl)
      ilaMat.emissive.copy(CD.ilaGlow).lerp(CL.ilaGlow, tl)
      const metal = lerp(D.metal, L.metal, tl)
      const rough = lerp(D.rough, L.rough, tl)
      const envI = lerp(D.env, L.env, tl)
      for (const m of [deMat, ilaMat]) {
        m.metalness = metal
        m.roughness = rough
        m.envMapIntensity = envI
      }
      ringMat1.color.copy(CD.ring1).lerp(CL.ring1, tl)
      ringMat2.color.copy(CD.ring2).lerp(CL.ring2, tl)
      pMat.color.copy(CD.dust).lerp(CL.dust, tl)
      pMat.opacity = lerp(D.dustOpacity, L.dustOpacity, tl)
      accentLight.color.copy(CD.accent).lerp(CL.accent, tl)
      fillLight.color.copy(CD.fill).lerp(CL.fill, tl)
      renderer.toneMappingExposure = lerp(D.exposure, L.exposure, tl)
      const themeOpacity = lerp(D.opacity, L.opacity, tl)

      // ── Pose interpolation ─────────────────────────────
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

      const mobileLift = mobile ? cur.h * 0.4 : 0
      pivot.position.set(cur.x * (mobile ? 0.3 : 1) * (vw / 2), (cur.y + mobileLift) * (vh / 2), cur.z)
      pivot.scale.setScalar(s * vw * (0.55 + 0.45 * e))
      pivot.rotation.set(
        cur.rx + velTilt + smy * 0.12,
        cur.ry - (1 - e) * Math.PI * 1.5 + smx * 0.25,
        cur.rz
      )

      const dim = mobile ? 1 - (1 - cur.h) * 0.45 : 1
      const op = cur.o * e * dim * themeOpacity
      deMat.opacity = op
      ilaMat.opacity = op
      ringMat1.opacity = op * 0.45
      ringMat2.opacity = op * lerp(0.12, 0.1, tl)

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
  }, []) // runs once; theme changes are picked up through themeRef

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none" aria-hidden />
}