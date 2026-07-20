import { Suspense, lazy, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionConfig } from 'framer-motion'

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

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Smooth scroll is a motion enhancement — skip it entirely under
    // reduced-motion; ScrollTrigger still runs off native scroll.
    let tickerFn: ((time: number) => void) | null = null
    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    // Refresh ScrollTrigger once images have settled so start/end positions
    // are measured against the final layout.
    const images = Array.from(document.querySelectorAll('img'))
    let remaining = images.length
    const onSettled = () => {
      remaining -= 1
      if (remaining <= 0) ScrollTrigger.refresh()
    }
    images.forEach((img) => {
      if (img.complete) {
        remaining -= 1
      } else {
        img.addEventListener('load', onSettled)
        img.addEventListener('error', onSettled)
      }
    })
    if (remaining <= 0) ScrollTrigger.refresh()

    const fallback = setTimeout(() => ScrollTrigger.refresh(), 1800)

    return () => {
      clearTimeout(fallback)
      images.forEach((img) => {
        img.removeEventListener('load', onSettled)
        img.removeEventListener('error', onSettled)
      })
      if (tickerFn) gsap.ticker.remove(tickerFn)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
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
