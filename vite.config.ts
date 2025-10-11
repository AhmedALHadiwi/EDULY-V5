import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: 'spa',
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      "/api/placeholder": {
        target: "https://via.placeholder.com",
        changeOrigin: true,
        rewrite: (path) => {
          const match = path.match(/^\/api\/placeholder\/(\d+)\/(\d+)$/);
          return match ? `/${match[1]}x${match[2]}` : path;
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
}));
