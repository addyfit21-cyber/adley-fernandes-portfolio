document.addEventListener('DOMContentLoaded', () => {
  // 1. Create overlay dynamically
  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1B1717',
    zIndex: 9999999,
    pointerEvents: 'none',
    opacity: 0,
    willChange: 'opacity'
  });
  document.body.appendChild(overlay);

  // Handle Entry Animation
  const transitionType = sessionStorage.getItem('transition_type');
  
  if (transitionType === 'fade') {
    // We came from fade. Start overlay at 1 and fade out.
    gsap.set(overlay, { opacity: 1 });
    gsap.to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.out' });
    sessionStorage.removeItem('transition_type');
  }

  // Intercept Clicks
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignore invalid links, external links, mailto, etc.
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('_blank')) return;
      
      // If it's a hash link on the SAME page, let default behavior happen
      const path = window.location.pathname;
      const currentPage = path.split('/').pop() || 'index.html';
      const [destPage, hash] = href.split('#');
      
      if ((destPage === '' || destPage === currentPage) && hash) {
        return; // It's just an anchor link on the current page
      }
      
      e.preventDefault(); // Stop immediate navigation
      
      // Option 2: Fade In/Out (for all pages)
      sessionStorage.setItem('transition_type', 'fade');
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
});

// Handle Safari/Chrome back button (BFCache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // If loaded from cache, ensure overlay is invisible
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) gsap.set(overlay, { opacity: 0 });
    sessionStorage.removeItem('transition_type');
  }
});
