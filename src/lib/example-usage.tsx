/**
 * Example Usage File
 * Demonstrates how to use the Strapi integration layer in your components
 *
 * This file is for reference only and should not be imported in production code
 */

import {
  getHomePage,
  getServices,
  getEvents,
  getServiceBySlug,
  getStrapiImageUrl,
  type Service,
  type ChurchEvent,
} from './index';

// ============================================================================
// Example 1: Server Component - Home Page
// ============================================================================

export async function HomePageExample() {
  const pageData = await getHomePage();

  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${getStrapiImageUrl(pageData.hero.backgroundImage)})`,
        }}
      >
        <h1>{pageData.hero.title}</h1>
        <p>{pageData.hero.subtitle}</p>
        <div className="cta-buttons">
          <a href={pageData.hero.ctaPrimary.href}>
            {pageData.hero.ctaPrimary.label}
          </a>
          <a href={pageData.hero.ctaSecondary.href}>
            {pageData.hero.ctaSecondary.label}
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <span className="label">{pageData.about.label}</span>
        <h2>{pageData.about.title}</h2>
        <p>{pageData.about.description}</p>
        <a href={pageData.about.ctaHref}>{pageData.about.ctaLabel}</a>
        <img
          src={getStrapiImageUrl(pageData.about.image)}
          alt={pageData.about.image.alternativeText || 'About us'}
        />
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Nuestros Servicios</h2>
        <div className="services-grid">
          {pageData.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote">
        <blockquote>
          <p>"{pageData.quote.text}"</p>
          <cite>{pageData.quote.reference}</cite>
        </blockquote>
      </section>

      {/* Events Section */}
      <section className="events">
        <h2>Próximos Eventos</h2>
        <div className="events-grid">
          {pageData.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// Example 2: Services List Page
// ============================================================================

export async function ServicesPageExample() {
  const services = await getServices();

  return (
    <div className="services-page">
      <h1>Nuestros Servicios</h1>
      <div className="services-list">
        {services.map((service) => (
          <article key={service.id} className="service-item">
            <img
              src={getStrapiImageUrl(service.image)}
              alt={service.image.alternativeText || service.title}
              width={service.image.width}
              height={service.image.height}
            />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <a href={`/servicios/${service.slug}`}>Leer más</a>
          </article>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Example 3: Events Page with Limit
// ============================================================================

export async function EventsPageExample() {
  const events = await getEvents(6); // Get only 6 upcoming events

  return (
    <div className="events-page">
      <h1>Próximos Eventos</h1>
      {events.length === 0 ? (
        <p>No hay eventos próximos en este momento.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <article key={event.id} className="event-card">
              <img
                src={getStrapiImageUrl(event.image)}
                alt={event.image.alternativeText || event.title}
              />
              <div className="event-content">
                <span className="event-date">{event.displayDate}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <a href={`/eventos/${event.slug}`}>Ver detalles</a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 4: Dynamic Single Service Page
// ============================================================================

interface ServicePageProps {
  params: { slug: string };
}

export async function ServicePageExample({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return (
      <div className="not-found">
        <h1>Servicio no encontrado</h1>
        <p>El servicio que buscas no existe.</p>
        <a href="/servicios">Ver todos los servicios</a>
      </div>
    );
  }

  return (
    <article className="service-detail">
      <header>
        <img
          src={getStrapiImageUrl(service.image)}
          alt={service.image.alternativeText || service.title}
          className="hero-image"
        />
        <h1>{service.title}</h1>
      </header>
      <div className="service-content">
        <p>{service.description}</p>
      </div>
      <footer>
        <a href="/servicios">← Volver a servicios</a>
      </footer>
    </article>
  );
}

// ============================================================================
// Example 5: Reusable Service Card Component
// ============================================================================

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="service-card">
      <img
        src={getStrapiImageUrl(service.image)}
        alt={service.image.alternativeText || service.title}
        loading="lazy"
      />
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <a href={`/servicios/${service.slug}`}>Conoce más</a>
    </div>
  );
}

// ============================================================================
// Example 6: Reusable Event Card Component
// ============================================================================

interface EventCardProps {
  event: ChurchEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <img
        src={getStrapiImageUrl(event.image)}
        alt={event.image.alternativeText || event.title}
        loading="lazy"
      />
      <div className="event-info">
        <span className="event-date">{event.displayDate}</span>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <a href={`/eventos/${event.slug}`}>Ver más</a>
      </div>
    </div>
  );
}

// ============================================================================
// Example 7: Using with Next.js Image Component
// ============================================================================

import Image from 'next/image';

export async function OptimizedImagesExample() {
  const services = await getServices();

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <Image
            src={getStrapiImageUrl(service.image)}
            alt={service.image.alternativeText || service.title}
            width={service.image.width}
            height={service.image.height}
            quality={80}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
          />
          <h3>{service.title}</h3>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Example 8: Error Handling
// ============================================================================

export async function ErrorHandlingExample() {
  try {
    const services = await getServices();

    if (!services || services.length === 0) {
      return <p>No hay servicios disponibles en este momento.</p>;
    }

    return (
      <div>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading services:', error);
    return (
      <div className="error">
        <p>Error al cargar los servicios. Por favor, intenta más tarde.</p>
      </div>
    );
  }
}

// ============================================================================
// Example 9: With ISR (Incremental Static Regeneration)
// ============================================================================

// In your page.tsx file:
export const revalidate = 60; // Revalidate every 60 seconds

export async function ISRPageExample() {
  const events = await getEvents(3);

  return (
    <section>
      <h2>Próximos Eventos</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

// ============================================================================
// Example 10: Generating Static Paths
// ============================================================================

import { getServices as getStrapiServices } from './strapi';

export async function generateStaticParams() {
  const services = await getStrapiServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

// ============================================================================
// Notes:
//
// 1. All data fetching happens on the server (Next.js 14+ Server Components)
// 2. No need for useEffect or useState - data is available immediately
// 3. Automatic fallback to static data if Strapi is unavailable
// 4. Full TypeScript support with autocomplete
// 5. Images are properly handled with getStrapiImageUrl()
// 6. All functions return typed data for type safety
// ============================================================================
