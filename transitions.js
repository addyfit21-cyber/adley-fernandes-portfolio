/**
 * Page Transition System
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy:
 *   ENTRY  — overlay is painted black by inline CSS in <head> immediately on
 *             every page load, so there's zero flash. We then fade it OUT with
 *             a CSS transition (no GSAP dependency, works before scripts load).
 *
 *   EXIT   — on internal link click we fade the overlay IN (CSS transition),
 *             then navigate. sessionStorage tells the next page to do an entry
 *             fade-out.
 *
 *   BFCACHE — on back/forward cache restore we instantly hide the overlay.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── 1. Get (or create) the overlay ──────────────────────────────────── */
  // The overlay div is injected by an inline <style>+<div> block in <head>
  // (added to every HTML page). If for some reason it's missing, create it.
  var overlay = document.getElementById('page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    document.documentElement.appendChild(overlay);
  }

  /* ── 2. Entry fade-out ───────────────────────────────────────────────── */
  // Small delay so the browser has painted the page content beneath first.
  function fadeInPage() {
    // Force a reflow so the transition fires from opacity:1 → 0
    overlay.getBoundingClientRect();
    overlay.style.opacity = '0';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(fadeInPage); // double-rAF ensures first paint done
      });
    });
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(fadeInPage);
    });
  }

  /* ── 3. Exit fade-in (intercept internal link clicks) ───────────────── */
  document.addEventListener('click', function (e) {
    // Walk up from the clicked element to find an <a> tag
    var el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el) return;

    var href = el.getAttribute('href');
    if (!href) return;

    // Ignore: external links, mailto/tel, target=_blank, hash-only anchors
    if (
      el.getAttribute('target') === '_blank' ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) return;

    // Ignore same-page hash anchors (e.g. href="#section")
    if (href.startsWith('#')) return;

    // Ignore same-page hash navigation (e.g. href="index.html#section")
    var parts = href.split('#');
    var destPage = parts[0];
    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
    if (destPage === '' || destPage === currentPage) {
      if (parts[1]) return; // same page anchor — let it scroll
    }

    // ── Trigger exit fade ──
    e.preventDefault();

    sessionStorage.setItem('pf_transition', '1');

    overlay.style.opacity = '1';

    // Navigate after the CSS transition completes (duration matches CSS: 350ms)
    setTimeout(function () {
      window.location.href = href;
    }, 360);
  }, true); // capture phase so we catch clicks on nested elements too

  /* ── 4. BFCache (back/forward button) ───────────────────────────────── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      overlay.style.transition = 'none';
      overlay.style.opacity = '0';
      sessionStorage.removeItem('pf_transition');
    }
  });

})();
