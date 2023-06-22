/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vitePugPlugin from 'vite-plugin-pug-transformer';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const locals = { name: "My Pug" }

export default defineConfig({
  cacheDir: '../../node_modules/.vite/components',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    vitePugPlugin({ pugLocals: locals }),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  base: './',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
