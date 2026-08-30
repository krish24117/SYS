/* ==========================================================================
   SYS — Site configuration

   THIS IS THE ONE FILE TO EDIT BEFORE LAUNCH.
   Everything below is a placeholder. See docs/06-roadmap.md for the full
   pre-launch checklist.
   ========================================================================== */

window.SYS_CONFIG = {
  /* The designer's name. Rendered anywhere data-sys="designer" appears. */
  designerName: '[Designer Name]',

  /* WhatsApp business number in international format, digits only.
     Example for India: '919876543210' */
  whatsapp: '919999999999',

  email: 'hello@styleyourstories.com',

  city: 'Hyderabad',

  /* Prefilled first message when someone opens WhatsApp from a plain CTA. */
  whatsappGreeting:
    "Hello SYS — I'd like to start my story."
};

/* Build a wa.me link, optionally with a custom message. */
window.SYS_CONFIG.waLink = function (message) {
  var cfg = window.SYS_CONFIG;
  var text = message || cfg.whatsappGreeting;
  return 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(text);
};
