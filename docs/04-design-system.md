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
| Generic "luxury fashion" signalling (all-caps serif on black, gold foil) | Signals category, not identity |
| The word "Shop" | See the copy deck. Non-negotiable. |

---

## 2. Colour

Warm paper, deep ink, and one restrained accent. Nothing else.

```
--sys-paper        #F7F3ED   Warm Ivory — the default ground
--sys-paper-deep   #E8DED1   Soft Sand — cards, sections, subtle surfaces
--sys-ink          #242321   Deep Charcoal — body and headings (14.2:1 on ivory)
--sys-ink-soft     #554D43   secondary text (7.5:1 ivory, 6.3:1 sand)
--sys-ink-faint    #685E56   captions, metadata, eyebrow labels (5.7:1 / 4.8:1)
--sys-clay         #B56F5B   Muted Terracotta — THE accent. Rules, highlights,
                             active states, focus rings. Never text, never
                             under white text (3.5:1 as text — fails AA)
--sys-clay-fill    #A26351   interactive fills — buttons, selected chips.
                             White text on it reads 4.5:1
--sys-clay-text    #8B5546   terracotta used as text (5.5:1 ivory, 4.5:1 sand)
--sys-clay-deep    #8D5646   fill hover / pressed (5.7:1 under white)
--sys-brass        #A58A61   Antique Brass — hairline details only, extremely
                             sparingly, never text (3.0:1)
--sys-sage         #6E7A63   supporting hue — tints and fills
--sys-ok           #5E6A54   success as text — muted sage (5.2:1)
--sys-error        #96473B   error as text — Muted Brick (5.8:1 / 4.8:1)
--sys-line         #DBCEBD   hairlines
--sys-night        #201C18   inverted sections
```

**The ratio discipline: 80% neutral / 15% warm secondary / 5% accent.** Ivory carries
the page, sand separates, terracotta punctuates. Brass exists for the occasional
hairline that wants warmth without pulling toward the accent — if it appears more than
once or twice on a page, it is being misused.

**Why terracotta.** It is warm and Indian in feeling without being maroon, and it reads as a
pigment — clay, earth, dye — rather than as metal. Gold says "expensive". Clay says
"made by hand". SYS is the second thing.

**Accent discipline.** Clay appears on: the primary CTA, active states, rules under section
labels, and the occasional editorial flourish. It never fills a large area. If a page has
more than roughly 5% clay by area, it has too much.

**One terracotta, three jobs — and the difference matters.** The palette's stated
accent, `#B56F5B`, fails AA both as text (3.5:1 on ivory) and under white button text
(3.7:1). So it holds the *decorative* accent roles — rules, highlights, active-state
borders, focus rings — while two derived shades do the load-bearing work:
`--sys-clay-fill` (`#A26351`) under white text on buttons and selected chips, and
`--sys-clay-text` (`#8B5546`) wherever terracotta is a word. All three are close enough
to read as one hue; the derivation is measured, not aesthetic.

**Dark sections.** `--sys-night` is used for at most two full-bleed moments per page — the
transformation strip and the closing CTA are the natural candidates. Inversion is a pacing
device, not a theme. `.section--night` rebinds `--sys-clay-text` to `#C07A5C` (4.98:1 on
night), so any component using that token adapts through the cascade without a per-component
override.

---

## 3. Typography

Two families. Both loaded from Google Fonts with real fallback stacks so the page is
legible before — and without — the webfonts.

```
--sys-display : "Cormorant Garamond", Georgia, "Times New Roman", serif
--sys-body    : "Inter", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif
```

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

- **`.btn--primary`** — solid `--sys-clay-fill`, white text, and a trailing **→**. This
  is *Start Your Story*. There is **one per viewport**, ever.
- **`.btn--ghost`** — ink text, hairline border, transparent. Everything else, including
  *Explore Our Work* and *Start on WhatsApp*. Inline secondary actions can also be the
  `.link` text button with an arrow.

Both are set uppercase at 0.8125rem with wide tracking, on a **6px rounded
rectangle** — never a capsule, never a giant colourful e-commerce button.

### Section label

```
———— WHAT WE DO
```

A short clay rule followed by a tracked uppercase label at `--fs-label`. This is the only
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

Large, generous tap targets with hairline borders that fill with clay on hover/selection.
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

- Transitions: `160ms` for hover/press, `400ms cubic-bezier(.2,.7,.3,1)` for entrances.
- One entrance effect only: a short fade-and-rise (`14px`) as sections enter the viewport,
  driven by `IntersectionObserver`.
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
terracotta, at most one thread per screen, about a second and a half of drawing when
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
- **Placeholders** (`.ph`) are warm-toned tinted blocks with a caption naming exactly what
  photograph belongs there. Never a grey box, never a stock photo. A placeholder that names
  its intent is a brief; a grey box is a hole.

---

## 8. Accessibility

Non-negotiable, and mostly free if handled at the token level.

- All text meets WCAG AA (4.5:1). Measured against `--sys-paper` / `--sys-paper-deep`:
  `--sys-ink` 14.2 / 11.8, `--sys-ink-soft` 7.5 / 6.3, `--sys-ink-faint` 5.7 / 4.8,
  `--sys-clay-text` 5.5 / 4.5, `--sys-error` 5.8 / 4.8, `--sys-ok` 5.2 on ivory.
  Button text (`#FFF9F5` on `--sys-clay-fill`) is 4.5, on hover 5.7.
  On `--sys-night`: paper 15.8+, the rebound `--sys-clay-text` (#C07A5C) 4.98.
- `--sys-clay` and `--sys-brass` are never used for text — see §2. As non-text UI
  (focus rings, active borders) terracotta measures 3.5:1, above the 3:1 minimum.
- Every interactive element has a visible `:focus-visible` ring in clay with a 2px offset.
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
5. Check the clay budget — under ~5% of the page area.
6. Read the copy aloud. If it sounds like a shop, rewrite it.
