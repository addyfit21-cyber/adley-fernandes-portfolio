const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Change McLaren background from transparent to black
content = content.replace(
  '<section id="mclaren" class="w-full bg-transparent text-white overflow-x-hidden border-t border-white/10">',
  '<section id="mclaren" class="w-full bg-black text-white overflow-x-hidden border-t border-white/10">'
);

// 2. Fix McLaren Image container and change image to the 3rd sketch
const mclarenOldImageDiv = `<div class="w-full h-auto bg-zinc-900 overflow-hidden border border-white/10 p-4 md:p-10 mb-8">\r\n        <img src="Images/ART%20work/IMG_0213 (2).webp" class="w-full h-auto object-contain" alt="McLaren Sketch" loading="lazy" decoding="async">\r\n      </div>`;
const mclarenOldImageDivAlt = `<div class="w-full h-auto bg-zinc-900 overflow-hidden border border-white/10 p-4 md:p-10 mb-8">\n        <img src="Images/ART%20work/IMG_0213 (2).webp" class="w-full h-auto object-contain" alt="McLaren Sketch" loading="lazy" decoding="async">\n      </div>`;

const mclarenNewImageDiv = `<div class="w-full h-auto mb-8">\n        <img src="Images/ART%20work/IMG_9844 (2).webp" class="w-full h-auto object-contain" alt="McLaren Sketch" loading="lazy" decoding="async">\n      </div>`;

if (content.includes(mclarenOldImageDiv)) {
  content = content.replace(mclarenOldImageDiv, mclarenNewImageDiv);
} else {
  content = content.replace(mclarenOldImageDivAlt, mclarenNewImageDiv);
}

// 3. Fix Porsche Image container
const porscheOldImageDiv = `<div class="w-full h-auto bg-zinc-900 overflow-hidden border border-white/10 p-4 md:p-10 mb-8">\r\n        <img src="Images/ART%20work/IMG_0498.webp" class="w-full h-auto object-contain" alt="Porsche Sketch" loading="lazy" decoding="async">\r\n      </div>`;
const porscheOldImageDivAlt = `<div class="w-full h-auto bg-zinc-900 overflow-hidden border border-white/10 p-4 md:p-10 mb-8">\n        <img src="Images/ART%20work/IMG_0498.webp" class="w-full h-auto object-contain" alt="Porsche Sketch" loading="lazy" decoding="async">\n      </div>`;

const porscheNewImageDiv = `<div class="w-full h-auto mb-8">\n        <img src="Images/ART%20work/IMG_0498.webp" class="w-full h-auto object-contain" alt="Porsche Sketch" loading="lazy" decoding="async">\n      </div>`;

if (content.includes(porscheOldImageDiv)) {
  content = content.replace(porscheOldImageDiv, porscheNewImageDiv);
} else {
  content = content.replace(porscheOldImageDivAlt, porscheNewImageDiv);
}

fs.writeFileSync(path, content);
console.log('Successfully applied changes to McLaren and Porsche sections');
