const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
// We want to replace lines 1597 to 1626 (0-indexed 1596 to 1625) with our new code.
// Wait, the lines in view_file were 1-indexed.
// 1598:   <!-- ===================== VISUAL IDENTITY ===================== -->
// 1626:   </div>
// So from index 1597 to index 1625

const newContent = `  <!-- ===================== VISUAL IDENTITY ===================== -->
  <div class="px-6 md:px-12 lg:px-24 pt-20 md:pt-32 pb-8 md:pb-12">
    <div class="flex items-center gap-6 mb-3">
      <span class="block w-10 h-[2px] bg-[#630000]"></span>
      <span class="text-[10px] tracking-[0.35em] uppercase text-[#630000] font-bold">01 — Category</span>
    </div>
    <h2 class="text-5xl md:text-8xl font-bold tracking-tighter text-[#1B1717] leading-none">Visual Identity</h2>
  </div>

  <!-- 3-card grid: 3 in a row -->
  <div class="px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

      <!-- Card: Benner -->
      <a href="visual-identity.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">
        <img src="/Images/Hero page animation/Benner backaging mockup-01.webp" alt="Benner Brand Identity" loading="lazy"
             class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-105 opacity-60 group-hover:opacity-90">
        <div class="absolute inset-0 bg-gradient-to-t from-[#1B1717]/90 via-[#1B1717]/30 to-transparent"></div>
        <div class="absolute bottom-6 left-7 md:bottom-8 md:left-10 z-10">
          <p class="text-[9px] tracking-[0.3em] uppercase text-[#1B1717]/80 font-bold mb-1">Brand Identity</p>
          <h3 class="text-2xl md:text-4xl font-bold text-[#EDEBDD] tracking-tight mb-3">Benner</h3>
          <span class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EDEBDD]/50 group-hover:text-[#EDEBDD] transition-colors duration-300">
            View Project <span class="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
          </span>
        </div>
        <div class="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#1B1717]/10 bg-[#1B1717]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span class="material-symbols-outlined text-[#EDEBDD] text-sm">north_east</span>
        </div>
      </a>

      <!-- Card: Luke's Iced Coffee -->
      <a href="visual-identity.html" class="group relative block overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer" style="min-height:580px;">
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

      <!-- Right column: Coming Soon / Placeholder card -->
      <a href="visual-identity.html" class="group relative block overflow-hidden bg-[#EDEBDD] rounded-2xl cursor-pointer border border-[#1B1717]/10" style="min-height:580px;">
        <div class="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-[#1B1717]"></div>
        <!-- Decorative maroon accent -->
        <div class="absolute top-0 left-0 w-full h-[3px] bg-[#630000]"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div class="w-16 h-16 rounded-full border border-[#630000]/40 flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-[#630000] text-2xl">add</span>
          </div>
          <p class="text-[9px] tracking-[0.4em] uppercase text-[#EDEBDD]/50 font-bold mb-3">Coming Soon</p>
          <h3 class="text-xl md:text-2xl font-bold text-[#EDEBDD] tracking-tight">Next Project</h3>
          <p class="text-xs text-[#EDEBDD]/60 mt-3 max-w-[140px] leading-relaxed">A new identity project is on its way.</p>
        </div>
        <div class="absolute bottom-6 left-7 z-10">
          <span class="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EDEBDD]/60 group-hover:text-[#EDEBDD] transition-colors duration-300">
            Browse All <span class="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
          </span>
        </div>
      </a>

    </div>
  </div>`;

// Find index of "<!-- ===================== VISUAL IDENTITY ===================== -->"
const startIndex = lines.findIndex(l => l.includes('<!-- ===================== VISUAL IDENTITY ===================== -->'));
const endIndex = startIndex + 28; // because 1626 - 1598 = 28

if (startIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, newContent);
  fs.writeFileSync(filePath, lines.join('\\n'), 'utf8');
  console.log('Successfully replaced visual identity section.');
} else {
  console.log('Could not find start marker.');
}
