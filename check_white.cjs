const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const splitMarker = '  <section id="about"';
const splitIndex = content.indexOf(splitMarker);
let after = content.substring(splitIndex);

const lines = after.split('\n');
for(let i=0; i<lines.length; i++) {
  if (lines[i].match(/\bbg-white\b/)) {
    console.log(i, lines[i].trim());
  }
}
