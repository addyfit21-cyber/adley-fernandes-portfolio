const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Fix tvb-brandbook.html links
const tvbPath = path.join(rootDir, 'tvb-brandbook.html');
let tvbHtml = fs.readFileSync(tvbPath, 'utf8');
tvbHtml = tvbHtml.replace('href="/#branding"', 'href="/#categories-grid"');
tvbHtml = tvbHtml.replace('href="/#benner-tea-co"', 'href="/#categories-grid"');
fs.writeFileSync(tvbPath, tvbHtml, 'utf8');

console.log('Fixed TVB brandbook links.');
