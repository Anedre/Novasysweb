import Lottie from 'lottie-react';

/**
 * LottieIcon — reproduce una animación Lottie (JSON).
 * Listo para íconos de animatedicons.co: descargá el JSON del ícono, ponelo en
 * `src/assets/lottie/` e importalo → `<LottieIcon animationData={miIcono} size={48} />`.
 *
 * @param {object} animationData  JSON Lottie (import de un .json)
 * @param {number} size           lado en px (default 56)
 */
export default function LottieIcon({ animationData, size = 56, loop = true, className = '', style, ...props }) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay
      className={className}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
