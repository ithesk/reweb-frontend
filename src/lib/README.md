# Strapi Integration Layer

This directory contains the complete Strapi integration layer for the Next.js 14+ church website project. It provides a robust, type-safe API client with automatic fallback to static data when Strapi is unavailable.

## Files Overview

### 1. `types.ts`
TypeScript type definitions for all data structures used throughout the application.

**Key Types:**
- `StrapiResponse<T>` - Generic Strapi API response wrapper
- `StrapiImage` - Image data structure with formats
- `Service` - Church service information
- `ChurchEvent` - Event data with date and location
- `HeroSection` - Hero banner content
- `AboutSection` - About section content
- `QuoteSection` - Scripture quote data
- `NavLink` - Navigation menu items
- `FooterColumn` - Footer link columns
- `HomePage` - Complete home page data structure

### 2. `strapi.ts`
Direct Strapi API client with comprehensive error handling.

**Main Functions:**
- `fetchAPI<T>()` - Generic fetch function with authentication
- `getStrapiImageUrl()` - Convert relative URLs to absolute
- `getServices()` - Fetch all services
- `getEvents(limit?)` - Fetch upcoming events
- `getHomePage()` - Fetch complete home page
- `getNavigation()` - Fetch navigation links
- `getFooter()` - Fetch footer data
- `getQuote()` - Fetch scripture quote
- `getServiceBySlug(slug)` - Fetch single service
- `getEventBySlug(slug)` - Fetch single event

**Features:**
- Automatic Bearer token authentication
- Built-in ISR with configurable revalidation
- Comprehensive error handling
- Support for filtering, sorting, and pagination
- Deep population of relations

### 3. `data.ts`
Static fallback data that matches all Strapi types.

**Exports:**
- `navLinks` - Default navigation menu
- `services` - 3 church services
- `events` - 3 upcoming events
- `footerColumns` - 3-column footer structure
- `heroData` - Hero section content
- `aboutData` - About section content
- `quoteData` - Scripture quote (Mateo 18:20)
- `homePageData` - Complete aggregated home page
- `getFallbackData()` - Helper function to get all data

### 4. `api.ts`
Unified API layer that combines Strapi with fallback data.

**Main Functions:**
- `getServices()` - Services with automatic fallback
- `getEvents(limit?)` - Events with automatic fallback
- `getHomePage()` - Complete page with automatic fallback
- `getNavigation()` - Navigation with automatic fallback
- `getFooter()` - Footer with automatic fallback
- `getQuote()` - Quote with automatic fallback
- `getServiceBySlug(slug)` - Single service with fallback
- `getEventBySlug(slug)` - Single event with fallback

**Use this layer in your components** - It automatically handles Strapi unavailability.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your Strapi connection:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_actual_token_here
```

**Getting your API Token:**
1. Open Strapi Admin Panel
2. Go to Settings > API Tokens
3. Create a new token with `read` permissions
4. Copy the token to your `.env.local`

### 2. Strapi Content Types

Create these content types in Strapi:

#### Collection Type: `service`
- `title` (Text, required)
- `description` (Rich Text, required)
- `slug` (UID, based on title, required)
- `image` (Media, Single image, required)

#### Collection Type: `event`
- `title` (Text, required)
- `description` (Rich Text, required)
- `slug` (UID, based on title, required)
- `date` (Date, required)
- `displayDate` (Text, e.g., "NOV 24 - DOMINGO")
- `image` (Media, Single image, required)

#### Single Type: `navigation`
- `links` (Component, repeatable)
  - `label` (Text)
  - `href` (Text)

#### Single Type: `footer`
- `columns` (Component, repeatable)
  - `title` (Text)
  - `links` (Component, repeatable)
    - `label` (Text)
    - `href` (Text)

#### Single Type: `quote`
- `text` (Text, required)
- `reference` (Text, required)

#### Single Type: `home-page`
- `hero` (Component, Single)
  - `title` (Text)
  - `subtitle` (Text)
  - `backgroundImage` (Media, Single image)
  - `ctaPrimary` (Component)
    - `label` (Text)
    - `href` (Text)
  - `ctaSecondary` (Component)
    - `label` (Text)
    - `href` (Text)
- `about` (Component, Single)
  - `label` (Text)
  - `title` (Text)
  - `description` (Rich Text)
  - `ctaLabel` (Text)
  - `ctaHref` (Text)
  - `image` (Media, Single image)
- `quote` (Component, Single)
  - `text` (Text)
  - `reference` (Text)

## Usage Examples

### In a Server Component (Recommended for Next.js 14+)

```typescript
// app/page.tsx
import { getHomePage, getStrapiImageUrl } from '@/lib/api';

export default async function HomePage() {
  const pageData = await getHomePage();

  return (
    <main>
      <section
        style={{
          backgroundImage: `url(${getStrapiImageUrl(pageData.hero.backgroundImage)})`,
        }}
      >
        <h1>{pageData.hero.title}</h1>
        <p>{pageData.hero.subtitle}</p>
      </section>

      <section>
        <h2>{pageData.about.title}</h2>
        <p>{pageData.about.description}</p>
      </section>

      <section>
        {pageData.services.map((service) => (
          <div key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <img
              src={getStrapiImageUrl(service.image)}
              alt={service.image.alternativeText || service.title}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
```

### Fetching Individual Services

```typescript
// app/servicios/[slug]/page.tsx
import { getServiceBySlug, getStrapiImageUrl } from '@/lib/api';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export default async function ServicePage({ params }: PageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <article>
      <h1>{service.title}</h1>
      <img
        src={getStrapiImageUrl(service.image)}
        alt={service.image.alternativeText || service.title}
      />
      <p>{service.description}</p>
    </article>
  );
}
```

### With Incremental Static Regeneration (ISR)

```typescript
// app/eventos/page.tsx
import { getEvents } from '@/lib/api';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EventsPage() {
  const events = await getEvents(10);

  return (
    <div>
      <h1>Próximos Eventos</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.displayDate}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Fallback Strategy

The API layer automatically falls back to static data when:
- Strapi server is unreachable
- API returns an error
- No data is returned from Strapi
- Authentication fails

This ensures your site remains functional even without Strapi running.

## Caching and Revalidation

- **Services**: 60 seconds revalidation
- **Events**: 60 seconds revalidation
- **Navigation**: 1 hour revalidation
- **Footer**: 1 hour revalidation
- **Home Page**: 60 seconds revalidation

Adjust these values in `strapi.ts` by modifying the `revalidate` parameter.

## Image Handling

The `getStrapiImageUrl()` helper automatically:
- Converts relative URLs to absolute URLs
- Returns fallback for missing images
- Supports Strapi's responsive image formats

```typescript
// Access different image sizes
const imageUrl = getStrapiImageUrl(service.image); // Original
const thumbnail = service.image.formats?.thumbnail?.url; // Thumbnail
const small = service.image.formats?.small?.url; // Small
const medium = service.image.formats?.medium?.url; // Medium
const large = service.image.formats?.large?.url; // Large
```

## Error Handling

All fetch functions include comprehensive error handling:
- Console warnings for debugging
- Automatic fallback to static data
- Graceful degradation for partial failures

## TypeScript Support

All functions are fully typed with TypeScript for:
- Autocomplete in your IDE
- Type safety at compile time
- Better developer experience
- Reduced runtime errors

## Best Practices

1. **Use `api.ts` in your components** - It has automatic fallback
2. **Use `strapi.ts` directly** - Only if you need raw Strapi data
3. **Always use `getStrapiImageUrl()`** - For consistent image URLs
4. **Handle null cases** - Even with fallbacks, check for null
5. **Set appropriate revalidation times** - Balance freshness and performance

## Troubleshooting

### "Cannot connect to Strapi"
- Check that Strapi is running on the correct URL
- Verify `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
- Check network connectivity

### "Unauthorized" errors
- Verify `STRAPI_API_TOKEN` is set correctly
- Check token permissions in Strapi admin
- Regenerate token if necessary

### Images not loading
- Ensure images are uploaded in Strapi
- Check that `image` field is populated in API calls
- Verify image URLs in browser network tab

### Data not updating
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check revalidation times in `strapi.ts`

## Support

For issues or questions:
1. Check the Strapi documentation
2. Review Next.js 14 data fetching docs
3. Inspect network requests in browser DevTools
4. Check server logs for detailed error messages
