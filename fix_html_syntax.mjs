import fs from 'fs';
import path from 'path';

const htmlFilesDir = process.cwd();
const files = fs.readdirSync(htmlFilesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(htmlFilesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Fix the invalid slash placement caused by previous regex
  html = html.replace(/\/\s*decoding="async"/g, 'decoding="async"');
  
  fs.writeFileSync(filePath, html);
  console.log(`Fixed ${file}`);
}
