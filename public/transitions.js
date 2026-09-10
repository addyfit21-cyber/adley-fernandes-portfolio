/**
 * Page Transition & Navigation System (Silky Smooth, Zero Lag, Hardware-Accelerated)
 * ─────────────────────────────────────────────────────────────────────────────
 * Features:
 *   1. Ultra-smooth, hardware-accelerated transitions between pages (60/120fps).
 *   2. Zero-flash page entry using early head-script class detection.
 *   3. Clicking navbar logo or Index link smoothly reloads & returns to hero page at top: 0.
 *   4. Projects Dropdown: Single-touch opening on mobile, desktop hover with delay.
 *   5. BFCache resilience (smooth restore on browser back/forward).
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  function getOverlay() {
    return document.getElementById('page-transition-overlay');
  }

  // --- Initialize Page Transition System ---
  function initPageTransition() {
    var overlay = getOverlay();
    if (!overlay) return;

    var wasTransitioning = false;
    var resetToHero = false;
    try {
      wasTransitioning = sessionStorage.getItem('pageTransitioning') === '1';
      sessionStorage.removeItem('pageTransitioning');
      resetToHero = sessionStorage.getItem('resetToHero') === '1';
      sessionStorage.removeItem('resetToHero');
    } catch (e) {}

    var currentPath = window.location.pathname;
    var currentPage = (currentPath.split('/').pop() || 'index.html');
    var isCurrentIndex = (currentPage === 'index.html' || currentPath === '/' || currentPath === '');

    if (resetToHero || (!window.location.hash && isCurrentIndex)) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }

    if (wasTransitioning) {
      // 50ms buffer allows layout recalculations to settle before initiating the fade
      setTimeout(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            document.documentElement.classList.remove('is-transitioning');
            overlay.classList.remove('is-exiting');
            overlay.style.opacity = '0';
          });
        });
      }, 50);
    } else {
      document.documentElement.classList.remove('is-transitioning');
      overlay.classList.remove('is-exiting');
      overlay.style.opacity = '0';
    }

    // Ensure hero video autoplays smoothly
    var heroVideos = [
      document.getElementById('hero-video-mobile'),
      document.getElementById('hero-video')
    ].filter(Boolean);

    heroVideos.forEach(function (v) {
      v.loop = false;
      v.removeAttribute('loop');
      if (resetToHero) {
        v.currentTime = 0;
        v._hasEnded = false;
      }
      if (!v._hasEnded) {
        v.play().catch(function () {});
      }
    });
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
        '.nav-projects-arrow.is-open { transform: rotate(180deg) !important; }';
      document.head.appendChild(style);
    }

    var btn = document.getElementById('nav-projects-btn') || document.querySelector('.nav-projects-btn');
    var menu = document.getElementById('nav-projects-menu') || document.querySelector('.nav-projects-menu');
    var arrow = document.getElementById('nav-projects-arrow') || document.querySelector('.nav-projects-arrow');
    var navActions = document.getElementById('nav-actions');
    var mainNav = document.getElementById('main-nav') || document.body;

    if (!btn || !menu) return;

    // Move menu out of #nav-actions so mix-blend-difference does NOT invert the dropdown
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

    var isHoverDevice = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isHoverDevice) {
      btn.addEventListener('mouseenter', openMenu);
      btn.addEventListener('mouseleave', scheduleClose);
      menu.addEventListener('mouseenter', function() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      });
      menu.addEventListener('mouseleave', scheduleClose);
    }

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
    document.addEventListener('DOMContentLoaded', function() {
      initNavDropdown();
      initPageTransition();
    });
  } else {
    initNavDropdown();
    initPageTransition();
  }

  // Intercept Clicks for Transitions and Navigation
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName !== 'A') el = el.parentElement;
    if (!el) return;

    var href = el.getAttribute('href');
    if (!href) return;

    // Ignore external links, new tabs, mailto/tel/javascript
    if (
      el.getAttribute('target') === '_blank' ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) return;

    var parts = href.split('#');
    var destPage = parts[0];
    var currentPath = window.location.pathname;
    var currentPage = (currentPath.split('/').pop() || 'index.html');
    var isCurrentIndex = (currentPage === 'index.html' || currentPath === '/' || currentPath === '');
    var isDestIndex = (destPage === '' || destPage === 'index.html' || destPage === '/');

    // In-page hash navigation (e.g. index.html#about or #about while on index.html)
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

    // Ignore pure hash links without a matching ID
    if (href.startsWith('#')) return;

    // LOGO or INDEX LINK CLICKED:
    // "when i click on the logo on navbar the page should reload and take me to the hero page same goes for index page"
    var isLogoOrIndexClick = (href === '/' || href === 'index.html' || href === '/index.html');
    if (isLogoOrIndexClick) {
      e.preventDefault();

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      try {
        sessionStorage.setItem('pageTransitioning', '1');
        sessionStorage.setItem('resetToHero', '1');
      } catch (err) {}

      var overlay = getOverlay();
      if (overlay) {
        overlay.classList.add('is-exiting');
      }

      setTimeout(function () {
        window.scrollTo(0, 0);
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
        try {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '/');
          }
        } catch (e) {}

        if (isCurrentIndex) {
          window.location.reload();
        } else {
          window.location.href = '/';
        }
      }, 250);
      return;
    }

    // Same-page links with hash
    if (destPage === '' || destPage === currentPage) {
      if (parts[1]) return;
    }

    // Standard Page-to-Page Navigation — Smooth Fade
    e.preventDefault();

    var overlay = getOverlay();
    if (!overlay) {
      window.location.href = href;
      return;
    }

    try {
      sessionStorage.setItem('pageTransitioning', '1');
    } catch (err) {}

    overlay.classList.add('is-exiting');

    setTimeout(function () {
      window.location.href = href;
    }, 250);

  }, true);

  // BFCache (back/forward button restore) — reset overlay so page is instantly visible
  window.addEventListener('pageshow', function (e) {
    var overlay = getOverlay();
    if (!overlay) return;
    document.documentElement.classList.remove('is-transitioning');
    overlay.classList.remove('is-exiting');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });


  // ─── Battery Saver & Low Power Mode Video Playback Engine ───
  function initBatterySaverVideoManager() {
    function ensureVideoPlays(v) {
      if (!v) return;
      var isHero = (v.id === 'hero-video' || v.id === 'hero-video-mobile');
      if (isHero) {
        v.loop = false;
        v.removeAttribute('loop');
        if (v._hasEnded || (v.duration && v.currentTime >= v.duration - 0.1)) {
          v._hasEnded = true;
          v.pause();
          return;
        }
      }
      if (v._hasEnded || !v.paused) return;

      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('disableRemotePlayback', '');
      v.setAttribute('disablePictureInPicture', '');

      var p = v.play();
      if (p !== undefined) {
        p.catch(function () {});
      }
    }

    function playVisibleVideos() {
      document.querySelectorAll('video').forEach(function (v) {
        if (!v._hasEnded && v.paused) {
          ensureVideoPlays(v);
        }
      });
    }

    // Try playing immediately
    playVisibleVideos();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', playVisibleVideos, { once: true });
    }
    window.addEventListener('load', playVisibleVideos, { once: true });
    window.addEventListener('pageshow', playVisibleVideos);

    // On ANY first user gesture: unlocks media playback on iOS Safari & Android Chrome
    var gestureEvents = ['touchstart', 'pointerdown', 'mousedown', 'keydown', 'click'];
    function onFirstGesture() {
      gestureEvents.forEach(function (evt) {
        window.removeEventListener(evt, onFirstGesture, { capture: true });
      });
      playVisibleVideos();
    }
    gestureEvents.forEach(function (evt) {
      window.addEventListener(evt, onFirstGesture, { passive: true, capture: true, once: true });
    });

    // IntersectionObserver: automatically plays when near viewport (200px margin)
    // and pauses offscreen videos to save battery, memory & hardware decoders
    if ('IntersectionObserver' in window) {
      var autoPlayObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            if (!v._hasEnded && v.paused) {
              ensureVideoPlays(v);
            }
          } else {
            // High-performance optimization: pause offscreen videos to avoid overloading GPU decoders
            if (!v._hasEnded && !v.paused && v.id !== 'hero-video' && v.id !== 'hero-video-mobile') {
              v.pause();
            }
          }
        });
      }, { rootMargin: '200px 0px' });

      document.querySelectorAll('video').forEach(function (v) {
        autoPlayObserver.observe(v);
      });

      if ('MutationObserver' in window) {
        var mutObs = new MutationObserver(function (mutations) {
          mutations.forEach(function (mut) {
            mut.addedNodes.forEach(function (node) {
              if (node.nodeType === 1) {
                if (node.tagName === 'VIDEO') {
                  autoPlayObserver.observe(node);
                  if (node.paused) ensureVideoPlays(node);
                } else if (node.querySelectorAll) {
                  node.querySelectorAll('video').forEach(function (v) {
                    autoPlayObserver.observe(v);
                    if (v.paused) ensureVideoPlays(v);
                  });
                }
              }
            });
          });
        });
        mutObs.observe(document.body || document.documentElement, { childList: true, subtree: true });
      }
    }
  }

  initBatterySaverVideoManager();

})();
