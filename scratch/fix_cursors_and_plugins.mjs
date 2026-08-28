import fs from 'fs';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const pluginsToAdd = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js" defer></script>
`;

for (let file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Add missing plugins if GSAP is there but ScrollTrigger is missing
  if (content.includes('gsap.min.js') && !content.includes('ScrollTrigger.min.js')) {
    content = content.replace(
      /<script src="[^"]*gsap\.min\.js"[^>]*><\/script>/,
      `$&${pluginsToAdd}`
    );
    changed = true;
  }

  // Remove inline cursor block
  const inlineCursorRegex = /\s*\/\/ --- 1\. Global Custom Cursor ---[\s\S]*?(?=\/\/ --- 2\. Interactive Marquee ---)/;
  if (inlineCursorRegex.test(content)) {
    content = content.replace(inlineCursorRegex, '\n\n    ');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
