import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import MouseParallax from '@/components/MouseParallax'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ZenGuardSection from '@/sections/ZenGuardSection'
import BugBountySection from '@/sections/BugBountySection'
import ExperienceSection from '@/sections/ExperienceSection'
import EducationSection from '@/sections/EducationSection'
import AdvisorySection from '@/sections/AdvisorySection'
import PakCyberShieldSection from '@/sections/PakCyberShieldSection'
import ContactSection from '@/sections/ContactSection'
import FooterSection from '@/sections/FooterSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

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
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative z-[2]">
      <ScrollProgressBar />
      <CustomCursor />
      <MouseParallax />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ZenGuardSection />
        <BugBountySection />
        <ExperienceSection />
        <EducationSection />
        <AdvisorySection />
        <PakCyberShieldSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  )
}
