function _initCursor() {
  if (document.getElementById('custom-cursor')) return;

  // --- 0. Auto-apply Cursor Classes ---
  document.querySelectorAll('.fade-enter-card img, #mclaren img, #porsche img').forEach(img => {
    img.classList.add('hover-view');
  });

  // --- 1. Global Custom Cursor ---
  const customCursor = document.createElement('div');
  customCursor.id = 'custom-cursor';
  const cursorText = document.createElement('span');
  customCursor.appendChild(cursorText);
  document.body.appendChild(customCursor);

  const hasGSAP = typeof gsap !== 'undefined';
  let xTo, yTo;

  if (hasGSAP) {
    // GSAP-driven cursor — GPU composited, no layout cost, works with mix-blend-mode
    gsap.set(customCursor, { xPercent: -50, yPercent: -50 });
    xTo = gsap.quickTo(customCursor, 'x', { duration: 0.15, ease: 'power3.out' });
    yTo = gsap.quickTo(customCursor, 'y', { duration: 0.15, ease: 'power3.out' });
  } else {
    customCursor.style.transform = 'translate(-50%, -50%)';
    customCursor.style.opacity = '0';
    customCursor.style.transition = 'opacity 0.4s ease, width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    let cursorVisible = false;
    window.addEventListener('mousemove', (e) => {
      // Fade in on very first mouse movement
      if (!cursorVisible) {
        if (hasGSAP) {
          gsap.to(customCursor, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          customCursor.style.opacity = '1';
        }
        cursorVisible = true;
      }
      if (xTo && yTo) {
        xTo(e.clientX);
        yTo(e.clientY);
      } else {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
      }
    }, { passive: true });

    // View Mode for images
    document.querySelectorAll('.hover-view').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const customText = el.getAttribute('data-cursor-text') || 'VIEW';
        cursorText.textContent = customText;
        customCursor.classList.add('view-mode');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('view-mode');
      });
    });
  }
}

// Wait briefly for GSAP; if not available after 250ms, initialize native fallback
(function waitForGSAP() {
  let attempts = 0;
  function check() {
    if (typeof gsap !== 'undefined' || attempts > 5) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _initCursor);
      } else {
        _initCursor();
      }
    } else {
      attempts++;
      setTimeout(check, 50);
    }
  }
  check();
})();

