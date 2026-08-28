/**
 * Injects the page-transition overlay inline styles + div into every HTML page.
 * The overlay must be in <head> so the browser paints it black on first frame,
 * eliminating the flash/flicker before transitions.js can run.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  'index.html',
  'contact.html',
  'services.html',
  'web-development.html',
  'album-artworks.html',
  'posters.html',
  'sketches.html',
  'execuvision.html',
  'mclaren.html',
  'nexzy.html',
  'porsche.html',
  'benner-case-study.html',
  'lukes-case-study.html',
  'tvb-brandbook.html',
  'privacy-policy.html',
];

// This block goes right after <head> opens (or before </head>).
// It paints a black overlay immediately, then CSS transition fades it out
// once transitions.js sets opacity to 0.
const OVERLAY_BLOCK = `
<!-- ── Page Transition Overlay (must be in <head> for zero-flash) ── -->
<style>
  #page-transition-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: #1B1717;
    z-index: 99999999;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
  }
</style>
<div id="page-transition-overlay"></div>
<!-- ── /Page Transition Overlay ── -->`;

const MARKER = '<!-- ── Page Transition Overlay';
const EXISTING_OLD_STYLE = '#page-transition-overlay';

let totalUpdated = 0;
let totalSkipped = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  MISSING: ${page}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (html.includes(MARKER)) {
    console.log(`✓  Already has overlay: ${page}`);
    totalSkipped++;
    continue;
  }

  // Inject right after <head> tag (or before first </head> if <head> not found simply)
  if (html.includes('<head>')) {
    html = html.replace('<head>', '<head>' + OVERLAY_BLOCK);
  } else if (html.includes('<head ')) {
    // head tag with attributes
    html = html.replace(/(<head[^>]*>)/, '$1' + OVERLAY_BLOCK);
  } else {
    console.log(`⚠️  No <head> found in ${page}, skipping`);
    totalSkipped++;
    continue;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅  Injected overlay: ${page}`);
  totalUpdated++;
}

console.log(`\nDone: ${totalUpdated} updated, ${totalSkipped} skipped.`);
