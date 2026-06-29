const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// Helper to transform an HTML block
function makeDarkTheme(html) {
  let s = html;
  s = s.replace(/\bbg-zinc-50\b/g, 'bg-zinc-950');
  s = s.replace(/\bbg-white\b/g, 'bg-black');
  s = s.replace(/\bbg-zinc-100\b/g, 'bg-zinc-900');
  s = s.replace(/\bbg-zinc-200\b/g, 'bg-white/10');
  s = s.replace(/\btext-zinc-900\b/g, 'text-white');
  s = s.replace(/\btext-black\b/g, 'text-white');
  s = s.replace(/\btext-zinc-500\b/g, 'text-zinc-400');
  s = s.replace(/\btext-zinc-600\b/g, 'text-zinc-300');
  s = s.replace(/\bborder-zinc-100\b/g, 'border-white/10');
  s = s.replace(/\bborder-zinc-200\b/g, 'border-white/10');
  s = s.replace(/\bhover:bg-zinc-50\b/g, 'hover:bg-white/5');
  return s;
}

// 1. About Section
const aboutRegex = /(<section id="about"[\s\S]*?<\/section>)/;
content = content.replace(aboutRegex, (match) => makeDarkTheme(match));

// 2. CTA Strip
const ctaRegex = /(<div class="px-6 md:px-24 py-24 border-t border-zinc-100 bg-white text-center">[\s\S]*?<\/div>)/;
content = content.replace(ctaRegex, (match) => {
  return makeDarkTheme(match).replace('border-b-2 border-white', 'border-b-2 border-white/50');
});

// 3. Case Study Modal
const caseStudyRegex = /(<div id="case-study-modal"[\s\S]*?<\/div>\r?\n\r?\n<!-- Leave Testimonial Modal)/;
content = content.replace(caseStudyRegex, (match, p1) => {
  let s = makeDarkTheme(p1);
  return s;
});

// 4. Guidelines Modal
const guidelinesRegex = /(<div id="guidelines-modal"[\s\S]*?<\/div>\r?\n\r?\n\r?\n<script>)/;
content = content.replace(guidelinesRegex, (match, p1) => {
  let s = makeDarkTheme(p1);
  // Fix the share button which was bg-black text-white
  s = s.replace('bg-black text-white hover:bg-[#FA6B48]', 'bg-white text-black hover:bg-zinc-200');
  return s;
});

fs.writeFileSync(path, content);
console.log('Successfully applied dark theme to sections after Porsche');
