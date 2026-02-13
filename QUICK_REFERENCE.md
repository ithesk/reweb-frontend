# Strapi Integration - Quick Reference

## Import Statement

```typescript
import { getHomePage, getStrapiImageUrl } from '@/lib';
```

## Common Patterns

### Fetch Home Page Data
```typescript
const pageData = await getHomePage();
```

### Fetch All Services
```typescript
const services = await getServices();
```

### Fetch Limited Events
```typescript
const events = await getEvents(3); // Get 3 events
```

### Get Single Service by Slug
```typescript
const service = await getServiceBySlug('servicios-dominicales');
```

### Convert Image URL
```typescript
const imageUrl = getStrapiImageUrl(service.image);
```

## Page Examples

### Home Page
```typescript
// app/page.tsx
import { getHomePage, getStrapiImageUrl } from '@/lib';

export default async function HomePage() {
  const data = await getHomePage();

  return (
    <main>
      <h1>{data.hero.title}</h1>
      <p>{data.hero.subtitle}</p>
    </main>
  );
}
```

### Services List
```typescript
// app/servicios/page.tsx
import { getServices, getStrapiImageUrl } from '@/lib';

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h2>{service.title}</h2>
          <img src={getStrapiImageUrl(service.image)} alt={service.title} />
        </div>
      ))}
    </div>
  );
}
```

### Dynamic Service Page
```typescript
// app/servicios/[slug]/page.tsx
import { getServiceBySlug, getStrapiImageUrl } from '@/lib';
import { notFound } from 'next/navigation';

export default async function ServicePage({
  params
}: {
  params: { slug: string }
}) {
  const service = await getServiceBySlug(params.slug);

  if (!service) notFound();

  return (
    <article>
      <h1>{service.title}</h1>
      <img src={getStrapiImageUrl(service.image)} alt={service.title} />
      <p>{service.description}</p>
    </article>
  );
}
```

## Available Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getHomePage()` | Complete home page data | `HomePage` |
| `getServices()` | All services | `Service[]` |
| `getEvents(limit?)` | Upcoming events | `ChurchEvent[]` |
| `getNavigation()` | Navigation links | `NavLink[]` |
| `getFooter()` | Footer columns | `FooterColumn[]` |
| `getQuote()` | Scripture quote | `QuoteSection` |
| `getServiceBySlug(slug)` | Single service | `Service \| null` |
| `getEventBySlug(slug)` | Single event | `ChurchEvent \| null` |
| `getStrapiImageUrl(image)` | Image URL | `string` |

## TypeScript Types

```typescript
import type {
  Service,
  ChurchEvent,
  HomePage,
  NavLink,
  FooterColumn,
  QuoteSection,
  StrapiImage
} from '@/lib';
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

## Image Handling

```typescript
// Basic usage
<img src={getStrapiImageUrl(image)} alt={image.alternativeText} />

// With Next.js Image
<Image
  src={getStrapiImageUrl(image)}
  alt={image.alternativeText || 'Alt text'}
  width={image.width}
  height={image.height}
/>

// Access responsive formats
const thumbnail = image.formats?.thumbnail?.url;
const small = image.formats?.small?.url;
const medium = image.formats?.medium?.url;
```

## ISR Configuration

```typescript
// In your page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const data = await getHomePage();
  return <div>{/* ... */}</div>;
}
```

## Error Handling

```typescript
try {
  const services = await getServices();

  if (!services || services.length === 0) {
    return <p>No services available</p>;
  }

  return <ServicesList services={services} />;
} catch (error) {
  console.error('Error:', error);
  return <p>Error loading services</p>;
}
```

## Common Data Structures

### Service
```typescript
{
  id: number;
  title: string;
  description: string;
  slug: string;
  image: StrapiImage;
}
```

### Event
```typescript
{
  id: number;
  title: string;
  description: string;
  date: string; // ISO format
  displayDate: string; // "NOV 24 - DOMINGO"
  slug: string;
  image: StrapiImage;
}
```

### Hero Section
```typescript
{
  title: string;
  subtitle: string;
  backgroundImage: StrapiImage;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}
```

## Fallback Data

All functions automatically fall back to static data if Strapi is unavailable. No additional code needed.

## Configuration

Modify `src/lib/config.ts` to change:
- Revalidation times
- Default pagination
- Feature flags
- API endpoints

## File Locations

```
src/lib/
├── index.ts         - Main exports (use this)
├── api.ts           - Unified API (recommended)
├── strapi.ts        - Direct Strapi API
├── data.ts          - Static fallback data
├── types.ts         - TypeScript types
├── config.ts        - Configuration
├── README.md        - Full documentation
└── example-usage.tsx - Examples
```

## Getting Started Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Strapi URL and token
- [ ] Import functions in your components
- [ ] Use `getStrapiImageUrl()` for all images
- [ ] Add type annotations for better autocomplete
- [ ] Test without Strapi to verify fallback works

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Use `getStrapiImageUrl()` helper |
| Data not updating | Check revalidation time, clear `.next` cache |
| TypeScript errors | Import types from `@/lib` |
| 401 errors | Verify STRAPI_API_TOKEN in `.env.local` |
| Connection refused | Check NEXT_PUBLIC_STRAPI_URL, ensure Strapi is running |

## Resources

- Full docs: `src/lib/README.md`
- Examples: `src/lib/example-usage.tsx`
- Types: `src/lib/types.ts`
- Summary: `STRAPI_INTEGRATION_SUMMARY.md`

## Support

1. Check `src/lib/README.md` for detailed information
2. Review `src/lib/example-usage.tsx` for practical examples
3. Inspect browser console for error messages
4. Verify environment variables are set correctly
