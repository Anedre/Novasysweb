import { useTheme } from '../../../context/ThemeContext';
import styles from './SeasonalBanner.module.css';

export default function SeasonalBanner() {
  const { seasonal, showBanner, dismissBanner } = useTheme();

  if (!showBanner) return null;

  return (
    <div
      className={styles.banner}
      style={{
        background: seasonal.bannerBg,
        color: seasonal.bannerTextColor || '#FFFFFF',
      }}
    >
      <span className={styles.text}>{seasonal.bannerText}</span>
      <button className={styles.close} onClick={dismissBanner} aria-label="Cerrar banner">
        &times;
      </button>
    </div>
  );
}
