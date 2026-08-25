const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes('Adesign%20logo%20colour-01.png')) {
    content = content.replace(/Adesign%20logo%20colour-01\.png/g, 'Adesign%20logo%20colour-01.webp');
    changed = true;
  }
  if (content.includes('Adesign logo colour-01.png')) {
    content = content.replace(/Adesign logo colour-01\.png/g, 'Adesign logo colour-01.webp');
    changed = true;
  }
  if (content.includes('contact_workspace.png')) {
    content = content.replace(/contact_workspace\.png/g, 'contact_workspace.webp');
    changed = true;
  }
  if (content.includes('footer1.png')) {
    content = content.replace(/footer1\.png/g, 'footer1.webp');
    changed = true;
  }
  if (content.includes('Footer 2.png')) {
    content = content.replace(/Footer 2\.png/g, 'Footer 2.webp');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
