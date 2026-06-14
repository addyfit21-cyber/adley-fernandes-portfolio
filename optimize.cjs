const fs = require('fs');

const filesToOptimize = ['index.html', 'portfolio.html', 'about.html', 'contact.html', 'services.html'];

filesToOptimize.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    let updatedHtml = html.replace(/<img\s+([^>]+)>/gi, (match, attrs) => {
      let newAttrs = attrs;
      if (!newAttrs.includes('loading=')) newAttrs += ' loading="lazy"';
      if (!newAttrs.includes('decoding=')) newAttrs += ' decoding="async"';
      return '<img ' + newAttrs + '>';
    });
    fs.writeFileSync(file, updatedHtml);
    console.log('Optimized ' + file);
  }
});
