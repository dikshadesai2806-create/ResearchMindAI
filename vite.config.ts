import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/index.css';
            }
            return 'assets/[name].[ext]';
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'sync-github-pages-artifacts',
        closeBundle() {
          const rootDir = process.cwd();
          const distDir = path.resolve(rootDir, 'dist');
          const distIndexPath = path.resolve(distDir, 'index.html');
          const distNotFoundPath = path.resolve(distDir, '404.html');
          const rootNotFoundPath = path.resolve(rootDir, '404.html');

          // 1. Create 404 fallback for SPAs
          if (fs.existsSync(distIndexPath)) {
            fs.copyFileSync(distIndexPath, distNotFoundPath);
            fs.copyFileSync(distIndexPath, rootNotFoundPath);
          }

          // 2. Mirror dist/assets to root /assets so GitHub Pages "main / (root)" works immediately
          const distAssetsDir = path.resolve(distDir, 'assets');
          const rootAssetsDir = path.resolve(rootDir, 'assets');
          if (fs.existsSync(distAssetsDir)) {
            if (!fs.existsSync(rootAssetsDir)) {
              fs.mkdirSync(rootAssetsDir, { recursive: true });
            }
            fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
          }

          // 3. Mirror dist to root /docs in case user configured GitHub Pages source as /docs
          const docsDir = path.resolve(rootDir, 'docs');
          if (fs.existsSync(distDir)) {
            fs.cpSync(distDir, docsDir, { recursive: true });
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
