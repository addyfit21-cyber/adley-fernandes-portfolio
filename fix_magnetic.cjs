const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "document.querySelectorAll('button, a.bg-black, a.bg-black, a.border').forEach(btn => {",
  "document.querySelectorAll('button, a.bg-black, a.bg-white, a.border, a[class*=\"px-\"], a[class*=\"bg-\"]').forEach(btn => {"
);

content = content.replace(
  "document.querySelectorAll('button, a.bg-black, a.bg-white, a.border').forEach(btn => {",
  "document.querySelectorAll('button, a.bg-black, a.bg-white, a.border, a[class*=\"px-\"], a[class*=\"bg-\"]').forEach(btn => {"
);

fs.writeFileSync(path, content);
console.log('Fixed magnetic button selector');
