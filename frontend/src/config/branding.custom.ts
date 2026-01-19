import { BrandingConfig } from './branding.config';

/**
 * Custom XGMI branding configuration
 * 
 * This configuration replaces the default Vibe Kanban branding with
 * XGMI branding. To activate this, change the export in branding.config.ts
 * from './branding.default' to './branding.custom'.
 */
export const brandingConfig: BrandingConfig = {
  logo: {
    lightMode: '/xgmi_light_background.svg',
    darkMode: '/xgmi_dark_background.svg',
    alt: 'XGMI',
  },
  links: {
    discord: {
      url: 'https://discord.gg/AC4nwVtJM3',
      visible: false,
    },
    docs: {
      url: 'https://vibekanban.com/docs',
      visible: false,
    },
    support: {
      url: 'https://github.com/BloopAI/vibe-kanban/issues',
      visible: false,
    },
  },
  companyName: 'XGMI',
};
