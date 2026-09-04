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
 *             We wait for the transition to finish (350ms), then navigate.
 *
 *   BFCACHE — On back/forward cache restore we remove the '.is-exiting' class.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  // Lazy getter — works whether script runs in <head> or at end of <body>
  function getOverlay() {
    return document.getElementById('page-transition-overlay');
  }

  // Intercept Exit Clicks (capture phase so it fires before Lenis anchor handler)
  document.addEventListener('click', function (e) {
    var el = e.target;
    // Walk up to find an <a> tag
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el) return;

    var href = el.getAttribute('href');
    if (!href) return;

    // Ignore external links, new tabs, mailto/tel/javascript
    if (
      el.getAttribute('target') === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) return;

    // Ignore pure hash links (same-page scroll)
    if (href.startsWith('#')) return;

    // Ignore links that point to the current page with only a hash change
    var parts = href.split('#');
    var destPage = parts[0];
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');

    // e.g. href="index.html#about" on index.html — no page change needed
    if (destPage === '' || destPage === currentPage) {
      if (parts[1]) return;
    }

    // It's a real page navigation — trigger the exit fade
    e.preventDefault();

    var overlay = getOverlay();
    if (!overlay) {
      // Fallback: navigate immediately if overlay not found
      window.location.href = href;
      return;
    }

    // Force the entry animation off immediately
    overlay.style.animation = 'none';

    // Small rAF delay ensures the style flush before adding the class
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.classList.add('is-exiting');

        // Wait for the CSS transition (0.35s) then navigate
        setTimeout(function () {
          window.location.href = href;
        }, 350);
      });
    });

  }, true); // capture phase

  // BFCache (back/forward button restore) — reset overlay so entry fade plays
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var overlay = getOverlay();
      if (!overlay) return;
      overlay.classList.remove('is-exiting');
      overlay.style.opacity = '';
      overlay.style.animation = '';
    }
  });

})();
