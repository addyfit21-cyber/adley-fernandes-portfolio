document.addEventListener('DOMContentLoaded', () => {
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

  // GSAP-driven cursor — GPU composited, no layout cost, works with mix-blend-mode
  // xPercent/yPercent: -50 tells GSAP to centre the dot on the hotspot
  if (typeof gsap !== 'undefined') {
    gsap.set(customCursor, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(customCursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(customCursor, 'y', { duration: 0.15, ease: 'power3.out' });

    if (window.matchMedia('(pointer: fine)').matches) {
      let cursorVisible = false;
      window.addEventListener('mousemove', (e) => {
        // Fade in on very first mouse movement
        if (!cursorVisible) {
          gsap.to(customCursor, { opacity: 1, duration: 0.4, ease: 'power2.out' });
          cursorVisible = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
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
      
      // Additional hover interactions for links/buttons if needed across the site
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
           // We could scale the cursor or change color here, but keeping it simple for now
        });
        el.addEventListener('mouseleave', () => {
           
        });
      });
    }
  } else {
    console.warn("GSAP is not loaded. Custom cursor requires GSAP.");
  }
});
