/**
 * Vite configuration for the Pigeon Plaza management game.
 *
 * - Dev:  `npm run dev`  → HMR-enabled server on http://localhost:3000
 * - Prod: `npm run build` → minified, chunked build in ./dist
 *
 * Phaser is a large (~1 MB) dependency, so the config pre-bundles it for
 * fast dev-server startup and isolates it in its own production chunk so
 * gameplay iterations don't bust the cached vendor chunks.
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the built game can be served from any sub-path
  // (e.g. a GitHub Pages project site) without rewriting asset URLs.
  base: './',

  resolve: {
    alias: {
      // `@/` maps to ./src so game modules can import without deep
      // relative paths (e.g. import { useGameStore } from '@/store/gameStore').
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    host: true, // allow testing the canvas on a phone over the local network
    port: 3000,
    strictPort: false,
    open: true,
    hmr: {
      overlay: true,
    },
  },

  preview: {
    host: true,
    port: 4173,
  },

  // Pre-bundle heavy dependencies so the dev server starts quickly and
  // HMR never re-parses the Phaser bundle on every save.
  optimizeDeps: {
    include: ['phaser', 'zustand', 'howler'],
  },

  build: {
    // es2020 covers all evergreen browsers and keeps Howler/Phaser happy
    // without forcing legacy syntax downgrades.
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    // Phaser alone exceeds Vite's default 500 kB chunk warning threshold,
    // so raise it rather than warning on every build.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Vendor code is split out so the game chunk stays small and the
        // phaser/zustand/howler chunks can be cached across releases.
        manualChunks: {
          phaser: ['phaser'],
          'game-vendor': ['zustand', 'howler'],
        },
      },
    },
  },
});