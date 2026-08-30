# SYS — Roadmap

Three phases. Each one must be earning before the next begins.

---

## Phase 1 — The lead engine  *(this repository, now)*

**Goal:** turn strangers into booked consultations.

**Shipped here**

- Homepage carrying the full argument, hero → closing CTA
- *Start Your Story* — six-step guided flow, saved locally, ending in WhatsApp or a booking
- *What are you dressing for?* occasion-led entry
- *Bring Your Fabric* as its own page
- *Stories We've Styled* portfolio, in story format
- *The Designer* page
- *How It Works* — the eight-step process
- WhatsApp reachable from every page
- Public pricing bands

**Before launch**

- [ ] Replace `[Designer Name]` throughout
- [ ] Set the real WhatsApp number and email in `site/assets/js/sys-config.js`
- [ ] Replace every `₹X` with a real figure — see `docs/03-copy-deck.md` §4.8
- [ ] Photograph and replace the `.ph` placeholder blocks (each caption is a shot brief)
- [ ] Shoot at least two commissions as full four-frame transformations
- [ ] Point a domain at the static host; add analytics
- [ ] Connect the consultation form to a real endpoint

**Success:** qualified consultations booked per week, and the share of them that pay a
design fee.

---

## Phase 2 — SYS Studio  *(only once Phase 1 is converting)*

**Goal:** remove administrative load and make the second commission trivial.

Customer app — sign in · start story · uploads · budget · book consultation ·
measurements · design approval · payment · tracking · My Stories.

Designer dashboard — enquiries · story detail · design upload · quote · measurements ·
order status · communication.

Full specification: `docs/05-mvp-spec.md`. Build order is §8 of that document; ship steps
1–4 first, because that is the point at which the app starts earning.

**Success:** designer admin minutes per commission trending down; repeat order rate
trending up.

---

## Phase 2b — Growth loops

- **Gift a Story** — ₹2,000 design credit, a custom blouse experience, a consultation.
  *"Someone gifted you a SYS Story."*
- **Journal** — the transformation stories, published. The best organic acquisition
  channel this brand has, because the content is a byproduct of the work.

---

## Phase 3 — Design intelligence

Only once there is a corpus of real commissions to learn from.

AI design assistance · AI visualization · fabric recognition · style profile inference ·
design recommendations · virtual try-on · automated measurement · personal wardrobe ·
repeat-order recommendations.

**The permanent constraint:** every generated direction is a proposal *to the designer*,
never a design sent straight to the customer. Technology makes her more productive. It does
not replace her, because she is what customers are paying for.

---

## The sequencing bet

> Be a premium designer-led custom fashion business first.
> The website is a lead engine, not a store.

That is the fastest route to actual customers and revenue, and it leaves every option open
to become a much larger digital fashion platform later. Reversing the order — platform
first, customers later — is the failure mode this roadmap exists to prevent.
