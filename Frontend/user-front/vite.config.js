import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or whatever plugin you're using

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/EthioEvents/backend/controller',  // Exact base path to the folder containing paymentController.php
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Strips /api, so /api/paymentController.php → /paymentController.php
      },
    },
  },
});