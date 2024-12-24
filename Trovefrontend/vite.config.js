import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vite.dev/config/

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base:'/',
  build:{
    outDir:'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  
 
})
