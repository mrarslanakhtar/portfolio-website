import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

function IcosahedronCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    if (isMobile) return // Hide on mobile per design

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })

    const container = canvas.parentElement
    if (!container) return

    const w = container.offsetWidth
    const h = container.offsetHeight
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(0, 0, 6)

    const geometry = new THREE.IcosahedronGeometry(2.0, 1)
    const wireGeo = new THREE.WireframeGeometry(geometry)
    const wireMat = new THREE.LineBasicMaterial({
      color: '#00d4ff',
      transparent: true,
      opacity: 0.12,
    })
    const wireframe = new THREE.LineSegments(wireGeo, wireMat)
    wireframe.position.set(0, -0.5, 0)
    scene.add(wireframe)

    if (prefersReducedMotion) {
      renderer.render(scene, camera)
      return () => {
        renderer.dispose()
        geometry.dispose()
        wireGeo.dispose()
        wireMat.dispose()
      }
    }

    const animate = () => {
      wireframe.rotation.x += 0.002
      wireframe.rotation.y += 0.004
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      if (!container) return
      const nw = container.offsetWidth
      const nh = container.offsetHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      wireGeo.dispose()
      wireMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none hidden md:block"
    />
  )
}

const impactMetrics = [
  {
    value: '40+',
    label: 'VULNERABILITIES DISCLOSED',
    desc: 'High-severity findings across Fortune 500 organizations',
  },
  {
    value: '500+',
    label: 'ORGANIZATIONS ENGAGED',
    desc: 'Including Adobe, Instacart, CompTIA, Wrike, Hootsuite',
  },
  {
    value: '99TH %',
    label: 'HACKERONE IMPACT',
    desc: 'Top 1% globally with Signal 5.00',
  },
  {
    value: '$25K',
    label: 'ADVISORY FEES',
    desc: 'Per engagement for C-suite advisory reports',
  },
  {
    value: '91.3%',
    label: 'BUGCROWD ACCURACY',
    desc: 'Submission accuracy, P1 at 90th percentile',
  },
  {
    value: '18+',
    label: 'HALL OF FAME',
    desc: 'Programs including Fiverr, Zillow, Under Armour',
  },
]

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards) return

    const cardEls = cards.querySelectorAll('.impact-card')
    gsap.set(cardEls, { opacity: 0, scale: 0.95 })

    ScrollTrigger.create({
      trigger: cards,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cardEls, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === cards) st.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] bg-navy-surface"
      id="impact"
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 decorative-grid pointer-events-none" />

      {/* 3D Icosahedron */}
      <div className="absolute inset-0 z-0">
        <IcosahedronCanvas />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 z-[1]">
        {/* Section label */}
        <div className="text-center">
          <ScrollRevealText mode="line" className="section-label mb-4">
            IMPACT &amp; RECOGNITION
          </ScrollRevealText>

          {/* Heading */}
          <ScrollRevealText mode="chars" as="h2" className="section-heading max-w-[700px] mx-auto mb-6">
            THE NUMBERS BEHIND THE RESEARCH
          </ScrollRevealText>

          {/* Subtitle */}
          <ScrollRevealText mode="words" className="body-text max-w-[560px] mx-auto mb-16" delay={0.2}>
            Six years of empirical research. 500+ live production deployments. A dataset that no commercial scanner can replicate.
          </ScrollRevealText>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactMetrics.map((metric, i) => (
            <div
              key={i}
              className="impact-card glass-card group"
            >
              <div className="font-mono font-bold text-cyan mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}>
                {metric.value}
              </div>
              <div className="section-label mb-3">{metric.label}</div>
              <p className="text-[13px] text-[rgba(107,107,118,0.8)] leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <a
            href="https://hackerone.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline font-mono text-xs font-medium uppercase tracking-[0.08em]"
          >
            HackerOne Profile →
          </a>
          <a
            href="https://bugcrowd.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="animated-underline font-mono text-xs font-medium uppercase tracking-[0.08em]"
          >
            BugCrowd Profile →
          </a>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(0,212,255,0.06)]" />
    </section>
  )
}
