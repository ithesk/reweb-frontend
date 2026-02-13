/**
 * Static fallback data for the church website
 * Used when Strapi is not available or as default values
 * All data matches the Strapi TypeScript interfaces
 */

import type {
  NavLink,
  Service,
  ChurchEvent,
  FooterColumn,
  HeroSection,
  AboutSection,
  QuoteSection,
  HomePage,
} from './types';

// Navigation Links
export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Grupos', href: '/grupos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' },
];

// Services Data
export const services: Service[] = [
  {
    id: 1,
    title: 'Servicios Dominicales',
    description:
      'Cada domingo celebramos juntos con alabanza, oración y la Palabra de Dios en un lugar lleno de fe y esperanza.',
    slug: 'servicios-dominicales',
    image: {
      id: 1,
      url: '/images/servicios.jpg',
      alternativeText: 'Servicios Dominicales',
      width: 800,
      height: 600,
    },
  },
  {
    id: 2,
    title: 'Grupos de Vida',
    description:
      'Conecta con otros creyentes en grupos pequeños donde compartimos, crecemos y nos apoyamos mutuamente.',
    slug: 'grupos-de-vida',
    image: {
      id: 2,
      url: '/images/grupos.jpg',
      alternativeText: 'Grupos de Vida',
      width: 800,
      height: 600,
    },
  },
  {
    id: 3,
    title: 'Servicio Comunitario',
    description:
      'Llevamos el amor de Cristo a la comunidad a través de acciones concretas que marcan la diferencia.',
    slug: 'servicio-comunitario',
    image: {
      id: 3,
      url: '/images/servicio.jpg',
      alternativeText: 'Servicio Comunitario',
      width: 800,
      height: 600,
    },
  },
];

// Events Data
export const events: ChurchEvent[] = [
  {
    id: 1,
    title: 'Servicio Especial de Adoración',
    date: '2024-11-24',
    displayDate: 'NOV 24 - DOMINGO',
    description:
      'Una noche especial dedicada a la presencia de Dios con música en vivo y oración.',
    slug: 'servicio-especial-adoracion',
    image: {
      id: 4,
      url: '/images/evento1.jpg',
      alternativeText: 'Servicio Especial de Adoración',
      width: 800,
      height: 600,
    },
  },
  {
    id: 2,
    title: 'Noche de Jóvenes',
    date: '2024-11-29',
    displayDate: 'NOV 29 - VIERNES',
    description:
      'Un espacio diseñado para jóvenes donde exploramos la fe, la amistad y nuestro propósito.',
    slug: 'noche-de-jovenes',
    image: {
      id: 5,
      url: '/images/evento2.jpg',
      alternativeText: 'Noche de Jóvenes',
      width: 800,
      height: 600,
    },
  },
  {
    id: 3,
    title: 'Día de Familia',
    date: '2024-12-01',
    displayDate: 'DIC 01 - DOMINGO',
    description:
      'Celebramos juntos como familia de Dios con actividades, comida y mucha diversión.',
    slug: 'dia-de-familia',
    image: {
      id: 6,
      url: '/images/evento3.jpg',
      alternativeText: 'Día de Familia',
      width: 800,
      height: 600,
    },
  },
];

// Footer Data
export const footerColumns: FooterColumn[] = [
  {
    title: 'NOSOTROS',
    links: [
      { label: 'Nuestra Historia', href: '/historia' },
      { label: 'Creemos', href: '/creemos' },
      { label: 'Pastores', href: '/pastores' },
      { label: 'Liderazgo', href: '/liderazgo' },
    ],
  },
  {
    title: 'SERVICIO',
    links: [
      { label: 'Servicios Dominicales', href: '/servicios-dominicales' },
      { label: 'Grupos de Vida', href: '/grupos-vida' },
      { label: 'Jóvenes', href: '/jovenes' },
      { label: 'Niños', href: '/ninos' },
    ],
  },
  {
    title: 'REDES',
    links: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Spotify', href: 'https://spotify.com' },
    ],
  },
];

// Hero Section Data
export const heroData: HeroSection = {
  title: 'Iglesia revoluciona',
  subtitle: 'Un lugar donde tu vida es transformada',
  backgroundImage: {
    id: 7,
    url: '/images/hero-bg.jpg',
    alternativeText: 'Iglesia Revoluciona - Hero Background',
    width: 1920,
    height: 1080,
  },
  ctaPrimary: {
    label: 'Conócelo',
    href: '#nosotros',
  },
  ctaSecondary: {
    label: 'Conéctate',
    href: '#contacto',
  },
};

// About Section Data
export const aboutData: AboutSection = {
  label: 'QUIÉNES SOMOS',
  title: 'Una comunidad que transforma vidas',
  description:
    'Somos una iglesia comprometida con llevar el amor de Cristo a cada persona. Creemos que todos tienen un propósito y que juntos podemos hacer una diferencia en el mundo. Nuestra misión es crear un espacio donde puedas crecer en tu fe, conectar con otros y descubrir todo lo que Dios tiene preparado para ti.',
  ctaLabel: 'Conoce nuestra historia',
  ctaHref: '/nosotros',
  image: {
    id: 8,
    url: '/images/about.jpg',
    alternativeText: 'Quiénes Somos - Iglesia Revoluciona',
    width: 800,
    height: 600,
  },
};

// Quote Section Data
export const quoteData: QuoteSection = {
  text: 'Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.',
  reference: 'Mateo 18:20',
};

// CTA Section Data (optional, for additional call-to-action sections)
export const ctaData = {
  title: 'Se parte de la revolución',
  subtitle:
    'Tu historia importa. Ven y descubre lo que Dios tiene preparado para ti.',
  buttons: [
    { label: 'Visítanos este domingo', variant: 'outlined' as const },
    { label: 'Conoce más', variant: 'solid' as const },
  ],
};

// Complete Home Page Data (aggregated)
export const homePageData: HomePage = {
  hero: heroData,
  about: aboutData,
  services,
  quote: quoteData,
  events,
  footerColumns,
  navLinks,
};

// Helper function to get fallback data
export function getFallbackData(): HomePage {
  return homePageData;
}
