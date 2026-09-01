import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add preload to head
if (!html.includes('rel="preload" as="image" href="/Images/Hero page animation/TVB BRand BOOK-13.webp"')) {
  html = html.replace('<head>', '<head>\n<link rel="preload" as="image" href="/Images/Hero page animation/TVB BRand BOOK-13.webp">\n<link rel="preload" as="image" href="/Images/Hero page animation/TVB BRand BOOK-19.webp">');
}

// 2. Modify the Slideshow CSS for mobile performance
const oldCssStr = `      <!-- Slideshow CSS -->
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
        }`;

const newCssStr = `      <!-- Slideshow CSS -->
      <style>
        /* Desktop animations with heavy blur */
        @keyframes hero-reveal {
          0% { opacity: 0; transform: scale(1.12); filter: blur(16px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes hero-exit {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.05); filter: blur(12px); }
        }
        
        /* Mobile animations with GPU-friendly low blur */
        @media (max-width: 768px) {
          @keyframes hero-reveal {
            0% { opacity: 0; transform: scale(1.06); filter: blur(4px); }
            100% { opacity: 1; transform: scale(1); filter: blur(0px); }
          }
          @keyframes hero-exit {
            0% { opacity: 1; transform: scale(1); filter: blur(0px); }
            100% { opacity: 0; transform: scale(1.03); filter: blur(4px); }
          }
        }`;

if (html.includes(oldCssStr)) {
  html = html.replace(oldCssStr, newCssStr);
}

// 3. Hardcode the first slide into HTML & fix JS
const oldHtmlStr = `      <!-- ── Hero Slideshow ── -->
      <div id="hero-slideshow" style="position:absolute;inset:0;width:100%;height:100%;z-index:1;overflow:hidden;">

        <!-- Slides injected via JS -->

        <!-- Dark gradient for text readability -->`;

const newHtmlStr = `      <!-- ── Hero Slideshow ── -->
      <div id="hero-slideshow" style="position:absolute;inset:0;width:100%;height:100%;z-index:1;overflow:hidden;">

        <!-- Hardcoded first slide for instant LCP parsing -->
        <img class="hero-slide first-slide active" src="/Images/Hero page animation/TVB BRand BOOK-13.webp" alt="TVB Brand Identity" fetchpriority="high" decoding="sync">

        <!-- Other slides injected via JS -->

        <!-- Dark gradient for text readability -->`;

if (html.includes(oldHtmlStr)) {
  html = html.replace(oldHtmlStr, newHtmlStr);
}

// Fix the JS loop
const oldJsLoop = `        // Build slides
        SLIDE_IMAGES.forEach(function(img, i) {
          var el = document.createElement('img');
          el.className = 'hero-slide';
          el.src = img.src;
          el.alt = img.project || '';
          el.decoding = 'async';
          if (i > 0) el.loading = 'lazy';
          container.insertBefore(el, gradientDiv);
          slides.push(el);`;

const newJsLoop = `        // Build slides
        SLIDE_IMAGES.forEach(function(img, i) {
          var el;
          if (i === 0) {
            el = container.querySelector('.hero-slide.first-slide');
          } else {
            el = document.createElement('img');
            el.className = 'hero-slide';
            el.src = img.src;
            el.alt = img.project || '';
            el.decoding = 'async';
            el.loading = 'lazy';
            container.insertBefore(el, gradientDiv);
          }
          slides.push(el);`;

if (html.includes(oldJsLoop)) {
  html = html.replace(oldJsLoop, newJsLoop);
}

// Remove the hardcoded active class addition at the bottom of the JS since the first HTML element already has it
const initActiveStr = `slides[0].classList.add('active');`;
html = html.replace(initActiveStr, `// slides[0].classList.add('active'); // Handled by HTML`);

fs.writeFileSync('index.html', html);
console.log('✓ Fast mobile LCP fix injected successfully.');
