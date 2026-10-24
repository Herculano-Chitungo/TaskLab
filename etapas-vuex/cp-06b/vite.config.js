import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// O navegador fala com o Vite (mesma origem) e o Vite repassa /api para o proxy
// local da IA. Assim não é preciso abrir CORS no servidor.
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: { '/api': 'http://127.0.0.1:3001' }
  }
})
