/* ==========================================================================
   SYS — Start Your Story

   The guided flow. Six questions, one per screen, ending in a conversation
   with the designer — never in a cart.

   Two rules drive the implementation:
     1. An incomplete story is still a lead. Every step except the occasion
        is skippable, and the flow can be finished at any point.
     2. Never lose a written brief. The draft is saved on every change.
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('flow');
  if (!form) return;

  var STORAGE_KEY = 'sys.story.draft.v1';
  var TOTAL = 6;          /* questions; step 7 is the finish screen */
  var MAX_FILES = 6;

  var steps    = Array.prototype.slice.call(form.querySelectorAll('.flow__step'));
  var dots     = Array.prototype.slice.call(document.querySelectorAll('.flow__dot'));
  var progress = document.getElementById('flow-progress');
  var intro    = document.getElementById('flow-intro');
  var backBtn  = document.getElementById('flow-back');
  var nextBtn  = document.getElementById('flow-next');
  var skipBtn  = document.getElementById('flow-skip');
  var summary  = document.getElementById('summary');
  var thumbs   = document.getElementById('thumbs');
  var fileIn   = document.getElementById('files');
  var dropZone = document.getElementById('uploads');
  var waFinish = document.getElementById('wa-finish');
  var booked   = document.getElementById('booked');

  var current = 1;

  var story = {
    occasion: '',
    occasionOther: '',
    brief: '',
    style: [],
    budget: '',
    timeline: '',
    name: '',
    phone: '',
    references: []          /* { name } only — files never leave the device */
  };

  /* ---- Persistence ------------------------------------------------------ */

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
    } catch (e) {
      /* Private browsing, or storage full. The flow still works in-session. */
    }
  }

  function restore() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var saved = JSON.parse(raw);
      Object.keys(story).forEach(function (k) {
        if (saved[k] !== undefined && saved[k] !== null) story[k] = saved[k];
      });
    } catch (e) { /* corrupt draft — start clean rather than fail */ }
  }

  /* ---- Chip groups ------------------------------------------------------ */

  function initChips() {
    form.querySelectorAll('.chips[data-group]').forEach(function (group) {
      var key = group.getAttribute('data-group');
      var multi = group.getAttribute('data-mode') === 'multi';

      group.querySelectorAll('.chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          var value = chip.textContent.trim();

          if (multi) {
            var i = story[key].indexOf(value);
            if (i === -1) story[key].push(value); else story[key].splice(i, 1);
          } else {
            story[key] = story[key] === value ? '' : value;
          }

          paintChips();
          save();

          /* Single-select answers advance on their own — it reads as a
             conversation rather than a form. Multi-select waits for Continue. */
          if (!multi && story[key]) {
            window.setTimeout(function () { go(current + 1); }, 180);
          }
        });
      });
    });
  }

  function paintChips() {
    form.querySelectorAll('.chips[data-group]').forEach(function (group) {
      var key = group.getAttribute('data-group');
      var multi = group.getAttribute('data-mode') === 'multi';

      group.querySelectorAll('.chip').forEach(function (chip) {
        var value = chip.textContent.trim();
        var on = multi ? story[key].indexOf(value) !== -1 : story[key] === value;
        chip.setAttribute('aria-pressed', String(on));
      });
    });
  }

  /* ---- Text inputs ------------------------------------------------------ */

  function initInputs() {
    ['occasionOther', 'brief', 'name', 'phone'].forEach(function (key) {
      var el = form.querySelector('[name="' + key + '"]');
      if (!el) return;
      el.value = story[key] || '';
      el.addEventListener('input', function () {
        story[key] = el.value;
        save();
        /* Name and phone are typed on the finish screen, after the WhatsApp
           link has already been built — rebuild it so they are included. */
        if (current > TOTAL) paintWhatsApp();
      });
    });
  }

  /* ---- References ------------------------------------------------------- */

  /* Previews are held in memory only. Uploading them needs a backend, which
     Phase 1 deliberately does not have — so the flow hands them to WhatsApp
     or to the consultation instead. */
  function addFiles(list) {
    var files = Array.prototype.slice.call(list || []);
    files.forEach(function (file) {
      if (!/^image\//.test(file.type)) return;
      if (thumbs.children.length >= MAX_FILES) return;

      var url = URL.createObjectURL(file);

      var cell = document.createElement('div');
      cell.className = 'thumb';

      var img = document.createElement('img');
      img.src = url;
      img.alt = file.name;

      var remove = document.createElement('button');
      remove.type = 'button';
      remove.setAttribute('aria-label', 'Remove ' + file.name);
      remove.textContent = '×';
      remove.addEventListener('click', function () {
        URL.revokeObjectURL(url);
        cell.remove();
        var i = story.references.indexOf(file.name);
        if (i !== -1) story.references.splice(i, 1);
        save();
        paintUploadNote();
      });

      cell.appendChild(img);
      cell.appendChild(remove);
      thumbs.appendChild(cell);

      story.references.push(file.name);
    });

    save();
    paintUploadNote();
  }

  function paintUploadNote() {
    var note = document.getElementById('upload-note');
    if (!note) return;
    var n = thumbs.children.length;
    note.textContent = n
      ? n + ' of ' + MAX_FILES + ' references added.'
      : "Nothing to show yet? That's fine — skip this step.";
  }

  function initUploads() {
    if (!fileIn || !dropZone) return;

    fileIn.addEventListener('change', function () {
      addFiles(fileIn.files);
      fileIn.value = '';
    });

    ['dragenter', 'dragover'].forEach(function (type) {
      dropZone.addEventListener(type, function (e) {
        e.preventDefault();
        dropZone.setAttribute('data-drag', 'true');
      });
    });

    ['dragleave', 'drop'].forEach(function (type) {
      dropZone.addEventListener(type, function (e) {
        e.preventDefault();
        dropZone.removeAttribute('data-drag');
      });
    });

    dropZone.addEventListener('drop', function (e) {
      if (e.dataTransfer) addFiles(e.dataTransfer.files);
    });
  }

  /* ---- Navigation ------------------------------------------------------- */

  function go(n) {
    current = Math.min(Math.max(n, 1), TOTAL + 1);

    steps.forEach(function (step) {
      var isActive = Number(step.getAttribute('data-step')) === current;
      step.setAttribute('data-active', String(isActive));
      if (isActive) step.focus({ preventScroll: true });
    });

    dots.forEach(function (dot, i) {
      var state = i + 1 < current ? 'done' : (i + 1 === current ? 'current' : '');
      if (state) dot.setAttribute('data-state', state);
      else dot.removeAttribute('data-state');
    });

    if (progress) {
      progress.setAttribute('aria-valuenow', String(Math.min(current, TOTAL)));
      progress.setAttribute('aria-label',
        'Your story, step ' + Math.min(current, TOTAL) + ' of ' + TOTAL);
    }

    var atFinish = current > TOTAL;

    if (intro) intro.hidden = current !== 1;
    backBtn.hidden = current === 1;
    skipBtn.hidden = current === 1 || atFinish;     /* the occasion is required */
    nextBtn.hidden = atFinish;
    nextBtn.textContent = current === TOTAL ? 'See my story' : 'Continue';

    if (atFinish) {
      paintSummary();
      paintWhatsApp();
    }

    if (current !== 1) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto' : 'smooth'
      });
    }
  }

  function initNav() {
    nextBtn.addEventListener('click', function () { go(current + 1); });
    backBtn.addEventListener('click', function () { go(current - 1); });
    skipBtn.addEventListener('click', function () { go(current + 1); });

    /* Enter advances, except inside the free-text brief where it should
       insert a newline. */
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      go(current + 1);
    });
  }

  /* ---- Finish ----------------------------------------------------------- */

  function occasionLabel() {
    return story.occasionOther || story.occasion || 'Not said yet';
  }

  function rows() {
    return [
      ['Occasion', occasionLabel()],
      ['Your story', story.brief || '—'],
      ['Inspiration', story.references.length
        ? story.references.length + ' reference' + (story.references.length > 1 ? 's' : '')
        : 'None yet'],
      ['Style', story.style.length ? story.style.join(', ') : '—'],
      ['Budget', story.budget || '—'],
      ['Timeline', story.timeline || '—']
    ];
  }

  function paintSummary() {
    if (!summary) return;
    summary.innerHTML = '';
    rows().forEach(function (row) {
      var wrap = document.createElement('div');
      wrap.className = 'summary__row';

      var key = document.createElement('span');
      key.className = 'summary__key';
      key.textContent = row[0];

      var val = document.createElement('span');
      val.textContent = row[1];

      wrap.appendChild(key);
      wrap.appendChild(val);
      summary.appendChild(wrap);
    });
  }

  /* The flow's real output: WhatsApp opened with the story already written,
     so the designer's first message is an informed one. */
  function storyMessage() {
    var lines = ['Hello SYS — I’d like to start my story.', ''];
    rows().forEach(function (row) {
      if (row[1] && row[1] !== '—' && row[1] !== 'None yet' && row[1] !== 'Not said yet') {
        lines.push(row[0] + ': ' + row[1]);
      }
    });
    if (story.name) lines.push('Name: ' + story.name);
    if (story.phone) lines.push('Phone: ' + story.phone);
    if (story.references.length) {
      lines.push('', 'I have ' + story.references.length +
                 ' reference image(s) to send in this chat.');
    }
    return lines.join('\n');
  }

  function paintWhatsApp() {
    if (!waFinish || !window.SYS_CONFIG || !window.SYS_CONFIG.waLink) return;
    waFinish.href = window.SYS_CONFIG.waLink(storyMessage());
    waFinish.target = '_blank';
    waFinish.rel = 'noopener';
  }

  function initBooking() {
    form.querySelectorAll('[data-book]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        /* Phase 1 has no backend. This is where the consultation endpoint or
           scheduling embed goes — see docs/06-roadmap.md. Until then the
           confirmation is shown and the story is preserved for the designer. */
        if (booked) {
          booked.hidden = false;
          /* Two frames so the browser paints the block before the thread
             starts drawing — a same-frame attribute skips the transition. */
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              booked.setAttribute('data-thread', '');
            });
          });
          booked.scrollIntoView({ block: 'nearest' });
        }
        save();
      });
    });
  }

  /* ---- Prefill from the homepage occasion chips -------------------------- */

  function prefillFromQuery() {
    var match = window.location.search.match(/[?&]occasion=([^&]+)/);
    if (!match) return;
    var value = decodeURIComponent(match[1].replace(/\+/g, ' '));

    var known = Array.prototype.slice
      .call(form.querySelectorAll('[data-group="occasion"] .chip'))
      .map(function (c) { return c.textContent.trim(); });

    if (known.indexOf(value) !== -1) story.occasion = value;
    else story.occasionOther = value;
  }

  /* ---- Boot -------------------------------------------------------------- */

  restore();
  prefillFromQuery();
  initChips();
  initInputs();
  initUploads();
  initNav();
  initBooking();
  paintChips();
  paintUploadNote();
  save();

  /* Arriving with an occasion already chosen skips straight to question two. */
  go(story.occasion || story.occasionOther ? 2 : 1);
})();
