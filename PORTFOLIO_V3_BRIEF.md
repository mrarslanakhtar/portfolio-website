# Portfolio V3 — Balanced Motion + Preloader Brief

## Design intent
"Balanced": noticeably richer than the V2 editorial-dossier baseline,
without reverting to a pre-rebuild flashy/heavy version. Extend the
existing system (graphite `#0F1420` base, cyan signal color, brass
`#B99A6B` secondary, Playfair display + Inter body + JetBrains Mono for
data/labels) — don't replace it. Every addition below should degrade
gracefully (a browser that can't/won't run it should fall back to the
current V2 experience), and `prefers-reduced-motion` must be respected
throughout, same standard as the last rebuild.

## Dependency budget
Only one new dependency needed: `@react-three/fiber` + `@react-three/drei`,
scoped to a single lazy-loaded hero component. Everything else —
preloader, scroll reveals, mouse interactions — builds on `framer-motion`,
which is already in the bundle at ~8.84KB tree-shook. Do not add GSAP or
a second animation library; there's no need for one here.

---

## 1. Preloader — "modern cybersecurity" boot sequence

**Primary concept**: a terminal boot-sequence, not a spinner or logo
animation.
- JetBrains Mono, cyan accent on the active line, graphite background
- 3–4 short lines revealing in sequence, e.g.:
  `Establishing secure session_` → `Verifying identity_` → `Access granted`
- Thin cyan progress bar underneath, 0 → 100%
- Total duration: **1.5–2.2s max** — this is a ceiling, not a target;
  err toward the shorter end
- `sessionStorage` flag so it plays once per session, not on every
  route change or reload
- If `prefers-reduced-motion` is set: skip straight to content — the
  existing instant-load path already is the reduced-motion path, no
  separate static fallback needed
- Exit transition via `AnimatePresence`: fade/wipe into the hero, not
  an abrupt cut

**Alternate directions** — flag to me which one lands before building,
since "modern cybersecurity" has more than one good reading:
- *Circuit-trace line-draw*: SVG paths animate in like a PCB trace
  connecting, resolving into a mark or your initials
- *Decrypting headline*: text starts as scrambled/random characters and
  resolves into your name — this existed pre-rebuild as an ambient
  scroll effect and was cut for restraint; as a one-time preload moment
  instead of a persistent effect, it's a much smaller, more defensible ask

---

## 2. 3D hero element

**Not** a persistent global background. Scoped to the hero section
only, lazy-loaded via `React.lazy()` + `Suspense`, so it never blocks
first paint of the rest of the page and never loads on sections where
it isn't visible.

- Concept: an abstract, low-poly network/node graph — points connected
  by thin lines, slow ambient rotation, subtle parallax tied to scroll
  position (not mouse-follow — keep it calm, not reactive)
- Low particle/node count — this is a "noticeably richer" accent, not
  a hero-length WebGL scene
- Must not push First Contentful Paint later than it currently
  measures — verify with a before/after Lighthouse run, not a visual
  check alone

---

## 3. Scroll motion

Layer `framer-motion`'s `whileInView` onto section entries — cards and
section headers fade/slide in as they cross the viewport, staggered
for groups (e.g. case-study cards). This rides on top of the Lenis
smooth-scroll already in place; no architecture change needed, just
more use of what's already wired up.

---

## 4. Mouse interactions

Restrained, not a full custom-cursor replacement — that was cut
deliberately last pass and tends to read as less professional for a
C-suite audience. Suggested scope:
- Magnetic pull on primary CTAs only (button subtly follows cursor
  within a small radius, spring-eased)
- Tasteful hover-lift on case-study cards (small scale + shadow shift,
  no rotation/tilt gimmicks)

Flag if you actually want more than this (cursor trail, custom cursor
shape) — that's a bigger, more debatable call given the professional
positioning, worth a deliberate yes rather than a default I pick for you.

---

## 5. More photos

Placement: a strip in the Background/Advisory section (professional
headshot + 1–2 in-context shots — speaking, working) rather than
scattering photos across every section. Keep it to what reinforces
credibility rather than a general photo gallery.

---

## Non-negotiables carried forward from V2
- `prefers-reduced-motion` respected on every new addition, not just
  the ones that existed before
- Full verification suite after implementation:
  `npm ci && npm run lint && tsc -b && npm run build && npm audit`
- Bundle size re-checked against the V2 baseline (364KB / ~124KB gzip)
  — the 3D addition should be the only meaningful increase, and it
  should be isolated to the hero chunk, not inflate the shared bundle
- Lighthouse re-run on the preview URL before merging, same as before

