import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// The block to replace:
const oldCssStart = '      <!-- Slideshow CSS -->';
const oldJsEnd = '      })();\r\n      </script>';
const oldJsEndLF = '      })();\n      </script>';

const newBlock = `      <!-- Slideshow CSS -->
      <style>
        @keyframes hero-reveal {
          0% {
            opacity: 0;
            transform: scale(1.12);
            filter: blur(16px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        @keyframes hero-exit {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
            filter: blur(12px);
          }
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          pointer-events: none;
          will-change: opacity, transform, filter;
        }
        .hero-slide.active {
          animation: hero-reveal 1.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          z-index: 2;
        }
        .hero-slide.prev {
          animation: hero-exit 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          z-index: 1;
        }
        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(237,235,221,0.25);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: auto;
          position: relative;
        }
        .hero-dot::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
        }
        .hero-dot.active {
          background: rgba(237,235,221,1);
          transform: scale(1.4);
          box-shadow: 0 0 12px rgba(237,235,221,0.5);
        }
      </style>

      <!-- Slideshow JS -->
      <script>
      (function initHeroSlideshow() {
        var SLIDE_IMAGES = [
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
        var INTERVAL = 5000;
        var gradientDiv = container.querySelector('div');

        // Build slides
        SLIDE_IMAGES.forEach(function(img, i) {
          var el = document.createElement('img');
          el.className = 'hero-slide';
          el.src = img.src;
          el.alt = img.project || '';
          el.decoding = 'async';
          if (i > 0) el.loading = 'lazy';
          container.insertBefore(el, gradientDiv);
          slides.push(el);

          // Dot
          var dot = document.createElement('button');
          dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', 'Slide ' + (i + 1));
          (function(idx) {
            dot.addEventListener('click', function() { goTo(idx); resetTimer(); });
          })(i);
          dotsEl.appendChild(dot);
          dots.push(dot);
        });

        function goTo(idx) {
          if (idx === current && slides[current].classList.contains('active')) return;

          slides[current].classList.remove('active');
          slides[current].classList.add('prev');
          dots[current].classList.remove('active');
          
          current = (idx + slides.length) % slides.length;
          
          // Cleanup prev tags after animation
          var prevs = slides.filter(function(s) { return s.classList.contains('prev'); });
          prevs.forEach(function(s) {
            setTimeout(function() { s.classList.remove('prev'); }, 1600);
          });

          slides[current].classList.remove('prev');
          void slides[current].offsetWidth; // reflow
          slides[current].classList.add('active');
          dots[current].classList.add('active');

          // Smooth Badge transition
          if (badge && badgeProjectEl) {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(15px)';
            badge.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(function() {
              badgeProjectEl.textContent = SLIDE_IMAGES[current].project || '';
              badge.style.opacity = '1';
              badge.style.transform = 'translateY(0px)';
            }, 600);
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
        setTimeout(function() { 
          if (badge) {
            badge.style.opacity = '1'; 
            badge.style.transform = 'translateY(0px)';
            badge.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
          }
        }, 1200);

        // Pause on hover
        container.addEventListener('mouseenter', function() { clearInterval(timer); });
        container.addEventListener('mouseleave', resetTimer);

        // Touch swipe
        var touchStartX = 0;
        container.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
        container.addEventListener('touchend', function(e) {
          var dx = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); resetTimer(); }
        }, { passive: true });

        resetTimer();
      })();
      </script>`;

let startIndex = html.indexOf(oldCssStart);
let endIndex = html.indexOf('      })();\r\n      </script>', startIndex);
if (endIndex === -1) {
  endIndex = html.indexOf('      })();\n      </script>', startIndex);
}

if (startIndex !== -1 && endIndex !== -1) {
  // we add the length of the end string to endIndex
  const fullEndString = html.substring(endIndex, endIndex + 25); // enough to capture the end tag
  const endTagLen = fullEndString.indexOf('</script>') + 9;
  
  html = html.substring(0, startIndex) + newBlock + html.substring(endIndex + endTagLen);
  fs.writeFileSync('index.html', html);
  console.log('✓ Injected new premium Apple-style blur animation!');
} else {
  console.log('✗ Could not find the bounds to replace');
}
