/**
 * Branding configuration interface
 * 
 * This file defines the structure for customizing the application's branding.
 * To create a white-label fork, create a branding.custom.ts file and export
 * your custom configuration from this file instead of the default.
 */

export interface BrandingConfig {
  logo: {
    lightMode: string;
    darkMode: string;
    alt: string;
  };
  links: {
    discord?: {
      url: string;
      visible: boolean;
    };
    docs?: {
      url: string;
      visible: boolean;
    };
    support?: {
      url: string;
      visible: boolean;
    };
  };
  companyName: string;
}

// Default export - change this import to use custom branding
// Use './branding.default' for original Vibe Kanban branding
// Use './branding.custom' for XGMI branding
export { brandingConfig } from './branding.custom';
