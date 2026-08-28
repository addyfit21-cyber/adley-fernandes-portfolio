const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  if (content.includes('<main class="pt-24 md:pt-32 w-full flex flex-col items-center bg-[#EDEBDD]">')) {
    content = content.replace('<main class="pt-24 md:pt-32 w-full flex flex-col items-center bg-[#EDEBDD]">', '<main class="relative z-0 pt-24 md:pt-32 w-full flex flex-col items-center bg-[#EDEBDD]">');
    changed = true;
  }
  const sectionRegex = /<section[^>]*class="w-full bg-\[#1B1717\][^>]*>/g;
  if (sectionRegex.test(content)) {
    content = content.replace(sectionRegex, match => match.replace('class="', 'class="relative z-0 '));
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
}
