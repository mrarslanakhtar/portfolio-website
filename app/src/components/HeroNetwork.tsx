import { useEffect, useRef } from 'react'

// Decorative low-poly network accent, scoped to the hero. A hand-rolled 3D
// point cloud projected onto a 2D canvas — same visual as the previous
// three.js scene (slow ambient rotation, perspective depth, scroll-tied
// parallax) at a fraction of its ~860KB chunk. Rendering pauses entirely
// while the hero is out of view.

const NODE_COUNT = 44
const LINK_DIST = 2.6
const CAM_Z = 9
const FOV = 52 // degrees, vertical — matches the old three.js camera

type Node = { x: number; y: number; z: number }

// Seeded PRNG so the composition is art-directed and identical for every
// visitor instead of left to chance.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Fixed decorative constant, generated once at module load (render stays pure).
function buildGraph() {
  const rand = mulberry32(20261004)
  const nodes: Node[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: (rand() - 0.5) * 8,
      y: (rand() - 0.5) * 8,
      z: (rand() - 0.5) * 4,
    })
  }
  const links: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dz = nodes[i].z - nodes[j].z
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DIST) links.push([i, j])
    }
  }
  return { nodes, links }
}

const GRAPH = buildGraph()
// Links that carry a traveling pulse (indices into the links array).
const PULSE_LINKS = [2, 9, 17, 25, 33]

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = false
    let last = performance.now()
    let rotY = 0
    let rotX = 0
    let pulseT = 0
    let scrollY = window.scrollY
    let width = 0
    let height = 0
    let dpr = 1
    let rect = canvas.getBoundingClientRect()

    // Pointer: a gentle tilt of the whole cloud toward the cursor, and nodes
    // near it brighten — the graph notices you. Fine pointers only.
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let pointerX = -1e4
    let pointerY = -1e4
    let tiltY = 0
    let tiltX = 0
    let targetTiltY = 0
    let targetTiltX = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
    }

    const onScroll = () => {
      scrollY = window.scrollY
      rect = canvas.getBoundingClientRect()
    }

    const onPointer = (e: PointerEvent) => {
      pointerX = e.clientX - rect.left
      pointerY = e.clientY - rect.top
      targetTiltY = (pointerX / width - 0.5) * 0.3
      targetTiltX = (pointerY / height - 0.5) * -0.2
    }
    const onPointerLeave = () => {
      pointerX = -1e4
      pointerY = -1e4
      targetTiltY = 0
      targetTiltX = 0
    }

    // Projected node buffer, reused across frames.
    const px = new Float32Array(NODE_COUNT)
    const py = new Float32Array(NODE_COUNT)
    const pz = new Float32Array(NODE_COUNT)
    const near = new Float32Array(NODE_COUNT)

    const draw = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1)
      last = now

      // Slow ambient rotation + subtle scroll-tied parallax + pointer tilt.
      rotY += delta * 0.045
      const targetX = scrollY * 0.0005
      rotX += (targetX - rotX) * 0.04
      tiltY += (targetTiltY - tiltY) * 0.05
      tiltX += (targetTiltX - tiltX) * 0.05
      const liftY = Math.min(scrollY * 0.001, 3)

      const focal = height / 2 / Math.tan(((FOV / 2) * Math.PI) / 180)
      const cosY = Math.cos(rotY + tiltY)
      const sinY = Math.sin(rotY + tiltY)
      const cosX = Math.cos(rotX + tiltX)
      const sinX = Math.sin(rotX + tiltX)
      const cx = width / 2
      const cy = height / 2

      const { nodes, links } = GRAPH
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i]
        // Rotate around Y, then X, then lift with scroll.
        const x1 = n.x * cosY + n.z * sinY
        const z1 = -n.x * sinY + n.z * cosY
        const y2 = n.y * cosX - z1 * sinX + liftY
        const z2 = n.y * sinX + z1 * cosX
        const depth = CAM_Z - z2
        const s = focal / depth
        px[i] = cx + x1 * s
        py[i] = cy - y2 * s
        pz[i] = depth
        // Proximity to the pointer, 0–1 within a 170px radius.
        const dx = px[i] - pointerX
        const dy = py[i] - pointerY
        near[i] = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 170)
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Links first, points over them — same layering as the old scene.
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(28, 147, 172, 0.16)'
      ctx.beginPath()
      for (const [a, b] of links) {
        ctx.moveTo(px[a], py[a])
        ctx.lineTo(px[b], py[b])
      }
      ctx.stroke()

      // Links touching a node near the pointer light up.
      for (const [a, b] of links) {
        const glow = Math.max(near[a], near[b])
        if (glow <= 0) continue
        ctx.strokeStyle = `rgba(0, 229, 255, ${(0.08 + 0.5 * glow).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(px[a], py[a])
        ctx.lineTo(px[b], py[b])
        ctx.stroke()
      }

      // Signal pulses: bright points traveling along a few links — traffic
      // crossing the trust chain. Staggered phases, slow cadence.
      pulseT += delta * 0.22
      for (let p = 0; links.length > 0 && p < PULSE_LINKS.length; p++) {
        const [a, b] = links[PULSE_LINKS[p] % links.length]
        const t = (pulseT + p * 0.37) % 1
        const e = t * t * (3 - 2 * t) // smoothstep, eases both ends
        const sx = px[a] + (px[b] - px[a]) * e
        const sy = py[a] + (py[b] - py[a]) * e
        // Fade in/out at the ends of the run.
        const fade = Math.min(1, Math.min(t, 1 - t) * 6)
        ctx.fillStyle = `rgba(0, 229, 255, ${(0.55 * fade).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(sx, sy, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < NODE_COUNT; i++) {
        // Size and alpha attenuate with depth, like sizeAttenuation did;
        // nodes near the pointer swell and brighten.
        const r = Math.max((0.035 * focal) / pz[i], 0.8) * (1 + near[i] * 1.4)
        const alpha = Math.min(1, Math.min(0.7, (0.7 * 10) / (pz[i] * 1.6)) + near[i] * 0.5)
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(px[i], py[i], r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()

    // Only render while the hero is actually on screen.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) start()
        else stop()
      },
      { rootMargin: '80px 0px' },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (finePointer) {
      window.addEventListener('pointermove', onPointer, { passive: true })
      document.documentElement.addEventListener('mouseleave', onPointerLeave)
    }

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full motion-safe:animate-[fade-up_1.2s_ease-out_both]"
      aria-hidden="true"
    />
  )
}
