# SYS — Design System

> Premium atelier + modern digital studio. The interface should feel like
> **a private designer studio translated into software.**

Personal · Editorial · Sophisticated · Artistic · Feminine without being overly
decorative · Warm · Contemporary · Trustworthy · Crafted.

The implementation lives in `site/assets/css/sys.css`. This document explains the reasoning
so the system survives contact with new pages and new people.

---

## 0. The principle

Every screen answers one question: **"Where am I in my story?"** Never "where am I in
the order process?" That distinction is what makes SYS read as a new category of product
rather than a shop with better fonts.

The whole product — the website now, the app later — is one arc, and every screen knows
which part of it it belongs to:

```
STORY → INSPIRATION → DESIGN → FIT → CRAFT → WEAR
```

| Phase | What it holds | Maps to the 8-stage tracker |
| --- | --- | --- |
| **Story** | The customer's reason — occasion, brief | 01 Idea |
| **Inspiration** | What they love — references, fabric | (runs alongside 01) |
| **Design** | What SYS proposes | 02 Design |
| **Fit** | How it becomes theirs | 03 Measurements · 06 Fitting |
| **Craft** | How it gets made | 04 Cutting · 05 Stitching · 07 Final |
| **Wear** | The final result | 08 Delivered |

For the app, the direction in one sentence:

> A high-end fashion atelier, a digital moodboard and a personal designer's studio,
> combined into one elegant web application.

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
| Generic "luxury fashion" signalling (gold foil, ornament) | Signals category, not identity |
| Accent-coloured UI elements | The customer's fashion is the colour; the interface competes with nothing |
| Coloured badges and rainbow status dots | Status is typographic — black / dark grey / light grey |
| The word "Shop" | See the copy deck. Non-negotiable. |

---

## 2. Colour

**Monochrome Luxury.** No brown. No gold. No obvious accent colour. The photography,
fabrics and garments themselves become the colour.

```
--sys-paper        #FAFAF8   Soft White — the page ground
--sys-white        #FFFFFF   Pure White — header, cards, inputs, plates
--sys-paper-deep   #F2F2F0   Very Light Grey — secondary surfaces
--sys-ink          #111111   Black — text, primary button, dark sections
                             (18.1:1 on the ground)
--sys-ink-soft     #242424   Graphite — secondary information (14.9:1)
--sys-ink-faint    #6B6B6B   Mid Grey — descriptions, captions
                             (5.1:1 soft white, 4.8:1 very light grey)
--sys-line         #D8D8D5   Light Grey — borders, upcoming states
--sys-night        #111111   dark sections are the same black
```

**The ratio discipline: ~90% white / 7% black / 3% grey hierarchy** — and real fashion
imagery provides 100% of the colour.

**Why this suits SYS.** The proposition is personal and designer-led. A monochrome
interface means the interface never competes with the customer's fashion: when a
customer uploads a red saree, blue fabric, gold embroidery or a colourful inspiration
image, *that* becomes the visual focus. The UI stays quiet — which is exactly what a
premium fashion studio should do. It also reads timeless, gender-neutral and
international, and it will never look like a typical Indian boutique website.

**Grey is hierarchy, not decoration.** Five levels, used strictly:

| Level | Value | Carries |
| --- | --- | --- |
| Black | `#111111` | Important information |
| Graphite | `#242424` | Secondary information |
| Mid grey | `#6B6B6B` | Descriptions |
| Light grey | `#D8D8D5` / `#F2F2F0` | Borders, backgrounds |
| White | `#FFFFFF` / `#FAFAF8` | Space |

Never five random greys — every grey on a page must be one of these, doing that job.

**The one place colour appears: the customer's story.** Uploaded inspiration, fabric
swatches, a palette extracted from their images. The interface is black, white and
grey; the Story is not.

> **SYS is monochrome. Your story is not.**

That contrast is brand philosophy, not a styling gap — expressed in the brand line
*"Your story is the colour. We create the form."*

**Status is typographic, never chromatic.** Current stage black, completed dark grey,
upcoming light grey. No coloured dots, no coloured badges, no rainbow status system.
Errors and successes are worded (`"We couldn't save that — try again"`), set in ink,
and never rely on a hue to be understood.

**Dark sections.** `--sys-night` is the same near black, used for at most two
full-bleed moments per page — the transformation strip and the closing CTA. White
serif, grey body copy (`rgba(255,255,255,.62–.72)`), white/grey hairlines. Inside
`.section--night`, `--sys-ink-faint` rebinds to `#9A9A9A` (6.4:1) so numbers and
labels stay legible through the cascade.

---

## 3. Typography

Two families. Both loaded from Google Fonts with real fallback stacks so the page is
legible before — and without — the webfonts.

```
--sys-display : "Cormorant Garamond", Georgia, "Times New Roman", serif
--sys-body    : "Inter", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

The contrast between the elegant serif and the neutral sans is what carries the
luxury feeling — no colour required.

**Cormorant Garamond** is the fashion-editorial voice — a high-contrast garalde that
reads as a magazine masthead at display sizes. It comes with three handling rules:
never below weight 400 (its 300 disappears against ivory), a scale set ~8% larger than
a workhorse serif would need (it runs small on its em square), and almost no negative
tracking (it is already narrow). Its *italic* is the designer's-note voice — the
"handwritten" element of the system — so no actual script font ever appears.
**Inter** does everything else, invisibly.

### Scale

Fluid, `clamp()`-based, so the page is composed rather than merely responsive.

| Token | Range | Use |
| --- | --- | --- |
| `--fs-hero` | 3.5 – 7rem | Homepage hero only |
| `--fs-display` | 2.75 – 4.25rem | Page titles |
| `--fs-title` | 1.9 – 2.6rem | Section headings |
| `--fs-lead` | 1.15 – 1.4rem | Standfirst paragraphs |
| `--fs-body` | 1.0625rem | Body |
| `--fs-small` | 0.9375rem | Secondary |
| `--fs-label` | 0.75rem | Eyebrow labels, tracked +0.16em, uppercase |

### Rules

- Display type is set at **weight 400–500 only**. Never bold, and never Cormorant's
  300. Weight is not how this brand creates emphasis — scale and space are.
- Display type gets gentle **negative tracking** (`-0.015em` to `-0.02em`) and tight
  leading (1.02–1.12).
- Body copy is capped at **62 characters** (`--measure`). Standfirsts at 46.
- Uppercase is reserved for the `--fs-label` eyebrow and for buttons. Headlines are
  sentence case.
- Cormorant Garamond *italic* appears only as the designer's voice — pull quotes and
  designer notes — and always signed.
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

- **`.btn--primary`** — solid near black, white text, and a trailing **→**. This is
  *Start Your Story*. There is **one per viewport**, ever.
- **`.btn--ghost`** — white ground, black 1px border, black text; inverts on hover.
  Everything else, including *Explore Our Work* and *Start on WhatsApp*. Inline
  secondary actions can also be the `.link` text button with an arrow.

Both are set uppercase at 0.8125rem with wide tracking, on a **6px rounded
rectangle** — never a capsule, never a giant colourful e-commerce button.

### Section label

```
———— WHAT WE DO
```

A short black rule followed by a tracked uppercase label at `--fs-label`. This is the only
recurring ornament in the system, and it does the work that borders and flourishes would
otherwise do.

### Wordmark

`SYS` set large in the display serif with generous tracking, `STYLE YOUR STORIES` in a
small tracked uppercase beneath. That is the whole logo. Never: sewing-machine icons,
scissors, needles, hangers, dress silhouettes — each one instantly relabels SYS as a
tailoring business, which is the one thing the brand is not.

### Cards

Cards have **no border, no shadow, no fill** by default. They are separated by space and by
the image itself. A card that needs a box has a layout problem.

### Occasion chips

Large, generous tap targets with hairline borders; near black on hover, filled black when selected.
They are questions, not filters, so they are sized to be read, not scanned.

### Icons

Extremely simple line icons only — a single 1.5px stroke weight, no fills, no interior
detail, never emoji-as-icon. The working set:

story ✦ · inspiration — image frame · design — pencil · measurements — ruler ·
fitting — person outline · creation — thread / spool abstraction · delivery — package

Avoid detailed fashion icons (mannequins, dresses, sewing machines). Detailed icons
decorate; this set labels.

---

## 6. Motion

Restrained and functional.

The motion language is slow, cinematic, precise, restrained. Nothing bounces; nothing
feels like a SaaS animation. Motion communicates craftsmanship.

- Timing tokens: `--t-fast` 350ms (hovers, presses), `--t-slow` 800ms (entrances,
  reveals), `--t-draw` 1800ms (line drawing), all on
  `cubic-bezier(.22,.61,.21,1)`.
- The hero enters as a staggered editorial sequence — eyebrow, statement, standfirst,
  actions, attribution — pure CSS, ~100–820ms delays, so it runs without JavaScript.
- One scroll entrance only: a fade-and-rise (`22px`) as sections enter the viewport,
  driven by `IntersectionObserver`.
- Plates and threads draw themselves (`stroke-dashoffset`) when their section reveals.
- The primary button inverts on hover and its arrow moves 4px — a tiny controlled
  movement, never a bounce.
- The header compacts after ~96px of scroll with hysteresis, so it settles rather
  than flaps.
- No parallax, no counters, no carousels that move on their own, no scroll-jacking.
- **`prefers-reduced-motion: reduce` disables all of it.** Content is visible by default and
  animation is opt-in via a class, so JavaScript failing never leaves a blank page.

### Micro-interactions

Exactly three, each tied to a real moment in the story — and nothing else:

- **A story begins** → a thin thread draws itself across the screen. Implemented in the
  flow's confirmation (`.thread` in `sys.css`).
- **A design is approved** → the arc advances visibly: Story → Design → Create.
- **A story is completed** → *"Your story is ready."*

The thread is the signature — and it is structural, not only a moment. **The Story
Thread** is a very thin curved line that travels through the interface wherever a
journey is shown: connecting the three steps of the model on the homepage, and later
the app's order journey. It represents story → design → garment. Rules: 1.5px stroke in
near black, at most one thread per screen, about a second and a half of drawing when
its section reveals; under `prefers-reduced-motion` — and without JavaScript — it is
simply there, already drawn. Anything beyond the thread and the three moments above is
gimmick, not language.

---

## 7. Imagery

The system is built to make ordinary photography look intentional and great photography
look inevitable.

- **Aspect ratios:** 4:5 portrait for garments, 3:2 for process, 1:1 only in the
  transformation strip. Consistency across a page matters more than any individual crop.
- **Treatment:** natural light, warm neutrals, minimal retouching. The paper background
  should feel continuous with the photograph's ground.
- **Never generic stock fashion photography.** The editorial vocabulary is: natural
  light · close-up fabric textures · hands working on garments · sketches · fittings ·
  stitching · details · real customers · the designer at work. **Show the making, not
  just the finished clothes.**
- **The four-frame transformation** — Idea → Design → Creation → Final — is the signature.
  Where all four frames exist for a commission, they are shown together.
- **Photography provides 100% of the colour.** The homepage is white ground, black
  typography, and then a huge photograph of a woman in a custom SYS garment — deep
  emerald, crimson, gold, pink. The photograph is the visual event; the UI never is.
- **Plates** (`.ph` + `.plate`) stand in for photography until it exists: fine
  1.1px construction line art — a gown elevation, a bodice pattern block with dart and
  grain line, a drape study, a running stitch with the needle still in the cloth, the
  designer's french curve over a measure, thread leaving a spool — drawn on
  pattern-paper grids. Each drawing draws itself as its section reveals. The sprite
  lives in `site/assets/img/plates.svg`; each element's `data-shot` attribute remains
  the shoot brief for the photograph that will replace it. Never a flat grey box,
  never a labelled empty frame, never a stock photo.

---

## 8. Accessibility

Non-negotiable, and mostly free if handled at the token level.

- All text meets WCAG AA (4.5:1) with room to spare — a monochrome system makes this
  nearly free. Measured on white / soft grey: `--sys-ink` 18.9 / 17.2,
  `--sys-ink-soft` 10.9 / 9.9, `--sys-ink-faint` 5.7 / 5.3. White on the primary
  button and on `--sys-night` is 18.9:1; the night-rebound faint (`#9A9A9A`) is 6.4:1.
- Because status never relies on colour (§2), the system is colour-blind-safe by
  construction.
- Every interactive element has a visible `:focus-visible` ring in near black with a 2px offset.
- The guided flow is fully keyboard-operable; each step moves focus to its heading.
- Uploads, chips and sliders carry real labels — no icon-only controls.
- Skip link on every page, with `scroll-margin-top` on jump targets so the sticky header
  never covers the content that was jumped to.
- Reduced-motion honoured throughout.

---

## 9. Applying this to a new page

1. Start from the eyebrow label + display heading + standfirst pattern.
2. Choose an asymmetric grid before choosing a symmetric one.
3. Add vertical space before adding a divider.
4. Use exactly one `.btn--primary`, and make it *Start Your Story*.
5. Check the black budget — ~7% of the page; the rest is white, grey and photography.
6. Read the copy aloud. If it sounds like a shop, rewrite it.
