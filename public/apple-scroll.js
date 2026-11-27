/**
 * apple-scroll.js — v5  (no-flicker, fast-load)
 * ─────────────────────────────────────────────────────────────────────────────
 * Changes vs v4:
 *
 *  • Adds `anim-ready` class to <body> IMMEDIATELY when the script first
 *    executes (before GSAP is even checked). The CSS in <head> uses this class
 *    to pre-hide animated elements, so the browser paints them invisible from
 *    the start — zero flash/flicker.
 *
 *  • Removes gsap.set() for cards/headings — CSS handles the initial state.
 *    GSAP only runs gsap.to() to animate TO the visible state.
 *
 *  • Paragraphs still use gsap.set() because they are NOT pre-hidden by CSS
 *    (too many edge cases), but they start with a subtler offset (y: 26)
 *    so any flicker is imperceptible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  // ── Step 1: Mark body IMMEDIATELY so CSS pre-hides kick in ──────────────
  // This runs synchronously when the script tag is evaluated (defer means
  // after HTML parse but before DOMContentLoaded, still pre-paint in practice).
  document.documentElement.classList.add('anim-ready');

  function waitForGSAP(cb) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      cb();
    } else {
      setTimeout(function () { waitForGSAP(cb); }, 40);
    }
  }

  function promote(el) {
    el.style.willChange = 'transform, opacity';
    el.style.backfaceVisibility = 'hidden';
    el.style.webkitBackfaceVisibility = 'hidden';
  }

  function splitWords(el) {
    if (el.querySelector('.aw')) return null;
    var raw = el.textContent.trim();
    if (!raw) return null;
    el.innerHTML = raw.split(/\s+/).map(function (w) {
      return '<span class="aw" style="display:inline-block;will-change:transform,opacity;backface-visibility:hidden;-webkit-backface-visibility:hidden;">' + w + '</span>';
    }).join('\u00A0');
    return el.querySelectorAll('.aw');
  }

  function animateCardGroup(cards, triggerEl) {
    var arr = Array.prototype.slice.call(cards);
    if (!arr.length) return;
    arr.forEach(promote);
    // No gsap.set() — CSS already hides these via .anim-ready
    ScrollTrigger.create({
      trigger: triggerEl || arr[0],
      start: 'top 86%',
      once: true,
      onEnter: function () {
        gsap.to(arr, {
          y: 0, opacity: 1, scale: 1,
          duration: 1.0, ease: 'expo.out', force3D: true,
          stagger: { each: 0.1, ease: 'power1.inOut', from: 'start' },
          clearProps: 'will-change'
        });
      }
    });
  }

  waitForGSAP(function () {

    var isMobile      = window.innerWidth < 768;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Remove pre-hides and skip all animation
      document.documentElement.classList.remove('anim-ready');
      return;
    }

    /* ════════════════════════════════════════════════════════════════════
       1. H2 WORD-BY-WORD REVEAL
       CSS already hides .aw spans; GSAP only animates to visible.
       ════════════════════════════════════════════════════════════════════ */
    document.querySelectorAll('main h2').forEach(function (h2) {
      if (h2.closest('#hero'))        return;
      if (h2.closest('.skill-item'))  return;
      if (h2.closest('#services'))    return;
      if (h2.closest('.hero-marquee'))return;

      var words = splitWords(h2);
      if (!words) return;

      // No gsap.set() — CSS handles initial opacity:0 + translateY
      ScrollTrigger.create({
        trigger: h2,
        start: 'top 87%',
        once: true,
        onEnter: function () {
          gsap.to(words, {
            y: 0, opacity: 1,
            duration: isMobile ? 0.85 : 1.0,
            ease: 'expo.out', force3D: true,
            stagger: { each: isMobile ? 0.038 : 0.048, ease: 'power1.inOut' },
            clearProps: 'will-change'
          });
        }
      });
    });

    /* ════════════════════════════════════════════════════════════════════
       2. PARAGRAPH & SUB-HEADING FADE-UP
       These are NOT pre-hidden by CSS, so we still use gsap.set() here.
       Offset is small (y:26) so any timing gap is imperceptible.
       ════════════════════════════════════════════════════════════════════ */
    document.querySelectorAll('main p, main h3, main h4, main h5').forEach(function (el) {
      if (el.closest('#hero'))                   return;
      if (el.closest('#brand-carousel-section')) return;
      if (el.closest('#services'))               return;
      if (el.closest('.skill-item'))             return;
      if (el.closest('a.group'))                 return;
      if (el.closest('.fade-enter-card'))        return;

      promote(el);
      gsap.set(el, { y: 26, opacity: 0, force3D: true });

      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', force3D: true,
            clearProps: 'will-change'
          });
        }
      });
    });

    /* ════════════════════════════════════════════════════════════════════
       3. PROJECT CARDS (Smooth individual scroll reveals)
       ════════════════════════════════════════════════════════════════════ */
    document.querySelectorAll('.portfolio-card').forEach(function (card) {
      promote(card);
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(card, {
            y: 0, opacity: 1, scale: 1,
            duration: isMobile ? 0.85 : 1.0,
            ease: 'expo.out',
            force3D: true,
            clearProps: 'will-change'
          });
        }
      });
    });

    /* ════════════════════════════════════════════════════════════════════
       4. RED ACCENT LINE WIPE
       ════════════════════════════════════════════════════════════════════ */
    document.querySelectorAll('main span.block').forEach(function (el) {
      if (el.closest('#hero')) return;
      var h  = parseFloat(window.getComputedStyle(el).height);
      var bg = window.getComputedStyle(el).backgroundColor;
      if (h > 4 || !bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return;
      el.style.willChange = 'transform';
      el.style.backfaceVisibility = 'hidden';
      gsap.set(el, { scaleX: 0, transformOrigin: 'left center', force3D: true });
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: function () {
          gsap.to(el, { scaleX: 1, duration: 0.8, ease: 'expo.out', force3D: true });
        }
      });
    });

    /* ════════════════════════════════════════════════════════════════════
       5. ABOUT — portrait + toolkit
       ════════════════════════════════════════════════════════════════════ */
    var about = document.querySelector('#about');
    if (about) {
      var portrait = about.querySelector('img.object-cover, [class*="aspect-"]');
      if (portrait) {
        promote(portrait);
        gsap.set(portrait, { x: -48, opacity: 0, scale: 0.97, force3D: true });
        ScrollTrigger.create({
          trigger: portrait, start: 'top 82%', once: true,
          onEnter: function () {
            gsap.to(portrait, {
              x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out', force3D: true
            });
          }
        });
      }

      var toolItems = about.querySelectorAll('.grid > div, .grid > li');
      if (toolItems.length) {
        Array.prototype.forEach.call(toolItems, promote);
        gsap.set(toolItems, { y: 22, opacity: 0, force3D: true });
        ScrollTrigger.create({
          trigger: toolItems[0], start: 'top 88%', once: true,
          onEnter: function () {
            gsap.to(toolItems, {
              y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', force3D: true,
              stagger: { each: 0.05, from: 'start' }
            });
          }
        });
      }
    }

    /* ════════════════════════════════════════════════════════════════════
       6. TESTIMONIALS
       ════════════════════════════════════════════════════════════════════ */
    document.querySelectorAll('main blockquote').forEach(function (el, i) {
      promote(el);
      gsap.set(el, { y: 34, opacity: 0, force3D: true });
      ScrollTrigger.create({
        trigger: el, start: 'top 89%', once: true,
        onEnter: function () {
          gsap.to(el, {
            y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', force3D: true,
            delay: i * 0.07
          });
        }
      });
    });

    /* ── Refresh ScrollTrigger ──────────────────────────────── */
    setTimeout(function () { ScrollTrigger.refresh(); }, 200);
    setTimeout(function () { ScrollTrigger.refresh(); }, 800);
  });

})();
