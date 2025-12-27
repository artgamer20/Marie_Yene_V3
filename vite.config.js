import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        villages: resolve(__dirname, 'villages.html'),
        actualites: resolve(__dirname, 'actualites.html'),
        apropos: resolve(__dirname, 'apropos.html'),
        contact: resolve(__dirname, 'contact.html'),
        maire: resolve(__dirname, 'maire.html'),
      },
    },
  },
});