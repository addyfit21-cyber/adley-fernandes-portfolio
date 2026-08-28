const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

const newNav = `<nav id="main-nav" class="pointer-events-none">
  <!-- Top Left: Logo (Original form, NO BLEND) -->
  <div class="fixed top-0 left-0 z-[120] px-4 md:px-12 py-4 md:py-6">
    <a href="/" class="pointer-events-auto block">
      <img src="/Images/Brands/Adesign%20studio/Adesign%20logo%20colour-01.webp" alt="Adesign Studio" class="h-8 md:h-14 w-auto object-contain">
    </a>
  </div>

  <!-- Top Right: Navigation (Horizontal for both Mobile & Desktop) -->
  <div class="flex flex-row items-center gap-3 md:gap-4 pointer-events-auto mix-blend-difference fixed top-4 right-4 md:top-6 md:right-10 z-[120]" style="will-change: transform; transform: translateZ(0); contain: layout style;">
    <a href="/" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Index</a>
    
    <!-- Projects Dropdown -->
    <div class="relative group flex flex-col items-center">
      <button class="bg-transparent text-white hover:opacity-70 px-0 py-0 font-manrope text-[8px] tracking-[0.2em] uppercase transition-opacity flex items-center gap-0.5 cursor-pointer">
        Projects
        <span class="material-symbols-outlined text-[10px] md:text-sm transition-transform duration-300 group-hover:rotate-180">expand_more</span>
      </button>
      
      <!-- Dropdown Menu -->
      <div class="absolute top-full mt-4 w-40 bg-[#EDEBDD] border border-zinc-100 shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 flex flex-col p-2 z-[101] mix-blend-normal">
        <a href="index.html#categories-grid" class="px-4 py-3 text-[9px] uppercase tracking-widest text-[#1B1717] hover:bg-black/5 transition-colors text-center border-b border-zinc-200 last:border-0">Visual Identity</a>
        <a href="posters.html" class="px-4 py-3 text-[9px] uppercase tracking-widest text-[#1B1717] hover:bg-black/5 transition-colors text-center border-b border-zinc-200 last:border-0">Posters</a>
        <a href="nexzy.html" class="px-4 py-3 text-[9px] uppercase tracking-widest text-[#1B1717] hover:bg-black/5 transition-colors text-center border-b border-zinc-200 last:border-0">Web Dev</a>
        <a href="sketches.html" class="px-4 py-3 text-[9px] uppercase tracking-widest text-[#1B1717] hover:bg-black/5 transition-colors text-center border-b border-zinc-200 last:border-0">Sketches</a>
      </div>
    </div>
    
    <a href="index.html#about" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">About</a>
    <a href="contact.html" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Contact</a>
  </div>
</nav>`;

let changed = 0;
for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Replace everything from <nav id="main-nav" to the end of the mobile dropdown container
  const navStartIdx = html.indexOf('<nav id="main-nav"');
  if (navStartIdx === -1) continue;

  // The end of the mobile dropdown container is after <!-- Projects Section --> ... </div> </div> </div>
  // A safe way to find it is to look for the next thing after it. In posters.html, it's followed by `<!-- Cursor...` or `<!-- Main Content` or `<div id="smooth-wrapper">`
  const smoothWrapperIdx = html.indexOf('<div id="smooth-wrapper">', navStartIdx);
  const cursorIdx = html.indexOf('<!-- Custom Cursor', navStartIdx);
  const mainMainIdx = html.indexOf('<main ', navStartIdx);
  
  let endIdx = smoothWrapperIdx;
  if (endIdx === -1 || (cursorIdx !== -1 && cursorIdx < endIdx)) endIdx = cursorIdx;
  if (endIdx === -1 || (mainMainIdx !== -1 && mainMainIdx < endIdx)) endIdx = mainMainIdx;
  
  // Actually, wait, let's just use string replacement on the known start/end markers
  const startMarker = '<nav id="main-nav" class="pointer-events-none">';
  const mobileMenuEndStr = '        <a href="sketches.html" class="py-1 text-[8px] uppercase tracking-widest text-[#1B1717]/80 hover:text-[#1B1717]">Sketches</a>\n      </div>\n    </div>\n    \n    <a href="index.html#about" class="px-6 py-4 text-[8px] uppercase tracking-widest text-[#1B1717] font-bold border-b border-zinc-200 hover:bg-black/5 text-right">About</a>\n    <a href="contact.html" class="px-6 py-4 text-[8px] uppercase tracking-widest text-[#1B1717] font-bold hover:bg-black/5 text-right">Contact</a>\n  </div>\n</div>';
  
  const startPos = html.indexOf(startMarker);
  const endPos = html.indexOf(mobileMenuEndStr);
  
  if (startPos !== -1 && endPos !== -1) {
    const fullBlockEnd = endPos + mobileMenuEndStr.length;
    html = html.substring(0, startPos) + newNav + html.substring(fullBlockEnd);
    
    // Also remove the mobile menu JS script since it's no longer needed
    const jsStart = html.indexOf('document.addEventListener(\'DOMContentLoaded\', function() {\n  const mobileBtn = document.getElementById(\'mobile-dropdown-btn\');');
    if (jsStart !== -1) {
      const scriptOpen = html.lastIndexOf('<script>', jsStart);
      const scriptClose = html.indexOf('</script>', jsStart) + 9;
      html = html.substring(0, scriptOpen) + html.substring(scriptClose);
    }
    
    fs.writeFileSync(p, html, 'utf8');
    changed++;
    console.log(`Updated navbar in ${f}`);
  } else {
    console.log(`Could not find markers in ${f}`);
  }
}
console.log(`Changed ${changed} files.`);
