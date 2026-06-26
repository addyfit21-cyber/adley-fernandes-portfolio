const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Move CTA strip
const ctaRegex = /(    <!-- Services CTA Strip -->\r?\n    <div class="px-6 md:px-24 py-24 border-t border-zinc-100 bg-white text-center">[\s\S]*?<\/div>\r?\n\r?\n)/;
const ctaMatch = content.match(ctaRegex);
if (!ctaMatch) { console.log('CTA not found'); process.exit(1); }
let ctaBlock = ctaMatch[1];
content = content.replace(ctaBlock, '');

const footerRegex = /(<!-- Footer -->)/;
if (!content.match(footerRegex)) { console.log('Footer not found'); process.exit(1); }
content = content.replace(footerRegex, ctaBlock + '$1');

// 2. Move About section
const aboutRegex = /(  <section id="about" class="py-10 md:py-16 bg-zinc-50 border-y border-zinc-100 overflow-hidden">[\s\S]*?<\/section>\r?\n\r?\n)/;
const aboutMatch = content.match(aboutRegex);
if (!aboutMatch) { console.log('About not found'); process.exit(1); }
let aboutBlock = aboutMatch[1];
content = content.replace(aboutBlock, '');

const porscheRegex = /(  <!-- Porsche Mumbai Section -->[\s\S]*?  <\/section>\r?\n\r?\n)/;
const porscheMatch = content.match(porscheRegex);
if (!porscheMatch) { console.log('Porsche not found'); process.exit(1); }
let porscheBlock = porscheMatch[1];
content = content.replace(porscheBlock, porscheBlock + aboutBlock);

fs.writeFileSync(path, content);
console.log('Successfully rearranged sections');
