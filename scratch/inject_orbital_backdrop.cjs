// Add hero-carousel-backdrop.webp as the backdrop of the orbital/choreography section
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

// Check not already injected
if (html.includes('Orbital Section Backdrop Image')) {
  console.log('Already injected — nothing to do.');
  process.exit(0);
}

// The backdrop layer — sits at z-0 behind formation-container (z-10) and text (z-20)
const BACKDROP_LAYER = `\n      <!-- \u2500\u2500 Orbital Section Backdrop Image \u2500\u2500 -->\n      <div aria-hidden="true" style="position:absolute;inset:0;z-index:0;overflow:hidden;">\n        <img src="/Images/hero-carousel-backdrop.webp" alt="" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;opacity:0.18;filter:saturate(0.4) brightness(0.7);">\n      </div>\n      <!-- \u2500\u2500 /Orbital Section Backdrop Image \u2500\u2500 -->\n\n`;

// Find the insertion point — just before the BACKGROUND IMAGES LAYER comment
// Use indexOf for reliability across line endings
const anchor = '<!-- BACKGROUND IMAGES LAYER -->';
const idx = html.indexOf(anchor);

if (idx === -1) {
  console.error('ERROR: Could not find anchor comment "' + anchor + '"');
  process.exit(1);
}

html = html.slice(0, idx) + BACKDROP_LAYER + html.slice(idx);

fs.writeFileSync(file, html, 'utf8');
console.log('✅ Backdrop injected into services/orbital section.');
