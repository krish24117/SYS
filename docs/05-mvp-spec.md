# SYS Studio — MVP Specification (Phase 2)

The Phase 1 website is a lead engine and needs no backend beyond a form endpoint and a
WhatsApp deep link. This document specifies the Phase 2 app, to be built **only once
customers are paying**.

Building this before there is revenue is the most likely way to waste the next six months.

---

## 1. Scope

### In scope — customer

Sign in · Start Story · upload inspiration · describe requirement · choose budget ·
book consultation · measurements · design approval · payment · order tracking · My Stories.

### In scope — designer

Customer enquiries · story details · design upload · quote · measurement management ·
order status · customer communication.

### Explicitly out of scope

AI design assistance · AI visualization · fabric recognition · design recommendations ·
virtual try-on · automated measurement assistance · personal wardrobe · repeat-order
recommendations.

Each of these is genuinely valuable and each is Phase 3. The MVP's only job is to make
money and remove admin.

The first version is deliberately focused on one funnel — **story creation → designer
consultation → quote → payment → production → delivery** — and every screen in scope
exists to move a story along that line.

---

## 2. Actors

| Actor | Surface | Volume assumption |
| --- | --- | --- |
| **Customer** | `app.` — phone-first web app | Tens per month at launch |
| **Designer** | `studio.` — desktop-first dashboard | One, possibly two |
| **Studio staff** | `studio.`, restricted | Production status only |

Designed for one designer and a handful of concurrent commissions. Do not build for scale
that does not exist; correctness and speed of iteration matter more.

---

## 3. Data model

```
User
  id · name · phone · email · created_at · role(customer|designer|staff)

Profile                                    ← the compounding asset
  user_id
  measurements_id → current MeasurementSet
  fit_preference   relaxed | regular | fitted | body_skimming
  fit_notes[]      free text, e.g. "I don't like tight sleeves"
  colours_loved[] · colours_avoided[]
  preferred_silhouettes[] · fabric_preferences[]
  style_profile    { classic_contemporary, minimal_detailed,
                     traditional_modern, soft_dramatic }   each -100..100
  occasions[]

Story                                      ← the central object; never "Order"
  id · user_id · title            "My Sister's Wedding"
  occasion · brief                free text from the customer
  style_tags[] · budget_band · needed_by
  status                          enquiry → consultation → design → approved →
                                  measurements → production → fitting → final → delivered
  stage                           1..8 (drives the visual tracker)
  designer_id · created_at

Reference                                  ← uploaded inspiration
  id · story_id · type(inspiration|fabric|existing_garment|sketch)
  file_url · caption · uploaded_by

DesignDirection
  id · story_id · label           "A — Modern Classic"
  summary · sketch_url[] · designer_note
  status                          proposed | approved | changes_requested

MeasurementSet                             ← versioned; bodies change
  id · user_id · taken_by · taken_at · method(designer_assisted|self_guided)
  values{}                        named measurements in cm
  supersedes → MeasurementSet.id

Quote
  id · story_id
  line_items[]                    { label, amount }  design fee / stitching / materials /
                                                     customization
  total · currency(INR)
  status                          draft | sent | approved | expired

Payment
  id · quote_id · type(advance|balance) · amount
  status(pending|paid|failed) · provider_ref · paid_at

Fitting
  id · story_id · scheduled_at · notes · adjustments[] · outcome

Message
  id · story_id · sender · body · attachments[] · channel(app|whatsapp) · sent_at

GiftCredit                                 ← Phase 2b
  id · code · amount · purchased_by · redeemed_by · redeemed_at
```

**Design notes**

- `Story` is the spine. Everything — references, directions, quotes, payments, fittings,
  messages — hangs off it. There is no separate "order" entity, because in this business
  there is no separate order.
- `MeasurementSet` is **versioned, never updated in place**. A garment must be traceable to
  the measurements it was actually cut against.
- `Profile.style_profile` is written by the Create flow's sliders and read by the designer.
  It is a communication aid between customer and designer — not an algorithm input, at
  least not yet.
- `Message.channel` records whether a conversation happened in-app or on WhatsApp, so the
  story detail view is a complete record either way.

---

## 4. Customer flows

### 4.1 Start a story

```
Home → "What are you creating?" → occasion
  → Step 1  Your Story        free text brief
  → Step 2  Inspiration       0–6 uploads
  → Step 3  Your Style        four sliders → style_profile
  → Step 4  Design direction  choose from proposed directions
  → Step 5  Designer responds approve, or request changes
```

The designer's response in step 5 is mandatory. The system organises and presents; the
designer decides and explains. Auto-approving a direction without her would remove the
reason the customer is paying a premium.

### 4.2 Quote and payment

```
Quote sent  →  customer sees itemised breakdown  →  Approve & Pay
            →  50% advance   (status → approved, stage → 4)
            →  ...production...
            →  50% balance   (before delivery)
```

Itemisation is required. A single number invites negotiation on the whole; a breakdown
invites a conversation about scope.

### 4.3 Tracking

Eight stages, always visual, never a status string:

```
01 Idea  02 Design  03 Measurements  04 Cutting
05 Stitching  06 Fitting  07 Final  08 Delivered
```

The eight stages group into the six-phase arc the design language uses everywhere
(design doc §0): Story (01) · Design (02) · Fit (03, 06) · Craft (04, 05, 07) ·
Wear (08) — with Inspiration running alongside as the references that started it. The
tracker's question is always "where am I in my story?", never "where is order #12345?".

Stage changes push a WhatsApp notification with a deep link back into the app.

---

## 5. Designer dashboard — SYS Studio

### 5.1 Today's work

The landing screen is a queue, not an analytics dashboard.

```
New Stories          7      unread enquiries
Design Reviews       4      awaiting her direction or her response to a change request
Measurements         3      booked or outstanding
Fittings             5      scheduled
Production           8      in stages 4–7
Ready for Delivery   3      stage 8 pending handover
```

Each number opens a filtered list. Every item in every list has exactly one obvious next
action.

Below the queue, the active stories as **customer cards** — name first, because the
designer thinks in people, not orders:

```
Ananya
Wedding Story
₹24,500
Design approval pending

[ Open Story → ]
```

One card = who · which story · its value · the one thing blocking it · one action.

### 5.2 Story detail

One screen holding everything, so she never has to reconstruct context:

inspiration · design directions · designer notes · measurements · fabric · price ·
timeline · **previous garments** · communication · fitting history.

*Previous garments* is the one that makes a repeat customer feel known.

### 5.3 The operational goal

Track **designer minutes spent on administration per commission**. If the dashboard does
not move that number down within a month of launch, it has failed, regardless of how
complete it is.

---

## 6. Integrations

| Concern | Approach at MVP |
| --- | --- |
| **WhatsApp** | Business API for outbound status notifications with deep links. Do **not** attempt to replace WhatsApp conversation — mirror it into `Message`. |
| **Payments** | A standard Indian gateway (UPI, cards, netbanking). Two captures per story: advance and balance. |
| **File uploads** | Object storage, signed URLs, images resized on upload. Six references per story cap. |
| **Auth** | Phone + OTP. Email is optional. This audience lives on a phone number. |
| **Notifications** | WhatsApp first, email as fallback. No push at MVP. |

---

## 7. Non-functional requirements

- **Phone-first.** The customer app is used on a phone, frequently on mobile data, often
  while sitting with someone else. Assume small screens and slow networks.
- **Uploads must be forgiving.** Large photos from a phone camera, HEIC included, resized
  client-side before upload. A failed upload must never lose the written brief.
- **Drafts survive.** A story in progress is saved continuously. Losing a half-written brief
  is the single worst failure this product can have.
- **Data sensitivity.** Measurements are personal data. Encrypted at rest, never in
  notification payloads, never in a URL.
- **Bilingual-ready.** Copy externalised from day one so English/Hindi/Telugu can be added
  without a rewrite.

---

## 8. Build order

1. Auth + Profile + Story (create, list, view) — the spine.
2. References upload + the Create flow.
3. Designer dashboard: enquiries → story detail → design upload.
4. Quote + payment (advance/balance).
5. Measurements + versioning.
6. Eight-stage tracking + WhatsApp notifications.
7. Fittings + messages.
8. Gifting (2b).

Ship 1–4 before building 5–8. The moment a customer can be quoted and can pay, the app is
already earning; everything after that is efficiency.

---

## 9. UI treatment

How the screens of §4–§5 should feel. Tokens, type and the thread come from
`docs/04-design-system.md`; this section is the app-specific application.

### 9.1 Create — conversational, never a form

The feel is **ChatGPT + Pinterest + personal stylist**. Header:

> Let's create something that's yours.

Then one conversational card: *What are you dressing for?* — large selectable tiles
(Wedding · Celebration · Party · Festival · Everyday · Something Special), followed by
*"Or tell us in your own words."* over a large free-text box. The app home uses this
short occasion set; the website keeps its longer conversational list.

### 9.2 Inspiration and the Storyboard

A large visual drop zone — *Show us what inspires you* / *Drag images here* /
*+ Add inspiration* — with the sources named underneath: Instagram · Pinterest ·
Photos · Sketches · Fabric.

Uploads land in a masonry **Storyboard**: inspiration photos, fabric, colour, texture,
silhouette, and the designer's handwritten-style note, mixed. This is the one place
colour lives in the app — including a palette extracted from the customer's own
inspiration images. The interface stays black, white and grey; the Story does not.
*SYS is monochrome. Your story is not.* Above it, the read-back:

```
Your Storyboard
Mood: Elegant / Contemporary / Soft
Colours: Ivory / Rose / Deep Green
Silhouette: Structured
```

### 9.3 Design directions — editorial boards, not product cards

```
Direction 01 — Modern Heritage
Short description.
Silhouette: Structured · Fabric: Silk · Detail: Minimal handwork
[ View Design ]
```

Three directions, named like editorial spreads, each with its board.

### 9.4 Designer notes

The emotional core. Set in the display serif's italic — never an actual script font —
used sparingly, and always signed:

> *"I would keep the neckline clean and let the sleeve detail become the statement."*
> — [Designer Name]

### 9.5 Fit Profile — never clinical

Titled **Your Fit Profile**, not "Measurements". Values (height, shoulder, bust,
waist, hip) plus preference sliders:

```
Relaxed   ○────●────○   Fitted
```

And the open question that becomes permanent profile data: *"Anything you'd like us
to remember?"* → "I prefer longer sleeves."

### 9.6 The order journey

A horizontal story progression, the current stage emphasised, the Story Thread
running through it:

```
IDEA → DESIGN → FIT → CREATION → WEAR
```

(The display form of the §4.3 arc: Inspiration folds into Idea, Craft shows as
Creation.) Stage state is typographic, never chromatic: current stage black,
completed dark grey, upcoming light grey — no coloured dots. Beneath it, status in
words, with a real date:

> Design approved. Your garment is now moving into production.
> Estimated completion: 12 Sept

Never "Order status: Processing."

### 9.7 Customer dashboard

```
Good morning, [Name]

Your Stories
  The Wedding Story    Design approved · Creating now
  The Festive Story    Delivered
  [ Start another story + ]

Your Style   Contemporary · Elegant · Minimal
Your Fit     your saved measurements
For You      suggested designs from your previous stories
```

### 9.8 Designer dashboard header

**SYS Studio** — *12 active stories*, then the §5.1 queue and customer cards. The
studio side is deliberately more functional than the customer side: density is a
feature there, not a flaw.

---

## 10. Phase 3 — the design intelligence layer

Only once there is a corpus of real commissions:

AI design assistance · style profile inference · AI visualization ("upload your fabric,
upload your inspiration, choose a silhouette, see possible directions → *Send to
designer*") · fabric recognition · design recommendations · virtual try-on · automated
measurement assistance · personal wardrobe · repeat-order recommendations.

**The constraint that must survive Phase 3:** the output of any generated direction is a
*proposal to the designer*, never a design sent to the customer. The technology layer must
never cost SYS the thing it actually sells — human designer, customization, craftsmanship.
