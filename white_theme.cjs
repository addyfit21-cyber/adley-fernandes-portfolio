const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find where the footer starts - preserve everything from it onwards
const footerMarker = '<footer id="site-footer"';
const footerIdx = html.indexOf(footerMarker);
if (footerIdx === -1) { console.error('Footer not found!'); process.exit(1); }

let body = html.substring(0, footerIdx);
const footer = html.substring(footerIdx);

// ---- SECTION BACKGROUNDS ----
// Change dark section backgrounds to cotton white
body = body.replace(/bg-\[#1B1717\]/g, 'bg-[#EDEBDD]');
body = body.replace(/bg-zinc-950/g, 'bg-[#EDEBDD]');
body = body.replace(/bg-zinc-900/g, 'bg-[#EDEBDD]');

// ---- BORDER COLOURS ----
body = body.replace(/border-white\/10/g, 'border-[#1B1717]/10');
body = body.replace(/border-white\/20/g, 'border-[#1B1717]/20');
body = body.replace(/border-white\/5/g, 'border-[#1B1717]/10');

// ---- TEXT COLOURS ----
body = body.replace(/\btext-white\b/g, 'text-[#1B1717]');
body = body.replace(/\btext-zinc-400\b/g, 'text-[#1B1717]/60');
body = body.replace(/\btext-zinc-300\b/g, 'text-[#1B1717]/70');
body = body.replace(/\btext-zinc-500\b/g, 'text-[#1B1717]/50');
body = body.replace(/\btext-zinc-600\b/g, 'text-[#1B1717]/60');

// ---- BG CARD OVERLAYS (gradient overlays on image cards should stay dark for legibility) ----
// Re-apply dark background to rounded image/video cards (categories grid cards)
body = body.replace(/class="group relative block overflow-hidden bg-\[#EDEBDD\] rounded-2xl/g, 
                    'class="group relative block overflow-hidden bg-zinc-900 rounded-2xl');

// Fix the from-[#EDEBDD]/90 gradient overlay that was changed - put back correct dark gradient
body = body.replace(/from-\[#1B1717\]\/90/g, 'from-[#1B1717]/90');
body = body.replace(/from-\[#1B1717\]\/80/g, 'from-[#1B1717]/80');
body = body.replace(/from-\[#EDEBDD\]\/90/g, 'from-[#1B1717]/90');

// Fix gradient via colours if changed
body = body.replace(/via-\[#EDEBDD\]\/40/g, 'via-[#1B1717]/40');
body = body.replace(/via-\[#EDEBDD\]\/30/g, 'via-[#1B1717]/30');
body = body.replace(/via-\[#EDEBDD\]\/20/g, 'via-[#1B1717]/20');

// Fix text WITHIN portfolio cards (over dark image overlay) -- needs to stay light for contrast
body = body.replace(/(class="group relative block overflow-hidden[^"]*"[\s\S]*?<\/a>)/g, function(match) {
  match = match.replace(/text-\[#1B1717\] tracking-tight mb-3">/g, 'text-[#EDEBDD] tracking-tight mb-3">');
  match = match.replace(/text-\[#1B1717\]\/60 group-hover:text-\[#EDEBDD\]/g, 'text-zinc-400 group-hover:text-[#EDEBDD]');
  match = match.replace(/text-\[#1B1717\]\/60" font-bold mb-1">/g, 'text-zinc-400 font-bold mb-1">');
  match = match.replace(/<p class="text-\[9px\] tracking-\[0\.3em\] uppercase text-\[#1B1717\]\/60/g, '<p class="text-[9px] tracking-[0.3em] uppercase text-zinc-400');
  return match;
});

// ---- BUTTON / UI COLOURS ----
body = body.replace(/bg-white\/5/g, 'bg-[#1B1717]/5');
body = body.replace(/bg-white\/10/g, 'bg-[#1B1717]/10');
body = body.replace(/hover:bg-white\/10/g, 'hover:bg-[#1B1717]/10');
body = body.replace(/hover:bg-white\/20/g, 'hover:bg-[#1B1717]/20');

body = body.replace(/bg-\[#1B1717\]\/5 hover:bg-\[#1B1717\]\/10 border border-\[#1B1717\]\/10 text-\[#1B1717\]/g,
                    'bg-[#1B1717]/5 hover:bg-[#1B1717]/10 border border-[#1B1717]/20 text-[#1B1717]');

body = body.replace(/class="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-\[#EDEBDD\]"/g, 
                    'class="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-[#1B1717]"');

fs.writeFileSync('index.html', body + footer, 'utf8');
console.log('Done - white theme applied to all sections, footer preserved.');
