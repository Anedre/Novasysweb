# Íconos Lottie

Animaciones Lottie (JSON) que consume `<LottieIcon>` (`src/components/interactive/LottieIcon.jsx`, basado en `lottie-react`).

## Agregar un ícono de animatedicons.co
1. En https://animatedicons.co elegí un ícono → **Download** → formato **Lottie (JSON)**.
2. Guardá el `.json` en esta carpeta (`src/assets/lottie/`).
3. Usalo en cualquier página:
   ```jsx
   import LottieIcon from '../components/interactive/LottieIcon';
   import miIcono from '../assets/lottie/mi-icono.json';

   <LottieIcon animationData={miIcono} size={48} />
   ```

`orbit.json` es un demo hecho a mano (punto rojo orbitando un anillo dorado), usado en la sección
newsletter de `/eventos`. Reemplazable por cualquier ícono de animatedicons.co.
