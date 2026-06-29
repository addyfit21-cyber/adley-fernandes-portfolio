const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const splitToken = '    <div id="mobile-dropdown-menu" class="mt-4 w-[85vw]';

if (content.includes(splitToken)) {
  const parts = content.split(splitToken);
  
  if (!parts[0].includes('id="mobile-dropdown-btn"')) {
    const fixedMiddle = `    <a class="font-manrope text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-300" href="contact.html">Contact</a>
  </div>

  <!-- CTA -->
  <div class="hidden md:flex items-center z-10 pointer-events-auto">
    <a href="https://api.whatsapp.com/send?phone=919987382295" target="_blank" rel="noopener" class="bg-black text-white px-5 py-2 font-manrope text-[10px] tracking-[0.2em] uppercase hover:bg-[#FA6B48] transition-colors duration-500">
      Get in Touch
    </a>
  </div>

  <!-- Floating Mobile Menu -->
  <div class="md:hidden fixed top-6 right-6 z-[120] flex flex-col items-end pointer-events-none">
    <!-- Button with Difference Blend -->
    <button id="mobile-dropdown-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-manrope text-[9px] tracking-widest uppercase font-bold transition-all duration-300 shadow-xl pointer-events-auto" style="mix-blend-mode: difference; background-color: #fff; color: #000;">
      <span>Menu</span>
      <span class="material-symbols-outlined text-[12px] transition-transform duration-300" id="mobile-dropdown-arrow">expand_more</span>
    </button>

    <!-- Dropdown Card -->
    <div id="mobile-dropdown-menu" class="mt-4 w-[85vw]`;
    
    content = parts[0] + fixedMiddle + parts[1];
    fs.writeFileSync('index.html', content);
    console.log('Successfully restored UI elements');
  } else {
    console.log('Button already exists');
  }
}
