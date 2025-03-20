import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // Cho phép Vite sử dụng process.env (default là không mà phải dùng import.meta.env)
  define: {
    'process.env': process.env
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '~': '/src'
    }
  }
})
