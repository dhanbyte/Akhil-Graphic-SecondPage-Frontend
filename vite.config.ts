import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


export default defineConfig({
   resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },

  plugins: [
    tailwindcss(),

    react()],  // No need to manually include TailwindCSS here
  server: {
    host: '0.0.0.0',  // Allows external access
    port: 5174,        // Specify the port
    strictPort: true,  // Avoid switching ports
  },
});
