// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 👈 SOLUCIÓN para rutas relativas en Netlify
  plugins: [react()],
});
