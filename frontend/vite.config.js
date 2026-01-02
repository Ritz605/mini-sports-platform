import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://backend:5000", // route API requests to backend in Docker
    },
  },
  
})
