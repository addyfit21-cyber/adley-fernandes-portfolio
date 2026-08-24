const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("const section = document.getElementById('visual-identity');", "const section = document.getElementById('visual-identity') || document.createElement('div');");
html = html.replace("const workSections = document.querySelectorAll('.section-work');", "const workSections = document.querySelectorAll('.section-work');\nif(workSections.length === 0) { console.log('no sections'); }");
html = html.replace("Images/realistic_web_design.webp", "Images/experiencewelcome.com.png");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed');
