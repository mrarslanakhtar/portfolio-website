# Tech Spec — Arslan Akhtar Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | React DOM renderer |
| typescript | ~5.7 | Type safety |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.4 | Vite React integration |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite plugin |
| three | ^0.172 | 3D wireframe elements (torus knot + icosahedron) |
| @types/three | ^0.172 | Three.js type definitions |
| gsap | ^3.12 | Core animation engine, ScrollTrigger, SplitText |
| lenis | ^1.2 | Smooth scroll with inertia |
| react-countup | ^6.5 | Stat counter animations |

## Component Inventory

### Layout (shared / persistent)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar. Transparent → glassmorphic on scroll (100px threshold). Mobile: hamburger triggers full-screen overlay. Contains smooth-scroll anchor links. |
| CustomCursor | Custom | RAF + lerp loop. `mix-blend-mode: difference`. Renders conditionally via `@media (hover: hover)`. State changes via CSS class toggling. |

### Sections (page-level, used once each)

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Orchestrates load-sequence timeline. Wraps video bg, TorusKnot canvas, title/subtitle/tagline/CTAs, scroll indicator. |
| AboutSection | Custom | Two-column: portrait image + bio text (origin story + philosophy). Contains StatsRow (3 counters). |
| ImpactSection | Custom | Stats grid (6 glass cards) + Icosahedron canvas + CTA links. |
| ZenGuardSection | Custom | Two-column: product info (feature list) + logo image. Contains FeatureList (4 items). |
| ContactSection | Custom | Centered layout. Contact methods, platform links, CTA button, footer bar. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ScrollRevealText | Custom | All sections — headings (char reveal), body paragraphs (word reveal), labels (line fade). Wraps GSAP SplitText + ScrollTrigger. Accepts mode: `'chars'` \| `'words'` \| `'line'`. |
| SectionLabel | Custom | About, Impact, ZenGuard, Contact — thin label above each heading. Delegates to ScrollRevealText with mode `'line'`. |
| GlassCard | Custom | Impact stats grid — card with glassmorphic styling, hover border glow. |
| AnimatedStat | Custom | About stats row + Impact stat values inside cards. Wraps react-countup. ScrollTrigger fires count-up on viewport entry. |
| DecorativeGrid | Custom | Hero, About, Impact, ZenGuard — CSS grid pattern overlay. Pure CSS background-image, pointer-events none. |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollVelocity | Reads Lenis velocity via `lenis.on('scroll')`. Returns damped velocity value. Drives skewX/translateX on content wrappers. |
| useLenis | Initializes Lenis smooth scroll, bridges to GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. Cleans up on unmount. |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Custom cursor with lerp** | Vanilla JS (RAF) | rAF loop: read mouse coords, lerp rendered position (factor 0.15). CSS transitions handle hover/click state changes. | Medium |
| **Character/word text reveal** | GSAP + SplitText + ScrollTrigger | SplitText splits into chars/words. Each token wrapped in overflow-hidden span. GSAP stagger tween: translateY + opacity. One-shot ScrollTrigger. | Medium |
| **Line fade reveal** | GSAP + ScrollTrigger | Simple opacity + translateY tween. | Low |
| **Hero load sequence** | GSAP Timeline | Single timeline: video fade → torus fade → char reveal (title) → line fade (subtitle) → word reveal (tagline) → CTA fade-in → scroll indicator. Absolute position values. Fires on mount, no scroll trigger. | Medium |
| **Torus Knot rotation** | Three.js (imperative) | Dedicated WebGLRenderer (alpha), rAF loop: rotation.x/y increments + sine-wave float on position.y. Paused under `prefers-reduced-motion`. | Medium |
| **Icosahedron rotation** | Three.js (imperative) | Same pattern as torus knot — separate renderer, rAF loop, dual-axis rotation. Hidden on mobile. | Medium |
| **Scroll velocity displacement** | Lenis + GSAP ScrollTrigger | Lenis velocity → `useScrollVelocity` hook applies `skewX` (max 1.5deg) and `translateX` (max 8px) via GSAP quickTo/gsap.set on content wrappers. Direction reverses with scroll direction. Decays when scroll stops. Disabled on mobile + reduced-motion. | 🔒 High |
| **Stat counter** | react-countup + ScrollTrigger | `useCountUp` triggered by IntersectionObserver callback (one-shot). 1.2s duration, Primary easing approximation. | Low |
| **Image hover (grayscale + scale)** | CSS transitions | `filter: grayscale()` + `transform: scale()` on hover. 0.6s transition. | Low |
| **Button hover pattern** | CSS transitions | Background, border, color, translateY transitions. 0.3s. | Low |
| **Glass card hover glow** | CSS transitions | Border-color + box-shadow on hover. 0.4s. | Low |
| **Feature list stagger** | GSAP + ScrollTrigger | translateX + opacity stagger on 4 items. | Low |
| **Stats grid card stagger** | GSAP + ScrollTrigger | Scale + opacity stagger on 6 cards. | Low |
| **Contact divider width** | GSAP + ScrollTrigger | Width 0 → 120px tween. | Low |
| **Scroll indicator loop + fade** | CSS animation + JS | Circle position: CSS `@keyframes` loop (2s). Fade-out: JS on Lenis scroll > 100px. | Low |
| **Nav background transition** | JS + CSS | Scroll position listener (or ScrollTrigger) toggles CSS class for glassmorphic state. | Low |

## State & Logic Plan

### Scroll Architecture (Lenis + GSAP)

Lenis owns the smooth scroll layer. ScrollTrigger must be told to refresh on Lenis scroll events (not native scroll). On mount: initialize Lenis → attach `lenis.on('scroll', ScrollTrigger.update)` → call `ScrollTrigger.refresh()` after images load. Single initialization point in `useLenis` hook at app root.

### Velocity Data Flow

Lenis emits velocity in its scroll callback. `useScrollVelocity` subscribes, applies exponential decay (0.9 factor per frame when |velocity| < threshold), and exposes the damped value. HeroSection, AboutSection, ImpactSection, ZenGuardSection all read this value via a shared ref (not React state — too many updates) to apply skewX/translateX via `gsap.quickSet` or direct style mutation in rAF. This bypasses React re-renders entirely.

### Three.js Lifecycle

Both 3D components (TorusKnot, Icosahedron) manage their own Three.js renderer, scene, and camera imperatively via refs. Each creates its own `<canvas>` element, runs an independent rAF loop, and disposes all resources on unmount. They do not share a renderer — each is isolated in its own section. Render loops check for `prefers-reduced-motion` at init time; if true, render once and stop.

### Image Loading Orchestration

All sections contain images with entrance animations. `imagesloaded` must gate the initial `ScrollTrigger.refresh()` call — otherwise trigger positions will be wrong. Wrap the app root in an `imagesloaded` callback before enabling scroll-triggered animations. The hero load timeline is the only animation exempt (fires on mount, not scroll).

## Other Key Decisions

### Raw Three.js over React Three Fiber

The 3D requirements are minimal: two wireframe shapes, each in its own isolated section, with simple rotation. R3F's declarative model and reconciler overhead are unnecessary. Raw Three.js via imperative refs keeps bundle size down and avoids Context coupling across sections.

### No shadcn/ui Components

The design is fully bespoke with a terminal/cybersecurity aesthetic. No standard UI primitives (dialogs, dropdowns, forms) are needed. All components are custom-built.

### Asset Strategy

All images are user-provided photos — copied to `/public/images/` at build time. The hero video is generated and placed at `/public/videos/`. No image generation required.
