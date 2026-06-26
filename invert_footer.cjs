const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

const splitMarker = '<!-- Premium Testimonials Slider -->';
const splitIndex = content.indexOf(splitMarker);
if (splitIndex === -1) {
  console.log('Split marker not found');
  process.exit(1);
}

// Wait, the About section was placed after Porsche. But wait, I put it AFTER Porsche. 
// Did I put it before Premium Testimonials Slider?
// Let's check where About is.
