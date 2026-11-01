import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Keeps the previously shipped static app (public/app) reachable at /app/ —
// the SPA fallback would otherwise answer that URL with the landing page.
const preservedAppRoute = () => {
  const rewrite = (req, _res, next) => {
    if (req.url === '/app' || req.url === '/app/') req.url = '/app/index.html'
    next()
  }
  return {
    name: 'preserved-app-route',
    configureServer(server) {
      server.middlewares.use(rewrite)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite)
    },
  }
}

export default defineConfig({
  plugins: [preservedAppRoute(), react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Bind-mounted sources in the sandbox: use polling so edits are picked up.
    watch: process.env.BASE44_PREVIEW_MODE === '1' ? { usePolling: true, interval: 400 } : undefined,
  },
})
