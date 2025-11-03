import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // ✅ Allow local network / localhost
    port: 5173,
  },
  preview: {
    host: true,       // ✅ Required for Render
    port: 10000,      // ✅ Same as Render preview port
    allowedHosts: ["*.onrender.com"], // ✅ Allow Render domain
  },
});
