const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const visualIdentityHtmlPath = path.join(rootDir, 'visual-identity.html');
const bennerGuidelinesPath = path.join(rootDir, 'benner-guidelines.html');

// 1. Update index.html links and 3rd card
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace Benner link
indexHtml = indexHtml.replace(
  'href="visual-identity.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">\\n        <img src="/Images/Hero page animation/Benner backaging mockup-01.webp"',
  'href="benner-case-study.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">\\n        <img src="/Images/Hero page animation/Benner backaging mockup-01.webp"'
);

// Replace Luke's link
indexHtml = indexHtml.replace(
  'href="visual-identity.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">\\n        <img src="/Images/Hero page animation/Lukes iced coffee banner mockup-01.webp"',
  'href="lukes-case-study.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">\\n        <img src="/Images/Hero page animation/Lukes iced coffee banner mockup-01.webp"'
);

// Replace 3rd card (Coming Soon) with TVB
const comingSoonRegex = /<!-- Right column: Coming Soon \/ Placeholder card -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<!-- ===================== POSTERS)/;

const tvbCardHtml = `<!-- Card: TVB Brand Identity -->
      <a href="tvb-brandbook.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">
        <img src="/Images/Hero page animation/TVB BRand BOOK-13.webp" alt="The Venom Berries Brand Identity" loading="lazy"
             class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105 opacity-60 group-hover:opacity-90">
        <div class="absolute inset-0 bg-gradient-to-t from-[#1B1717]/90 via-[#1B1717]/30 to-transparent"></div>
        <div class="absolute bottom-6 left-7 md:bottom-8 md:left-10 z-10">
          <p class="text-[9px] tracking-[0.3em] uppercase text-[#1B1717]/80 font-bold mb-1">Brand Identity</p>
          <h3 class="text-2xl md:text-4xl font-bold text-[#EDEBDD] tracking-tight mb-3">The Venom Berries</h3>
          <span class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EDEBDD]/50 group-hover:text-[#EDEBDD] transition-colors duration-300">
            View Project <span class="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
          </span>
        </div>
        <div class="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#1B1717]/10 bg-[#1B1717]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span class="material-symbols-outlined text-[#EDEBDD] text-sm">north_east</span>
        </div>
      </a>
    `;

indexHtml = indexHtml.replace(comingSoonRegex, tvbCardHtml);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// 2. Create benner-case-study.html
let visualHtml = fs.readFileSync(visualIdentityHtmlPath, 'utf8');

// For benner, remove Luke's section
// Look for "<!-- ═══════════════════════════════════════════════\n         CASE STUDY 02 — LUKE'S ICED COFFEE"
const lukesStart = visualHtml.indexOf('<!-- ═══════════════════════════════════════════════\n         CASE STUDY 02 — LUKE\'S ICED COFFEE');
const lukesEnd = visualHtml.indexOf('<!-- END: Luke\'s Iced Coffee -->', lukesStart);

let bennerHtml = visualHtml;
if (lukesStart !== -1 && lukesEnd !== -1) {
    bennerHtml = visualHtml.substring(0, lukesStart) + visualHtml.substring(lukesEnd + '<!-- END: Luke\'s Iced Coffee -->'.length);
}
fs.writeFileSync(path.join(rootDir, 'benner-case-study.html'), bennerHtml, 'utf8');

// 3. Create lukes-case-study.html
// For lukes, remove Benner section (from CASE STUDY 01 to END: Benner Tea Co.)
const bennerStart = visualHtml.indexOf('<!-- ═══════════════════════════════════════════════\n         CASE STUDY 01 — BENNER TEA CO.');
const bennerEnd = visualHtml.indexOf('<!-- END: Benner Tea Co. -->', bennerStart);

let lukesHtml = visualHtml;
if (bennerStart !== -1 && bennerEnd !== -1) {
    lukesHtml = visualHtml.substring(0, bennerStart) + visualHtml.substring(bennerEnd + '<!-- END: Benner Tea Co. -->'.length);
}
// Also remove the "Visual Identity" hero text since Benner has it, Luke's doesn't need to double-stack it if it's there. 
// Actually, let's keep it, but maybe change the text to just Luke's Iced Coffee.
lukesHtml = lukesHtml.replace('Reimagining the heritage of Benner Tea Co.', 'A modern, sharp, and structured identity for Luke\'s Iced Coffee.');

fs.writeFileSync(path.join(rootDir, 'lukes-case-study.html'), lukesHtml, 'utf8');

// 4. Create tvb-brandbook.html
const tvbImagesDir = path.join(rootDir, 'dist/Images/Branding/TVB BRAND BOOK');
const files = fs.readdirSync(tvbImagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png'));

// Sort files logically
files.sort((a, b) => a.localeCompare(b));

let tvbImagesHtml = '';
files.forEach(file => {
    tvbImagesHtml += `
      <div class="w-full bg-white shadow-xl shadow-black/10 overflow-hidden ring-1 ring-black/5">
        <img src="/dist/Images/Branding/TVB BRAND BOOK/${file}" class="w-full h-auto block" alt="${file}" loading="lazy" decoding="async">
      </div>`;
});

let bennerGuideHtml = fs.readFileSync(bennerGuidelinesPath, 'utf8');
// Replace title
bennerGuideHtml = bennerGuideHtml.replace('Benner Tea Co. Brand Guidelines Document', 'The Venom Berries Brand Identity');
bennerGuideHtml = bennerGuideHtml.replace('Benner Tea Co. Brandbook', 'The Venom Berries Brand Identity');

// Replace everything inside <main class="..."><div class="... space-y-6"> ... <div class="pt-12 flex justify-center">
const mainStart = bennerGuideHtml.indexOf('<div class="max-w-6xl w-full px-4 md:px-8 space-y-6 md:space-y-12">');
const mainEnd = bennerGuideHtml.indexOf('<div class="pt-12 flex justify-center">', mainStart);

let tvbHtml = bennerGuideHtml.substring(0, mainStart + '<div class="max-w-6xl w-full px-4 md:px-8 space-y-6 md:space-y-12">'.length) +
    tvbImagesHtml + '\n      ' +
    bennerGuideHtml.substring(mainEnd);

fs.writeFileSync(path.join(rootDir, 'tvb-brandbook.html'), tvbHtml, 'utf8');

console.log('Successfully created benner-case-study.html, lukes-case-study.html, and tvb-brandbook.html. Updated index.html links.');
