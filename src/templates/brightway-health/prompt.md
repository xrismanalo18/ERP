# Brightway Health — Recreation Prompt

## 1. What you're building

A 15-section landing page for **Brightway Health**, a healthcare-strategy and operations consulting firm. Audience: founders and operators of independent clinics, multi-site clinic groups, telehealth startups, single-product health companies, and medical-device teams who want a senior operator beside them, not a slide deck. Tone: trustworthy, plainspoken, expert — sounds like a senior clinical/operator advisor, never marketing-fluffy. Visual identity is **sun-yellow primary (#F5C518) on cream paper (#FFFCF2)** with a serif display (Fraunces), an Inter body, a dark photographic hero, alternating feature rows on yellow, a dark booking form, and a regulatory disclaimer footer. The deck has the editorial cadence of a McKinsey-meets-newsletter brand: warm yellow lighting throughout, but disciplined typography.

## 2. Stack & dependencies

```
- React 18+ with TypeScript
- Tailwind CSS 3 with tailwind.config.ts (extend screens to 1101 / 481 / 0)
- Google Fonts: Fraunces (400/500) display serif; Inter (400/500/600) sans body
- No icon library — all icons are inline 1.7-stroke outline SVGs
- next/image optional; otherwise CSS background-gradients carry all imagery
- Booking section uses HTML form controls; one "active" slot button uses
  useState if you want it interactive; otherwise it's a visual selection
- Newsletter form is a presentational <form> with required-validated input
```

No carousels library — the testimonial rail is a native `overflow-x: auto` track with `scroll-snap-type: x mandatory`.

## 3. Global styles, fonts & color tokens

### Font imports

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Color tokens

| Token | Hex / value | Use |
|---|---|---|
| `--sun` | `#F5C518` | Primary brand yellow; pillar / stat / rail / join / feature / closer backgrounds; brand dot |
| `--sun-soft` | `#FBE08A` | Soft tint, unused inline but in palette |
| `--sun-glow` | `#FFE066` | Hover state on `.btn.sun`; radial center of pillars halo |
| `--paper` | `#FFFCF2` | Page background, light surfaces |
| `--surface` | `#FFFFFF` | Card and form-field surface |
| `--hero-muted` | `#E8DDB7` | Hero eyebrow + line |
| `--hero-base` | `#1d2118` | Hero background base |
| `--ink` | `#16170E` | Primary text on light |
| `--ink-2` | `#3A3A2C` | Secondary body |
| `--ink-3` | `#6B6A56` | Tertiary muted body |
| `--line` | `rgba(22,23,14,.14)` | Hairlines on light |
| `--line-soft` | `rgba(22,23,14,.08)` | Section dividers |

### Hero gradient stacks (verbatim — these define the photographic hero)

```css
--hero-bg-gradient:
  radial-gradient(ellipse at 70% 40%, rgba(255, 210, 90, .18) 0%, transparent 60%),
  linear-gradient(135deg, #2c3326 0%, #1a1d14 50%, #232a1d 100%);

--hero-photo-gradient:
  radial-gradient(ellipse 600px 400px at 65% 50%, rgba(245, 197, 24, .22) 0%, transparent 70%),
  radial-gradient(ellipse 800px 500px at 30% 60%, rgba(180, 160, 120, .15) 0%, transparent 70%),
  linear-gradient(180deg, rgba(22, 23, 14, .45) 0%, rgba(22, 23, 14, .15) 40%, rgba(22, 23, 14, .55) 100%),
  linear-gradient(135deg, #3d4030 0%, #5a5740 35%, #7a6e4c 60%, #4a4838 100%);
```

### Base CSS

```css
.root {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: var(--ink); background: var(--paper);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-size: 16px; line-height: 1.55;
}
h1, h2, h3, h4 {
  font-family: "Fraunces", "Times New Roman", serif;
  font-weight: 500; letter-spacing: -.015em;
  line-height: 1.05; color: var(--ink);
}
.wrap { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
.lbl { font-size: 13px; letter-spacing: .04em; color: var(--ink-2); }
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

Button primitives:
```css
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  height: 42px; padding: 0 18px; border-radius: 999px;
  font-size: 14.5px; font-weight: 500;
  background: var(--ink); color: var(--paper);
  border: 1px solid var(--ink);
  transition: transform .15s, background .2s;
}
.btn:hover { transform: translateY(-1px); }
.btn.ghost { background: transparent; color: var(--ink); border-color: var(--line); }
.btn.ghost:hover { background: color-mix(in srgb, var(--ink) 5%, transparent); }
.btn.sun { background: var(--paper); color: var(--ink); border: 1px solid var(--ink); }
.btn.sun:hover { background: var(--sun-glow); }
.btn.lg { height: 52px; padding: 0 24px; font-size: 15px; }
```

## 4. Page architecture

1. **Navigation** — sticky paper-tinted bar (92% paper + 10px blur) with circular sun mark, 5 anchor links, `Sign in` text link, primary `Book a call` pill.
2. **Hero** — full-bleed dark gradient with bottom-left content block (eyebrow + serif headline with italic accent + sub + dual CTAs).
3. **Pillars** — sun-yellow band with radial halo, four-pillar value grid (icon tile + 2-line copy), two CTAs.
4. **Stat** — single huge statement sentence with a tiny `i` info marker (tooltip), one CTA.
5. **Testimonial rail** — horizontally scrolling row of 5 photo-gradient testimonial cards, two arrow buttons.
6. **Join CTA** — two columns on yellow: headline + CTA / hand-drawn line-art SVG illustration.
7. **Feature: Clinic** — feature row on yellow, image right.
8. **Feature: Science** — reversed feature row, image left.
9. **Feature: Safety** — feature row, image right.
10. **Pricing** — three serif-numeral tier cards on paper; middle tier is the sun-yellow `Operating Partner`.
11. **Booking** — dark band with three-step explainer left / paper booking-card form right (name split, email, practice select, 4×2 slot grid, note textarea, CTA).
12. **Press** — five styled wordmarks on paper.
13. **Articles** — three article preview cards with gradient covers.
14. **Closer** — sun-yellow centered closer with one statement + one CTA.
15. **Footer** — paper, 5-column grid (brand+tagline + 3 link cols + newsletter signup), legal row, regulatory disclaimer paragraph.

## 5. Brand voice & copy rules

- **Headlines are statement sentences**, never marketing slogans. One italic noun phrase per hero/serif heading (e.g. `Consulting for clinics & health-product teams.` where `health-product` is italic).
- **Pricing tiers use consultant vocabulary**: `Diagnostic Sprint`, `Operating Partner`, `Strategic Retainer`. Tier badges read `Compass`, `Most chosen`, `North star` (do not rename — they are the consultative system).
- **Compliance terms are intentional**: HIPAA, FDA, regulators. Preserve them when editing.
- **Testimonials mix verticals**: family practice, telehealth, devices, single-product. Each is one sentence in serif italic + a `Name · Role/Clinic` line.
- **Statistic is bounded by time**: "92% of clinics …" with a tooltip noting the period (`Jan 2022 – Mar 2026`).
- **CTAs are verbs** that suggest a conversation: `Book a discovery call`, `Discuss an engagement`, `Stay in touch`. Avoid `Get started`.
- **Disclaimer paragraph at the bottom is regulatory** — keep it intact when editing for healthcare verticals.

## 6. Section-by-section build

### 6.1 Navigation (`<header class="nav">`)

Sticky bar: `position: sticky; top: 0; z-index: 50`, `background: color-mix(in srgb, var(--paper) 92%, transparent)`, `backdrop-filter: saturate(120%) blur(10px)`, `border-bottom: 1px solid var(--line-soft)`. Inner `.wrap.nav-inner` `display: flex; justify-content: space-between; align-items: center; height: 72px`.

- **Brand** (left, `<a>`): `display: flex; gap: 10px; font-family: Fraunces; font-size: 22px; font-weight: 500; letter-spacing: -.02em`. Inside it, `.brand-mark` is a 26×26 sun: `background: var(--sun); border-radius: 50%`, with an `::after` `position: absolute; inset: 6px; border-radius: 50%; background: var(--paper); border: 2px solid var(--sun)` — looks like a sun with a hole. Then text node: `Brightway`.
- **Links** (center, `.nav-links` flex, gap 32px): 5 anchor links, Inter 14.5px, color `--ink-2`, hover `--ink`. Labels: `How we help`, `Approach`, `Stories`, `Pricing`, `Book`. Anchors point to `#how`, `#approach`, `#stories`, `#pricing`, `#book`.
- **CTA group** (right, `.nav-cta` flex gap 14px): `<a class="text-link" style="font-size:14px">Sign in</a>` then `<a class="btn">Book a call</a>`.

Responsive: `≤1100px` hides `.nav-links` entirely. `≤880px` hides the `.btn.ghost` if you've placed one (this template doesn't, but the rule exists). `≤600px` nav height drops to 64px and brand font to 19px.

### 6.2 Hero (`<section class="hero">`)

`position: relative; height: min(620px, 72vh); min-height: 480px; overflow: hidden; background: var(--hero-base)`. Stack 3 absolute layers + a content layer:
1. `.hero-bg` (`background: var(--hero-bg-gradient)`)
2. `.hero-photo` (`background: var(--hero-photo-gradient)`)
3. `.hero-content` — `z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 32px 72px; max-width: 1240px; margin: 0 auto`.

Inside `.hero-content`:
- `.hero-eyebrow` — `color: var(--hero-muted); font-size: 13px; letter-spacing: .06em; margin-bottom: 18px; display: inline-flex; gap: 10px`. Pseudo `::before` is a `20px × 1px` bar matching color. Text: `Healthcare consulting · Independent practice`.
- `<h1>` — Fraunces, `font-size: clamp(40px, 6vw, 76px)`, weight 400, `letter-spacing: -.02em`, color `--paper`, max-width 780px. Layout: `{pre} <em>{em}</em> {post}` where:
  - pre: `Consulting for clinics &`
  - em (italic, color `--sun`): `health-product`
  - post: `teams.`
- `.hero-sub` — `color: color-mix(in srgb, var(--paper) 82%, transparent)`, 17px, mt 24px, max 520px. Text:
  > `We help small clinics, telehealth startups, and single-product health companies grow without losing the care that made them worth visiting.`
- `.hero-actions` (mt 32px, flex gap 12px): two pills.
  - Primary: `<a class="btn sun" href="#book">Book a discovery call</a>`
  - Secondary: `<a class="btn ghost" style="border-color: color-mix(in srgb, var(--paper) 40%, transparent); color: var(--paper)" href="#how">How we work</a>`

Responsive: `≤880px` hero padding 0 22px 56px; `≤600px` height drops to `min(540px, 80vh)`, min 420px, padding 0 18px 40px, actions stack vertically with 100% width.

### 6.3 Pillars (`<section class="pillars" id="how">`)

Sun-yellow band, `padding: 76px 0 88px; overflow: hidden; position: relative`. A `::before` halo:
```css
content: ""; position: absolute; left: 50%; top: -180px;
transform: translateX(-50%);
width: 1100px; height: 1100px; border-radius: 50%;
background: radial-gradient(circle, var(--sun-glow) 0%, var(--sun) 35%, transparent 60%);
opacity: .85;
```

Content (`z-index: 2`):
- `.pillars-eyebrow` (mb 48px): `A practical kind of expertise`. 13px, color `--ink-2`.
- `.pillars-divider` — `height: 1px; background: color-mix(in srgb, var(--ink) 18%, transparent); margin-bottom: 36px`.
- `.pillars-grid` `grid-template-columns: repeat(4, 1fr); gap: 24px; mb 44px`. Four `.pillar` cells (flex-column gap 18px). Each:
  - `.pillar-icon` (64×64, `border-radius: 14px`, `background: color-mix(in srgb, var(--paper) 55%, transparent)`, 1px line-soft border) containing a 28×28 inline outline SVG, stroke 1.7:
    1. Line chart climbing to a circle at top-right: `M4 22 L10 14 L15 18 L24 6` + `<circle cx="24" cy="6" r="2" fill="currentColor"/>`.
    2. Shield with check: `M14 4 L22 8 V14 C22 19 18 23 14 24 C10 23 6 19 6 14 V8 Z` + `M11 14 L13.5 16.5 L17.5 12`.
    3. Person bust: `<circle cx="14" cy="10" r="4"/>` + `M6 24 C6 19 9.5 16 14 16 C18.5 16 22 19 22 24`.
    4. Calendar: `<rect x="4" y="6" w="20" h="16" rx="3"/>` + tabs + dotted day.
  - `.pillar-text` Inter 15.5px, weight 500, line-height 1.4. Texts (verbatim):
    1. `Outcomes-led growth strategy built around your patients`
    2. `Compliance-aware playbooks that ship in weeks, not quarters`
    3. `Clinical and operator advisors with real-world chair time`
    4. `Hands-on delivery, not slide decks handed off to a junior`
- `.pillars-actions` flex wrap gap 12px:
  - `<a class="btn sun" href="#approach">How our engagements work</a>`
  - `<a class="text-link" href="#pricing">Pricing & packages</a>` — `.text-link` Inter 14px, color `--ink-2`, `::after { content: "→" }`.

Responsive: `≤1100px` grid 2 cols, gap 32px; `≤880px` padding 60px 0 70px; `≤600px` grid 1 col.

### 6.4 Stat (`<section class="stat-section">`)

`background: var(--sun); padding: 32px 0 80px; position: relative`. A `::before` adds a top hairline `1px` `color-mix(in srgb, var(--ink) 12%, transparent)` constrained to `max-width: calc(1240px - 64px)`.

`.stat` inside `.wrap`, `padding-top: 60px`:
- `<h2>` Fraunces 500, `clamp(36px, 5vw, 60px)`, `letter-spacing: -.022em`, max-width 880px. Text:
  > `92% of clinics we work with hit their year-one growth targets — without compromising clinical quality.`
- Inline `<span class="info" title="…">i</span>` — 18×18 circle, 1px ink border, Inter 11px, sits at end of headline. `title` attribute: `Based on engagements completed Jan 2022 – Mar 2026`.
- `.stat-actions` mt 32px: `<a class="btn" href="#stories">See client outcomes</a>`.

### 6.5 Testimonial rail (`<section class="rail" id="stories">`)

`background: var(--sun); padding: 24px 0 96px`.

- `.rail-head` (`display: flex; justify-content: flex-end; gap: 8px; padding: 0 32px 18px; max-width: 1240px; margin: 0 auto`). Two 42×42 round buttons (`.rail-arrow`) with `border: 1px solid color-mix(in srgb, var(--ink) 30%, transparent)`. Aria labels `Previous` / `Next`. Inner glyphs `←` / `→`. Wire these to scroll the track left/right by 320px (the testimonial width + gap) using `track.scrollBy({ left: ±320, behavior: 'smooth' })`.
- `.rail-track` (`display: flex; gap: 18px; padding: 0 32px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none`). `::-webkit-scrollbar { display: none }`.

Five `<article class="testimonial t{n}">` cards, each `flex: 0 0 auto; width: 300px; height: 380px; border-radius: 18px; overflow: hidden; position: relative; scroll-snap-align: start; display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; color: white`.

Each card has a `.t-photo` absolute fill — different earth-tone gradient per card (used as a stylized portrait abstraction). The gradients use radial blobs (`50% 45% at 50% 18%` for the head, `80% 70% at 50% 75%` for the shoulders) with warm rgba inside a class-specific linear gradient:
- `.t1`: `linear-gradient(135deg, #3d3a2a 0%, #6e6446 50%, #9a8e63 100%)`
- `.t2`: `linear-gradient(135deg, #2a2418 0%, #4a3d2a 60%, #7a6448 100%)`
- `.t3`: `linear-gradient(135deg, #3a3520 0%, #5e5230 50%, #8c7a48 100%)`
- `.t4`: `linear-gradient(135deg, #2e2a1a 0%, #574c30 60%, #8e7c50 100%)`
- `.t5`: `linear-gradient(135deg, #3d3528 0%, #6b5d40 50%, #a08a5c 100%)`

`.t-photo::after` darkens the bottom with `linear-gradient(180deg, transparent 30%, rgba(0,0,0,.7) 100%)`. `.t-photo::before` overlays the radial portrait blobs at 50%/50% bottom anchor.

Card content:
- `.t-quote` (z-index 2, Fraunces italic 15px line-height 1.4). Quotes (verbatim, **double-quoted** in the strings):
  1. `"They rebuilt our intake in six weeks. Wait times dropped 40% and our team finally stopped dreading Mondays."`
  2. `"Brightway gave us the financial model we'd been winging for three years. Our investors finally trust the numbers."`
  3. `"The compliance playbook alone paid for the whole engagement. We launched our second state in half the time."`
  4. `"Honest, clinical, and bluntly useful. I forwarded their first memo to my whole leadership team."`
  5. `"They sat with our nurses, our front desk, our billing person — then handed back a plan that actually felt like us."`
- `.t-name` mt 14px (flex gap 10px) with `.t-dot` 6×6 sun-yellow circle + Inter 13.5px name. Names:
  1. `Dr. Lena Ortiz · Family Practice, Austin`
  2. `Marcus Chen · COO, NovaCardio`
  3. `Priya Shah · Founder, Clearpath Therapy`
  4. `Dr. James Whitaker · Medical Director`
  5. `Anya Park · CEO, Pinegate Health`

Responsive: `≤600px` card 240×320, padding 18px.

### 6.6 Join CTA (`<section class="join">`)

`background: var(--sun); padding: 48px 0 100px`. A top hairline `::before` 1px line. `.join-grid` `1.05fr .95fr; gap: 60px; align-items: center; padding-top: 40px`.

Left:
- `<h2>` `clamp(34px, 4.5vw, 52px)`, max-width 560px. Text:
  > `Join the dozens of practices who've grown with Brightway alongside them.`
- `.join-actions` mt 30px: `<a class="btn" href="#book">Is my clinic a fit?</a>`

Right `.join-illo` (`height: 340px; aria-hidden="true"`): an inline 480×340 viewBox SVG line-art illustration with three groups (stroke `var(--ink)`):
- Group 1 (`stroke-width: 1.4; opacity: .6`) — 12 short diagonal strokes scattered around the frame to suggest sunlight rays.
- Group 2 (`stroke-width: 1.6`) — a stylized house: pentagon roof + two windows + door grid `M180 160 L180 290 L300 290 L300 160 L240 120 Z` and two rects `<rect x="200" y="200" w="34" h="50"/>` and `<rect x="246" y="200" w="34" h="50"/>` plus a cross at the chimney.
- Group 3 (`stroke-width: 1.6`) — two stick-figure people on either side, `<circle cx="120" cy="195" r="14"/>` and matching at x=350, plus body + leg + arm paths.
- A dashed ground line `M20 295 H460` (`stroke-dasharray: 4 4; opacity: .5`).

Responsive: `≤1100px` `.join-grid` becomes one column; `≤600px` illustration height 240px.

### 6.7 Feature: Clinic (`<section class="feature">`)

`background: var(--sun); padding: 48px 0; position: relative` (top hairline). `.feature-grid` `1fr 1fr; gap: 60px; align-items: center; padding-top: 40px`.

Left `.feature-text`:
- `<h3>` `clamp(28px, 3.4vw, 40px)`, weight 500, max 420px. Text: `Run a calmer clinic without rebuilding from scratch.`
- `<p>` mt 18px, color `--ink-2`, 15.5px, max 440px. Text:
  > `We map your patient flow, your staff schedule, and your tech stack — then quietly rebuild the parts that are costing you energy. No rip-and-replace. No vendor lock-in.`
- `.feature-actions` mt 26px: `<a class="btn" href="#book">Explore clinic engagements</a>`

Right `.feature-img.img-clinic` — `height: 340px; border-radius: 18px; overflow: hidden`. Background:
```css
radial-gradient(ellipse 280px 200px at 70% 45%, rgba(255, 235, 180, .5) 0%, transparent 60%),
linear-gradient(160deg, #2a2820 0%, #44402c 40%, #6a5e3a 100%)
```

### 6.8 Feature: Science (`<section class="feature reverse">`)

Same shell as 6.7. `.reverse` swaps order so image is left and text is right.

- `<h3>`: `Take a single-product health company from launch to category leader.`
- `<p>`: `Positioning, clinical evidence narrative, payer strategy, and a roadmap your engineers can actually ship. We've shepherded 23 health products from seed to series B.`
- CTA: `See product engagements`
- `.img-science` background:
```css
radial-gradient(ellipse 600px 300px at 30% 60%, rgba(255, 200, 80, .7) 0%, transparent 70%),
linear-gradient(135deg, #b86d20 0%, #d4882e 40%, #8c4d18 100%)
```

### 6.9 Feature: Safety / Compliance (`<section class="feature" id="approach">`)

Same shell as 6.7 (not reversed; image right).

- `<h3>`: `Stay confidently inside the lines of HIPAA, FDA, and state regulators.`
- `<p>`: `Our compliance partners read every contract, every privacy review, every marketing claim before it ships. You move fast — they make sure fast doesn't mean fragile.`
- CTA: `Compliance review`
- `.img-safety` background: `linear-gradient(160deg, #6a4f1c 0%, #8a6824 40%, #a98230 100%)`

Responsive (applies to all three feature rows): `≤1100px` grid collapses; `.feature.reverse .feature-text { order: 0 }` so reverse no longer applies; image becomes `max-width: 540px; margin: 0 auto`. `≤600px` feature-img height 240px.

### 6.10 Pricing (`<section class="pricing" id="pricing">`)

`background: var(--paper); padding: 120px 0`. `.pricing-head` centered, mb 64px:
- `<span class="lbl">Engagements</span>` (block, mb 16px, color `--ink-3`).
- `<h2>` Fraunces 500, `clamp(36px, 5vw, 56px)`, max 740px. Text: `Three ways to work with us.`
- `<p>` mt 18px, max 560px, color `--ink-2`. Text: `Every engagement starts with a free 30-minute discovery call. No surprise scopes, no billable-hour surprises.`

`.pricing-grid` `repeat(3, 1fr); gap: 20px`. Three `.price-card`: `background: var(--surface); border: 1px solid var(--line-soft); border-radius: 22px; padding: 36px 32px; flex-direction: column; gap: 20px; transition: transform .25s, box-shadow .25s`. Hover lift `translateY(-4px)` + shadow `0 18px 50px color-mix(in srgb, var(--ink) 8%, transparent)`.

The middle card has `.featured`: `background: var(--sun); border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent)`. Its `.price-tier` becomes ink-colored; its bullet pseudo-dots become ink-colored.

Each card structure:
- `<span class="price-tier">` Inter 13px, `.06em`, uppercase, weight 500, color `--ink-3`.
- `<h3 class="price-name">` Fraunces 30px, weight 500, `letter-spacing: -.02em`.
- `<div class="price-amount">` baseline flex gap 6px, margin `6px 0 4px`:
  - `<span class="num">` Fraunces 54px weight 500 line-height 1.
  - `<span class="per">` Inter 14px color `--ink-3`.
- `<p class="price-desc">` Inter 14.5px color `--ink-2`.
- `<ul class="price-list">` no bullet, gap 10px. Each `<li>` starts with an `::before` 8×8 sun dot (ink dot inside featured), Inter 14.5px color `--ink-2`.
- `<a class="btn ghost">` (or `.btn` for featured), self-align flex-start, mt auto.

**Card 1 — Compass / Diagnostic Sprint:**
- Tier `Compass`, name `Diagnostic Sprint`, price `$8.4k`, per `/ flat`.
- Desc: `A 3-week deep audit of your clinic or product, with a clear 90-day plan to act on.`
- Features: `2 founder & team workshops` · `Patient-flow + ops audit` · `Compliance gap report` · `Prioritized 90-day roadmap`.
- CTA (ghost): `Start a sprint`.

**Card 2 — Most chosen / Operating Partner (.featured):**
- Tier `Most chosen`, name `Operating Partner`, price `$14k`, per `/ month`.
- Desc: `Embedded with your team for 3–6 months. We don't just advise — we ship the work alongside you.`
- Features: `Weekly strategy + delivery cadence` · `Hands-on ops, hiring, and finance` · `Direct line to clinical advisors` · `Quarterly board-ready reporting`.
- CTA (solid `.btn`): `Discuss an engagement`.

**Card 3 — North star / Strategic Retainer:**
- Tier `North star`, name `Strategic Retainer`, price `$4.5k`, per `/ month`.
- Desc: `Ongoing advisory once you're on the path. Kept warm for the moments that decide a year.`
- Features: `Monthly executive session` · `On-call review of major decisions` · `Network introductions` · `Annual strategic offsite`.
- CTA (ghost): `Stay in touch`.

Responsive: `≤1100px` 2 cols gap 18px; `≤880px` single col max 480px centered.

### 6.11 Booking (`<section class="booking" id="book">`)

`background: var(--ink); color: var(--paper); padding: 120px 0; position: relative; overflow: hidden`. A `::before` radial halo top-right with sun at 18% opacity.

`.booking-grid` `1fr 1fr; gap: 80px; align-items: start; z-index: 1`.

**Left column:**
- `<span class="lbl" style="color: color-mix(in srgb, var(--paper) 60%, transparent)">Book</span>`
- `<h2 style="margin-top:14px">` color paper, `clamp(36px, 4.6vw, 52px)`, max 480px. Text: `Tell us about your clinic — we'll bring the rest.`
- `<p class="lead">` mt 20px, `color-mix(in srgb, var(--paper) 70%, transparent)`, max 440px. Text: `A short note + a 30-minute call is all we need to figure out if we're a fit. No pitches, no slides — just an honest conversation.`
- `.booking-bullets` mt 38px (flex-col gap 18px). Three `.booking-bullet` rows: a 34×34 sun circle with serif number, then `<h4>` Inter 15px weight 500 + `<p>` 14px `--paper` at 60% opacity.
  1. `Pick a 30-min slot` — `Discovery calls happen Tues–Thurs, mornings or afternoons.`
  2. `Share a quick brief` — `Just enough context so we don't waste the first 15 minutes on intros.`
  3. `Get a direct, free read` — `If we're not the right team, we'll point you toward people who are.`

**Right column** `.book-card`: `background: var(--paper); color: var(--ink); border-radius: 24px; padding: 36px; box-shadow: 0 28px 80px rgba(0,0,0,.32)`.

- `<h3>` Fraunces 24px weight 500 mb 6px. Text: `Book a discovery call`.
- `<p class="small">` 14px `--ink-3` mb 24px. Text: `No payment required. We confirm within one business day.`
- `.form-row.split` `grid-template-columns: 1fr 1fr; gap: 14px`. Two fields:
  - `First name` / placeholder `Avery`
  - `Last name` / placeholder `Mitchell`
- `.form-row`: `Work email` / placeholder `avery@yourclinic.com`, type=email.
- `.form-row`: `What kind of practice?` — `<select>` with options (in order): `Independent clinic (1–5 providers)`, `Multi-site clinic group`, `Telehealth / digital health`, `Single-product health company`, `Medical device / diagnostic`, `Something else`.
- `.form-row` with label `Pick a 30-min slot — Thu, May 14`. Below it `.slot-grid` `repeat(4, 1fr); gap: 8px`. Eight `<button class="slot">` cells; the 10:30 cell carries `.active`. Slot labels in order: `9:00`, `10:30` (active), `1:00`, `2:30`, `3:30`, `4:00`, `4:30`, `5:00`. Slot style: `padding: 11px 0; text-align: center; font-size: 13px; border-radius: 10px; border: 1px solid var(--line); background: var(--surface)`. Hover swaps border to `--ink`. `.active`: `background: var(--sun); border-color: var(--ink); font-weight: 500`.
- `.form-row`: `One sentence on what's on your mind (optional)` with `<textarea>` placeholder `We're growing fast but our scheduling is breaking…`, min-height 80px.
- `<button class="btn lg">` full width: `Confirm discovery call`.

**Slot interactivity (optional but recommended):** mark the card as a client component and track `const [activeSlot, setActiveSlot] = useState(1)` (index of the `10:30` button). Clicking a slot updates state, applies `.active` to that button only, and removes it from others.

Form inputs: `width: 100%; padding: 13px 16px; border-radius: 12px; border: 1px solid var(--line); background: var(--surface); font-size: 14.5px`.

Responsive: `≤1100px` grid collapses to single column gap 40px; `≤880px` padding 88px 0; `≤600px` form-row.split and slot-grid become 2 cols; book-card padding `28px 22px; border-radius: 18px`.

### 6.12 Press (`<section class="press">`)

`background: var(--paper); padding: 80px 0 60px; border-top: 1px solid var(--line-soft); overflow: hidden`.

- `.press-label` Inter 13px color `--ink-3` mb 30px. Text: `Brightway is referenced in`.
- `.press-carousel` uses the shared `Ticker` primitive with `duration="30s"` and `gap="clamp(48px, 8vw, 96px)"`. It scrolls the publication wordmarks continuously, pauses on hover, and disables animation for reduced-motion users.
- Five `.press-logo` text wordmarks, each `display: inline-flex`, `min-width: clamp(180px, 17vw, 250px)`, `height: 64px`, centered, `white-space: nowrap`, and `opacity: .78`, with mixed treatments:
  1. `The Lancet Digital` — Fraunces 22px weight 500, letter-spacing `-.01em`.
  2. `MedCity News` — `.bold` modifier: Inter 18px weight 600 `letter-spacing: -.02em`.
  3. `Healthcare Brew` — `.condensed` modifier: Fraunces italic 22px weight 400.
  4. `STAT Reports` — default Fraunces.
  5. `Fierce Healthcare` — `.bold` modifier.

Responsive: `≤600px` `.press-label` mb 22px; `.press-logo` min-width 168px, height 54px, font-size 19px; `.press-logo.bold` font-size 16px.

### 6.13 Articles (`<section class="articles">`)

`background: var(--paper); padding: 80px 0 100px; border-top: 1px solid var(--line-soft)`. `.articles-grid` `repeat(3, 1fr); gap: 32px`.

Each `.article-card` (flex-col gap 16px) contains:
- `<span class="article-cat">` 12px `.06em` `--ink-3` mb 6px. Categories: `Operations` / `Compliance` / `Growth`.
- `.article-img` `height: 200px; border-radius: 14px; overflow: hidden`. Each has its own gradient:
  - `.a1`: `linear-gradient(160deg, #8a4a18 0%, #c87528 50%, #e89a3a 100%)`
  - `.a2`: `linear-gradient(160deg, #3a3328 0%, #5a4d36 50%, #7a6444 100%)`
  - `.a3`: `linear-gradient(160deg, #a04018 0%, #c8501c 50%, #e06d28 100%)`
- `<h4>` Fraunces 18px weight 500 line-height 1.3. Titles:
  1. `Why most independent clinics undercharge — and what to do about it`
  2. `Reading the new HIPAA security rule without scaring your engineering team`
  3. `The 90-day plan we use to get a single-product health company to its first 1,000 patients`

Responsive: `≤1100px` 2 cols; `≤600px` 1 col gap 24px.

### 6.14 Closer (`<section class="closer">`)

`background: var(--sun); padding: 120px 0; text-align: center`. Centered:
- `<h2>` Fraunces 500, `clamp(40px, 5.5vw, 72px)`, max 780px. Text: `A clearer path, made together.`
- `.btn.lg` mt 32px: `Book a discovery call` (href `#book`).

Responsive: `≤880px` padding 88px 0; `≤600px` padding 64px 0.

### 6.15 Footer (`<footer>`)

`background: var(--paper); padding: 80px 0 36px; border-top: 1px solid var(--line-soft)`. `.foot-grid` `1.4fr 1fr 1fr 1fr 1.6fr; gap: 48px; mb 60px`.

**Brand column** (`.foot-brand` flex-col gap 14px):
- `.foot-mark` 42×42 sun + paper inner circle with 1.5px ink border.
- Brand text Fraunces 22px weight 500: `Brightway`
- `<p style="color: var(--ink-3); font-size: 14px; max-width: 240px">` text: `Healthcare consulting for clinics and single-product health companies.`

**Three link columns** each `.foot-col`:
- `<h5>` Inter 13px weight 500 `.04em` color `--ink-3` mb 14px.
- `<ul>` no bullet flex-col gap 10px. Each `<a>` Inter 14.5px color `--ink-2`, hover `--ink`.

Columns + links (verbatim):
- **Engagements**: `Diagnostic Sprint`, `Operating Partner`, `Strategic Retainer`, `Compliance review`.
- **Company**: `Approach`, `Advisors`, `Press`, `Careers`.
- **Resources**: `Field notes`, `Case studies`, `Compliance library`, `Contact`.

**Newsletter column** `.foot-news`:
- `<h5>Stay connected</h5>` (color `--ink`, mb 8px).
- `<p>` 14px `--ink-2` mb 18px: `Field notes from inside small clinics — once a month, no fluff.`
- `<form class="foot-news-form">` flex gap 8px: `<input type="email" required placeholder="you@clinic.com">` (radius 999px, 12px 16px padding, 1px line border) + `<button class="btn">Subscribe</button>`.

**Bottom row** `.foot-bottom` (border-top line-soft, pt 28px, flex space-between, color `--ink-3`, 13px). Left: `© 2026 Brightway Health Partners, LLC`. Right: three legal links (`Terms`, `Privacy`, `Notice of Practices`), gap 24px.

**Disclaimer** `.foot-disc` (border-top line-soft, mt 36px, pt 24px, 12px `--ink-3` line-height 1.6, max 880px). Paragraph (verbatim):
> `Brightway Health Partners, LLC is a healthcare strategy and operations consulting firm. We do not provide medical care, diagnose conditions, or substitute for the judgment of a licensed clinician. Materials shared on this site are for informational purposes; engagement scopes, compliance support, and clinical advisory work are governed by individual statements of work.`

Responsive: `≤1100px` foot-grid 3 cols, newsletter goes `grid-column: 1 / -1` (spans entire row); `≤880px` 2 cols; `≤600px` 1 col, newsletter form stacks input over button full-width.

## 7. Responsive behaviour

Three-tier scheme (`@media (max-width: 1100px | 880px | 600px)` — cumulative).

- **>1100px (desktop):** all multi-col grids full count: nav links visible, pillars 4 cols, pricing 3 cols, articles 3 cols, press 5 cols, footer 5 cols. Hero centered with right-side gradient lit. Feature rows alternate sides.
- **881–1100px (tablet):** Nav links hide entirely (no hamburger; brand + CTA remain). Pillars 2 cols. Pricing 2 cols. Articles 2 cols. Press 3 cols. Footer 3 cols + newsletter spans full row. Features collapse to single column (image becomes `max-width: 540px; margin: 0 auto`); `.feature.reverse` order rule resets.
- **481–880px:** All split rows are 1 col. Pricing 1 col (max 480px centered). Footer 2 cols. Booking grid 1 col. Section padding generally drops to ~88px 0.
- **≤480px:** Hero actions stack vertically full-width. Pillars 1 col. Articles 1 col. Press 2 cols. Footer 1 col with newsletter form stacked. Form-row split + slot-grid both 2 cols. Section padding ~64px 0.

## 8. Motion & interactions

- **Hero / sections:** no entrance animations are required. If desired, fade-up on viewport intersection with 500ms duration / 80ms stagger, `cubic-bezier(.23,1,.32,1)`. Respect `prefers-reduced-motion`.
- **Buttons:** `.btn` transitions `transform .15s` and `background .2s`; hover lifts `translateY(-1px)`. `.btn.sun:hover` swaps background to `--sun-glow`. `.btn.ghost:hover` adds 5% ink wash.
- **Price cards:** hover lifts `translateY(-4px)` with shadow `0 18px 50px color-mix(in srgb, var(--ink) 8%, transparent)`.
- **Pillar icons:** static; no hover state required.
- **Rail arrows (interactive):** clicking the previous/next buttons should call `track.scrollBy({ left: -320 | 320, behavior: 'smooth' })`. If you build it without JS, scroll-snap still works via native swipe/track scroll. Both arrows must be keyboard-operable.
- **Slot grid (interactive):** click sets `activeSlot` state, swaps `.active` class. Tab order across the 8 cells in row-major order. Pressing Enter/Space activates the cell. `aria-pressed` should toggle on the active button.
- **Tooltip on stat `i`:** native `title` attribute carries `Based on engagements completed Jan 2022 – Mar 2026`. Improvement: add a styled tooltip via CSS on focus/hover if desired.
- **Newsletter form:** `required` validates the email; `<form>` submission should be intercepted (`preventDefault`) and replaced by an inline thank-you state if you choose to wire it.
- **Focus rings:** `:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px }` on all interactive elements; on the dark booking section use `outline: 2px solid var(--sun)` for visibility.

## 9. Accessibility & semantic structure

- One `<header>` (the nav), one `<main>` (wrapping sections 2–14 if you wish), one `<footer>`.
- One `<h1>` (the hero serif headline). All other sections start at `<h2>`. Articles use `<h4>`. Booking steps use `<h4>` inside the bullets.
- Every `<section>` has a unique `id` (`#how`, `#stories`, `#approach`, `#pricing`, `#book`) and an `aria-labelledby` pointing to its heading.
- Hero `<em>` is a true `<em>` — italic visual style is conveyed by the font + the `--sun` color. Screen readers will announce emphasis correctly.
- Pillar icons are `aria-hidden="true"` (decorative). Stat info marker uses `title` (native tooltip). Improvement: also expose as `<button aria-describedby>` with offscreen text.
- Rail arrows: `<button type="button" aria-label="Previous">` / `aria-label="Next"`.
- Slot grid: each `<button type="button">` with `aria-pressed={isActive}`.
- Form: every input has a `<label>`; the booking form's slot grid is wrapped with an `<fieldset>` + `<legend>` if you want semantic strictness. `required` on email.
- Color contrast: yellow-on-paper headings (`--ink #16170E` on `--sun`) clear AA; `--ink-3` on `--paper` clears AA at 16px.
- WAI-ARIA carousel for the rail isn't strictly required since native scroll is used, but the arrow buttons must work with keyboard.
- Wrap entrance/transition rules inside `@media (prefers-reduced-motion: no-preference)` or the global reduced-motion guard in §3.

## 10. Assets (images, video, icons, logos)

This template uses **no external image URLs**. All imagery is rendered as CSS gradient stacks defined inline above. Reuse exactly:

1. **Hero background wash** — `--hero-bg-gradient` (§3).
2. **Hero photo abstraction** — `--hero-photo-gradient` (§3).
3. **Feature image: Clinic** — `.img-clinic` gradient (§6.7).
4. **Feature image: Science** — `.img-science` gradient (§6.8).
5. **Feature image: Safety** — `.img-safety` gradient (§6.9).
6. **Article cover 1/2/3** — `.a1` / `.a2` / `.a3` gradients (§6.13).
7. **Testimonial portraits 1–5** — `.t1`–`.t5` gradients (§6.5).

Icons — all inline outline SVGs, stroke 1.6–1.7. See section copy for paths:
- Pillar icons (4): 28×28.
- Brand mark / footer mark: 26×26 / 42×42 CSS sun (concentric circles).
- Stat info: 18×18 CSS circle with letter `i`.
- Rail arrows: ASCII `←` / `→` glyphs inside 42×42 round buttons.
- Join illustration: 480×340 viewBox inline SVG (house + 2 stick figures + sun rays + dashed ground).

No icon library required.

## 11. Definition of done

- [ ] Page renders without console errors at 320, 480, 768, 1100, 1440px.
- [ ] No horizontal overflow at any of those viewports.
- [ ] Every interactive element (nav, all CTAs, rail arrows, slot grid, form inputs, newsletter input/button, footer links) is keyboard-operable with a visible focus ring.
- [ ] Lighthouse Accessibility = 100; AA contrast verified on hero headline, pricing tier label, booking subhead, footer copyright.
- [ ] Rail arrows scroll the testimonial track left/right by ~320px and the cards keep their scroll-snap alignment.
- [ ] One slot in the 4×2 grid (10:30) is visually selected by default; clicking another slot swaps the selection.
- [ ] Hero italic accent (`health-product`) renders in Fraunces italic and in `--sun` color; surrounding non-italic copy is in `--paper`.
- [ ] Featured pricing card is the middle tier (Operating Partner) in sun-yellow, with ink-colored bullets and a solid (non-ghost) CTA.
- [ ] The regulatory disclaimer paragraph appears verbatim at the very bottom of the footer.
- [ ] All copy strings match §5–§6 exactly; no Lorem ipsum, no AI paraphrasing.
