document.addEventListener('DOMContentLoaded', () => {
  // Setup Curtain Element if not present
  let curtain = document.getElementById('transition-curtain');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.id = 'transition-curtain';
    // Deep black curtain that covers the screen, starts hidden at the bottom
    curtain.className = 'fixed inset-0 bg-[#1B1717] z-[999999] pointer-events-none translate-y-full';
    document.body.appendChild(curtain);
  }

  // Handle Entry Animation
  const transitionType = sessionStorage.getItem('transition_type');
  
  if (transitionType === 'curtain') {
    // Page loads with curtain covering it
    gsap.set(curtain, { yPercent: -100 }); // It was at 0, but translating down means y:100. Wait, standard is: top: 0, bottom: 0. translate-y-full is y: 100%. 
    // To cover screen: yPercent: 0
    gsap.set(curtain, { yPercent: -100 }); // Wait, translate-y-full is tailwind. Let's just use gsap.
    
    // We came from curtain. The curtain should slide UP off the top of the screen.
    curtain.style.transform = 'translateY(0%)'; // Cover
    
    gsap.to(curtain, { 
      yPercent: -100, 
      duration: 0.8, 
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(curtain, { yPercent: 100 }); // reset to bottom for next time
      }
    });
    sessionStorage.removeItem('transition_type');
  } else if (transitionType === 'fade') {
    // We came from fade.
    gsap.set(document.body, { opacity: 0 });
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
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
      
      const isIndex = destPage === '/' || destPage === 'index.html' || destPage === '';

      if (isIndex) {
        // Option 1: Curtain Reveal (for Index/Home)
        sessionStorage.setItem('transition_type', 'curtain');
        gsap.set(curtain, { yPercent: 100 }); // Ensure it starts at the bottom
        gsap.to(curtain, {
          yPercent: 0, // Slide up to cover
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete: () => {
            window.location.href = href;
          }
        });
      } else {
        // Option 2: Fade In/Out (for other pages)
        sessionStorage.setItem('transition_type', 'fade');
        gsap.to(document.body, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            window.location.href = href;
          }
        });
      }
    });
  });
});

// Handle Safari/Chrome back button (BFCache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // If loaded from cache, ensure body is visible and curtain is down
    gsap.set(document.body, { opacity: 1 });
    let curtain = document.getElementById('transition-curtain');
    if (curtain) gsap.set(curtain, { yPercent: 100 });
    sessionStorage.removeItem('transition_type');
  }
});
