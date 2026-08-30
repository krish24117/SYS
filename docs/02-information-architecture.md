# SYS — Information Architecture

Two distinct products share one brand:

1. **The website** — a public lead-generation and consultation engine (Phase 1).
2. **The studio app** — a private client portal and designer dashboard (Phase 2).

They are documented separately because they have different jobs, different audiences and
different success metrics. Conflating them is how a lead engine accidentally becomes a
slow e-commerce store.

---

## Part A — The website

### A.1 Navigation

```
SYS · Style Your Stories

HOME
│
├── STORIES                  "Stories We've Styled" — the portfolio
│   ├── Bridal
│   ├── Weddings
│   ├── Celebrations
│   ├── Everyday
│   └── Transformations      Bring Your Fabric case studies
│
├── CUSTOM DESIGN
│   ├── Start Your Story     the guided flow
│   ├── Bring Your Fabric
│   └── Design Consultation
│
├── COLLECTIONS              secondary — inspiration, not inventory
│   ├── Gowns
│   ├── Sarees
│   ├── Blouses
│   ├── Indo-Western
│   └── Occasion Wear
│
├── THE DESIGNER
│
├── HOW IT WORKS
│
├── JOURNAL
│
└── [ START YOUR STORY ]     persistent primary CTA
```

Notes on the shape:

- **Collections are deliberately secondary.** They exist so a visitor who thinks in
  categories has somewhere to land, but every item in them ends in **Customize this
  design**, never *Add to cart*.
- **Stories outrank Collections** in the nav order. The portfolio is the sales argument;
  the categories are just wayfinding.
- **Start Your Story is not a nav item.** It is a persistent button, visually distinct,
  present in the header on every page and repeated at the end of every page.

### A.2 The homepage, in order

The homepage has one job: get to *Start Your Story*. It is a single argument, told in
sequence.

| # | Section | Purpose |
| --- | --- | --- |
| 1 | **Hero** — "Wear Your Story." | Establish that this is custom, not retail. Two CTAs: *Start Your Story* (primary), *Explore Our Work* (secondary). No "Shop Now" anywhere. |
| 2 | **You don't choose from a rack. We create from your story.** | The three-step model: Tell us → Design it → Make it yours. Sells the process, not the garment. |
| 3 | **What are you dressing for?** | Occasion-led entry replacing category navigation. Ends with *I don't know yet*. |
| 4 | **The transformation** | Idea → Design → Creation → Final. The signature visual language. |
| 5 | **Stories We've Styled** | Three or four featured commissions as stories. |
| 6 | **Meet the Designer** | Portrait, philosophy quote, link to her full page. Trust. |
| 7 | **Bring Your Fabric** | The differentiator, given its own full-width moment. |
| 8 | **Pricing** | Four public entry points. Filters the audience. |
| 9 | **Closing CTA** | *Tell us your story.* → Start Your Story + WhatsApp. |

### A.3 "What are you dressing for?"

This replaces conventional category navigation (Women's Wear / Lehengas / Gowns / Blouses)
with an occasion-led question. It is one of the most distinctive parts of SYS, because it
asks about the customer's life rather than the shop's taxonomy.

```
My Wedding                  A Special Evening        I Have an Idea
My Daughter's Wedding       My First Saree           I Don't Know Yet
A Celebration               Something Completely New
A Party                     I Have a Fabric
```

**"I don't know yet" is the most important option on the page.** It is the honest state of
most visitors, and every other website punishes it. Here it is a legitimate answer, and it
routes straight to the designer. Selecting any option pre-fills the guided flow.

### A.4 The guided flow — Start Your Story

Six steps, one question per screen, progress always visible. Designed to feel like talking
to a personal designer, not filling in a form.

| Step | Question | Input |
| --- | --- | --- |
| 1 | What's the occasion? | Occasion chips (pre-filled from §A.3 if arriving from the homepage) |
| 2 | What are you imagining? | Free text — *"My sister is getting married and I want something elegant but not too traditional."* |
| 3 | Show us your inspiration | Multi-upload: Pinterest image, Instagram screenshot, an old outfit, a fabric photo, a celebrity look, a rough sketch |
| 4 | What's your style? | Minimal / Elegant / Traditional / Contemporary / Dramatic / Romantic / Experimental |
| 5 | What's your budget? | ₹5–10K · ₹10–20K · ₹20–50K · ₹50K+ |
| 6 | When do you need it? | Date or timeframe |
| → | **Meet your designer** | Book a video consultation or a studio consultation |

Rules:

- Every step is skippable except the occasion. An incomplete story is still a lead.
- Uploads are optional but heavily encouraged — a story with references converts far better.
- The flow ends in a booking or in WhatsApp with the story attached. It never ends in a
  cart.
- Progress is saved locally so a refresh does not destroy the story.

### A.5 Stories We've Styled

Each portfolio item is a **story**, structured identically so the format becomes recognisable:

```
The Reception Story
  Customer wanted:  contemporary + elegant + traditional
  Designed:         custom gown
  Details:          handwork / silhouette / fabric
  Final look:       photograph
```

Recurring story types: *The Reception Story · The Mother-of-the-Bride Story · The Saree
Transformation Story · The First Couture Story · The Hyderabad Wedding Story.*

Each should carry the four-frame transformation where the imagery exists.

### A.6 How It Works

A dedicated page — **Your Story → Your Garment** — making the process explicit. Trust in a
premium custom garment comes from the customer being able to see the whole path before
committing.

```
01 — Tell us your story
02 — Consultation
03 — Design proposal
04 — Fabric & details
05 — Measurements
06 — First fitting
07 — Final creation
08 — Delivered
```

### A.7 Contact model

WhatsApp everywhere. Every page carries **Talk to SYS** / **Start on WhatsApp**. Forms are
a fallback, never the primary path, and never more than a handful of fields.

---

## Part B — The studio app

### B.1 Customer navigation

```
Home | My Stories | Create | Messages | Profile
```

#### Home — "What are you creating?"

Opens with the question, then quick entries:

- Occasions: Wedding · Party · Festival · Work · Everyday · Gift · Something Special
- **I have an idea** → upload an image
- **I have fabric** → upload a photograph
- **I need help** → talk to the designer

#### Create — the heart of the app

| Step | What happens |
| --- | --- |
| 1 — Your Story | Free-text description of the occasion and intent |
| 2 — Inspiration | Multiple reference uploads |
| 3 — Your Style | Interactive sliders: Classic ↔ Contemporary · Minimal ↔ Detailed · Traditional ↔ Modern · Soft ↔ Dramatic. Produces a persistent **style profile**. |
| 4 — Design direction | Several organised directions, e.g. *A — Modern Classic · B — Contemporary Indian · C — Statement*. Customer picks one. |
| 5 — **The designer enters** | Named designer responds: *"I've reviewed your story and references. I recommend a structured silhouette with softer detailing because…"* Customer can **Approve direction** or **Request changes**. |

Step 5 is non-negotiable. The system organises; the designer decides. Removing the human
from this loop removes the reason to pay premium prices.

#### My Stories

Replaces "My Orders" entirely.

```
My Sister's Wedding    — Design Approved
My Diwali Story        — Delivered
My Reception Story     — In Production
```

Every garment is a story with a name, not an order number.

#### Order tracking — visual, eight stages

```
01 Idea          ✓
02 Design        ✓
03 Measurements  ✓
04 Cutting       ●   in progress
05 Stitching     ○
06 Fitting       ○
07 Final         ○
08 Delivered     ○
```

Far more appropriate to custom fashion than *Order #12345 — Processing*.

#### Profile — the compounding asset

Measurements · body preferences · fit preferences · colours I love · colours I avoid ·
preferred silhouettes · past designs · fabric preferences · occasions.

Fit preferences are stored as both a setting (Relaxed / Regular / Fitted / Body-skimming)
and free text (*"I don't like tight sleeves." "I prefer more room around the waist."*).
This is permanent. The second commission never asks for measurements again.

### B.2 Measurement sessions

- **Designer-assisted** — the default, and the only one at launch.
- **Guided self-measurement** — later, once the failure modes are understood.

Both write into one measurement profile with a revision history, because bodies change and
a garment must be cut against the measurements current at the time.

### B.3 Designer dashboard — SYS Studio

A separate surface. This is where the business becomes operationally powerful.

**Today's work**

```
New Stories          7
Design Reviews       4
Measurements         3
Fittings             5
Production           8
Ready for Delivery   3
```

**Customer story detail** — one screen holding everything:

inspiration · design directions · designer notes · measurements · fabric · price ·
timeline · previous garments · communication · fitting history.

The goal is a measurable reduction in administrative work per commission.

### B.4 Pricing inside the app

Once a design is defined, the quote is itemised — not a single opaque number:

```
Your Design — Gown, custom silhouette, hand detailing, premium fabric

  Design fee    ₹ 2,000
  Stitching     ₹ 6,500
  Materials     ₹10,000
  ─────────────────────
  Total         ₹18,500

  [ Approve & Pay ]     50% advance · 50% before delivery
```

Itemisation is a trust device. It shows what the customer is buying and makes the design
fee legible as a real cost rather than a surcharge.

### B.5 Gifting and referral

**Gift a Story** — a second growth loop.

- ₹2,000 SYS Design Credit
- A Custom Blouse Experience
- A Design Consultation

The recipient receives a link: *"Someone gifted you a SYS Story."* Every gift is a new
customer arriving pre-endorsed by someone they trust.

---

## Part C — MVP boundary

The MVP deliberately does **not** contain everything. See `docs/05-mvp-spec.md` for the
full scope; the boundary itself is:

**In — customer:** sign in · start story · upload inspiration · describe requirement ·
choose budget · book consultation · measurements · design approval · payment · order
tracking · My Stories.

**In — designer:** enquiries · story details · design upload · quote · measurement
management · order status · customer communication.

**Out, until customers are paying:** AI design assistance · AI visualization · fabric
recognition · design recommendations · virtual try-on · automated measurement · personal
wardrobe · repeat-order recommendations.

That in-scope list is enough to generate revenue. Everything else is Phase 3.
