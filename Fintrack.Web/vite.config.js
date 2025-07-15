import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    server: {
      port: parseInt(env.VITE_PORT),
      proxy: {
        '/api': {
          target: env.services__api__https__0 || 'http://localhost:3000', // Fallback to localhost if env is not set
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
          secure: false, // Disable SSL verification for self-signed certificates
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
