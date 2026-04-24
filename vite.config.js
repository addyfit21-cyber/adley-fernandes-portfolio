import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        portfolio: resolve(process.cwd(), 'portfolio.html'),
        contact: resolve(process.cwd(), 'contact.html'),
      },
    },
  },
});
