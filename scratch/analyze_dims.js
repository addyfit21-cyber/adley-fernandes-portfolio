import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with max-w-* classes
const maxWMatches = html.match(/max-w-[^\s"'>]+/g) || [];
const uniqueMaxW = [...new Set(maxWMatches)];

console.log("Max Width CSS Classes found in index.html:");
console.log(uniqueMaxW);

// Find height classes
const heightMatches = html.match(/(?:h-|min-h-|max-h-)[^\s"'>]+/g) || [];
const uniqueHeights = [...new Set(heightMatches)].slice(0, 30);
console.log("\nSample Height CSS Classes found in index.html:");
console.log(uniqueHeights);
