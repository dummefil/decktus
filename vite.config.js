import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import { internalIpV4 } from "internal-ip";

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
  ],
  base: "./",
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? "0.0.0.0" : false,
    hmr: mobile
        ? {
          protocol: "ws",
          host: await internalIpV4(),
          port: 1421,
        }
        : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
})
