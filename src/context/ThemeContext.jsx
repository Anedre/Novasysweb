import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultTheme } from './themes';

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = 'novasys-color-mode';
const SEASONAL_STORAGE_KEY = 'novasys-seasonal-theme';
const BANNER_DISMISSED_KEY = 'novasys-banner-dismissed';

export function ThemeProvider({ children, seasonalTheme = null }) {
  const [colorMode, setColorMode] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [seasonal, setSeasonal] = useState(seasonalTheme || defaultTheme);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    return dismissed === seasonal?.id;
  });

  // Apply color mode to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
    localStorage.setItem(THEME_STORAGE_KEY, colorMode);

    // Backward compat with existing body.night class
    if (colorMode === 'dark') {
      document.body.classList.add('night');
      document.body.classList.remove('day');
    } else {
      document.body.classList.add('day');
      document.body.classList.remove('night');
    }
  }, [colorMode]);

  // Apply seasonal theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (seasonal && seasonal.id !== 'default') {
      root.style.setProperty('--theme-accent', seasonal.accent);
      root.style.setProperty('--theme-accent-hover', seasonal.accentHover);
      root.style.setProperty('--theme-accent-light', seasonal.accentLight);
      root.style.setProperty('--theme-accent-glow', seasonal.accentGlow);
    } else {
      root.style.removeProperty('--theme-accent');
      root.style.removeProperty('--theme-accent-hover');
      root.style.removeProperty('--theme-accent-light');
      root.style.removeProperty('--theme-accent-glow');
    }
  }, [seasonal]);

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setSeasonalTheme = useCallback((theme) => {
    setSeasonal(theme || defaultTheme);
    setBannerDismissed(false);
    localStorage.removeItem(BANNER_DISMISSED_KEY);
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, seasonal?.id || '');
  }, [seasonal]);

  const isDark = colorMode === 'dark';
  const showBanner = seasonal?.bannerEnabled && !bannerDismissed;

  const value = {
    colorMode,
    isDark,
    toggleColorMode,
    seasonal,
    setSeasonalTheme,
    showBanner,
    dismissBanner,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
