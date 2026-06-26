const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Add 'Design Studio - 2024'
const heroStart = '<section id="hero" class="w-full min-h-[100svh] flex flex-col justify-end md:justify-center border-b border-zinc-100 overflow-x-hidden relative bg-[#fdfdfd] pt-32 pb-24 md:pb-20">';
if (content.includes(heroStart)) {
  const topTextHTML = `
    <div class="absolute top-28 md:top-36 left-6 md:left-12 lg:left-24 hero-slide-right z-20">
      <p class="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Design Studio &mdash; 2024</p>
    </div>`;
  content = content.replace(heroStart, heroStart + topTextHTML);
  console.log('Added Design Studio text');
}

// 2. Add '20+ Projects...'
// The CTA is inside a div with class "hero-slide-right relative z-10 flex flex-col items-start..."
// Let's replace the innerHTML of the descriptor/CTA wrapper block
const ctaFind = `<a href="https://api.whatsapp.com/send?phone=919987382295" target="_blank" rel="noopener" class="group bg-black text-white border border-white/20 px-5 md:px-10 py-3.5 md:py-5 text-[9px] md:text-xs md:text-sm tracking-[0.2em] uppercase font-bold hover:bg-[#ffea00] hover:text-black hover:border-[#ffea00] hover:shadow-[0_0_20px_rgba(255,234,0,0.6)] transition-all duration-500 inline-flex items-center gap-3 btn-shine-trigger">
          Start a Project
          <div class="relative w-4 h-4 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span class="material-symbols-outlined absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-6" style="font-size:16px;">arrow_forward</span>
            <span class="material-symbols-outlined absolute -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0" style="font-size:16px;">arrow_forward</span>
          </div>
        </a>
      </div>`;

const ctaReplace = `<a href="https://api.whatsapp.com/send?phone=919987382295" target="_blank" rel="noopener" class="group bg-black text-white border border-white/20 px-5 md:px-10 py-3.5 md:py-5 text-[9px] md:text-xs md:text-sm tracking-[0.2em] uppercase font-bold hover:bg-[#ffea00] hover:text-black hover:border-[#ffea00] hover:shadow-[0_0_20px_rgba(255,234,0,0.6)] transition-all duration-500 inline-flex items-center gap-3 btn-shine-trigger">
          Start a Project
          <div class="relative w-4 h-4 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span class="material-symbols-outlined absolute transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-6" style="font-size:16px;">arrow_forward</span>
            <span class="material-symbols-outlined absolute -translate-x-6 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0" style="font-size:16px;">arrow_forward</span>
          </div>
        </a>
        <p class="font-light text-zinc-500 text-sm md:text-base mt-6 text-left">
          20+ Projects &nbsp;&bull;&nbsp; 10+ happy clients &nbsp;&bull;&nbsp; 2+ years experience
        </p>
      </div>`;

if (content.includes(ctaFind)) {
  content = content.replace(ctaFind, ctaReplace);
  console.log('Added stats text directly');
} else {
  // If line endings are different
  const ctaFind2 = ctaFind.replace(/\n/g, '\r\n');
  const ctaReplace2 = ctaReplace.replace(/\n/g, '\r\n');
  if (content.includes(ctaFind2)) {
    content = content.replace(ctaFind2, ctaReplace2);
    console.log('Added stats text directly (CRLF)');
  } else {
    console.log('Could not find CTA block to replace');
  }
}

// Since flex direction is currently row (inline-flex), we need to ensure the container wraps or uses flex-col
const wrapperFind = '<div class="hero-slide-right relative z-10 flex items-center justify-start gap-10">';
const wrapperReplace = '<div class="hero-slide-right relative z-10 flex flex-col items-start justify-start gap-6">';
if (content.includes(wrapperFind)) {
  content = content.replace(wrapperFind, wrapperReplace);
}

fs.writeFileSync(path, content);
