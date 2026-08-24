const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
const content = fs.readFileSync(filePath, 'utf8');

// Replace the literal "\n" that was accidentally written with actual newlines
// Wait, if I did `lines.join('\\n')`, then the literal backslash followed by 'n' is what's in the file.
const fixedContent = content.split('\\n').join('\n');

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed newlines in index.html');
