const fs = require('fs');

let sketches = fs.readFileSync('sketches.html', 'utf8');

const sketchesReplacement = `    <!-- Editorial Content — Dense Grid -->
    <div class="px-6 md:px-24 py-0 max-w-[1400px] mx-auto divide-y divide-white/10 border-t border-white/10">
      <!-- Challenge + Concept -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div class="py-5 md:py-10 md:pr-16">
          <p class="text-[10px] tracking-[0.3em] uppercase font-black text-white mb-4">01 / The Project</p>
          <h3 class="text-2xl md:text-4xl font-bold tracking-tighter leading-tight text-white mb-4">Exclusive Commission.</h3>
          <p class="text-[9px] md:text-[11px] leading-relaxed text-zinc-300 font-normal">A special commission for Porsche Mumbai to create highly detailed, custom automotive artwork that reflects the brand's iconic design.</p>
        </div>
        <div class="py-5 md:py-10 md:pl-16">
          <p class="text-[10px] tracking-[0.3em] uppercase font-black text-white mb-4">02 / Approach</p>
          <h3 class="text-2xl md:text-4xl font-bold tracking-tighter leading-tight text-white mb-4">Precision and quality.</h3>
          <p class="text-[9px] md:text-[11px] leading-relaxed text-zinc-300 font-normal">I prioritized intricate detailing and clean execution, making sure every line captured the essence of the vehicles.</p>
        </div>
      </div>
      <!-- Output + Result -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div class="py-5 md:py-10 md:pr-16">
          <p class="text-[10px] tracking-[0.3em] uppercase font-black text-white mb-6">03 / Output</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] uppercase tracking-[0.2em] text-white font-bold mb-1">Deliverables</p>
              <p class="text-[9px] md:text-[11px] leading-relaxed text-zinc-300">Custom automotive sketches on large A1 charts.</p>
            </div>
            <div>
              <p class="text-[10px] uppercase tracking-[0.2em] text-white font-bold mb-1">Medium</p>
              <p class="text-[9px] md:text-[11px] leading-relaxed text-zinc-300">Traditional hand-drawn sketching.</p>
            </div>
          </div>
        </div>
        <div class="py-5 md:py-10 md:pl-16">
          <p class="text-[10px] tracking-[0.3em] uppercase font-black text-white mb-4">04 / Results</p>
          <h3 class="text-xl md:text-2xl font-bold tracking-tighter leading-snug text-white mb-3">Client satisfaction.</h3>
          <p class="text-sm font-medium text-zinc-300">Successfully completed and delivered the bespoke A1 sketches, fully satisfying the client's expectations for both quality and timeline.</p>
        </div>
      </div>
    </div>
  </section>
</main>

    <!-- Services CTA Strip -->
    <div class="px-6 md:px-24 py-12 md:py-24 border-t border-white/10 bg-[#1B1717] text-center">
      <span class="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-bold mb-6 block">Start a Project</span>
      <h3 class="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter mb-6 md:mb-12 text-white">Let's build<br/>something iconic.</h3>
      <a class="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase font-bold border-b-2 border-zinc-900 pb-2 hover:opacity-50 text-white transition-all duration-300" href="contact.html">
        Start your project
        <span class="material-symbols-outlined" style="font-size:14px;">arrow_forward</span>
      </a>
    </div>

<!-- Footer -->
<footer id="site-footer" style="position: relative; width: 100%; overflow: hidden; background: #0d0a08;">

  <div id="footer-scene" style="position: relative; width: 100%;">

    <!-- ① BASE: Full sunset scenery — sets natural height of footer -->
    <img
      src="/Images/footer1.webp"
      alt=""
      aria-hidden="true"
      style="display: block; width: 100%; height: auto;"
    />

    <!-- ② TEXT: "addesign" — per-letter stretched rise, bottom-anchored -->
    <div
      id="footer-addesign-text"
      class="font-light md:font-[100]"
      style="
        position: absolute;
        top: 22%;
        left: 0;
        width: 100%;
        z-index: 2;
        pointer-events: none;
        text-align: center;
        line-height: 0.85;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: clamp(5rem, 24vw, 30rem);
        color: rgba(255, 255, 255, 0.97);
        letter-spacing: -0.02em;
        white-space: nowrap;
      "
    ><span class="footer-letter" style="animation-delay:0s">a</span><span class="footer-letter" style="animation-delay:0.1s">d</span><span class="footer-letter" style="animation-delay:0.2s">d</span><span class="footer-letter" style="animation-delay:0.3s">e</span><span class="footer-letter" style="animation-delay:0.4s">s</span><span class="footer-letter" style="animation-delay:0.5s">i</span><span class="footer-letter" style="animation-delay:0.6s">g</span><span class="footer-letter" style="animation-delay:0.7s">n</span></div>

    <!-- ③ FOREGROUND: Mountains + land (transparent sky) — sits on top of text -->
    <img
      src="/Images/Footer 2.webp"
      alt=""
      aria-hidden="true"
      style="
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center bottom;
        display: block;
        z-index: 3;
      "
    />
    <!-- OVERLAY: Gradient layer at the bottom to improve text visibility without covering the addesign text -->
    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 150px; background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent); z-index: 4; pointer-events: none;"></div>

    <!-- ④ LINKS: overlaid at bottom of the scene -->
    <div class="absolute bottom-0 left-0 w-full z-10 flex flex-col md:flex-row md:justify-between md:items-stretch px-4 pb-2 pt-4 md:py-6 md:px-10 gap-2 md:gap-0" id="footer-links-bar">

      <!-- === MOBILE LAYOUT (perfectly baseline aligned) === -->
      <div class="flex md:hidden flex-row justify-between items-end w-full">
        <!-- Left side -->
        <div class="flex flex-col items-start gap-1.5">
          <a href="/" class="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[10px] font-semibold text-white tracking-[0.08em] no-underline lowercase leading-none">addesign studio</a>
          <p class="font-manrope text-[8px] tracking-[0.15em] uppercase text-white/50 m-0 leading-[16px]">
            © 2024 addesign studio.<br/>All rights reserved.
          </p>
        </div>

        <!-- Right side -->
        <div class="flex flex-col items-end">
          <p class="font-manrope text-[8px] tracking-[0.15em] uppercase m-0 leading-[16px] text-right">
            <a href="#top" class="text-white font-bold no-underline hover:opacity-50">Top ↑</a> &nbsp;&nbsp;&nbsp; 
            <a href="contact.html" class="text-white/60 no-underline hover:text-white">Contact</a> &nbsp;&nbsp;&nbsp; 
            <a href="privacy-policy.html" class="text-white/60 no-underline hover:text-white">Privacy</a>
            <br/>
            <a href="https://www.linkedin.com/in/adley-fernandes-968688228/" target="_blank" rel="noopener" class="text-white/60 no-underline hover:text-white">LinkedIn</a> &nbsp;&nbsp;&nbsp; 
            <a href="https://twitter.com" target="_blank" rel="noopener" class="footer-twitter-link font-manrope text-[11px] tracking-[0.18em] uppercase text-white/60 no-underline transition-colors duration-300 hover:text-white">Twitter</a> &nbsp;&nbsp;&nbsp; 
            <a href="https://www.instagram.com/adleyfernz.10/" target="_blank" rel="noopener" class="font-manrope text-[11px] tracking-[0.18em] uppercase text-white/60 no-underline transition-colors duration-300 hover:text-white">Instagram</a>
          </p>
        </div>
      </div>

      <!-- === DESKTOP LAYOUT (original two-column) === -->`;

const pattern = /<!-- Editorial Content — Dense Grid -->\r?\n\s*<!-- === DESKTOP LAYOUT \(original two-column\) === -->/;

if (pattern.test(sketches)) {
  sketches = sketches.replace(pattern, sketchesReplacement);
  fs.writeFileSync('sketches.html', sketches, 'utf8');
  console.log('sketches.html successfully restored!');
} else {
  console.log('Regex did not match sketches.html');
}
