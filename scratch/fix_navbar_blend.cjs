const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // 1. Remove mix-blend-difference from the parent navbar div
  html = html.replace(
    'class="flex flex-row items-center gap-2 md:gap-4 pointer-events-auto mix-blend-difference fixed',
    'class="flex flex-row items-center gap-2 md:gap-4 pointer-events-auto fixed'
  );

  // 2. Add mix-blend-difference to the top-level links and button
  // We can do this by finding the specific text of the links and button and inserting the class
  
  // Index link
  html = html.replace(
    '<a href="/" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Index</a>',
    '<a href="/" class="mix-blend-difference font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Index</a>'
  );
  
  // Projects button
  html = html.replace(
    '<button class="bg-transparent text-white hover:opacity-70 px-0 py-0 font-manrope text-[8px] tracking-[0.2em] uppercase transition-opacity flex items-center gap-0.5 cursor-pointer">',
    '<button class="mix-blend-difference bg-transparent text-white hover:opacity-70 px-0 py-0 font-manrope text-[8px] tracking-[0.2em] uppercase transition-opacity flex items-center gap-0.5 cursor-pointer">'
  );

  // About link
  html = html.replace(
    '<a href="index.html#about" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">About</a>',
    '<a href="index.html#about" class="mix-blend-difference font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">About</a>'
  );

  // Contact link
  html = html.replace(
    '<a href="contact.html" class="font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Contact</a>',
    '<a href="contact.html" class="mix-blend-difference font-manrope text-[8px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity">Contact</a>'
  );

  // 3. Remove mix-blend-normal from the dropdown
  html = html.replace(
    'transition-all duration-300 flex flex-col p-2 z-[101] mix-blend-normal',
    'transition-all duration-300 flex flex-col p-2 z-[101]'
  );

  fs.writeFileSync(p, html, 'utf8');
}

console.log('Fixed mix-blend-difference on all navbar elements.');
