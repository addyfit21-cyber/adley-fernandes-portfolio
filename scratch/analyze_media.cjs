const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /(?:src|data-src|href)=["']([^"']+\.(png|jpg|jpeg|webp|mp4|mov|webm))["']/gi;
  let match;
  console.log('=== ' + file + ' ===');
  while ((match = regex.exec(content)) !== null) {
    const raw = match[1];
    let localPath = path.join('./public', raw.replace(/^\//, '').replace(/%20/g, ' '));
    let size = 0;
    if (fs.existsSync(localPath)) {
      size = fs.statSync(localPath).size;
    } else {
      localPath = path.join('.', raw.replace(/^\//, '').replace(/%20/g, ' '));
      if (fs.existsSync(localPath)) {
        size = fs.statSync(localPath).size;
      }
    }
    if (size > 100 * 1024) { // > 100 KB
      console.log('  ' + (size / 1024).toFixed(1) + ' KB : ' + raw + (size > 1024*1024 ? ' [CRITICAL >1MB]' : ''));
    }
  }
});
