const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');
const servicesRegex = /(  <!-- Capabilities & Services - Sticky Scroll -->[\s\S]*?<\/section>\s*<section id="services-details" class="bg-zinc-950 relative z-20">[\s\S]*?<\/section>\s*)/;
const match = content.match(servicesRegex);
if (!match) { console.log('Services section not found'); process.exit(1); }
let servicesBlock = match[1];

content = content.replace(servicesBlock, '');

servicesBlock = servicesBlock.replace(/bg-zinc-950/g, 'bg-white');
servicesBlock = servicesBlock.replace(/bg-black/g, 'bg-zinc-50');
servicesBlock = servicesBlock.replace(/bg-zinc-900/g, 'bg-zinc-100');

servicesBlock = servicesBlock.replace(/text-white/g, 'text-zinc-900');
servicesBlock = servicesBlock.replace(/text-zinc-400/g, 'text-zinc-500');
servicesBlock = servicesBlock.replace(/text-zinc-300/g, 'text-zinc-600');

servicesBlock = servicesBlock.replace(/border-white\/10/g, 'border-zinc-100');
servicesBlock = servicesBlock.replace(/border-white/g, 'border-zinc-900');

servicesBlock = servicesBlock.replace(/group bg-white text-black/g, 'group bg-black text-white');
servicesBlock = servicesBlock.replace(/hover:bg-zinc-200/g, 'hover:bg-zinc-800');

servicesBlock = servicesBlock.replace(/ opacity-80 mix-blend-lighten/g, '');

const carouselRegex = /(  <!-- Brand Carousel Section -->[\s\S]*?<\/section>\s*)/;
const carouselMatch = content.match(carouselRegex);
if (!carouselMatch) { console.log('Carousel not found'); process.exit(1); }

content = content.replace(carouselMatch[0], carouselMatch[0] + servicesBlock);

fs.writeFileSync('c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html', content);
console.log('Successfully wrote index.html');
