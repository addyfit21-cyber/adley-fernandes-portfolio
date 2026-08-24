const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const footerMarker = '<footer id="site-footer"';
const footerIdx = html.indexOf(footerMarker);
let body = html.substring(0, footerIdx);
const footer = html.substring(footerIdx);

// Convert all headings that are text-[#EDEBDD] to text-[#1B1717] so they are readable on the cotton white background
body = body.replace(/text-\[#EDEBDD\]/g, 'text-[#1B1717]');

// BUT, inside the dark cards (class="group relative block overflow-hidden bg-zinc-900), the text must be cotton white again
body = body.replace(/(class="group relative block overflow-hidden bg-zinc-900 rounded-2xl[^"]*"[\s\S]*?<\/a>)/g, function(match) {
  // restore white text in the cards
  let restored = match.replace(/text-\[#1B1717\]/g, 'text-[#EDEBDD]');
  return restored;
});

// Also, the "Coming Soon" card was given some text colors that should be light
body = body.replace(/text-zinc-500/g, 'text-[#1B1717]/60');
body = body.replace(/text-zinc-400/g, 'text-[#1B1717]/80');
body = body.replace(/text-zinc-600/g, 'text-[#1B1717]/50');

// Ensure the testimonials / about sections look right:
// Check the borders, if they are still white/10, change to black/10
body = body.replace(/border-white\/10/g, 'border-[#1B1717]/10');
body = body.replace(/border-white\/20/g, 'border-[#1B1717]/20');
body = body.replace(/bg-white\/10/g, 'bg-[#1B1717]/10');
body = body.replace(/bg-white\/5/g, 'bg-[#1B1717]/5');

fs.writeFileSync('index.html', body + footer, 'utf8');
console.log('Fixed heading colours in the white theme.');
