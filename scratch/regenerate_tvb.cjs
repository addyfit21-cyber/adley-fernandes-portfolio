const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const tvbPath = path.join(rootDir, 'tvb-brandbook.html');
const tvbImagesDir = path.join(rootDir, 'dist/Images/Branding/TVB BRAND BOOK');
const files = fs.readdirSync(tvbImagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png'));

files.sort((a, b) => a.localeCompare(b));

let tvbImagesHtml = '';
files.forEach(file => {
    // We remove the shadow, ring and rounding for full screen if desired, or keep them? 
    // Usually full screen images look better without shadows on the edges since they touch the screen edges.
    tvbImagesHtml += `
      <div class="w-full overflow-hidden">
        <img src="/dist/Images/Branding/TVB BRAND BOOK/${file}" class="w-full h-auto block" alt="${file}" loading="lazy" decoding="async">
      </div>`;
});

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Venom Berries Brand Identity</title>
  <meta name="description" content="Full Brand Guidelines for The Venom Berries by Adley Fernandes." />
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
<body class="bg-zinc-100 text-zinc-900 antialiased selection:bg-black selection:text-white">

  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div>
        <p class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-400">Document Viewer</p>
        <h1 class="text-sm md:text-base font-bold tracking-tight text-black">The Venom Berries Brand Identity</h1>
      </div>
      <a href="/#categories-grid" class="text-xs font-bold uppercase tracking-[0.1em] px-5 py-3 bg-black text-white hover:bg-[#FA6B48] transition-colors">
        Close / Back
      </a>
    </div>
  </header>

  <!-- Document Viewer Container -->
  <main class="pt-28 pb-24 w-full flex flex-col items-center">
    
    <!-- Header Section (Constrained) -->
    <div class="max-w-6xl w-full px-6 md:px-8 pb-10">
      <div class="w-full pb-8 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div class="text-left">
          <p class="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-3">Project Overview</p>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tighter text-black">The Venom Berries<br/>Visual Identity</h2>
        </div>
        <div class="text-left md:text-right">
          <p class="text-[10px] uppercase tracking-[0.4em] font-black text-zinc-400 mb-2">Deliverables</p>
          <p class="text-sm md:text-base font-semibold text-zinc-800">Brand Strategy, Brand Identity, Art Direction</p>
        </div>
      </div>
    </div>

    <!-- Images Section (Full Width, less space) -->
    <div class="w-full space-y-2 md:space-y-4">
${tvbImagesHtml}
    </div>

    <!-- Return button at the bottom -->
    <div class="pt-12 flex justify-center w-full">
      <a href="/#categories-grid" class="text-xs font-bold uppercase tracking-[0.1em] px-8 py-4 bg-black text-white hover:bg-[#FA6B48] transition-colors">
        Return to Portfolio
      </a>
    </div>
  </main>
</body>
</html>
`;

fs.writeFileSync(tvbPath, htmlContent, 'utf8');
console.log('Successfully regenerated tvb-brandbook.html with full screen images and updated header.');
