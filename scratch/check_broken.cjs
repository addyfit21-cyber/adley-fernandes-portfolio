const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== CHECKING BROKEN PATHS & FILE SIZES ===');

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /(?:src|data-src|href)=["']([^"'#]+\.(png|jpg|jpeg|webp|mp4|mov|webm|svg))["']/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    if (raw.startsWith('http')) continue;
    const p1 = path.join('./public', raw.replace(/^\//, '').replace(/%20/g, ' '));
    const p2 = path.join('.', raw.replace(/^\//, '').replace(/%20/g, ' '));
    if (!fs.existsSync(p1) && !fs.existsSync(p2)) {
      console.log('MISSING [404] in ' + file + ' -> ' + raw);
    }
  }
});
