import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import lineClamp from '@tailwindcss/line-clamp';

export default defineConfig({
  plugins: [
    tailwindcss({
      config: {
        plugins: [lineClamp], // 👈 enable line-clamp here
      },
    }),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
