import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change interval to 4 seconds
html = html.replace('var INTERVAL = 5000;', 'var INTERVAL = 4000;');

// 2. Remove scroll hint
const scrollHintRegex = /<!-- ── Scroll hint — right edge, horizontal text ── -->[\s\S]*?<\/svg>[\s\S]*?Scroll to explore<\/span>\s*<\/div>/;
if (scrollHintRegex.test(html)) {
  html = html.replace(scrollHintRegex, '');
  console.log('✓ Scroll hint removed.');
} else {
  console.log('✗ Scroll hint not found.');
}

fs.writeFileSync('index.html', html);
console.log('✓ Patch applied.');
