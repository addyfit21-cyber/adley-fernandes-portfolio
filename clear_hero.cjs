const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const heroStart = html.indexOf('<section id="hero"');
const heroEnd = html.indexOf('</section>', heroStart) + 10;

const newHero = `
  <!-- BLANK HERO SECTION (Animation removed per request) -->
  <section id="hero" class="w-full relative h-[100svh] bg-[#EDEBDD]">
    <!-- Intentionally left blank for now -->
  </section>
`;

if (heroStart !== -1 && heroEnd !== -1) {
    html = html.substring(0, heroStart) + newHero + html.substring(heroEnd);
}

// Remove the GSAP stagger animation script for the hero that we added
const animStart = html.indexOf('// Hero Elements Reveal');
if (animStart !== -1) {
    const animEnd = html.indexOf('});', animStart) + 3;
    html = html.substring(0, animStart) + html.substring(animEnd);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Hero section cleared out.');
