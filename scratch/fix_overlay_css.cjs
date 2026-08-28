const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  'index.html', 'contact.html', 'services.html', 'web-development.html',
  'album-artworks.html', 'posters.html', 'sketches.html', 'execuvision.html',
  'mclaren.html', 'nexzy.html', 'porsche.html', 'benner-case-study.html',
  'lukes-case-study.html', 'tvb-brandbook.html', 'privacy-policy.html',
];

const NEW_STYLE = `<style id="pf-overlay-style">
  @keyframes pf-overlay-fade {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  #page-transition-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: #1B1717;
    z-index: 99999999;
    pointer-events: none;
    opacity: 0; /* Fail-safe: if animation breaks, it stays transparent */
    animation: pf-overlay-fade 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }
  #page-transition-overlay.is-exiting {
    opacity: 1 !important;
    animation: none !important;
  }
</style>`;

let fixed = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) continue;

  let html = fs.readFileSync(filePath, 'utf8');

  // Replace old style block
  // We need to match from <style id="pf-overlay-style"> to </style>
  const styleStart = html.indexOf('<style id="pf-overlay-style">');
  if (styleStart !== -1) {
    const styleEnd = html.indexOf('</style>', styleStart) + 8;
    html = html.substring(0, styleStart) + NEW_STYLE + html.substring(styleEnd);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Updated CSS in: ${page}`);
    fixed++;
  } else {
    console.log(`⚠️  Could not find style block in: ${page}`);
  }
}

console.log(`\\nDone: ${fixed} pages fixed.`);
