const fs = require('fs');
const files = ['index.html', 'contact.html', 'about.html', 'services.html'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/"\/ loading="lazy"/g, '" loading="lazy"');
  c = c.replace(/loading="lazy"\/ decoding="async"/g, 'loading="lazy" decoding="async"');
  fs.writeFileSync(f, c);
});
console.log('Fixed tags');
