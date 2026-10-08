import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vjepa-project-preview',
      apply: 'serve',
      configureServer(server) {
        // Match GitHub Pages directory URLs for the standalone public project page.
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next();
          const url = new URL(req.url, 'http://localhost');
          if (url.pathname === '/vjepa-policy') {
            res.writeHead(302, { Location: `/vjepa-policy/${url.search}` });
            return res.end();
          }
          if (url.pathname === '/vjepa-policy/') {
            req.url = `/vjepa-policy/index.html${url.search}`;
          }
          next();
        });
      },
    },
  ],
  base: '/',
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        publications: resolve(rootDir, 'publications/index.html'),
      },
    },
  },
})
