const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'old_index.html');

for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');

  // Add alignment classes to the dropdown menu so it doesn't overflow on mobile
  html = html.replace(
    /class="absolute top-full mt-4 w-40 bg-\[#EDEBDD\] border border-zinc-100 shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 flex flex-col p-2 z-\[101\] mix-blend-normal"/g,
    'class="absolute top-full mt-4 w-40 bg-[#EDEBDD] border border-zinc-100 shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 flex flex-col p-2 z-[101] mix-blend-normal -right-10 md:right-auto md:left-1/2 md:-translate-x-1/2"'
  );

  fs.writeFileSync(p, html, 'utf8');
}
console.log('Dropdown alignment fixed.');
