# SYS — Design System

> Contemporary fashion magazine + private atelier.

Editorial. Minimal. Warm. Human. Designer-led.

The implementation lives in `site/assets/css/sys.css`. This document explains the reasoning
so the system survives contact with new pages and new people.

---

## 1. What we refuse

This list is as important as the tokens. It is the fastest way SYS signals that it is not a
typical Indian boutique website.

| Refuse | Because |
| --- | --- |
| Excessive gold | Reads as costume luxury, not designed luxury |
| Maroon everywhere | The single most predictable Indian-boutique choice |
| Heavy borders and ornate frames | Decoration substituting for design |
| Wedding clichés (mandap motifs, henna swirls, marigold borders) | Generic; SYS is broader than weddings |
| Crowded product grids | Says "inventory". SYS has no inventory. |
| Too many fonts | Two families. That is the budget. |
| Excessive jewellery imagery | The garment is the subject |
| Generic "luxury fashion" signalling (all-caps serif on black, gold foil) | Signals category, not identity |
| The word "Shop" | See the copy deck. Non-negotiable. |

---

## 2. Colour

Warm paper, deep ink, and one restrained accent. Nothing else.

```
--sys-paper        #FAF7F2   warm off-white — the default ground
--sys-paper-deep   #F1EBE1   sections that need separation without a border
--sys-ink          #1F1B16   near-black, warm-shifted — body and headings
--sys-ink-soft     #554D43   secondary text
--sys-ink-faint    #8B8177   captions, metadata, step numbers
--sys-clay         #A85F42   the accent — terracotta, not gold, not maroon
--sys-clay-deep    #8A4B33   accent hover / pressed
--sys-sage         #6E7A63   the one supporting hue, used sparingly
--sys-line         #E2D9CC   hairlines
--sys-night        #201C18   inverted sections
```

**Why terracotta.** It is warm and Indian in feeling without being maroon, and it reads as a
pigment — clay, earth, dye — rather than as metal. Gold says "expensive". Clay says
"made by hand". SYS is the second thing.

**Accent discipline.** Clay appears on: the primary CTA, active states, rules under section
labels, and the occasional editorial flourish. It never fills a large area. If a page has
more than roughly 5% clay by area, it has too much.

**Dark sections.** `--sys-night` is used for at most two full-bleed moments per page — the
transformation strip and the closing CTA are the natural candidates. Inversion is a pacing
device, not a theme.

---

## 3. Typography

Two families. Both loaded from Google Fonts with real fallback stacks so the page is
legible before — and without — the webfonts.

```
--sys-display : "Fraunces", Georgia, "Times New Roman", serif
--sys-body    : "Inter", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

**Fraunces** is a warm, slightly quirky variable serif. At light weights and large sizes it
carries editorial authority without the funeral-invitation formality of Cormorant or the
generic-luxury feel of a Didone. **Inter** does everything else, invisibly.

### Scale

Fluid, `clamp()`-based, so the page is composed rather than merely responsive.

| Token | Range | Use |
| --- | --- | --- |
| `--fs-hero` | 3.25 – 6.5rem | Homepage hero only |
| `--fs-display` | 2.5 – 4rem | Page titles |
| `--fs-title` | 1.75 – 2.5rem | Section headings |
| `--fs-lead` | 1.15 – 1.4rem | Standfirst paragraphs |
| `--fs-body` | 1.0625rem | Body |
| `--fs-small` | 0.9375rem | Secondary |
| `--fs-label` | 0.75rem | Eyebrow labels, tracked +0.16em, uppercase |

### Rules

- Display type is set at **weight 300–400 only**. Never bold. Weight is not how this brand
  creates emphasis — scale and space are.
- Display type gets **negative tracking** (`-0.02em` to `-0.035em`) and tight leading
  (1.02–1.12). This is the single biggest difference between editorial and default.
- Body copy is capped at **62 characters** (`--measure`). Standfirsts at 46.
- Uppercase is reserved for the `--fs-label` eyebrow only. Headlines are sentence case.
- Never centre a paragraph longer than two lines.

---

## 4. Space and layout

An 8px base, expressed as a named scale so spacing decisions are chosen rather than typed.

```
--s-1 .5rem   --s-2 .75rem  --s-3 1rem    --s-4 1.5rem   --s-5 2rem
--s-6 3rem    --s-7 4rem    --s-8 6rem    --s-9 8rem     --s-10 12rem
```

**Section rhythm.** Sections breathe at `--s-9` (8rem) vertically on desktop, `--s-7` on
mobile. Generous vertical space is the primary luxury signal available without spending
money on photography. When in doubt, add space rather than a border.

**Containers.**

```
.wrap        max 1200px    default
.wrap--tight max  760px    long-form reading
.wrap--wide  max 1440px    full-bleed imagery
```

**Grids.** Asymmetry over symmetry. A 7/5 or 5/7 split reads as editorial; a 6/6 split reads
as a template. Portfolio grids are deliberately loose — 2 or 3 across at most, never 4, and
never uniform heights.

---

## 5. Components

### Buttons

Only two, and the hierarchy is absolute.

- **`.btn--primary`** — solid clay, white text. This is *Start Your Story*. There is **one
  per viewport**, ever.
- **`.btn--ghost`** — ink text, hairline border, transparent. Everything else, including
  *Explore Our Work* and *Start on WhatsApp*.

Both are pill-less: a 2px radius, not a rounded capsule. Sharp corners read as considered;
capsules read as an app.

### Section label

```
———— WHAT WE DO
```

A short clay rule followed by a tracked uppercase label at `--fs-label`. This is the only
recurring ornament in the system, and it does the work that borders and flourishes would
otherwise do.

### Cards

Cards have **no border, no shadow, no fill** by default. They are separated by space and by
the image itself. A card that needs a box has a layout problem.

### Occasion chips

Large, generous tap targets with hairline borders that fill with clay on hover/selection.
They are questions, not filters, so they are sized to be read, not scanned.

---

## 6. Motion

Restrained and functional.

- Transitions: `160ms` for hover/press, `400ms cubic-bezier(.2,.7,.3,1)` for entrances.
- One entrance effect only: a short fade-and-rise (`14px`) as sections enter the viewport,
  driven by `IntersectionObserver`.
- No parallax, no counters, no carousels that move on their own, no scroll-jacking.
- **`prefers-reduced-motion: reduce` disables all of it.** Content is visible by default and
  animation is opt-in via a class, so JavaScript failing never leaves a blank page.

---

## 7. Imagery

The system is built to make ordinary photography look intentional and great photography
look inevitable.

- **Aspect ratios:** 4:5 portrait for garments, 3:2 for process, 1:1 only in the
  transformation strip. Consistency across a page matters more than any individual crop.
- **Treatment:** natural light, warm neutrals, minimal retouching. The paper background
  should feel continuous with the photograph's ground.
- **The four-frame transformation** — Idea → Design → Creation → Final — is the signature.
  Where all four frames exist for a commission, they are shown together.
- **Placeholders** (`.ph`) are warm-toned tinted blocks with a caption naming exactly what
  photograph belongs there. Never a grey box, never a stock photo. A placeholder that names
  its intent is a brief; a grey box is a hole.

---

## 8. Accessibility

Non-negotiable, and mostly free if handled at the token level.

- All body text meets WCAG AA against paper. `--sys-ink-faint` is used only at
  `--fs-label` size and above 4.5:1.
- Every interactive element has a visible `:focus-visible` ring in clay with a 2px offset.
- The guided flow is fully keyboard-operable; each step moves focus to its heading.
- Uploads, chips and sliders carry real labels — no icon-only controls.
- Skip link on every page.
- Reduced-motion honoured throughout.

---

## 9. Applying this to a new page

1. Start from the eyebrow label + display heading + standfirst pattern.
2. Choose an asymmetric grid before choosing a symmetric one.
3. Add vertical space before adding a divider.
4. Use exactly one `.btn--primary`, and make it *Start Your Story*.
5. Check the clay budget — under ~5% of the page area.
6. Read the copy aloud. If it sounds like a shop, rewrite it.
