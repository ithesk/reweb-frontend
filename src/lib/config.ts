/**
 * Configuration file for Strapi integration
 * Centralized place to manage API settings and cache behavior
 */

export const strapiConfig = {
  // API URLs
  url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN,

  // Revalidation times (in seconds)
  revalidation: {
    services: 60,          // 1 minute
    events: 60,            // 1 minute
    navigation: 3600,      // 1 hour
    footer: 3600,          // 1 hour
    quote: 3600,           // 1 hour
    homePage: 60,          // 1 minute
  },

  // Default pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // Image settings
  images: {
    defaultFormat: 'medium',
    fallbackImage: '/images/placeholder.jpg',
    quality: 80,
  },

  // Feature flags
  features: {
    useFallbackData: true,      // Enable fallback to static data
    logErrors: true,             // Log errors to console
    deepPopulation: true,        // Enable deep population of relations
  },

  // API endpoints
  endpoints: {
    services: '/services',
    events: '/events',
    navigation: '/navigation',
    footer: '/footer',
    quote: '/quote',
    homePage: '/home-page',
  },
} as const;

/**
 * Helper to check if Strapi is configured
 */
export function isStrapiConfigured(): boolean {
  return Boolean(strapiConfig.url && strapiConfig.url !== 'http://localhost:1337');
}

/**
 * Helper to get full API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${strapiConfig.url}/api${endpoint}`;
}

/**
 * Helper to check if we should use fallback data
 */
export function shouldUseFallback(): boolean {
  return strapiConfig.features.useFallbackData;
}
