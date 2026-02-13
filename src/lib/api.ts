/**
 * API Integration Layer
 * Combines Strapi API with fallback static data
 * Provides a unified interface for data fetching
 */

import {
  getServices as getStrapiServices,
  getEvents as getStrapiEvents,
  getHomePage as getStrapiHomePage,
  getNavigation as getStrapiNavigation,
  getFooter as getStrapiFooter,
  getQuote as getStrapiQuote,
  getServiceBySlug as getStrapiServiceBySlug,
  getEventBySlug as getStrapiEventBySlug,
  getStrapiImageUrl,
} from './strapi';

import {
  services as fallbackServices,
  events as fallbackEvents,
  homePageData as fallbackHomePage,
  navLinks as fallbackNavLinks,
  footerColumns as fallbackFooterColumns,
  quoteData as fallbackQuote,
} from './data';

import type {
  Service,
  ChurchEvent,
  HomePage,
  NavLink,
  FooterColumn,
  QuoteSection,
} from './types';

/**
 * Fetch services with fallback to static data
 */
export async function getServices(): Promise<Service[]> {
  try {
    const services = await getStrapiServices();

    // If Strapi returns data, use it
    if (services && services.length > 0) {
      return services;
    }

    // Otherwise, use fallback
    return fallbackServices;
  } catch (error) {
    console.warn('Using fallback services data:', error);
    return fallbackServices;
  }
}

/**
 * Fetch events with fallback to static data
 */
export async function getEvents(limit: number = 10): Promise<ChurchEvent[]> {
  try {
    const events = await getStrapiEvents(limit);

    // If Strapi returns data, use it
    if (events && events.length > 0) {
      return events;
    }

    // Otherwise, use fallback
    return fallbackEvents.slice(0, limit);
  } catch (error) {
    console.warn('Using fallback events data:', error);
    return fallbackEvents.slice(0, limit);
  }
}

/**
 * Fetch navigation with fallback to static data
 */
export async function getNavigation(): Promise<NavLink[]> {
  try {
    const navigation = await getStrapiNavigation();

    // If Strapi returns data, use it
    if (navigation && navigation.length > 0) {
      return navigation;
    }

    // Otherwise, use fallback
    return fallbackNavLinks;
  } catch (error) {
    console.warn('Using fallback navigation data:', error);
    return fallbackNavLinks;
  }
}

/**
 * Fetch footer with fallback to static data
 */
export async function getFooter(): Promise<FooterColumn[]> {
  try {
    const footer = await getStrapiFooter();

    // If Strapi returns data, use it
    if (footer && footer.length > 0) {
      return footer;
    }

    // Otherwise, use fallback
    return fallbackFooterColumns;
  } catch (error) {
    console.warn('Using fallback footer data:', error);
    return fallbackFooterColumns;
  }
}

/**
 * Fetch quote with fallback to static data
 */
export async function getQuote(): Promise<QuoteSection> {
  try {
    const quote = await getStrapiQuote();

    // If Strapi returns data, use it
    if (quote && quote.text) {
      return quote;
    }

    // Otherwise, use fallback
    return fallbackQuote;
  } catch (error) {
    console.warn('Using fallback quote data:', error);
    return fallbackQuote;
  }
}

/**
 * Fetch complete home page with fallback to static data
 */
export async function getHomePage(): Promise<HomePage> {
  try {
    const homePage = await getStrapiHomePage();

    // If Strapi returns data, use it
    if (homePage) {
      return homePage;
    }

    // Otherwise, use fallback
    return fallbackHomePage;
  } catch (error) {
    console.warn('Using fallback home page data:', error);
    return fallbackHomePage;
  }
}

/**
 * Fetch a single service by slug with fallback
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const service = await getStrapiServiceBySlug(slug);

    // If Strapi returns data, use it
    if (service) {
      return service;
    }

    // Try to find in fallback data
    const fallbackService = fallbackServices.find((s) => s.slug === slug);
    return fallbackService || null;
  } catch (error) {
    console.warn('Using fallback service data:', error);
    const fallbackService = fallbackServices.find((s) => s.slug === slug);
    return fallbackService || null;
  }
}

/**
 * Fetch a single event by slug with fallback
 */
export async function getEventBySlug(slug: string): Promise<ChurchEvent | null> {
  try {
    const event = await getStrapiEventBySlug(slug);

    // If Strapi returns data, use it
    if (event) {
      return event;
    }

    // Try to find in fallback data
    const fallbackEvent = fallbackEvents.find((e) => e.slug === slug);
    return fallbackEvent || null;
  } catch (error) {
    console.warn('Using fallback event data:', error);
    const fallbackEvent = fallbackEvents.find((e) => e.slug === slug);
    return fallbackEvent || null;
  }
}

// Re-export the image URL helper
export { getStrapiImageUrl };
