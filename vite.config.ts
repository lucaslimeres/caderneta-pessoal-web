/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // JS e CSS com hash ficam em /_app (cache longo); /assets guarda as imagens e ícones de public/.
  build: { assetsDir: '_app' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
