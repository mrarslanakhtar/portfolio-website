# Content Review — Portfolio V2

Every claim on the site was audited for verifiability during the V2 rebuild. This
file lists what was **removed, softened, or kept conservative** because it could not
be verified from the repository or from the approval message, plus a few open
questions for you to resolve. Anything not listed here was either explicitly
confirmed or is self-evidently the site owner's own (contact details, education,
initiatives).

Legend: **REMOVED** = taken off the site · **SOFTENED** = kept but made less
specific · **KEPT** = left in per your approval, flagged for your awareness.

---

## Removed (unverified, and specific enough to read as fabricated)

1. **`$42,775` lifetime HackerOne earnings** — REMOVED from the hero.
   It was exactly the sum of the six per-program reward rows in the old bug-bounty
   table (`12,500 + 9,800 + 7,500 + 6,200 + 4,100 + 2,675`). You left `$42,775`
   unconfirmed, so the figure and its source rows are gone.
   *To restore:* confirm the total, or link public disclosures with amounts.

2. **Per-program reward dollar amounts** ($12,500 Hootsuite, $9,800 Adobe, etc.)
   and the derived **total earnings** — REMOVED from Case Studies.
   *To restore:* provide verifiable public reports or confirm the figures.

3. **"University of Waterloo teaching papers"** (old About copy: "My reports have
   been used as teaching papers at the University of Waterloo") — REMOVED.
   *To restore:* provide a citation, syllabus link, or confirmation.

4. **"Signal 5.00"** (HackerOne) — REMOVED. You left it unconfirmed; it only lived
   in the now-cut Skills section.
   *To restore:* confirm the current signal value.

5. **"18+ Hall of Fame"** count and named orgs (Fiverr, Zillow, **Under Armour**)
   as a recognition tally — REMOVED. You left the count unconfirmed; it only lived
   in the now-cut Skills section. (Fiverr and Zillow still appear as bug-bounty
   findings in Case Studies, which you approved.)
   *To restore:* confirm the count and the list.

6. **ZenGuard "trained on 500+ real-world Zendesk vulnerability records"** and
   **"40+ detection rule patterns"** as a shipped, ML-trained product, plus the
   `DATASET 500+ / RULES 40+` stat panel — REMOVED. Reframed as an *active
   initiative in development* (see Softened #2).

7. **Non-existent images** `polygon-knight-banner.jpg` and
   `zenguard-brand-banner.jpg` — the old ZenGuard section referenced these but they
   were never in `public/images/`. The new Initiatives section does not use them.

---

## Softened (kept, made less specific)

1. **Exact CVSS scores** (10.0 / 9.1 / 8.8 / 8.2 / 7.8) — SOFTENED to severity
   **bands** ("Critical" / "High") in Case Studies. Precise scores were unverified.
   *To restore:* confirm the CVSS vectors or link public advisories.

2. **ZenGuard** — SOFTENED from "proprietary adversarial reasoning engine … that
   simulates the cognitive process of an elite attacker" to an **active initiative**
   to encode manual SSO research into repeatable detection logic, tagged
   "In development." Design *goals* are stated as goals, not shipped features.

3. **"40+ Broken Access Control patterns"** — the number is removed everywhere;
   replaced with "a documented library of broken-access-control patterns."
   *To restore:* confirm the count.

4. **PakCyberShield** — tagged "Early stage" and described as building the vetting
   and triage side first, rather than an operating platform.

---

## Kept per your approval (flagged for awareness)

1. **Program names** — Hootsuite, Adobe, Instacart, Wrike, Fiverr, Zillow — KEPT
   in Case Studies as bug-bounty **findings/disclosures**. A line in the Proof
   section states explicitly that program names refer to bug-bounty findings, **not
   endorsements or client relationships**, to avoid implying public endorsement.
   *Open question:* confirm each finding is publicly disclosed (e.g., a public
   Hall-of-Fame/disclosed report). If any are private, say which and I'll genericize
   just those.

2. **"Hootsuite — Offensive Security Researcher (Since May 2024)"** in the
   Background/Experience list frames this as an ongoing **role**, which reads
   stronger than a bug-bounty finding. KEPT as written in the source data.
   *Open question:* is this an engagement/role, or should it read purely as
   bug-bounty participation?

3. **"Top 1%" HackerOne, "99th-percentile impact", "91.3% Bugcrowd accuracy / P1 at
   90th percentile", "500+ production environments", "up to $25,000 per
   engagement"** — KEPT (confirmed by you). "99th-percentile impact" is paired with
   Top 1% as a standard HackerOne profile stat; confirm it's still current.

4. **"Islamabad · Remote"** hero location and the "six years" narrative come from
   the existing About copy. KEPT; confirm the location is fine to display publicly.

---

## Housekeeping / follow-ups (not content-truth, but worth doing)

- **OG image** `og-elite-offsec.jpg` still carries the old "Elite Offensive Security
  Researcher" wording in its filename and (likely) baked-in text. All HTML/meta/
  JSON-LD copy has moved to "SSO & Access-Control Security Researcher" and dropped
  "Elite." Regenerate the OG image to match. *(Out of scope to regenerate here.)*
- **Unused assets** now sitting in `public/images/`: `about-photo.{jpg,webp,avif}`
  and `zenguard-logo.png` (the SVG logo is used instead). Harmless; remove if you
  want a tidier `public/`.
- **ZenGuard LinkedIn** (`linkedin.com/company/zenguard-identity/`) is linked from
  Initiatives — confirm the page exists and is current.
