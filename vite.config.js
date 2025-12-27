import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__currentDir, 'index.html'),
        services: resolve(__currentDir, 'services.html'),
        villages: resolve(__currentDir, 'villages.html'),
        actualites: resolve(__currentDir, 'actualites.html'),
        apropos: resolve(__currentDir, 'apropos.html'),
        contact: resolve(__currentDir, 'contact.html'),
        maire: resolve(__currentDir, 'maire.html'),
        
      },
    },
  },
});