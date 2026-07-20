import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, MotionConfig } from 'framer-motion'

import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import MouseParallax from '@/components/MouseParallax'
import LazySection from '@/components/LazySection'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import WritingSection from '@/sections/WritingSection'
import ContactSection from '@/sections/ContactSection'
import FooterSection from '@/sections/FooterSection'

// Below-fold sections are code-split and only fetched as they near the viewport.
// This also defers three.js, which Skills and Impact import.
const AdvisorySection = lazy(() => import('@/sections/AdvisorySection'))
const ImpactSection = lazy(() => import('@/sections/ImpactSection'))
const BugBountySection = lazy(() => import('@/sections/BugBountySection'))
const ProjectsSection = lazy(() => import('@/sections/ProjectsSection'))
const ZenGuardSection = lazy(() => import('@/sections/ZenGuardSection'))
const ExperienceSection = lazy(() => import('@/sections/ExperienceSection'))
const SkillsSection = lazy(() => import('@/sections/SkillsSection'))
const EducationSection = lazy(() => import('@/sections/EducationSection'))
const PakCyberShieldSection = lazy(() => import('@/sections/PakCyberShieldSection'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    // Don't initialize Lenis until preloader is done
    if (loading) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Skip smooth scroll entirely under reduced-motion; the browser's native
    // scrolling is used instead. ScrollTrigger still works off native scroll.
    let tickerFn: ((time: number) => void) | null = null
    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    // Refresh ScrollTrigger after images load
    const images = document.querySelectorAll('img')
    let loadedCount = 0
    const totalImages = images.length

    const onImageLoad = () => {
      loadedCount++
      if (loadedCount >= totalImages) {
        ScrollTrigger.refresh()
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++
      } else {
        img.addEventListener('load', onImageLoad)
        img.addEventListener('error', onImageLoad)
      }
    })

    if (loadedCount >= totalImages) {
      ScrollTrigger.refresh()
    }

    // Fallback refresh
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 2000)

    return () => {
      clearTimeout(timeout)
      if (tickerFn) gsap.ticker.remove(tickerFn)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-[2]">
          <a href="#main-content" className="skip-link">Skip to content</a>
          <ScrollProgressBar />
          <CustomCursor />
          <MouseParallax />
          <Navigation />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            <HeroSection />
            <AboutSection />
            <LazySection><Suspense fallback={null}><AdvisorySection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><ImpactSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><BugBountySection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><ProjectsSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><ZenGuardSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><ExperienceSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><SkillsSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><EducationSection /></Suspense></LazySection>
            <LazySection><Suspense fallback={null}><PakCyberShieldSection /></Suspense></LazySection>
            <WritingSection />
            <ContactSection />
            <FooterSection />
          </main>
        </div>
      )}
    </MotionConfig>
  )
}
