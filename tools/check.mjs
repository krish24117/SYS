#!/usr/bin/env node
/* ==========================================================================
   SYS — site checks

   Dependency-free. Run with:  node tools/check.mjs

   Enforces the three things most likely to break quietly:
     1. The vocabulary rules. "Start Your Story", never "Shop Now".
        This is the brand, so it is a test rather than a preference.
     2. Internal links and asset references resolve.
     3. Which launch placeholders are still outstanding.

   Exit code 1 if 1 or 2 fail. Placeholders are reported, not failed, because
   they are expected to exist until launch.
   ========================================================================== */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const pages = readdirSync(SITE).filter(f => f.endsWith('.html'));

let failures = 0;
const fail = m => { console.log('  FAIL  ' + m); failures++; };
const ok = m => console.log('  ok    ' + m);

/* --- 1. Vocabulary ------------------------------------------------------- */

const BANNED = [
  [/shop now/i,        'Use "Start Your Story"'],
  [/buy now/i,         'Use "Start Your Story"'],
  [/add to cart/i,     'Use "Customize this design"'],
  [/book tailor/i,     'Use "Start Your Story" or "Book a consultation"'],
  [/get stitching/i,   'Use "Start Your Story"'],
  [/>\s*My Orders\s*</i, 'Use "My Stories"'],
  [/>\s*Products\s*</i,  'Use "Stories We\'ve Styled"'],
];

console.log('\nVocabulary');
let vocabClean = true;
for (const page of pages) {
  const html = readFileSync(join(SITE, page), 'utf8');
  for (const [re, advice] of BANNED) {
    if (re.test(html)) { fail(`${page}: matches ${re} — ${advice}`); vocabClean = false; }
  }
}
if (vocabClean) ok('no banned phrases across ' + pages.length + ' pages');

/* Every page should offer the primary CTA at least once. */
for (const page of pages) {
  const html = readFileSync(join(SITE, page), 'utf8');
  if (!/Start Your Story|Start on WhatsApp/i.test(html)) {
    fail(`${page}: no primary call to action`);
  }
}

/* --- 2. Links and assets -------------------------------------------------- */

console.log('\nLinks and assets');
let linksClean = true;
for (const page of pages) {
  const html = readFileSync(join(SITE, page), 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const target = ref.split(/[?#]/)[0];
    if (!target) continue;
    if (!existsSync(join(SITE, target))) {
      fail(`${page} -> ${target} does not exist`);
      linksClean = false;
    }
  }
}
if (linksClean) ok('every internal link and asset resolves');

/* --- 3. Launch placeholders ---------------------------------------------- */

console.log('\nLaunch placeholders (expected until launch)');
const PLACEHOLDERS = [
  ['[Designer Name]', "the designer's name"],
  ['₹X', 'real starting prices'],
  ['919999999999', 'the real WhatsApp number'],
  ['hello@styleyourstories.com', 'the real email address'],
];
const files = [...pages.map(p => join(SITE, p)),
               join(SITE, 'assets', 'js', 'sys-config.js')];
let outstanding = 0;
for (const [token, what] of PLACEHOLDERS) {
  const hits = files.filter(f => readFileSync(f, 'utf8').includes(token)).length;
  if (hits) { console.log(`  TODO  ${what} — "${token}" in ${hits} file(s)`); outstanding++; }
}
const shots = pages.reduce((n, p) =>
  n + (readFileSync(join(SITE, p), 'utf8').match(/data-shot="/g) || []).length, 0);
if (shots) { console.log(`  TODO  photography — ${shots} placeholder blocks awaiting real images`); outstanding++; }
if (!outstanding) ok('none outstanding — ready to launch');

console.log(failures ? `\n${failures} failure(s).\n` : '\nAll checks passed.\n');
process.exit(failures ? 1 : 0);
