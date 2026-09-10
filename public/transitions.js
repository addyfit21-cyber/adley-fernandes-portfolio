/**
 * Page Transition & Navigation System (CSS-first, Fail-safe)
 * ─────────────────────────────────────────────────────────────────────────────
 * Features:
 *   1. Projects Dropdown: Single-touch opening on mobile (no double-tap),
 *      desktop-only hover with delay, isolated from mix-blend difference.
 *   2. Page Transition: Smooth fade-out on link click, smooth fade-in on
 *      destination page, zero flash on direct load or refresh, BFCache resilient.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  // Lazy getter for overlay
  function getOverlay() {
    return document.getElementById('page-transition-overlay');
  }

  // --- Initialize Page Transition System ---
  function initPageTransition() {
    var overlay = getOverlay();
    if (!overlay) return;

    var isTransitioning = sessionStorage.getItem('pageTransitioning');
    if (isTransitioning) {
      sessionStorage.removeItem('pageTransitioning');
      overlay.classList.add('is-entering');
      setTimeout(function() {
        overlay.classList.remove('is-entering');
        overlay.style.opacity = '0';
      }, 500);
    } else {
      // Direct load or fresh reload: keep transparent so page is visible immediately
      overlay.style.opacity = '0';
      overlay.style.animation = 'none';
    }

    // Ensure hero video autoplays smoothly on both direct load and navigation return
    var heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      heroVideo.play().catch(function () {});
    }
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
        '.nav-projects-arrow.is-open { transform: rotate(180deg) !important; }' +
        '@keyframes pf-fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }' +
        '#page-transition-overlay { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; background: #1B1717 !important; z-index: 99999999 !important; pointer-events: none !important; opacity: 0; transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1); will-change: opacity; }' +
        '#page-transition-overlay.is-entering { opacity: 1 !important; animation: pf-fade-out 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards !important; }' +
        '#page-transition-overlay.is-exiting { opacity: 1 !important; animation: none !important; pointer-events: auto !important; }';
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

    // Only attach mouseenter/mouseleave if the device truly supports hover (desktop mice)
    var isHoverDevice = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isHoverDevice) {
      btn.addEventListener('mouseenter', openMenu);
      btn.addEventListener('mouseleave', scheduleClose);
      menu.addEventListener('mouseenter', function() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      });
      menu.addEventListener('mouseleave', scheduleClose);
    }

    // Toggle on click/touch (instant on the very first touch)
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

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    // Close when clicking any link inside menu
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
    document.addEventListener('DOMContentLoaded', function() {
      initNavDropdown();
      initPageTransition();
    });
  } else {
    initNavDropdown();
    initPageTransition();
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
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, {
            offset: -120,
            duration: 1.4,
            easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
          });
        } else {
          var offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 120;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
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
      window.location.href = href;
      return;
    }

    sessionStorage.setItem('pageTransitioning', '1');
    overlay.classList.add('is-exiting');

    setTimeout(function () {
      window.location.href = href;
    }, 350);

  }, true); // capture phase

  // BFCache (back/forward button restore) — reset overlay so page is instantly visible
  window.addEventListener('pageshow', function (e) {
    var overlay = getOverlay();
    if (!overlay) return;
    overlay.classList.remove('is-exiting', 'is-entering');
    overlay.style.opacity = '0';
    overlay.style.animation = 'none';
    overlay.style.pointerEvents = 'none';
  });

})();
