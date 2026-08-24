const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const heroStart = html.indexOf('<section id="hero"');
const heroEnd = html.indexOf('</section>', heroStart) + 10;

const restoredHero = `
  <section id="hero" class="w-full flex flex-col md:justify-center border-b border-[#1B1717]/10 overflow-x-hidden relative bg-[#EDEBDD] pt-24 md:pt-32 pb-8 md:pb-20" style="min-height: calc(var(--vh, 1svh) * 100);">
      <div class="absolute top-28 md:top-36 left-6 md:left-12 lg:left-24 hero-slide-right z-20">
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#1B1717]/60 font-bold">Design Studio &mdash; 2024</p>
      </div>

      <!-- Descriptor & CTA -->
      <div class="w-full px-6 md:px-12 lg:px-24 flex flex-col items-start text-left pb-2 md:pb-0 md:mt-8">
        <!-- Descriptor -->
        <p class="hero-slide-right relative z-10 text-sm md:text-base text-[#1B1717]/60 leading-relaxed max-w-xl mb-4 md:mb-12">
          <span class="font-bold text-[#1B1717] text-lg md:text-xl">Helping Brands Look Better.<br class="block md:hidden"/> Perform Better. Grow&nbsp;Faster.</span><br/>
          <span class="font-light mt-1 inline-block">Through branding, UI/UX design, and <br class="block md:hidden"/>high-converting websites.</span>
        </p>
  
        <!-- View Work Link -->
        <div class="hero-slide-right relative z-10 flex flex-col items-start justify-start gap-6">
          <a href="https://api.whatsapp.com/send?phone=919987382295" target="_blank" rel="noopener" class="group bg-[#EDEBDD] text-[#1B1717] border border-[#1B1717]/20 px-5 md:px-10 py-3.5 md:py-5 text-[9px] md:text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-[#630000] hover:text-[#EDEBDD] hover:border-[#630000] hover:shadow-[0_0_20px_rgba(99,0,0,0.4)] transition-all duration-500 inline-flex items-center gap-3 active:scale-95 hover:scale-105">
            Start a Project
            <div class="relative w-4 h-4 flex items-center justify-center overflow-hidden flex-shrink-0">
              <span class="material-symbols-outlined absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-6" style="font-size:16px;">arrow_forward</span>
              <span class="material-symbols-outlined absolute -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0" style="font-size:16px;">arrow_forward</span>
            </div>
          </a>
          <p class="font-light text-[#1B1717]/60 text-sm md:text-base mt-6 text-left">
            20+ Projects &nbsp;&bull;&nbsp; 10+ happy clients &nbsp;&bull;&nbsp; 2+ years experience
          </p>
        </div>
      </div>
  </section>
`;

if (heroStart !== -1 && heroEnd !== -1) {
    html = html.substring(0, heroStart) + restoredHero + html.substring(heroEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Restored the taglines and CTA button.');
