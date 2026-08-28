const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // 1. Change the desktop nav container to be visible on all screens
  // Old: <div class="hidden md:flex flex-row items-center gap-4 pointer-events-auto mix-blend-difference fixed top-4 right-6 md:top-6 md:right-10 z-[120]"
  // Make it match anywhere it says `hidden md:flex` in the top nav
  html = html.replace(/<div class="hidden md:flex flex-row items-center gap-4 pointer-events-auto mix-blend-difference/g, 
                      '<div class="flex flex-row items-center gap-2 md:gap-4 pointer-events-auto mix-blend-difference');
  
  // also fix gap if needed, or just let regex do it
  // Wait, let's just make the regex robust:
  html = html.replace(/<div class="hidden md:flex flex-row items-center/g, 
                      '<div class="flex flex-row items-center');

  // 2. Remove the Mobile Menu Button block
  const btnStart = html.indexOf('<!-- Mobile Menu Button (Top Right) -->');
  if (btnStart !== -1) {
    const navEnd = html.indexOf('</nav>', btnStart);
    if (navEnd !== -1) {
      html = html.substring(0, btnStart) + html.substring(navEnd);
    }
  }

  // 3. Remove the Mobile Dropdown Menu Container block
  const containerStart = html.indexOf('<!-- Mobile Dropdown Menu Container');
  if (containerStart !== -1) {
    // Find the end of this block by searching for the next <!-- or <main or <div id="smooth
    let containerEnd = html.indexOf('<!--', containerStart + 10);
    const mainEnd = html.indexOf('<main', containerStart + 10);
    const smoothEnd = html.indexOf('<div id="smooth-wrapper', containerStart + 10);
    
    // We want the minimum positive index
    const possibleEnds = [containerEnd, mainEnd, smoothEnd].filter(x => x !== -1);
    const actualEnd = Math.min(...possibleEnds);
    
    if (actualEnd !== Infinity) {
      html = html.substring(0, containerStart) + html.substring(actualEnd);
    }
  }
  
  // 4. Remove JS logic
  const jsStart = html.indexOf('document.addEventListener(\'DOMContentLoaded\', function() {\n  const mobileBtn = document.getElementById(\'mobile-dropdown-btn\');');
  if (jsStart !== -1) {
    const scriptOpen = html.lastIndexOf('<script>', jsStart);
    const scriptClose = html.indexOf('</script>', jsStart) + 9;
    if (scriptOpen !== -1 && scriptClose !== -1) {
      html = html.substring(0, scriptOpen) + html.substring(scriptClose);
    }
  }

  fs.writeFileSync(p, html, 'utf8');
  console.log('Processed', f);
}
