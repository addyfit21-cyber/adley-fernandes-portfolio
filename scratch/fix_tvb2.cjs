const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const bennerGuidelinesPath = path.join(rootDir, 'benner-guidelines.html');
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

// Fix close back link
bennerGuideHtml = bennerGuideHtml.replace('href="/#branding"', 'href="/#categories-grid"');
bennerGuideHtml = bennerGuideHtml.replace('href="/#benner-tea-co"', 'href="/#categories-grid"');

// Insert the new header and images
const mainStart = bennerGuideHtml.indexOf('<div class="max-w-6xl w-full px-4 md:px-8 space-y-6 md:space-y-12">');
const mainEnd = bennerGuideHtml.indexOf('<div class="pt-12 flex justify-center">', mainStart);

const newHeader = `
      <div class="w-full pb-8 md:pb-12 pt-4 md:pt-8 text-center border-b border-zinc-200">
        <p class="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-3">Project Overview</p>
        <h2 class="text-4xl md:text-6xl font-bold tracking-tighter text-black">The Venom Berries<br/>Visual Identity</h2>
      </div>`;

let tvbHtml = bennerGuideHtml.substring(0, mainStart + '<div class="max-w-6xl w-full px-4 md:px-8 space-y-6 md:space-y-12">'.length) +
    newHeader + '\n' +
    tvbImagesHtml + '\n      ' +
    bennerGuideHtml.substring(mainEnd);

fs.writeFileSync(path.join(rootDir, 'tvb-brandbook.html'), tvbHtml, 'utf8');
console.log('Fixed tvb-brandbook.html');
