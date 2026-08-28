const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Let's remove the garbage left over from the mobile dropdown menu
  // The garbage starts at `<!-- Projects Section -->` 
  // It ends before `<!-- Custom Cursor` or `<main` or `<div id="smooth-wrapper"`
  
  const garbageStart = html.indexOf('<!-- Projects Section -->');
  if (garbageStart !== -1) {
    const nextMain = html.indexOf('<main', garbageStart);
    const nextSmooth = html.indexOf('<div id="smooth-wrapper"', garbageStart);
    const nextCursor = html.indexOf('<!-- Custom Cursor', garbageStart);
    const nextFooter = html.indexOf('<!-- GSAP Logic', garbageStart);
    
    let ends = [nextMain, nextSmooth, nextCursor, nextFooter].filter(x => x !== -1);
    let endIdx = Math.min(...ends);
    
    if (endIdx !== Infinity) {
      html = html.substring(0, garbageStart) + html.substring(endIdx);
      fs.writeFileSync(p, html, 'utf8');
      console.log('Cleaned garbage in', f);
    }
  }
}
