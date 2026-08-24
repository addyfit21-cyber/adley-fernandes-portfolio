const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const bennerPath = path.join(rootDir, 'benner-case-study.html');
const bennerImagesDir = path.join(rootDir, 'dist/Images/Branding');
const allFiles = fs.readdirSync(bennerImagesDir);

// Get the brand guideline files 01 to 29
const bennerFiles = allFiles.filter(f => f.startsWith('Brand guidelines-') && (f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png')));

bennerFiles.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
});

let bennerImagesHtml = '';
bennerFiles.forEach(file => {
    bennerImagesHtml += `
      <div class="w-full overflow-hidden">
        <img src="/dist/Images/Branding/${file}" class="w-full h-auto block" alt="${file}" loading="lazy" decoding="async">
      </div>`;
});

// We can also include the mockups and video for Benner right after page 26, or just put them at the end. 
// Or just omit them because the user specifically said "show the benner brand book as well and remove all the content which is currently there" - maybe they just want the pages.
// I will just show the brand guidelines pages 1 to 29.

const otherProjectsHtml = `
    <!-- Other Projects Section -->
    <div class="w-full max-w-6xl mx-auto px-6 md:px-8 py-20 mt-12 border-t border-[#1B1717]/10">
      <div class="flex items-center gap-6 mb-8">
        <span class="block w-10 h-[2px] bg-[#630000]"></span>
        <span class="text-[10px] tracking-[0.35em] uppercase text-[#630000] font-bold">More Projects</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <!-- Card: Luke's Iced Coffee -->
        <a href="lukes-case-study.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:500px;">
          <img src="/Images/Hero page animation/Lukes iced coffee banner mockup-01.webp" alt="Luke's Iced Coffee Identity" loading="lazy"
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105 opacity-60 group-hover:opacity-90">
          <div class="absolute inset-0 bg-gradient-to-t from-[#1B1717]/90 via-[#1B1717]/30 to-transparent"></div>
          <div class="absolute bottom-6 left-7 md:bottom-8 md:left-10 z-10">
            <p class="text-[9px] tracking-[0.3em] uppercase text-[#1B1717]/80 font-bold mb-1">Brand Identity</p>
            <h3 class="text-2xl md:text-4xl font-bold text-[#EDEBDD] tracking-tight mb-3">Luke's Iced Coffee</h3>
            <span class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EDEBDD]/50 group-hover:text-[#EDEBDD] transition-colors duration-300">
              View Project <span class="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
            </span>
          </div>
          <div class="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#1B1717]/10 bg-[#1B1717]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="material-symbols-outlined text-[#EDEBDD] text-sm">north_east</span>
          </div>
        </a>

        <!-- Card: TVB Brand Identity -->
        <a href="tvb-brandbook.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:500px;">
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
      </div>
    </div>
`;

const footerHtml = `
<!-- Footer -->
<footer class="bg-[#EDEBDD] flex flex-col md:flex-row justify-between items-center px-6 md:px-24 py-16 w-full">
  <div class="flex flex-col gap-2 mb-8 md:mb-0 items-center md:items-start text-center md:text-left">
    <a href="/" class="flex items-center justify-center md:justify-start">
      <img src="/Images/Brands/Adesign%20studio/Adesign%20logo%20colour-01.png" alt="Adesign Studio" class="h-12 md:h-16 w-auto object-contain md:-ml-6">
    </a>
    <p class="font-manrope text-[10px] tracking-widest uppercase text-gray-500 mt-2">© 2024 Adley Fernandes. ALL RIGHTS RESERVED.</p>
  </div>
  <div class="flex flex-wrap justify-center gap-6 md:gap-10">
    <a class="font-manrope text-[10px] tracking-widest uppercase text-gray-500 hover:text-[#1B1717] underline-offset-4 hover:underline transition-all duration-300" href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
    <a class="font-manrope text-[10px] tracking-widest uppercase text-gray-500 hover:text-[#1B1717] underline-offset-4 hover:underline transition-all duration-300" href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
    <a class="font-manrope text-[10px] tracking-widest uppercase text-gray-500 hover:text-[#1B1717] underline-offset-4 hover:underline transition-all duration-300" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
    <a class="font-manrope text-[10px] tracking-widest uppercase text-gray-500 hover:text-[#1B1717] underline-offset-4 hover:underline transition-all duration-300" href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
    <a class="font-manrope text-[10px] tracking-widest uppercase text-[#1B1717] underline-offset-4 hover:underline transition-all duration-300" href="#top">Back to top</a>
  </div>
</footer>
`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Benner Tea Co. Brand Identity</title>
  <meta name="description" content="Full Brand Guidelines for Benner Tea Co. by Adley Fernandes." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            "sans": ["Manrope", "sans-serif"],
            "heading": ["'DM Sans'", "sans-serif"],
          }
        }
      }
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: 'Manrope', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-family: 'DM Sans', sans-serif; }
  </style>
</head>
<body id="top" class="bg-zinc-100 text-zinc-900 antialiased selection:bg-black selection:text-white">

  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div>
        <p class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-400">Document Viewer</p>
        <h1 class="text-sm md:text-base font-bold tracking-tight text-black">Benner Brand Identity</h1>
      </div>
      <a href="/index.html#categories-grid" class="text-xs font-bold uppercase tracking-[0.1em] px-5 py-3 bg-black text-white hover:bg-[#FA6B48] transition-colors">
        Close / Back
      </a>
    </div>
  </header>

  <!-- Document Viewer Container -->
  <main class="pt-28 w-full flex flex-col items-center bg-zinc-100">
    
    <!-- Header Section (Constrained) -->
    <div class="max-w-6xl w-full px-6 md:px-8 pb-10">
      <div class="w-full pb-8 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div class="text-left">
          <p class="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-3">Project Overview</p>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tighter text-black">Benner Tea Co.<br/>Visual Identity</h2>
        </div>
        <div class="text-left md:text-right">
          <p class="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-2">Deliverables</p>
          <p class="text-sm md:text-base font-semibold text-zinc-800">Brand Strategy, Brand Identity, Packaging</p>
        </div>
      </div>
    </div>

    <!-- Images Section (Full Width, less space) -->
    <div class="w-full space-y-2 md:space-y-4">
${bennerImagesHtml}
    </div>

${otherProjectsHtml}
  </main>
  
${footerHtml}
</body>
</html>
`;

fs.writeFileSync(bennerPath, htmlContent, 'utf8');
console.log('Successfully regenerated benner-case-study.html with brand book styling, other projects, and footer.');
