const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the floating-indicator-container div and add style="display: none !important;"
html = html.replace('id="floating-indicator-container"', 'id="floating-indicator-container" style="display: none !important;"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Hidden floating cube indicator');
