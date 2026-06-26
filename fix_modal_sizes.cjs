const fs = require('fs');
const path = 'c:/Users/addyf/Downloads/adley-fernandes-portfolio-master (1)/adley-fernandes-portfolio-main/index.html';
let content = fs.readFileSync(path, 'utf8');

// Replace the image classes inside the modals
content = content.replace(
  /class="w-full max-w-none h-auto object-contain"/g,
  'class="w-[90%] md:w-[75%] max-w-5xl h-auto object-contain rounded-md shadow-2xl"'
);

fs.writeFileSync(path, content);
console.log('Fixed sketch sizes in modal');
