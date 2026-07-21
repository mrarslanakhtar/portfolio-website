import { Suspense, lazy, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Preloader from '@/components/Preloader'
import Navigation from '@/components/Navigation'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import LazySection from '@/components/LazySection'
import HeroSection from '@/sections/HeroSection'
import ProofSection from '@/sections/ProofSection'
import ContactSection from '@/sections/ContactSection'
import FooterSection from '@/sections/FooterSection'

// Below-fold sections are code-split and only fetched as they near the viewport.
const AdvisorySection = lazy(() => import('@/sections/AdvisorySection'))
const CaseStudiesSection = lazy(() => import('@/sections/CaseStudiesSection'))
const CapabilitiesSection = lazy(() => import('@/sections/CapabilitiesSection'))
const InitiativesSection = lazy(() => import('@/sections/InitiativesSection'))
const WritingSection = lazy(() => import('@/sections/WritingSection'))
const BackgroundSection = lazy(() => import('@/sections/BackgroundSection'))

// Play the boot sequence at most once per session, and never under
// reduced-motion (that path already lands straight on content).
function shouldBoot() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return sessionStorage.getItem('booted') !== '1'
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)

  const finishBoot = () => {
    sessionStorage.setItem('booted', '1')
    setBooting(false)
  }

  useEffect(() => {
    // Lenis smooth scroll is a motion enhancement — skip under reduced-motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {booting && <Preloader onComplete={finishBoot} />}
      </AnimatePresence>

      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgressBar />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <ProofSection />
        <LazySection><Suspense fallback={null}><AdvisorySection /></Suspense></LazySection>
        <LazySection><Suspense fallback={null}><CaseStudiesSection /></Suspense></LazySection>
        <LazySection><Suspense fallback={null}><CapabilitiesSection /></Suspense></LazySection>
        <LazySection><Suspense fallback={null}><InitiativesSection /></Suspense></LazySection>
        <LazySection><Suspense fallback={null}><WritingSection /></Suspense></LazySection>
        <LazySection><Suspense fallback={null}><BackgroundSection /></Suspense></LazySection>
        <ContactSection />
      </main>

      <FooterSection />
    </MotionConfig>
  )
}
