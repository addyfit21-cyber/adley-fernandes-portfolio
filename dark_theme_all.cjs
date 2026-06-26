const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

const splitMarker = '  <section id="about"';
const splitIndex = content.indexOf(splitMarker);

let before = content.substring(0, splitIndex);
let after = content.substring(splitIndex);

// Apply transformations to after
after = after.replace(/\bbg-zinc-50\b/g, 'bg-zinc-950');
after = after.replace(/\bbg-white\b/g, 'bg-black');
after = after.replace(/\bbg-zinc-100\b/g, 'bg-zinc-900');
after = after.replace(/\bbg-zinc-200\b/g, 'bg-white/10');

// Handle black background utility classes on white theme elements
after = after.replace(/\bbg-black\/5\b/g, 'bg-white/5');
after = after.replace(/\bbg-black\/10\b/g, 'bg-white/10');

after = after.replace(/\btext-zinc-900\b/g, 'text-white');
// Careful with text-black to text-white
after = after.replace(/\btext-black\b/g, 'text-white');
after = after.replace(/\btext-zinc-500\b/g, 'text-zinc-400');
after = after.replace(/\btext-zinc-600\b/g, 'text-zinc-300');

after = after.replace(/\bborder-zinc-100\b/g, 'border-white/10');
after = after.replace(/\bborder-zinc-200\b/g, 'border-white/10');

after = after.replace(/\bhover:bg-zinc-50\b/g, 'hover:bg-white/5');
after = after.replace(/\bhover:bg-black\/10\b/g, 'hover:bg-white/10');

// Handle specific borders and buttons
after = after.replace(/\bborder-b-2 border-white\b/g, 'border-b-2 border-white/50');
after = after.replace(/bg-black text-white hover:bg-zinc-800/g, 'bg-white text-black hover:bg-zinc-200');

fs.writeFileSync(path, before + after);
console.log('Applied global dark theme perfectly');
