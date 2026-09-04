import fs from 'fs';
import path from 'path';

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

// The compiled CSS path - link to the vite-built one
const BUILT_CSS_LINK = `<link href="/dist.css" rel="stylesheet">`;
const CURSOR_CSS = `<link rel="stylesheet" href="/cursor.css">`;

for (const file of files) {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;

  // 1. Remove cdn.tailwindcss.com (with optional plugins query string)
  html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\s*/g, '');
  html = html.replace(/<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>\s*/g, '');

  // 2. Ensure the built CSS is referenced (add after first <link rel="stylesheet"> if not present)
  if (!html.includes('/dist.css')) {
    // Insert it right before </head>
    html = html.replace('</head>', `  ${BUILT_CSS_LINK}\n</head>`);
  }

  // 3. Fix the transitions.js: move it to BEFORE </body> and ensure it's not deferred
  //    First remove any existing transitions.js reference
  html = html.replace(/<script src="\/transitions\.js"[^>]*><\/script>\s*/g, '');
  //    Then inject it correctly before </body>
  html = html.replace('</body>', `  <script src="/transitions.js"></script>\n</body>`);

  if (html !== original) {
    fs.writeFileSync(filePath, html);
    console.log(`Fixed: ${file}`);
  } else {
    console.log(`Skipped (no change): ${file}`);
  }
}

console.log('Done!');
