# SYS — Style Your Stories

Premium, designer-led custom fashion. Not a boutique, not a marketplace, and explicitly
not a tailoring service.

> Don't shop for your clothes. Create them.

This repository holds the SYS brand and product strategy, and the Phase 1 website that
implements it.

---

## What's here

```
docs/     the strategy, in the order you'd want to read it
site/     the Phase 1 website — static, dependency-free, deployable anywhere
tools/    a check script that enforces the brand's vocabulary rules
```

### Documentation

| File | What it covers |
| --- | --- |
| [`docs/01-strategy.md`](docs/01-strategy.md) | Positioning, the moat, business model, pricing, phasing |
| [`docs/02-information-architecture.md`](docs/02-information-architecture.md) | Site structure, the guided flow, and the Phase 2 app |
| [`docs/03-copy-deck.md`](docs/03-copy-deck.md) | Voice, the enforced vocabulary, and every page's copy |
| [`docs/04-design-system.md`](docs/04-design-system.md) | Colour, type, space, components, accessibility |
| [`docs/05-mvp-spec.md`](docs/05-mvp-spec.md) | Phase 2 data model, flows, designer dashboard, build order |
| [`docs/06-roadmap.md`](docs/06-roadmap.md) | Phase gating and the pre-launch checklist |

---

## The strategic bet

Be a premium designer-led custom fashion business **first**. The website is a
**lead-generation and consultation engine, not an e-commerce store** — that is the fastest
route to actual customers and revenue, and it leaves every option open to become a much
larger digital fashion platform later.

- **Phase 1 — now.** Turn strangers into booked consultations. *(this repository)*
- **Phase 2 — once Phase 1 converts.** SYS Studio: client portal and designer dashboard.
- **Phase 3 — once there are real commissions to learn from.** AI-assisted design.

---

## Running the site

Plain static HTML, CSS and JavaScript. No build step, no dependencies, no framework.

```sh
# any static server will do
npx http-server site -p 8080
# then open http://localhost:8080
```

Deploys as-is to Netlify, Vercel, Cloudflare Pages, GitHub Pages or any bucket — publish
the `site/` directory.

### Pages

| Page | Purpose |
| --- | --- |
| `index.html` | The full argument, hero to closing CTA |
| `start.html` | **Start Your Story** — the six-step guided flow |
| `stories.html` | Stories We've Styled — the portfolio |
| `bring-your-fabric.html` | The differentiator: turning what you own into something new |
| `designer.html` | The Designer |
| `how-it-works.html` | The eight-step process, pricing, FAQ |
| `collections.html` | Secondary browsing — every item ends in *Customize this design* |

### Checks

```sh
node tools/check.mjs
```

Verifies the vocabulary rules (no "Shop Now", no "Add to cart"), that every internal link
and asset resolves, and reports which launch placeholders are still outstanding.

---

## Before launch

`node tools/check.mjs` lists what's outstanding at any time. In full:

1. **The designer's name** — set `designerName` in `site/assets/js/sys-config.js`.
   It replaces `[Designer Name]` everywhere at runtime.
2. **WhatsApp number and email** — also in `sys-config.js`. Every `data-wa` link on the
   site becomes a `wa.me` deep link from it.
3. **Prices** — replace every `₹X` with a real figure. Publishing "from ₹X" is worse than
   publishing nothing; the filtering only works with numbers.
4. **Photography** — 33 `.ph` placeholder blocks. Each one's caption names the exact shot
   required, so the set doubles as a shoot brief. Shoot at least two commissions as full
   four-frame transformations (Idea → Design → Creation → Final).
5. **The designer's story** — `designer.html` carries bracketed prompts for her own words.
6. **Consultation booking** — the two booking buttons in the guided flow currently show a
   confirmation. Point them at a real endpoint or scheduling embed.

---

## How the site is built

- **Static and dependency-free.** Header and footer markup is repeated per page, which is
  the normal trade-off for a site this size; it means any host works and there is nothing
  to break at build time.
- **Progressive enhancement.** Every page renders and every link works with JavaScript
  disabled. The guided flow, the reveal animation and the WhatsApp deep links are
  enhancements layered on top.
- **One config file.** `site/assets/js/sys-config.js` is the only file that needs editing
  to go live.
- **The draft is never lost.** The guided flow saves to `localStorage` on every change,
  because losing a half-written brief is the worst failure this page can have.
- **Accessible by construction.** WCAG AA contrast throughout (measured, see
  `docs/04-design-system.md` §8), keyboard-operable flow, labelled fields, skip links, and
  `prefers-reduced-motion` honoured.

---

## The rules that matter most

From [`docs/03-copy-deck.md`](docs/03-copy-deck.md), enforced by `tools/check.mjs`:

| Never | Always |
| --- | --- |
| Shop Now / Buy Now | **Start Your Story** |
| Add to cart | **Customize this design** |
| Products | **Stories We've Styled** |
| My Orders | **My Stories** |
| Order #12345 | The story's name — *My Sister's Wedding* |

That vocabulary is the difference between a fashion brand and a tailoring service.
