import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: [
      "expensetracker-frontend-faxp.onrender.com", // ✅ your Render frontend domain
      "*.onrender.com"
    ]
  }
})
