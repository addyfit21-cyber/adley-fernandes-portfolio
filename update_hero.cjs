const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the navbar to be strictly absolute
html = html.replace(/<nav id="main-nav" class="absolute md:fixed top-6 md:top-8 left-0 md:left-1\/2 md:-translate-x-1\/2 z-\[100\]/g, 
                    '<nav id="main-nav" class="absolute top-6 md:top-8 left-0 md:left-1/2 md:-translate-x-1/2 z-[100]');

// 2. Remove the Navbar GSAP scroll logic completely
const navJsStart = html.indexOf('// ⚡ Navbar Background on Desktop');
const navJsEnd = html.indexOf('})();', navJsStart) + 5;
if (navJsStart !== -1 && navJsEnd !== -1) {
    html = html.substring(0, navJsStart) + '/* Navbar scroll logic removed as it is now locked to hero */' + html.substring(navJsEnd);
}

// 3. Replace the entire hero section
const heroStart = html.indexOf('<section id="hero"');
const heroEnd = html.indexOf('</section>', heroStart) + 10;

const newHero = `
  <!-- NEW IMMERSIVE SHOWREEL HERO -->
  <section id="hero" class="w-full relative h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#1B1717]">
    <!-- Showreel Background Video -->
    <video src="/Images/web_dev/img_3693.mp4" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-70" style="object-position: center;"></video>
    
    <!-- Dark overlay for text contrast -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#1B1717]/60 via-[#1B1717]/30 to-[#1B1717]/80 z-10 pointer-events-none"></div>
    
    <!-- Content -->
    <div class="relative z-20 flex flex-col items-center justify-center text-center px-6 mt-16 md:mt-0 w-full">
      <p class="hero-stagger text-[9px] md:text-xs tracking-[0.4em] uppercase text-[#EDEBDD]/80 font-bold mb-6" style="opacity: 0; transform: translateY(20px);">Design Studio &mdash; 2024</p>
      
      <h1 class="hero-stagger text-[4.5rem] md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter text-[#EDEBDD] leading-[0.85] uppercase" style="opacity: 0; transform: translateY(20px);">
        Adesign<br/><span class="text-[#630000]">Studio.</span>
      </h1>
      
      <p class="hero-stagger mt-8 md:mt-12 text-sm md:text-lg text-[#EDEBDD]/80 font-light max-w-lg" style="opacity: 0; transform: translateY(20px);">
        Crafting premium digital experiences through branding, UI/UX design, and high-converting websites.
      </p>
      
      <div class="hero-stagger mt-12" style="opacity: 0; transform: translateY(20px);">
        <a href="https://api.whatsapp.com/send?phone=919987382295" target="_blank" rel="noopener" class="group bg-[#EDEBDD] text-[#1B1717] px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#630000] hover:text-[#EDEBDD] transition-all duration-500 inline-flex items-center gap-3 active:scale-95 hover:scale-105">
          Start a Project
          <span class="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-2" style="font-size:16px;">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>
`;

if (heroStart !== -1 && heroEnd !== -1) {
    html = html.substring(0, heroStart) + newHero + html.substring(heroEnd);
}

// 4. Add GSAP animation for the new hero-stagger elements
const setupScriptsStart = html.indexOf('// ⚡ Loader & Initial Setup ⚡');
if (setupScriptsStart !== -1) {
    const gsapAnim = `
    // Hero Elements Reveal
    gsap.to('.hero-stagger', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });
    `;
    html = html.replace('// ⚡ Loader & Initial Setup ⚡', '// ⚡ Loader & Initial Setup ⚡\n' + gsapAnim);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Hero and Navbar updated successfully.');
