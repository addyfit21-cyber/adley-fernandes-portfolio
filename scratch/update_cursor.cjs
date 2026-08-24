const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldStr = 'a, button, [role="button"], input, select, textarea, .cursor-pointer { cursor: none !important; }';
const newStr = '*, *::before, *::after { cursor: none !important; }';

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
}
