# Migration Guide - Strapi Integration

Guide for updating existing components to use the new Strapi integration layer.

## Before vs After

### Old Pattern (Static Data)
```typescript
// Before
import { services, events } from '@/lib/data';

export default function HomePage() {
  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <img src={service.image} alt={service.title} />
        </div>
      ))}
    </div>
  );
}
```

### New Pattern (Strapi with Fallback)
```typescript
// After
import { getServices, getStrapiImageUrl } from '@/lib';

export default async function HomePage() {
  const services = await getServices();

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <img src={getStrapiImageUrl(service.image)} alt={service.title} />
        </div>
      ))}
    </div>
  );
}
```

## Key Changes

### 1. Component Type
```typescript
// Before: Client Component
'use client';
export default function HomePage() { }

// After: Server Component (default in Next.js 14 App Router)
export default async function HomePage() { }
```

### 2. Data Fetching
```typescript
// Before: Direct import
import { services } from '@/lib/data';
const myServices = services;

// After: Async function
const myServices = await getServices();
```

### 3. Image URLs
```typescript
// Before: Direct string
<img src={service.image} />

// After: URL helper
<img src={getStrapiImageUrl(service.image)} />
```

### 4. Image Properties
```typescript
// Before: Simple string
image: "/images/service.jpg"

// After: Full object
image: {
  id: 1,
  url: "/uploads/service.jpg",
  alternativeText: "Service image",
  width: 800,
  height: 600
}
```

## Component-by-Component Migration

### Navigation Component

#### Before
```typescript
import { navLinks } from '@/lib/data';

export function Navigation() {
  return (
    <nav>
      {navLinks.map(link => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
```

#### After
```typescript
import { getNavigation } from '@/lib';

export async function Navigation() {
  const navLinks = await getNavigation();

  return (
    <nav>
      {navLinks.map(link => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
```

### Services Section

#### Before
```typescript
import { services } from '@/lib/data';

export function ServicesSection() {
  return (
    <section>
      {services.map(service => (
        <div key={service.id}>
          <img src={service.image} alt={service.title} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </section>
  );
}
```

#### After
```typescript
import { getServices, getStrapiImageUrl } from '@/lib';

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section>
      {services.map(service => (
        <div key={service.id}>
          <img
            src={getStrapiImageUrl(service.image)}
            alt={service.image.alternativeText || service.title}
            width={service.image.width}
            height={service.image.height}
          />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </section>
  );
}
```

### Events Section

#### Before
```typescript
import { events } from '@/lib/data';

export function EventsSection() {
  return (
    <section>
      {events.map(event => (
        <div key={event.id}>
          <span>{event.date}</span>
          <h3>{event.title}</h3>
        </div>
      ))}
    </section>
  );
}
```

#### After
```typescript
import { getEvents } from '@/lib';

export async function EventsSection() {
  const events = await getEvents(3); // Get 3 events

  return (
    <section>
      {events.map(event => (
        <div key={event.id}>
          <span>{event.displayDate}</span>
          <h3>{event.title}</h3>
        </div>
      ))}
    </section>
  );
}
```

### Hero Section

#### Before
```typescript
import { heroData } from '@/lib/data';

export function Hero() {
  return (
    <section style={{ backgroundImage: `url(/images/hero.jpg)` }}>
      <h1>
        <em>{heroData.titleItalic}</em>
        <strong>{heroData.titleBold}</strong>
      </h1>
      <p>{heroData.subtitle}</p>
    </section>
  );
}
```

#### After
```typescript
import { getHomePage, getStrapiImageUrl } from '@/lib';

export async function Hero() {
  const { hero } = await getHomePage();

  return (
    <section
      style={{
        backgroundImage: `url(${getStrapiImageUrl(hero.backgroundImage)})`
      }}
    >
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
      <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
    </section>
  );
}
```

### Footer Component

#### Before
```typescript
import { footerColumns } from '@/lib/data';

export function Footer() {
  return (
    <footer>
      {footerColumns.map(column => (
        <div key={column.title}>
          <h3>{column.title}</h3>
          <ul>
            {column.links.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
```

#### After
```typescript
import { getFooter } from '@/lib';

export async function Footer() {
  const footerColumns = await getFooter();

  return (
    <footer>
      {footerColumns.map(column => (
        <div key={column.title}>
          <h3>{column.title}</h3>
          <ul>
            {column.links.map(link => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
```

## Client Components Pattern

If you need client-side interactivity, fetch data in a Server Component and pass it down:

### Before (Client Component with static data)
```typescript
'use client';
import { useState } from 'react';
import { services } from '@/lib/data';

export function InteractiveServices() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {services.map(service => (
        <button onClick={() => setSelected(service.id)}>
          {service.title}
        </button>
      ))}
    </div>
  );
}
```

### After (Server Component fetches, Client Component renders)
```typescript
// app/services/page.tsx (Server Component)
import { getServices } from '@/lib';
import { InteractiveServices } from './InteractiveServices';

export default async function ServicesPage() {
  const services = await getServices();
  return <InteractiveServices services={services} />;
}

// app/services/InteractiveServices.tsx (Client Component)
'use client';
import { useState } from 'react';
import type { Service } from '@/lib';

interface Props {
  services: Service[];
}

export function InteractiveServices({ services }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      {services.map(service => (
        <button key={service.id} onClick={() => setSelected(service.id)}>
          {service.title}
        </button>
      ))}
    </div>
  );
}
```

## Common Issues and Solutions

### Issue 1: "Component is not async"
```typescript
// ❌ Wrong
export function MyComponent() {
  const data = await getData(); // Error!
}

// ✅ Correct
export async function MyComponent() {
  const data = await getData();
}
```

### Issue 2: "Cannot use await in client component"
```typescript
// ❌ Wrong
'use client';
export async function MyComponent() {
  const data = await getData(); // Error!
}

// ✅ Correct - Fetch in parent, pass as prop
// Parent (Server Component)
export default async function Page() {
  const data = await getData();
  return <MyClientComponent data={data} />;
}

// Child (Client Component)
'use client';
export function MyClientComponent({ data }) {
  return <div>{/* Use data */}</div>;
}
```

### Issue 3: "Image URL is undefined"
```typescript
// ❌ Wrong
<img src={service.image} /> // image is now an object

// ✅ Correct
<img src={getStrapiImageUrl(service.image)} />
```

### Issue 4: "Property 'date' doesn't exist"
```typescript
// ❌ Wrong
<span>{event.date}</span> // Use displayDate for formatted date

// ✅ Correct
<span>{event.displayDate}</span>
```

## TypeScript Updates

### Add Type Imports
```typescript
import type {
  Service,
  ChurchEvent,
  HomePage,
  NavLink
} from '@/lib';
```

### Update Component Props
```typescript
// Before
interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    image: string;
  };
}

// After
import type { Service } from '@/lib';

interface ServiceCardProps {
  service: Service;
}
```

## Testing Checklist

After migration:

- [ ] All pages render without errors
- [ ] Images load correctly
- [ ] Navigation works
- [ ] Events display properly
- [ ] Services show correctly
- [ ] Footer renders
- [ ] Hero section appears
- [ ] TypeScript has no errors
- [ ] Site works without Strapi (fallback)
- [ ] Site works with Strapi connected

## Rollback Plan

If needed, you can temporarily use static data:

```typescript
// Emergency fallback
import { services as staticServices } from '@/lib/data';

export async function ServicesSection() {
  try {
    const services = await getServices();
    return <ServicesList services={services} />;
  } catch (error) {
    // Use static data as fallback
    return <ServicesList services={staticServices} />;
  }
}
```

However, the API layer already does this automatically!

## Performance Notes

### Before (Client-side)
- Bundle includes all data
- Data loaded on every page load
- No caching

### After (Server-side)
- Data fetched on server
- ISR caching enabled
- Smaller client bundle
- Better performance

## Next Steps

1. Update one component at a time
2. Test each component after migration
3. Verify images load correctly
4. Check TypeScript compilation
5. Test with and without Strapi
6. Deploy to staging first

## Need Help?

- Review `src/lib/README.md` for detailed docs
- Check `src/lib/example-usage.tsx` for examples
- See `QUICK_REFERENCE.md` for common patterns
