import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// ── 1. Replace the static hero image section with the full slideshow ──────────
const oldHeroImages = `      <!-- ── Full-bleed active image ── -->
      <div id="hero-active-img-wrap" style="
        position: absolute;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        z-index: 1;
        overflow: hidden;
        border-radius: 0px;
        will-change: width, height, top, left, border-radius, opacity;
      ">
        <img id="hero-bg-img" src="/Images/Website_Hero.webp" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 70%;display:block;" decoding="async">
        <img id="hero-active-img" src="/Images/Website_Hero.webp" alt="Featured Work" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 70%;display:block;will-change:transform,opacity;z-index:1;" decoding="async">
        <!-- Dark gradient for text readability -->
        <div style="
          position:absolute;inset:0;
          background: linear-gradient(
            to top,
            rgba(14,14,14,0.80) 0%,
            rgba(14,14,14,0.35) 40%,
            rgba(14,14,14,0.10) 70%,
            transparent 100%
          );
          z-index:2;
          pointer-events:none;
        "></div>
      </div>`;

const newHeroSlideshow = `      <!-- ── Hero Slideshow ── -->
      <div id="hero-slideshow" style="position:absolute;inset:0;width:100%;height:100%;z-index:1;overflow:hidden;">

        <!-- Slides injected via JS -->

        <!-- Dark gradient for text readability -->
        <div style="
          position:absolute;inset:0;
          background: linear-gradient(
            to top,
            rgba(14,14,14,0.85) 0%,
            rgba(14,14,14,0.40) 40%,
            rgba(14,14,14,0.12) 70%,
            transparent 100%
          );
          z-index:2;
          pointer-events:none;
        "></div>

        <!-- Slide indicators (dots) -->
        <div id="hero-slide-dots" style="
          position:absolute;
          bottom: clamp(24px, 5vw, 64px);
          right: clamp(20px, 6vw, 96px);
          z-index:10;
          display:flex;
          align-items:center;
          gap:8px;
          pointer-events:auto;
        "></div>

        <!-- Current project badge -->
        <div id="hero-project-badge" style="
          position:absolute;
          top: clamp(80px, 10vw, 120px);
          right: clamp(20px, 6vw, 96px);
          z-index:10;
          pointer-events:none;
          display:flex;
          align-items:center;
          gap:8px;
          opacity:0;
          transition: opacity 0.5s;
        ">
          <span id="hero-badge-project" style="
            font-family:'Manrope',sans-serif;
            font-size:clamp(0.5rem,1.2vw,0.65rem);
            letter-spacing:0.3em;
            text-transform:uppercase;
            color:rgba(237,235,221,0.65);
            font-weight:700;
          "></span>
        </div>
      </div>

      <!-- Slideshow CSS -->
      <style>
        @keyframes hero-kenburns {
          from { transform: scale(1.05) translate(0%, 0%); }
          to   { transform: scale(1.18) translate(-1.5%, -1.5%); }
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }
        .hero-slide.active {
          opacity: 1;
          animation: hero-kenburns 8s ease-in-out forwards;
        }
        .hero-slide.prev {
          opacity: 0;
        }
        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(237,235,221,0.35);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          pointer-events: auto;
        }
        .hero-dot.active {
          background: rgba(237,235,221,0.9);
          transform: scale(1.5);
        }
      </style>

      <!-- Slideshow JS -->
      <script>
      (function initHeroSlideshow() {
        const SLIDE_IMAGES = [
          { src: '/Images/Hero page animation/TVB BRand BOOK-13.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB BRand BOOK-19.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB BRand BOOK-14.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB Guitar picks-01.webp',            project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB Stickers Mockup-01.webp',         project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB Tshirt Mockup-01.webp',           project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/Benner backaging mockup-01.webp',     project: 'Benner Packaging' },
          { src: '/Images/Hero page animation/Benner packaging 2-01.webp',          project: 'Benner Packaging' },
          { src: '/Images/Hero page animation/Lukes iced coffee banner mockup-01.webp', project: "Luke's Iced Coffee" },
          { src: '/Images/Hero page animation/Lukes iced coffee logo mockup-01.webp',   project: "Luke's Iced Coffee" },
          { src: '/Images/Hero page animation/TVB CAP Mockup-01.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB BRand BOOK-15.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB BRand BOOK-17.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/TVB BRand BOOK-20.webp',              project: 'TVB Brand Identity' },
          { src: '/Images/Hero page animation/Benner logo mockup-01.webp',          project: 'Benner Packaging' },
        ];

        var container = document.getElementById('hero-slideshow');
        var dotsEl = document.getElementById('hero-slide-dots');
        var badgeProjectEl = document.getElementById('hero-badge-project');
        var badge = document.getElementById('hero-project-badge');
        if (!container) return;

        var slides = [];
        var dots = [];
        var current = 0;
        var timer = null;
        var INTERVAL = 4000;

        // Build slides
        SLIDE_IMAGES.forEach(function(img, i) {
          var el = document.createElement('img');
          el.className = 'hero-slide';
          el.src = img.src;
          el.alt = img.project || '';
          el.decoding = 'async';
          if (i > 0) el.loading = 'lazy';
          // Insert before the gradient overlay (last two divs)
          container.insertBefore(el, container.querySelector('div'));
          slides.push(el);

          // Dot
          var dot = document.createElement('button');
          dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Slide ' + (i+1));
          dot.addEventListener('click', function() { goTo(i); resetTimer(); });
          dotsEl.appendChild(dot);
          dots.push(dot);
        });

        function goTo(idx) {
          // Remove active/prev from current
          slides[current].classList.remove('active');
          slides[current].classList.add('prev');
          dots[current].classList.remove('active');

          // Force reflow to restart kenburns on next active
          void slides[current].offsetWidth;

          current = (idx + slides.length) % slides.length;

          // Remove 'prev' class after transition
          var prev = slides.filter(function(s) { return s.classList.contains('prev'); });
          prev.forEach(function(s) {
            setTimeout(function() { s.classList.remove('prev'); }, 1300);
          });

          slides[current].classList.remove('prev');
          // Remove and re-add active to restart animation
          slides[current].classList.remove('active');
          void slides[current].offsetWidth;
          slides[current].classList.add('active');
          dots[current].classList.add('active');

          // Update badge
          if (badge && badgeProjectEl) {
            badge.style.opacity = '0';
            setTimeout(function() {
              badgeProjectEl.textContent = SLIDE_IMAGES[current].project || '';
              badge.style.opacity = '1';
            }, 400);
          }
        }

        function next() { goTo(current + 1); }

        function resetTimer() {
          clearInterval(timer);
          timer = setInterval(next, INTERVAL);
        }

        // Init
        slides[0].classList.add('active');
        if (badgeProjectEl) badgeProjectEl.textContent = SLIDE_IMAGES[0].project || '';
        setTimeout(function() { if (badge) badge.style.opacity = '1'; }, 600);

        // Pause on hover
        container.addEventListener('mouseenter', function() { clearInterval(timer); });
        container.addEventListener('mouseleave', resetTimer);

        // Touch swipe support
        var touchStartX = 0;
        container.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
        container.addEventListener('touchend', function(e) {
          var dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); resetTimer(); }
        }, { passive: true });

        resetTimer();
      })();
      </script>`;

// Now do the replacement
if (html.includes('<!-- ── Full-bleed active image ── -->')) {
  html = html.replace(oldHeroImages, newHeroSlideshow);
  console.log('✓ Hero section replaced with slideshow');
} else {
  console.log('✗ Target not found — check indentation');
}

fs.writeFileSync('index.html', html);
