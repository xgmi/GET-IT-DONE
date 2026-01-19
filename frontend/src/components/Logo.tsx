import { useTheme } from '@/components/ThemeProvider';
import { brandingConfig } from '@/config/branding.config';
import { ThemeMode } from 'shared/types';

export function Logo() {
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === ThemeMode.SYSTEM) {
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme.toLowerCase() as 'light' | 'dark';
  };

  const effectiveTheme = getEffectiveTheme();
  const logoSrc =
    effectiveTheme === 'dark'
      ? brandingConfig.logo.darkMode
      : brandingConfig.logo.lightMode;

  return (
    <img
      src={logoSrc}
      alt={brandingConfig.logo.alt}
      className="h-8 w-auto"
      style={{ maxWidth: '140px' }}
    />
  );
}
