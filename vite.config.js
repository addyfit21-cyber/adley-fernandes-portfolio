import { resolve, extname } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';

// Force Vite to open Google Chrome by default
process.env.BROWSER = 'chrome';

const htmlFiles = readdirSync(process.cwd())
  .filter(file => extname(file) === '.html')
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(process.cwd(), file);
    return entries;
  }, {});

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
