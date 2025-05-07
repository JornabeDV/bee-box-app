import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    hmr: {
      overlay: false
    },
    fs: {
      allow: ['..']
    },
    port: 5173,
    strictPort: true,
    host: true
  },  
  ssr: {
    external: ['@prisma/client'],
  }
});
