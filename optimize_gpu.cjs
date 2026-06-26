const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// Remove will-change from .cube-mask
content = content.replace(/\.cube-mask \{\s+transform: translateZ\(0\);\s+will-change: transform;/g, '.cube-mask {\n    transform: translateZ(0);');

// Remove will-change from .hero-marquee
content = content.replace(/\.hero-marquee \{\s+will-change: transform;/g, '.hero-marquee {');

// Remove will-change from .rainbow-glow (we replaced the filter previously)
content = content.replace(/\/\* filter removed for performance \*\/\s+will-change: transform;/g, '/* filter removed for performance */');

// Remove will-change-transform from brand-carousel-track
content = content.replace('id="brand-carousel-track" class="flex whitespace-nowrap flex-nowrap will-change-transform"', 'id="brand-carousel-track" class="flex whitespace-nowrap flex-nowrap"');
content = content.replace('id="brand-carousel-track" class="flex whitespace-nowrap will-change-transform"', 'id="brand-carousel-track" class="flex whitespace-nowrap"');

// Optimize global transition polish
// Transitioning all elements' box-shadow, transform etc. on `a, button` can cause lag if many exist
content = content.replace(
  'transition-property: color, background-color, border-color, opacity, transform, box-shadow;',
  'transition-property: color, background-color, border-color, opacity;'
);

fs.writeFileSync(path, content);
console.log('Removed heavy will-change properties and optimized transitions');
