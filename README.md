# 🚀 Novasysweb

Bienvenido a **Novasysweb**, un modelo inicial de una página web desarrollado con **React** y **Vite**.

## 📌 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

- **Node.js** (versión 14 o superior). Descárgalo desde [nodejs.org](https://nodejs.org/).
- **Git**. Descárgalo desde [git-scm.com](https://git-scm.com/).

Para verificar si ya los tienes instalados, ejecuta en la terminal:

```bash
node -v
git --version
```

## 🔧 Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Anedre/Novasysweb.git
   ```

2. **Accede al directorio del proyecto**:

   ```bash
   cd Novasysweb
   ```

3. **Instala las dependencias**:

   ```bash
   npm install
   ```

## 🚀 Uso

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Por defecto, la aplicación correrá en `http://localhost:5173`.

## 📂 Estructura del Proyecto

```
Novasysweb/
│── public/        # Archivos estáticos
│── src/           # Código fuente
│   ├── main.jsx   # Punto de entrada
│   ├── App.jsx    # Componente principal
│── index.html     # HTML base
│── package.json   # Dependencias y scripts
│── vite.config.js # Configuración de Vite
```

## 📜 Scripts Disponibles

Puedes ejecutar los siguientes comandos con `npm run <script>`:

- **`dev`**: Inicia el servidor de desarrollo.
- **`build`**: Genera los archivos optimizados para producción.
- **`preview`**: Previsualiza la aplicación construida.

## 🎨 Personalización

- Edita los archivos en la carpeta `src/` para modificar la lógica de la aplicación.
- En la carpeta `components` se encuentra cada seccion de la pagina web, junto con sus  archivos CSS y scripts.
- Cambia los estilos de fuente en `App.css` o `index.css` , tambien puedes editar los archivos CSS de la carpeta components.

## 🌍 Despliegue

Para preparar la aplicación para producción:

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos listos para ser alojados en cualquier servidor o servicio de hosting estático.

Para más detalles, revisa la [documentación oficial de Vite](https://vitejs.dev/guide/static-deploy.html).

---




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

