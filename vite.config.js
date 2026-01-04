import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  
  // Optimización de build
  build: {
    // Code splitting por chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - librerías externas
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-ui': ['swiper', 'keen-slider', 'react-slick'],
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          // Organizar assets por tipo
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Tamaño máximo de chunk (advertencia)
    chunkSizeWarningLimit: 500,
    // Minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    // Source maps solo en desarrollo
    sourcemap: false,
  },

  // Optimización de servidor de desarrollo
  server: {
    // Pre-bundling de dependencias
    warmup: {
      clientFiles: [
        './src/App.jsx',
        './src/router.jsx',
        './src/components/Home/Home.jsx',
      ],
    },
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-helmet-async',
    ],
  },
});

