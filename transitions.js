/**
 * Page Transition System (CSS-first, Fail-safe)
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy:
 *   ENTRY  — The overlay starts with a CSS animation (pf-overlay-fade) that 
 *             fades it from opacity 1 to 0 automatically. If JS fails, it still fades.
 *             Default opacity is 0, so if animation fails, it's transparent.
 *
 *   EXIT   — On internal link click, we add the '.is-exiting' class to the overlay.
 *             This cancels the animation and triggers a CSS transition to opacity 1.
 *             We wait for the transition to finish (400ms), then navigate.
 *
 *   BFCACHE — On back/forward cache restore we remove the '.is-exiting' class.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  var overlay = document.getElementById('page-transition-overlay');

  // Intercept Exit Clicks
  document.addEventListener('click', function (e) {
    if (!overlay) return;

    var el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el) return;

    var href = el.getAttribute('href');
    if (!href) return;

    // Ignore external links, new tabs, mailto/tel, js
    if (
      el.getAttribute('target') === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) return;

    // Ignore same-page hash navigation
    if (href.startsWith('#')) return;
    var parts = href.split('#');
    var destPage = parts[0];
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
    if (destPage === '' || destPage === currentPage) {
      if (parts[1]) return; // It's just a hash link on the same page
    }

    e.preventDefault();

    // Trigger exit fade-in
    overlay.classList.add('is-exiting');

    // Wait for the CSS transition (0.4s) to complete, then navigate
    setTimeout(function () {
      window.location.href = href;
    }, 400);
  }, true);

  // BFCache (back/forward button restore)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && overlay) {
      overlay.classList.remove('is-exiting');
      overlay.style.opacity = '0';
      overlay.style.animation = 'none'; // Lock it hidden
    }
  });

})();
