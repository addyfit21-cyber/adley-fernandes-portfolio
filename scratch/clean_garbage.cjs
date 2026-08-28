const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
const text = fs.readFileSync(file, 'utf8');
const lines = text.split('\n');

// The garbage starts at line 864 (index 863) and ends at line 896 (index 895).
// We want to remove indices 863 to 895 (inclusive), which is 33 lines.
// Let's verify by checking line contents:
if (lines[863].includes('<!-- Formation 1 Text (Anchored Right) -->') && lines[895].includes('</div>')) {
  lines.splice(862, 35); // Remove lines 863 to 897
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log('Successfully cleaned garbage lines.');
} else {
  console.log('Lines did not match exactly, skipping.');
}
