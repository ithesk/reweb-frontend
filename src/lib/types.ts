// Strapi API Types

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface StrapiImageData {
  id: number;
  attributes: StrapiImage;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
}

// Service Types
export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: StrapiImage;
}

export interface ServiceData {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    image: {
      data: StrapiImageData;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Event Types
export interface ChurchEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  slug: string;
  image: StrapiImage;
}

export interface EventData {
  id: number;
  attributes: {
    title: string;
    description: string;
    date: string;
    displayDate: string;
    slug: string;
    image: {
      data: StrapiImageData;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Hero Section Types
export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: StrapiImage;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
}

// About Section Types
export interface AboutSection {
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: StrapiImage;
}

// Quote Section Types
export interface QuoteSection {
  text: string;
  reference: string;
}

// Footer Types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Home Page Types
export interface HomePage {
  hero: HeroSection;
  about: AboutSection;
  services: Service[];
  quote: QuoteSection;
  events: ChurchEvent[];
  footerColumns: FooterColumn[];
  navLinks: NavLink[];
}

// Strapi Single Type Response
export interface StrapiSingleTypeResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>;
}

// Navigation Response
export interface NavigationData {
  links: NavLink[];
}

// Footer Response
export interface FooterData {
  columns: FooterColumn[];
}

// Quote Response
export interface QuoteData {
  text: string;
  reference: string;
}

// Auth Types
export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Search Types
export interface SearchResult {
  id: number;
  title: string;
  description: string;
  slug: string;
  type: 'service' | 'event' | 'page';
  displayDate?: string;
}

export interface SearchResults {
  services: SearchResult[];
  events: SearchResult[];
  pages: SearchResult[];
}
