import { BrandingConfig } from './branding.config';

/**
 * Default branding configuration for Vibe Kanban
 * 
 * This represents the original branding of the application.
 * Values are preserved here to enable easy switching between
 * default and custom branding.
 */
export const brandingConfig: BrandingConfig = {
  logo: {
    lightMode: '/vibe-kanban-logo.svg',
    darkMode: '/vibe-kanban-logo-dark.svg',
    alt: 'Vibe Kanban',
  },
  links: {
    discord: {
      url: 'https://discord.gg/AC4nwVtJM3',
      visible: true,
    },
    docs: {
      url: 'https://vibekanban.com/docs',
      visible: true,
    },
    support: {
      url: 'https://github.com/BloopAI/vibe-kanban/issues',
      visible: true,
    },
  },
  companyName: 'Vibe Kanban',
};
