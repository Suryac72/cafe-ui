import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory
    assetsDir: 'assets', // Specify the assets directory
    sourcemap: true, // Enable source maps
    minify: 'terser', // Minify using Terser
  },
});
