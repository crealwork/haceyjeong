# DESIGN.md — Hacey Jeong, REALTOR®

Brand identity for Hacey Jeong's Vancouver Island real estate site. Built on the realtor-site-starter (forked from Home Sweet Chloe, 2026-04).

---

## Brand Identity

**Brand name:** Hacey Jeong (display: "Hacey Jeong, REALTOR®")
**Realtor full name:** Hacey Jeong
**Realtor first name:** Hacey
**Brokerage:** Royal LePage Nanaimo Realty
**Tagline:** Notes from Vancouver Island.
**Positioning:** A REALTOR® who actually lived the relocation — Korea to Canada, oil & gas to entrepreneurship to the Island. She brings analytical clarity and quiet care to buyers and sellers across the central Island.
**Languages:** English (site EN-only; Hacey speaks English + Korean — advertised in body copy/contact, not via i18n route)
**Service area:** Vancouver Island, BC
**Focus corridors:** Nanaimo, Parksville, Qualicum Beach, Ladysmith, Duncan, Victoria
**Domain:** TBD (registration help requested — recommendations: `haceyjeong.ca`, `haceyjeong.com`, `islandwithhacey.com`)
**Aesthetic direction:** Warm modernist · editorial magazine
**Concept anchor:** "Notes" — a quieter, more personal frame than "Field Notes". Each section reads like a single page from a hand-kept notebook.

---

## About Copy

**Bio (1-2 sentences):**
Hacey Jeong is a REALTOR® with Royal LePage Nanaimo Realty, serving buyers and sellers across central and southern Vancouver Island. Bilingual in English and Korean, with a background that runs from chemical engineering to international energy to ownership of her own businesses.

**Essay paragraph 1:**
Having travelled to over thirty countries and lived through the full relocation journey myself, I chose Vancouver Island as my home with clarity and intention. Originally from South Korea and a graduate of Korea University in Chemical Engineering, my career has taken me from the global oil & gas industry into entrepreneurship, and now to real estate. Each chapter taught me how to read complex situations, ask the right questions, and stay calm when the stakes are high.

**Essay paragraph 2:**
Because I personally navigated immigration, housing, settlement, career transitions, and cultural adjustment, I understand what clients truly care about — finding the right community, making confident buying and selling decisions, and managing both the emotional and practical sides of a move. With a background in engineering, corporate strategy, and business ownership, I bring a blend of analytical thinking, organization, data-driven strategy, marketing, and calm problem-solving to every transaction.

**Pull quote:**
I don't just assist — I guide you through every stage with clarity and care.

**Background table:**
- Brokerage: Royal LePage Nanaimo Realty
- Previous experience: Global oil & gas · entrepreneurship
- Education: Korea University, Chemical Engineering
- Languages: English · 한국어
- Service area: Vancouver Island, BC

---

## Logo Files

No existing logo. Brand name renders as Fraunces text directly via web font (no SVG). Favicon set to be generated from a simple "H" mark in display font on canvas background.

| File | Usage |
|------|-------|
| `public/logo/favicon.ico` | Browser tab |
| `public/logo/favicon-32.png` | 32×32 favicon |
| `public/logo/favicon-192.png` | PWA / Apple touch icon |
| `public/logo/brokerage-logo.png` | Footer Royal LePage logo (TODO: source from brokerage) |

---

## Color Palette

Warm, Aritzia/Simons/Evernew-adjacent. Earth tones, no cool greys.

| Role | Name | Hex |
|------|------|-----|
| Ink (darkest text) | Charcoal Brown | `#1c1814` |
| Accent (brand pop) | Warm Clay | `#c88262` |
| Accent dark (hover) | Burnt Sienna | `#a3613f` |
| Accent light | Pale Clay | `#ecd6c8` |
| Canvas (off-white bg) | Warm Cream | `#faf3e9` |
| Line (borders) | Sand Line | `#ebdfce` |
| Graphite (secondary text) | Warm Stone | `#6e6357` |

---

## CSS Custom Properties

```css
--color-ink: #1c1814;
--color-accent: #c88262;
--color-accent-50: #faf0e9;
--color-accent-100: #f3dccd;
--color-accent-300: #ecd6c8;
--color-accent-500: #c88262;
--color-accent-700: #a3613f;
--color-charcoal: #2a241e;
--color-graphite: #6e6357;
--color-line: #ebdfce;
--color-canvas: #faf3e9;
```

---

## Typography

**Display font:** Fraunces (already loaded)
**Sans font:** Inter (already loaded)
**Korean font:** Pretendard (loaded via CDN for ko locale — keep)

Variable font opsz axis settings unchanged from starter.

---

## Voice & Imagery

**Tone:** Warm expert · personal · analytical without being cold. First-person where it makes sense (essay copy), third-person elsewhere (meta, UI). Korean phrasings show up where natural ("한국어로 편하게 연락하세요").

**Things to avoid:**
- Hype language ("luxury experience", "premier", "world-class")
- Generic relocation copy ("moving made easy")
- Stock-photo coastal cheese (whales, kayaks, forced "lifestyle" shots)
- ALL CAPS marketing speak
- Em-dash overload — keep it to one per paragraph

**Image style brief (for `scripts/prompts.json` stylePreset):**
Editorial photograph, magazine quality. Warm muted palette: cream (#faf3e9), warm clay (#c88262), deep charcoal-brown (#1c1814), warm sand (#c9a288). Soft natural light, coastal Pacific Northwest feel — cedar forest haze, low coastal sun, overcast diffused. Subtle film grain. Negative space dominant. Composition: rule of thirds with intentional asymmetry. 35mm or 50mm lens character. Portra 400 emulation. No people unless specified, no text overlay, no HDR, no saturation boost. Vancouver Island mood: arbutus, cedar, weathered wood, calm Pacific water, warm interior light.

---

## Service Areas

Primary:
- Nanaimo
- Parksville
- Qualicum Beach

Secondary:
- Ladysmith
- Duncan
- Victoria

---

## Specialties

- First-time buyers
- Resale condos / townhomes
- Resale detached homes
- Luxury
- Investment property

---

## Contact Information

**Realtor cell:** (604) 729-0317 (E.164: +16047290317)
**Realtor email:** sample@gmail.com (placeholder — update before launch)
**Instagram handle:** @haceyjeong
**Brokerage name:** Royal LePage Nanaimo Realty
**Brokerage address:** TBD (need full address from brokerage)
**Brokerage phone:** TBD

---

## Social Channels

| Platform | Handle | Active? |
|----------|--------|---------|
| Instagram | @haceyjeong | Yes |
| Facebook | TBD | TBD |
| LinkedIn | TBD | TBD |

---

## Compliance

**Regulator:** BCFSA (BC Financial Services Authority)
**License number:** RE604910
**Required footer text:** "Hacey Jeong, REALTOR® · Royal LePage Nanaimo Realty · BCFSA RE604910"
**REALTOR® trademark note:** REALTOR® must appear with superscript ® per CREA rules — implemented as `REALTOR<sup>®</sup>` in JSX.

---

## Testimonials

Three real client testimonials supplied in brief:

1. **Ava Bayers** — first-time buyer
2. **Frankie Radcliffe** — first-time buyer
3. **Kirsten Davis** — buyer with kids

Use a dedicated `Testimonials` section on the homepage and About page. No fake star ratings, no avatar mockups. Hairline cards, italic quote, attribution in display font.

---

## Open Questions

- [ ] Domain registration: confirm preferred domain (haceyjeong.ca recommended)
- [ ] Real email (sample@gmail.com is a placeholder — need a brand email)
- [ ] Royal LePage Nanaimo full office address + phone
- [ ] Brokerage logo PNG
- [x] Korean translation: NO (locked EN-only per global rule 2026-04-25)
- [ ] Estimator: include? Vancouver Island has wide $/sqft variance — recommend YES with conservative ranges
- [ ] Cloudflare email routing for hacey@haceyjeong.ca
