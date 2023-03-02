import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // css模块化，文件以.module.[css|less|scss]结尾，否则不生效的
    modules: {
      /**
       * 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
       * 默认：'camelCaseOnly'。
       * 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
       * */
      localsConvention: 'dashesOnly'
    },
    // 指定传递给 CSS 预处理器的选项。
    preprocessorOptions: {
      // 预编译支持 less
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.tangbridal.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
