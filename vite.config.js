import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        portfolio: resolve(process.cwd(), 'portfolio.html'),
        about: resolve(process.cwd(), 'about.html'),
        services: resolve(process.cwd(), 'services.html'),
        contact: resolve(process.cwd(), 'contact.html'),
      },
    },
  },
});
