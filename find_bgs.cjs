const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const porscheIdx = content.indexOf('<!-- Porsche Mumbai Section -->');
const afterPorsche = content.substring(porscheIdx);

const lightBgs = afterPorsche.match(/<(section|footer|div)[^>]*class=\"[^\"]*bg-(white|zinc-50|zinc-100|zinc-200)[^\"]*\"/g);
console.log('Light bgs:', lightBgs);
