/**
 * EMERGENCY FIX: The overlay <div> was incorrectly injected into <head>,
 * which is invalid HTML and causes the browser to break page structure → blank screen.
 *
 * This script:
 *  1. Removes the broken block from <head>
 *  2. Puts the <style> correctly in <head>
 *  3. Puts the <div> correctly as the first child of <body>
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  'index.html', 'contact.html', 'services.html', 'web-development.html',
  'album-artworks.html', 'posters.html', 'sketches.html', 'execuvision.html',
  'mclaren.html', 'nexzy.html', 'porsche.html', 'benner-case-study.html',
  'lukes-case-study.html', 'tvb-brandbook.html', 'privacy-policy.html',
];

// The broken block we injected into <head> (match loosely)
const BROKEN_STYLE = `<style>
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
<div id="page-transition-overlay"></div>`;

// Correct: <style> in <head>, <div> as first child of <body>
const CORRECT_STYLE_IN_HEAD = `<style id="pf-overlay-style">
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
</style>`;

const CORRECT_DIV_IN_BODY = `<div id="page-transition-overlay"></div>`;

let fixed = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) { console.log(`MISSING: ${page}`); continue; }

  let html = fs.readFileSync(filePath, 'utf8');

  // ── Step 1: Strip the entire broken block from wherever it is ──
  // The block starts with a comment and ends after the closing div
  const startMarker = '<!-- ── Page Transition Overlay (must be in <head> for zero-flash) ── -->';
  const endMarker   = '<!-- ── /Page Transition Overlay ── -->';

  const startIdx = html.indexOf(startMarker);
  const endIdx   = html.indexOf(endMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    // Remove everything from startMarker to end of endMarker line
    const endOfBlock = html.indexOf('\n', endIdx + endMarker.length) + 1;
    html = html.slice(0, startIdx) + html.slice(endOfBlock);
  }

  // ── Step 2: Check if correctly injected already (idempotent) ──
  if (html.includes('id="pf-overlay-style"')) {
    console.log(`✓  Already fixed: ${page}`);
    continue;
  }

  // ── Step 3: Inject <style> into <head> ──
  if (!html.includes('<head>')) {
    // head with attributes
    html = html.replace(/(<head[^>]*>)/, `$1\n${CORRECT_STYLE_IN_HEAD}`);
  } else {
    html = html.replace('<head>', `<head>\n${CORRECT_STYLE_IN_HEAD}`);
  }

  // ── Step 4: Inject <div> as first child of <body> ──
  if (html.includes('<body>')) {
    html = html.replace('<body>', `<body>\n${CORRECT_DIV_IN_BODY}`);
  } else {
    // body with class/attributes
    html = html.replace(/(<body[^>]*>)/, `$1\n${CORRECT_DIV_IN_BODY}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Fixed: ${page}`);
  fixed++;
}

console.log(`\nDone: ${fixed} pages fixed.`);
