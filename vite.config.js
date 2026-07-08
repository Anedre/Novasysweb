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
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // Todo el runtime de React (+ react-helmet, que se acopla a React vía
            // context) DEBE ir junto y cargarse primero. Fragmentarlo en chunks
            // separados rompe el orden de init en producción:
            //  - 'react' core sin chunk → "Cannot set properties of undefined (setting 'Children')"
            //  - react-helmet en su propio chunk → "Cannot access 'a' before initialization" (TDZ)
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/scheduler/') ||
              id.includes('node_modules/react-is/') ||
              id.includes('node_modules/use-sync-external-store/') ||
              id.includes('node_modules/react-helmet-async/') ||
              id.includes('node_modules/react-fast-compare/') ||
              id.includes('node_modules/invariant/') ||
              id.includes('node_modules/shallowequal/')
            ) return 'vendor-react';
            if (id.includes('framer-motion') || id.includes('gsap')) return 'vendor-animation';
            if (id.includes('chart.js') || id.includes('react-chartjs')) return 'vendor-charts';
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor-maps';
            if (id.includes('swiper') || id.includes('keen-slider') || id.includes('react-slick')) return 'vendor-ui';
            if (id.includes('react-icons')) return 'vendor-icons';
          }
          // Design system as shared chunk
          if (id.includes('src/design-system/')) return 'design-system';
          // Shared data files
          if (id.includes('src/data/')) return 'app-data';
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
        './src/pages/HomePage.jsx',
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

