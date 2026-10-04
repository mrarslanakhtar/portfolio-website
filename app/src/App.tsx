import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation } from 'framer-motion'

import Preloader from '@/components/Preloader'
import Navigation from '@/components/Navigation'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import CustomCursor from '@/components/CustomCursor'
import SpotlightEffect from '@/components/SpotlightEffect'
import HeroSection from '@/sections/HeroSection'
import ProofSection from '@/sections/ProofSection'
import CaseStudiesSection from '@/sections/CaseStudiesSection'
import AdvisorySection from '@/sections/AdvisorySection'
import CapabilitiesSection from '@/sections/CapabilitiesSection'
import InitiativesSection from '@/sections/InitiativesSection'
import WritingSection from '@/sections/WritingSection'
import BackgroundSection from '@/sections/BackgroundSection'
import ContactSection from '@/sections/ContactSection'
import FooterSection from '@/sections/FooterSection'
import { registerLenis } from '@/lib/scroll'

// Sections mount statically: every anchor target exists from first paint
// (in-page navigation and scrollspy need real elements), while
// content-visibility: auto on .section keeps off-screen render cost low.
// The old per-section JS chunks saved ~20KB at the price of broken anchors.

// Play the boot sequence at most once per session, and never under
// reduced-motion (that path already lands straight on content).
function shouldBoot() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Storage throws under "block all cookies" privacy modes — never let the
  // boot flourish take down the page.
  try {
    return sessionStorage.getItem('booted') !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const [booting, setBooting] = useState(shouldBoot)

  const finishBoot = () => {
    try {
      sessionStorage.setItem('booted', '1')
    } catch {
      // Storage unavailable: the sequence simply plays once per load.
    }
    setBooting(false)
  }

  // The boot overlay should hold a still page — inert stops interaction but
  // not wheel/touch scrolling underneath.
  useEffect(() => {
    if (!booting) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [booting])

  useEffect(() => {
    // Lenis smooth scroll is a motion enhancement — skip under reduced-motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Frame-based lerp smoothing rather than a fixed-duration glide: each
    // wheel notch is followed closely, so scrolling feels crisp and direct
    // instead of floating on past the input.
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
    })
    registerLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      registerLenis(null)
      lenis.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + m.* components keep only the DOM-animation subset of
          framer-motion on the critical path. */}
      <LazyMotion features={domAnimation} strict>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <SpotlightEffect />

      <AnimatePresence>
        {booting && <Preloader onComplete={finishBoot} />}
      </AnimatePresence>

      {/* While the boot overlay is up, everything beneath it leaves the tab
          order and accessibility tree. */}
      <div inert={booting || undefined} className="relative z-10">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollProgressBar />
        <Navigation />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <HeroSection booting={booting} />
          <ProofSection />
          <CaseStudiesSection />
          <AdvisorySection />
          <CapabilitiesSection />
          <InitiativesSection />
          <WritingSection />
          <BackgroundSection />
          <ContactSection />
        </main>

        <FooterSection />
      </div>
      </LazyMotion>
    </MotionConfig>
  )
}
