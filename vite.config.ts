import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows usage of process.env.API_KEY in the code
    'process.env': process.env
  }
});