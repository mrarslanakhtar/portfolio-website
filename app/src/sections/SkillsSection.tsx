import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, type Variants } from 'framer-motion'
import ScrollRevealText from '@/components/ScrollRevealText'

gsap.registerPlugin(ScrollTrigger)

function IcosahedronCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
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
    const wireMat = new THREE.LineBasicMaterial({ color: '#00f2fe', transparent: true, opacity: 0.12 })
    const wireframe = new THREE.LineSegments(wireGeo, wireMat)
    wireframe.position.set(0, -0.5, 0)
    scene.add(wireframe)

    if (prefersReducedMotion) {
      renderer.render(scene, camera)
      return () => { renderer.dispose(); geometry.dispose(); wireGeo.dispose(); wireMat.dispose() }
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
      renderer.dispose(); geometry.dispose(); wireGeo.dispose(); wireMat.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none hidden md:block" />
}

const impactMetrics = [
  { value: '40+', label: 'VULNERABILITIES DISCLOSED', desc: 'High-severity findings across Fortune 500 organizations' },
  { value: '500+', label: 'ORGANIZATIONS ENGAGED', desc: 'Including Adobe, Instacart, CompTIA, Wrike, Hootsuite' },
  { value: '99TH %', label: 'HACKERONE IMPACT', desc: 'Top 1% globally with Signal 5.00' },
  { value: '$25K', label: 'ADVISORY FEES', desc: 'Per engagement for C-suite advisory reports' },
  { value: '91.3%', label: 'BUGCROWD ACCURACY', desc: 'Submission accuracy, P1 at 90th percentile' },
  { value: '18+', label: 'HALL OF FAME', desc: 'Programs including Fiverr, Zillow, Under Armour' },
]

const education = [
  { degree: 'MBA (Distinction)', field: 'Business Administration', notes: ['Boardroom-ready security advisory communication', 'Risk governance and executive reporting'] },
  { degree: 'BS', field: 'Applied Mathematics', notes: ['Cryptography, computation, probability foundations', 'Analytical rigor for adversarial reasoning'] },
]

const advisory = [
  { title: 'Executive-Grade Security Advisory', desc: 'Reports designed for CEO/CISO action in fifteen minutes: exploitability, blast radius, and remediation sequencing.' },
  { title: 'Identity & Access Control Threat Modeling', desc: 'Adversarial reasoning against SSO trust chains, federation boundaries, and authorization logic.' },
  { title: 'Detection Pattern Engineering', desc: '40+ Broken Access Control patterns mapped into repeatable detection rules beyond signature-based tooling.' },
  { title: 'Compliance Alignment (When It Matters)', desc: 'Control mapping that supports decision-making without drowning engineers in paperwork.' },
]

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 20 } },
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isTouch = !window.matchMedia('(hover: hover)').matches
    if (isTouch) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale3d(1.01, 1.01, 1.01)`
    }

    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    el.style.transition = 'transform 0.15s ease-out'

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} id="skills" className="relative py-[120px] bg-navy-surface overflow-hidden">
      <div className="absolute inset-0 decorative-grid pointer-events-none" />
      <div className="absolute inset-0 z-0">
        <IcosahedronCanvas />
      </div>

      <div className="relative w-full mx-auto px-6 md:px-12 lg:px-20 xl:px-32 z-[1] space-y-24">
        {/* IMPACT METRICS (Hero of Skills) */}
        <div>
          <div className="text-center mb-16">
            <ScrollRevealText mode="line" className="section-label mb-4">
              SKILLS & IMPACT
            </ScrollRevealText>
            <ScrollRevealText mode="chars" as="h2" className="section-heading mx-auto mb-6">
              THE NUMBERS BEHIND THE RESEARCH
            </ScrollRevealText>
            <ScrollRevealText mode="words" className="body-text mx-auto" delay={0.2}>
              Six years of empirical research. 500+ live production deployments. A dataset that no commercial scanner can replicate.
            </ScrollRevealText>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {impactMetrics.map((metric, i) => (
              <motion.div key={i} variants={staggerItem}>
                <TiltCard className="glass-card group h-full">
                  <div className="font-mono font-bold text-gradient-accent mb-4" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', letterSpacing: '-0.02em' }}>
                    {metric.value}
                  </div>
                  <div className="section-label mb-3">{metric.label}</div>
                  <p className="text-[14px] text-[rgba(107,107,118,0.8)] leading-relaxed">
                    {metric.desc}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* EDUCATION & ADVISORY ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* EDUCATION */}
          <div>
            <div className="mb-8 font-mono text-[14px] text-cyan uppercase tracking-widest border-b border-white/10 pb-2">
              Education
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-6"
            >
              {education.map((e) => (
                <motion.div key={e.degree} variants={staggerItem}>
                  <TiltCard className="glass-card rounded-3xl h-full">
                    <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cyan">Credential</div>
                    <div className="mt-2 font-heading text-2xl font-bold uppercase tracking-[-0.01em] text-cream/90">
                      {e.degree}
                    </div>
                    <div className="mt-2 font-mono text-[15px] text-cream/70">{e.field}</div>
                    <ul className="mt-6 space-y-2">
                      {e.notes.map((n) => (
                        <li key={n} className="flex items-start gap-3 text-[14px] leading-relaxed text-stone-muted">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan/80 flex-shrink-0" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ADVISORY MODULES */}
          <div>
            <div className="mb-8 font-mono text-[14px] text-cyan uppercase tracking-widest border-b border-white/10 pb-2">
              Advisory Capabilities
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-6"
            >
              {advisory.map((a) => (
                <motion.div key={a.title} variants={staggerItem}>
                  <TiltCard className="glass-card rounded-3xl h-full">
                    <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-cyan">Module</div>
                    <div className="mt-2 font-heading text-lg font-bold uppercase tracking-[-0.01em] text-cream/90">
                      {a.title}
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-stone-muted">{a.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(0,242,254,0.06)]" />
    </section>
  )
}
