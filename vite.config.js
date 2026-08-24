import { resolve, extname } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';

const htmlFiles = readdirSync(process.cwd())
  .filter(file => extname(file) === '.html')
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(process.cwd(), file);
    return entries;
  }, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
