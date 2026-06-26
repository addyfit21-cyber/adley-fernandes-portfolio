const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS animations inside <style>
const cssAnimations = `
  @keyframes scroll-marquee {
    from { transform: translateX(0%); }
    to { transform: translateX(-50%); }
  }
  @keyframes scroll-marquee-reverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0%); }
  }
  .css-marquee {
    animation: scroll-marquee 65s linear infinite;
  }
  .css-marquee-reverse {
    animation: scroll-marquee-reverse 18s linear infinite;
  }
`;

if (!content.includes('css-marquee-reverse')) {
  content = content.replace('</style>', cssAnimations + '\n</style>');

  // 2. Remove inline styles from brand-carousel-track and add css-marquee-reverse
  content = content.replace(
    '<div id="brand-carousel-track" class="flex w-max items-center" style="will-change: transform; transform: translateZ(0); backface-visibility: hidden;">',
    '<div id="brand-carousel-track" class="flex w-max items-center css-marquee-reverse">'
  );
  
  content = content.replace(
    '<div id="brand-carousel-track" class="flex whitespace-nowrap" style="will-change: transform; transform: translateZ(0); backface-visibility: hidden;">',
    '<div id="brand-carousel-track" class="flex whitespace-nowrap css-marquee-reverse">'
  );
  
  // 3. Add css-marquee to hero-marquee
  content = content.replace(/class="hero-marquee flex items-center min-w-max"/g, 'class="hero-marquee flex items-center min-w-max css-marquee"');
  content = content.replace(/class="hero-marquee flex items-center min-w-max rainbow-glow"/g, 'class="hero-marquee flex items-center min-w-max rainbow-glow css-marquee"');
  
  // 4. Remove GSAP animations for marquees from JS
  content = content.replace(/\/\/ --- 2\. Interactive Marquee ---[\s\S]*?force3D: true\s*\}\);\s*\}/g, '// --- 2. Interactive Marquee --- (Handled by CSS)');
  content = content.replace(/\/\/ --- 2\.5 Brand Carousel Interactive Scrolling ---[\s\S]*?force3D: true\s*\}\s*\);\s*\}/g, '// --- 2.5 Brand Carousel Interactive Scrolling --- (Handled by CSS)');
  
  fs.writeFileSync('index.html', content);
  console.log('Converted marquees to pure CSS');
} else {
  console.log('Already converted');
}
