const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const startIdx = content.indexOf('  <section id="about"');
fs.writeFileSync('after_porsche.html', content.substring(startIdx));
