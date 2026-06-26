const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const porscheIdx = content.indexOf('<!-- Porsche Mumbai Section -->');
const afterPorsche = content.substring(porscheIdx);

const sections = [...afterPorsche.matchAll(/<section[^>]*id=\"([^\"]+)\"/g)];
console.log('Sections after porsche:', sections.map(m => m[1]));

// Wait, let's just find all sections that need to be made black:
// Everything from About section downwards.
// Let's modify the code directly here since we know what to change.
