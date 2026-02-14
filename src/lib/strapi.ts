/**
 * Strapi API Client for Next.js 14+
 * Helper functions to fetch data from Strapi v5 REST API
 */

import type {
  StrapiResponse,
  StrapiSingleTypeResponse,
  StrapiImage,
  Service,
  ServiceData,
  ChurchEvent,
  EventData,
  HomePage,
  NavLink,
  FooterColumn,
  QuoteSection,
} from './types';

// Environment variables
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Generic fetch function for Strapi API
 * Handles authentication, query params, and error handling
 */
async function fetchAPI<T>(
  path: string,
  options: {
    params?: Record<string, string | number | boolean>;
    revalidate?: number;
  } = {}
): Promise<T> {
  const { params = {}, revalidate = 60 } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });

  const queryString = queryParams.toString();
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  // Build headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Strapi API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching from Strapi (${path}):`, error);
    throw error;
  }
}

/**
 * Get full URL for Strapi image
 * Handles both relative and absolute URLs
 */
export function getStrapiImageUrl(image: StrapiImage | null | undefined): string {
  if (!image || !image.url) {
    return '/images/placeholder.jpg';
  }

  // If URL is already absolute, return as is
  if (image.url.startsWith('http://') || image.url.startsWith('https://')) {
    return image.url;
  }

  // Otherwise, prepend STRAPI_URL
  return `${STRAPI_URL}${image.url}`;
}

/**
 * Transform Strapi service data to clean service object
 */
function transformService(serviceData: ServiceData): Service {
  return {
    id: serviceData.id,
    title: serviceData.attributes.title,
    description: serviceData.attributes.description,
    slug: serviceData.attributes.slug,
    image: serviceData.attributes.image.data?.attributes || {
      id: 0,
      url: '/images/placeholder.jpg',
      alternativeText: serviceData.attributes.title,
      width: 800,
      height: 600,
    },
  };
}

/**
 * Transform Strapi event data to clean event object
 */
function transformEvent(eventData: EventData): ChurchEvent {
  return {
    id: eventData.id,
    title: eventData.attributes.title,
    description: eventData.attributes.description,
    date: eventData.attributes.date,
    displayDate: eventData.attributes.displayDate,
    slug: eventData.attributes.slug,
    image: eventData.attributes.image.data?.attributes || {
      id: 0,
      url: '/images/placeholder.jpg',
      alternativeText: eventData.attributes.title,
      width: 800,
      height: 600,
    },
  };
}

/**
 * Fetch all services from Strapi
 * Returns array of services with populated images
 */
export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetchAPI<StrapiResponse<ServiceData[]>>('/services', {
      params: {
        'populate': 'image',
        'sort': 'createdAt:asc',
      },
      revalidate: 60,
    });

    return response.data.map(transformService);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Fetch events from Strapi
 * Returns array of upcoming events sorted by date
 */
export async function getEvents(limit: number = 10): Promise<ChurchEvent[]> {
  try {
    const response = await fetchAPI<StrapiResponse<EventData[]>>('/events', {
      params: {
        'populate': 'image',
        'sort': 'date:asc',
        'pagination[pageSize]': limit,
        'filters[date][$gte]': new Date().toISOString().split('T')[0],
      },
      revalidate: 60,
    });

    return response.data.map(transformEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Fetch navigation links from Strapi
 */
export async function getNavigation(): Promise<NavLink[]> {
  try {
    const response = await fetchAPI<StrapiSingleTypeResponse<{ links: NavLink[] }>>(
      '/navigation',
      {
        params: { 'populate': 'links' },
        revalidate: 60,
      }
    );

    return response.data.attributes.links || [];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
}

/**
 * Fetch footer data from Strapi
 */
export async function getFooter(): Promise<FooterColumn[]> {
  try {
    const response = await fetchAPI<StrapiSingleTypeResponse<{ columns: FooterColumn[] }>>(
      '/footer',
      {
        params: { 'populate[columns][populate]': 'links' },
        revalidate: 60,
      }
    );

    return response.data.attributes.columns || [];
  } catch (error) {
    console.error('Error fetching footer:', error);
    return [];
  }
}

/**
 * Fetch quote/verse from Strapi
 */
export async function getQuote(): Promise<QuoteSection | null> {
  try {
    const response = await fetchAPI<StrapiSingleTypeResponse<QuoteSection>>(
      '/quote',
      {
        revalidate: 60,
      }
    );

    return {
      text: response.data.attributes.text,
      reference: response.data.attributes.reference,
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

/**
 * Fetch home page data from Strapi
 * Returns complete home page with all sections populated
 */
export async function getHomePage(): Promise<HomePage | null> {
  try {
    const response = await fetchAPI<StrapiSingleTypeResponse<any>>(
      '/home-page',
      {
        params: {
          'populate[hero][populate]': 'backgroundImage',
          'populate[about][populate]': 'image',
          'populate[quote]': '*',
        },
        revalidate: 60,
      }
    );

    const attributes = response.data.attributes;

    // Fetch related data
    const [services, events, navLinks, footerColumns] = await Promise.all([
      getServices(),
      getEvents(3),
      getNavigation(),
      getFooter(),
    ]);

    return {
      hero: {
        title: attributes.hero?.title || '',
        subtitle: attributes.hero?.subtitle || '',
        backgroundImage: attributes.hero?.backgroundImage?.data?.attributes || {
          id: 0,
          url: '/images/hero-bg.jpg',
          alternativeText: 'Hero background',
          width: 1920,
          height: 1080,
        },
        ctaPrimary: attributes.hero?.ctaPrimary || { label: 'Conócelo', href: '#' },
        ctaSecondary: attributes.hero?.ctaSecondary || { label: 'Conéctate', href: '#' },
      },
      about: {
        label: attributes.about?.label || 'QUIÉNES SOMOS',
        title: attributes.about?.title || '',
        description: attributes.about?.description || '',
        ctaLabel: attributes.about?.ctaLabel || 'Conoce más',
        ctaHref: attributes.about?.ctaHref || '/nosotros',
        image: attributes.about?.image?.data?.attributes || {
          id: 0,
          url: '/images/about.jpg',
          alternativeText: 'About us',
          width: 800,
          height: 600,
        },
      },
      quote: {
        text: attributes.quote?.text || '',
        reference: attributes.quote?.reference || '',
      },
      services,
      events,
      navLinks,
      footerColumns,
    };
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}

/**
 * Fetch a single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetchAPI<StrapiResponse<ServiceData[]>>('/services', {
      params: {
        'populate': 'image',
        'filters[slug][$eq]': slug,
      },
      revalidate: 60,
    });

    if (response.data.length === 0) {
      return null;
    }

    return transformService(response.data[0]);
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<ChurchEvent | null> {
  try {
    const response = await fetchAPI<StrapiResponse<EventData[]>>('/events', {
      params: {
        'populate': 'image',
        'filters[slug][$eq]': slug,
      },
      revalidate: 60,
    });

    if (response.data.length === 0) {
      return null;
    }

    return transformEvent(response.data[0]);
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all service slugs for static generation
 */
export async function getServiceSlugs(): Promise<string[]> {
  try {
    const response = await fetchAPI<StrapiResponse<ServiceData[]>>('/services', {
      params: {
        'fields[0]': 'slug',
      },
      revalidate: 3600,
    });

    return response.data.map((service) => service.attributes.slug);
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}

/**
 * Get all event slugs for static generation
 */
export async function getEventSlugs(): Promise<string[]> {
  try {
    const response = await fetchAPI<StrapiResponse<EventData[]>>('/events', {
      params: {
        'fields[0]': 'slug',
      },
      revalidate: 3600,
    });

    return response.data.map((event) => event.attributes.slug);
  } catch (error) {
    console.error('Error fetching event slugs:', error);
    return [];
  }
}
