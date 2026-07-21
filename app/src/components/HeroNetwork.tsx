import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 44
const LINK_DIST = 2.6

// The node graph is a fixed decorative constant, generated once at module load
// (keeps render pure — no Math.random during render).
function buildGraph() {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4))
  }
  const positions = new Float32Array(NODE_COUNT * 3)
  nodes.forEach((n, i) => positions.set([n.x, n.y, n.z], i * 3))

  const links: number[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DIST) {
        links.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }
  return { positions, linePositions: new Float32Array(links) }
}

const GRAPH = buildGraph()

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function Scene() {
  const group = useRef<THREE.Group>(null)
  const scroll = useRef(0)
  const { positions, linePositions } = GRAPH

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    // Slow ambient rotation.
    g.rotation.y += delta * 0.045
    // Subtle scroll-tied parallax (not mouse-reactive — kept calm).
    const targetX = scroll.current * 0.0005
    g.rotation.x += (targetX - g.rotation.x) * 0.04
    g.position.y = Math.min(scroll.current * 0.001, 3)
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00E5FF" size={0.07} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1C93AC" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

// Decorative low-poly network accent, scoped to the hero. Returns null when
// WebGL is unavailable so the hero degrades to the plain V2 composition.
export default function HeroNetwork() {
  if (typeof window === 'undefined' || !hasWebGL()) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 52 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
    >
      <Scene />
    </Canvas>
  )
}
