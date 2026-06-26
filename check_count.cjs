const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const splitMarker = '  <section id="about"';
const splitIndex = content.indexOf(splitMarker);
let after = content.substring(splitIndex);

console.log('Count of bg-white:', (after.match(/\bbg-white\b/g) || []).length);
console.log('Count of bg-black:', (after.match(/\bbg-black\b/g) || []).length);
