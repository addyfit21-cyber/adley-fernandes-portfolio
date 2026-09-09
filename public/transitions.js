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

  // --- Navbar Smart Contrast & Projects Dropdown Handling ---
  function initNavDropdown() {
    if (!document.getElementById('nav-projects-style')) {
      var style = document.createElement('style');
      style.id = 'nav-projects-style';
      style.textContent = 
        '#nav-actions { mix-blend-mode: difference !important; }' +
        '#nav-actions a, #nav-actions button { color: #ffffff !important; }' +
        '#nav-projects-menu { mix-blend-mode: normal !important; position: fixed !important; z-index: 140 !important; }' +
        '#nav-projects-menu.is-open { opacity: 1 !important; visibility: visible !important; transform: translateY(0) !important; pointer-events: auto !important; }' +
        '.nav-projects-arrow.is-open { transform: rotate(180deg) !important; }';
      document.head.appendChild(style);
    }

    var btn = document.getElementById('nav-projects-btn') || document.querySelector('.nav-projects-btn');
    var menu = document.getElementById('nav-projects-menu') || document.querySelector('.nav-projects-menu');
    var arrow = document.getElementById('nav-projects-arrow') || document.querySelector('.nav-projects-arrow');
    var navActions = document.getElementById('nav-actions');
    var mainNav = document.getElementById('main-nav') || document.body;

    if (!btn || !menu) return;

    // Move menu out of #nav-actions so mix-blend-difference does NOT invert the dropdown!
    if (navActions && navActions.contains(menu)) {
      mainNav.appendChild(menu);
    }

    var closeTimer = null;

    function updatePos() {
      if (!btn || !menu) return;
      var rect = btn.getBoundingClientRect();
      menu.style.top = (rect.bottom + 8) + 'px';
      var idealLeft = rect.left + rect.width / 2 - menu.offsetWidth / 2;
      var maxLeft = window.innerWidth - menu.offsetWidth - 16;
      menu.style.left = Math.max(16, Math.min(idealLeft, maxLeft)) + 'px';
    }

    function openMenu() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      updatePos();
      menu.classList.add('is-open');
      if (arrow) arrow.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      menu.classList.remove('is-open');
      if (arrow) arrow.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function scheduleClose() {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(closeMenu, 150);
    }

    btn.addEventListener('mouseenter', openMenu);
    btn.addEventListener('mouseleave', scheduleClose);
    menu.addEventListener('mouseenter', function() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    });
    menu.addEventListener('mouseleave', scheduleClose);

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu();
      });
    });

    window.addEventListener('resize', function() {
      if (menu.classList.contains('is-open')) updatePos();
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavDropdown);
  } else {
    initNavDropdown();
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

    // Current page vs destination page identification
    var parts = href.split('#');
    var destPage = parts[0];
    var currentPath = window.location.pathname;
    var currentPage = (currentPath.split('/').pop() || 'index.html');
    var isCurrentIndex = (currentPage === 'index.html' || currentPath === '/' || currentPath === '');
    var isDestIndex = (destPage === '' || destPage === 'index.html' || destPage === '/');

    // In-page anchor navigation (e.g. index.html#about or #about while on index.html)
    if (parts[1] && ((destPage === '' && !href.startsWith('/')) || (isCurrentIndex && isDestIndex))) {
      var targetEl = document.getElementById(parts[1]);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#' + parts[1]);
        }
        return;
      }
    }

    // Scroll to top when clicking home/index while already on index page
    if (isCurrentIndex && (href === '/' || href === 'index.html' || href === '/index.html')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    // Ignore pure hash links (same-page scroll)
    if (href.startsWith('#')) return;

    // Ignore links that point to the current page with only a hash change
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
