import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-github-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/skytron-journal/',
})