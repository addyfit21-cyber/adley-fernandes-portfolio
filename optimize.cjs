const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Velocity-Based Skewing block
const skewStart = '// --- 4. Velocity-Based Skewing';
if (content.includes(skewStart)) {
  const startIndex = content.indexOf(skewStart);
  // Find the end of the script before the final `});`
  content = content.replace(/\/\/ --- 4\. Velocity-Based Skewing[\s\S]*\}\);/g, '');
  console.log('Removed Velocity-Based Skewing');
}

// 2. Remove drop-shadow from rainbow-glow
content = content.replace('filter: drop-shadow(0 0 15px rgba(255, 180, 0, 0.6));', '/* filter removed for performance */');

// 3. Optional: let's also remove `transform: translateZ(0);` if it's there
content = content.replace('will-change: transform;\n    transform: translateZ(0);', 'will-change: transform;\n    transform: translate3d(0,0,0);');

fs.writeFileSync(path, content);
console.log('Performance optimizations applied');
