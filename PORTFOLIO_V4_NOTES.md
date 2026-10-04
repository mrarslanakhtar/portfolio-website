# Portfolio V4 — World-Class Overhaul

This pass was driven by an eight-dimension audit (visual design, content &
positioning, motion, accessibility, performance, SEO, code quality,
responsive/mobile) with every critical/high finding adversarially verified
against the working tree before implementation.

## What changed

### Engineering / performance
- **three.js + @react-three/fiber removed** (−862KB chunk, −232KB gzip
  transfer). The hero network is now a hand-rolled 2D-canvas renderer doing
  real 3D rotation + perspective projection — visually equivalent, ~2KB,
  seeded (art-directed, identical for every visitor), with traveling "signal
  pulses" along links, and it stops rendering entirely while off-screen.
- **react-countup removed** — AnimatedStat now uses framer-motion's
  `animate()` core (already in the bundle), with an sr-only final value.
- **framer-motion → LazyMotion + `m.*`** with the `domAnimation` feature set
  (strict mode) — roughly 25–30KB gzip off the critical path.
- **Fonts self-hosted** (4 variable woff2 latin subsets, 157KB total) — no
  Google Fonts CDN, no third-party request, no GDPR exposure, preloaded with
  correct `crossorigin`. The mono face intentionally isn't preloaded.
- **manualChunks fixed** (function form): react-dom now actually lands in the
  `react` chunk; a copy edit no longer invalidates the framework cache.
- **Lazy-section machinery removed** — sections mount statically (anchors
  exist from first paint); `content-visibility: auto` keeps off-screen render
  cost low with viewport-scaled `contain-intrinsic-size` estimates.
- Hero LCP image preloaded (desktop-gated), `fetchPriority="high"`,
  `decoding="async"`; npm lockfile re-pointed from a blocked npm mirror to
  registry.npmjs.org; `npm audit fix` applied (8 of 13 resolved — the
  remaining 5 are the Tailwind 3 dev-time watcher chain, see Follow-ups).

### Security posture (the persona signature)
- **`vercel.json`**: CSP (self + rss2json connect only), HSTS w/ preload,
  X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP,
  CORP — aimed at an A on securityheaders.com.
- **`/.well-known/security.txt`** with future Expires.
- Immutable caching for fonts/assets, sane caching for images/CV/icons.
- A terminal-styled console easter egg for fellow researchers.

### Real bugs fixed (verified, not theoretical)
- Nav links to below-fold sections were **silent no-ops** on fresh load
  (querySelector against unmounted lazy sections).
- Mobile menu taps would have navigated nowhere (Lenis stopped while the
  menu is open silently ignores `scrollTo` — fixed with `force: true`).
- The mobile menu overlay had **no background** (`/97` isn't a Tailwind
  opacity step — the class was silently dropped; now `/[0.97]`).
- ScrollProgressBar froze permanently under reduced-motion and burned a rAF
  loop for everyone else — now event-driven via `useScroll`.
- `sessionStorage` access crashed the whole app under "block all cookies".
- Magnetic CTAs shifted under the finger on touch (synthesized mousemove) —
  now gated to fine pointers.
- Medium feed: HTML entities now decoded; 8s timeout resolves a stalled
  third-party to the fallback card (feature-guarded).
- Anchor jumps land correctly (scroll-padding-top + post-scroll correction
  for content-visibility layout shifts); native hash deep-links clear the
  fixed header; Back button no longer unwinds a hash stack.

### Accessibility (WCAG 2.2 AA)
- Content is `inert` behind the boot overlay, and the page can't scroll
  under it; in-page navigation moves focus and updates the URL.
- Mobile menu: focus trap includes the visible ✕ toggle, scroll lock,
  `role="dialog" aria-modal`, proper nav landmark, staggered entrance.
- Contrast: all opacity-faded stone-muted text raised to passing tokens
  (incl. new `--ink-faint`); hero `<dl>` content model fixed (labels no
  longer double-announced); 32–44px tap targets baked into link styles;
  reveal thresholds lowered so keyboard focus can't land in hidden blocks.
- `aria-current="location"` scrollspy (also clears on return to hero).

### Design system
- Signature **"broken hairline"** motif (`.rule-break`) — the thesis
  expressed structurally; applied at deliberate moments (ledger close,
  quote frame, further-disclosures, footer).
- Section seams (hairline + top-edge gradient), card light logic (gradient
  fill + top light catch), film grain overlay above content, display title
  scale raised to 6.25rem, one `body-sm` token replacing ad-hoc `!text-[…]`
  overrides, `--ease-out`/`--dur-med` tokens unifying CSS easing with the
  shared `EASE` in `src/lib/motion.ts`.
- Word-by-word masked title reveals; drawn-in eyebrow hairlines; preloader
  payoff beat (bar lands with "Access granted", ~1.38s total); hero entrance
  now choreographed with the preloader handoff; hero exit micro-parallax;
  footer ghost wordmark + live Islamabad clock; severity tags got their own
  color vocabulary (Critical = filled cyan chip, High = brass outline).

### Content & positioning (within CONTENT_REVIEW.md verified-claims bounds)
- Section order now hook → proof → case studies → offer (Advisory moved
  after Work; indices renumbered; nav reordered to match).
- Pricing surfaced as its own data row: **$15,000 – $25,000**, "scoped to
  the identity surface under review, not to hours."
- "Companies don't pay hackers. They pay advisors." promoted to a
  full-width interstitial.
- Proof band de-duplicated from the hero (6+ years / 99th percentile /
  P1·90th), hero signals sharpened ("500+ live Zendesk SSO deployments"),
  Recognition ledger row (Hootsuite VP recruitment), ZenGuard reframed
  around the six-year dataset, PakCyberShield's "South Asia's first
  indigenous managed bug-bounty platform" ambition surfaced, weaker ledes
  and the triple-repeated outcome line cleaned up.
- New OG image (`og-identity-trust.jpg`, rendered from the site's actual
  fonts/design) replacing the stale "Elite" one; title/description
  tightened under SERP budgets; JSON-LD enriched (award, affiliations,
  email, address) and scrubbed of unverifiable profiles; sr-only keyword
  prefix in the H1; `rel="me"` identity links.

### Visual pass (V4.1) — the part you can see
The first V4 commit extended the V3 system faithfully, and at a glance the
page read the same. V4.1 transforms the layout and scale while keeping the
brand (graphite / cyan / brass, Playfair + Inter + JetBrains Mono):
- **Poster hero**: the statement at up to 8.25rem owns a full viewport; the
  portrait (the 840px office photo, monochrome) bleeds in from the right and
  dissolves into the graphite; a slow ticker of the practice vocabulary runs
  along the hero's bottom edge (pauses on hover, static under reduced-motion).
- **Giant ghost numerals** (outlined 01–08, up to 24rem) in every section —
  the editorial index as a visual event, clipped so it never widens the page.
- **Inverted cream Advisory section** — the one light plane on the page,
  with every token remapped so the existing components just work on it.
- **Poster-scale proof band** (6+ / 99th / 90th at up to 8.5rem, ruled).
- **Giant email** as the Contact closer, with a drawn underline on hover.
- Case-study cards lead with large brass numerals and section-title names;
  capability cells draw a cyan scan-line across the top on hover.

### Motion pass (V4.2) — advanced interaction layer
All framer-motion + CSS (no new dependencies, +8KB to the app chunk), every
effect gated to fine pointers and off under reduced-motion:
- **Custom cursor**: cyan dot + spring-lagged hairline ring, swelling over
  links, collapsing over text, `mix-blend-difference` so it reads on cream.
- **Decrypting headline**: the statement resolves out of cipher glyphs line
  by line as the preloader hands off (real text stays in the a11y tree).
- **Boot counter**: 000→100% in the preloader, landing with the bar.
- **Portrait reveal**: clip-path wipe from the right + slow settle from 1.1×.
- **Hero recedes on scroll** (opacity/scale) while the portrait parallaxes.
- **Pointer-reactive network**: the node cloud tilts toward the cursor;
  nodes and links near it swell and light up.
- **Scroll-velocity ticker**: the marquee is driven per frame and couples
  to Lenis velocity — scrolling speeds it up, scrolling back reverses it.
- **Sticky-stacking case studies**: each card pins and the next slides over
  it; covered cards scale down and dim with the stack's scroll progress.
- **3D tilt + cursor spotlight** on cards (one delegated listener feeds
  every `.card` its pointer position as CSS variables).
- **Parallax ghost numerals** drift slower than the page.
- **Live film grain** (8-step stepped animation on an oversized tile).
- **Photos**: monochrome at rest, colour + slow zoom on hover.

### V4.3 — type scale, scroll feel, cursor (from review feedback)
- **Type scale up** across the page: body 1.2rem, small body 1.05rem, lede
  up to 1.45rem, section titles up to 4.6rem, sub-titles up to 2.5rem, mono
  labels 12–13px, nav 15px, ledger claims 1.25rem.
- **Scroll feel**: Lenis moved from a fixed-duration glide (which floats on
  past the input) to frame-based lerp smoothing (`lerp: 0.09`) — crisp and
  direct. Reveals changed from a plain fade to a focus-pull: blocks rise out
  of a 12px blur; title words rise out of a mask with a slight rotate+blur.
- **Cursor as light**: the ring is gone. A 7px cyan point tracks exactly and
  becomes a 44px translucent disk over links and a thin I-beam over text; a
  560px soft glow follows on a lazy spring and lights whatever it crosses
  (`mix-blend-screen`). Over the cream section the point inverts to red.

## Verification status
`npm ci`, `npm run lint`, `npm run build` and Playwright screenshots (desktop
hero/mid-page) were green through the three.js/fonts/countup stage. A
mid-session sandbox policy change then blocked command execution, so the
remaining changes were verified by (a) an independent audit agent that ran
tsc/eslint/vite build against the near-final tree (its findings — one unused
variable, the invalid opacity class, the Lenis race — are all fixed) and
(b) line-by-line review. **Run the full suite before deploying:**

```
cd app && npm ci && npm run lint && npm run build && npm run preview
```

## Follow-ups worth doing (not in this pass)
1. **Custom domain** — mrarslanakhtar.vercel.app undercuts the positioning;
   buy a domain, 301 the vercel.app, update canonical/OG/JSON-LD/sitemap/
   robots/security.txt (19 occurrences, grep `mrarslanakhtar.vercel.app`).
2. **2× hero portrait** — export hero-photo at ~1120w (AVIF/WebP/JPG) and
   add srcSet/sizes; the current 560w source is soft on retina.
3. **Build-time Medium snapshot** — fetch the RSS in a prebuild script to
   kill the rss2json runtime dependency and tighten CSP to pure 'self'.
4. **Prerendering** — renderToString at build time so crawlers (and AI
   crawlers) see real content, not an empty root div.
5. **Tailwind 4 migration** — clears the 5 remaining dev-only npm audit
   findings (chokidar/braces watcher chain).
6. Compress `cv/Arslan_CV_2026.pdf` (~423KB → ~200KB with ghostscript).
