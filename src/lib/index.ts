/**
 * Main export file for the lib directory
 * Provides convenient imports for all API and data functions
 */

// Export all types
export type {
  StrapiResponse,
  StrapiSingleTypeResponse,
  StrapiImage,
  StrapiImageData,
  NavLink,
  Service,
  ServiceData,
  ChurchEvent,
  EventData,
  HeroSection,
  AboutSection,
  QuoteSection,
  FooterLink,
  FooterColumn,
  HomePage,
  NavigationData,
  FooterData,
  QuoteData,
} from './types';

// Export unified API functions (recommended for use in components)
export {
  getServices,
  getEvents,
  getHomePage,
  getNavigation,
  getFooter,
  getQuote,
  getServiceBySlug,
  getEventBySlug,
  getStrapiImageUrl,
} from './api';

// Export static fallback data
export {
  navLinks,
  services,
  events,
  footerColumns,
  heroData,
  aboutData,
  quoteData,
  ctaData,
  homePageData,
  getFallbackData,
} from './data';

// Export direct Strapi functions (for advanced use cases)
export * as StrapiAPI from './strapi';
