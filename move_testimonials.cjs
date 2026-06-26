const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

const testStart = '<!-- Premium Testimonials Slider -->';
const testIdx = content.indexOf(testStart);
if (testIdx === -1) {
  console.log('Testimonials section not found');
  process.exit(1);
}

// Find the end of testimonials section
// It ends right before </main>
const testEndIdx = content.indexOf('</main>', testIdx);
if (testEndIdx === -1) {
  console.log('Testimonials section end not found');
  process.exit(1);
}

// Extract the testimonials section
const testBlock = content.substring(testIdx, testEndIdx);

// Remove the testimonials section from its current place
content = content.substring(0, testIdx) + content.substring(testEndIdx);

// Insert it right before the About section
const aboutStart = '  <section id="about"';
const aboutIdx = content.indexOf(aboutStart);
if (aboutIdx === -1) {
  console.log('About section not found');
  process.exit(1);
}

content = content.substring(0, aboutIdx) + testBlock + '\n\n' + content.substring(aboutIdx);

fs.writeFileSync(path, content);
console.log('Moved Testimonials section below Porsche successfully');
