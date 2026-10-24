import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // BLOCO 6: aqui entra o bloco server.proxy, que repassa tudo que começa com /api para o proxy
  // local da IA.
  plugins: [vue()]
})
