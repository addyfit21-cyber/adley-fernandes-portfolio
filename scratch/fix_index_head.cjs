const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Find the second '<!DOCTYPE html>'
const firstIndex = content.indexOf('<!DOCTYPE html>');
const secondIndex = content.indexOf('<!DOCTYPE html>', firstIndex + 1);

if (secondIndex !== -1) {
  content = content.substring(secondIndex);
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('Successfully trimmed duplicate head from index.html');
} else {
  console.log('Only one DOCTYPE found');
}
