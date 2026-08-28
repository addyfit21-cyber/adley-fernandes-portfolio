// Shift hero image UP: change object-position from center 30% to center 70%
// Higher % = shows more of the bottom half = subject appears higher in frame
const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

// Fix both hero images
html = html.replace(
  /object-position:center 30%/g,
  'object-position:center 70%'
);

const count = (html.match(/object-position:center 70%/g) || []).length;
console.log('Updated to center 70%:', count, 'elements (should be 2)');

fs.writeFileSync(file, html, 'utf8');
console.log('Done!');
