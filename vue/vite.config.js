// configuracao do vite, so pra ele entender os arquivos .vue
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true
  }
})
