const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Fix the button that didn't match because of gap-1 vs gap-0.5
  html = html.replace(
    '<button class="bg-transparent text-white hover:opacity-70 px-0 py-0 font-manrope text-[8px] tracking-[0.2em] uppercase transition-opacity flex items-center gap-1 cursor-pointer">',
    '<button class="mix-blend-difference bg-transparent text-white hover:opacity-70 px-0 py-0 font-manrope text-[8px] tracking-[0.2em] uppercase transition-opacity flex items-center gap-1 cursor-pointer">'
  );

  fs.writeFileSync(p, html, 'utf8');
}
console.log('Fixed button blend mode.');
