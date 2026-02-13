# Iglesia Revoluciona - Frontend Project Structure

## Overview
Complete Next.js 14+ frontend for the Iglesia Revoluciona church website, built with TypeScript and Tailwind CSS.

## Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **CMS**: Strapi v5 (with fallback to static data)

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx             # Home page (composition of all sections)
│   │   └── globals.css          # Global styles and Tailwind imports
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation bar (client component)
│   │   ├── Hero.tsx             # Hero section with background image
│   │   ├── About.tsx            # About/Quiénes Somos section
│   │   ├── Services.tsx         # Services cards section
│   │   ├── Quote.tsx            # Bible verse quote section
│   │   ├── Events.tsx           # Upcoming events section
│   │   ├── CTA.tsx              # Call-to-action section
│   │   └── Footer.tsx           # Footer with navigation columns
│   └── lib/
│       ├── types.ts             # TypeScript interfaces (Strapi-compatible)
│       ├── data.ts              # Fallback static data
│       ├── strapi.ts            # Strapi API client functions
│       └── api.ts               # API layer with fallback logic
├── public/
│   └── images/                  # (Placeholder for actual images)
└── package.json
```

## Components Description

### 1. Navbar (`components/Navbar.tsx`)
- **Type**: Client component ("use client")
- **Features**:
  - Sticky positioning at top
  - Dark background (#0a0a0a)
  - Logo + brand text
  - Desktop: horizontal navigation links
  - Mobile: hamburger menu with slide-down
  - Search and User icons
- **Responsive**: Mobile-first with hamburger menu

### 2. Hero (`components/Hero.tsx`)
- **Type**: Server component
- **Features**:
  - Full viewport height
  - Background image placeholder with gradient overlay
  - "BIENVENIDO A" label
  - Split typography: "Iglesia" (italic serif) + "revoluciona" (bold sans)
  - Subtitle text
  - Two CTA buttons (outlined and solid)
- **Design**: Dark overlay on background image

### 3. About (`components/About.tsx`)
- **Type**: Server component
- **Features**:
  - Two-column layout (text left, image right)
  - Section label: "QUIÉNES SOMOS"
  - Large heading and description
  - CTA button (outlined)
  - Image placeholder
- **Background**: White (#ffffff)

### 4. Services (`components/Services.tsx`)
- **Type**: Server component
- **Features**:
  - Three service cards in grid layout
  - Each card: image placeholder + title + description
  - Section label: "NUESTROS SERVICIOS"
  - Heading: "Encuentra tu lugar"
  - Cards with rounded corners and shadow
- **Background**: Light gray (#f5f5f5)

### 5. Quote (`components/Quote.tsx`)
- **Type**: Server component
- **Features**:
  - Centered Bible verse
  - Large italic text
  - Attribution (Mateo 18:20)
- **Background**: Dark (#0a0a0a)
- **Text**: White with gray attribution

### 6. Events (`components/Events.tsx`)
- **Type**: Server component
- **Features**:
  - Three event cards in grid
  - Each card: image + date badge + title + description
  - Section label: "PRÓXIMOS EVENTOS"
  - "Ver todos >" link in header
- **Background**: White
- **Data**: Uses `displayDate` field for formatted dates

### 7. CTA (`components/CTA.tsx`)
- **Type**: Server component
- **Features**:
  - Centered layout
  - Large heading: "Se parte de la revolución"
  - Subtitle text
  - Two CTA buttons
- **Background**: Dark (#0a0a0a)

### 8. Footer (`components/Footer.tsx`)
- **Type**: Server component
- **Features**:
  - Three columns: NOSOTROS, SERVICIO, REDES
  - Links in each column
  - Bottom row: copyright + legal links
- **Background**: Dark (#0a0a0a or #111111)
- **Text**: White/gray with hover effects

## Data Flow Architecture

### Static Fallback Data (`lib/data.ts`)
- Contains all default content for the website
- Matches Strapi TypeScript interfaces exactly
- Used when Strapi is unavailable or during development

### Strapi API Client (`lib/strapi.ts`)
- Connects to Strapi v5 REST API
- Fetches services, events, navigation, footer, quotes
- Handles image URL transformation
- Includes ISR (Incremental Static Regeneration) with revalidate
- Environment variables:
  - `NEXT_PUBLIC_STRAPI_URL` (default: http://localhost:1337)
  - `STRAPI_API_TOKEN` (optional, for private content)

### API Integration Layer (`lib/api.ts`)
- **Purpose**: Unified data fetching with automatic fallback
- **Strategy**: Try Strapi first, fall back to static data on error
- **Functions**:
  - `getServices()` - Fetch all services
  - `getEvents(limit)` - Fetch upcoming events
  - `getNavigation()` - Fetch nav links
  - `getFooter()` - Fetch footer data
  - `getQuote()` - Fetch Bible verse
  - `getHomePage()` - Fetch complete home page data
  - `getServiceBySlug(slug)` - Fetch single service
  - `getEventBySlug(slug)` - Fetch single event

### Type Safety (`lib/types.ts`)
All data structures are fully typed:
- `NavLink` - Navigation menu items
- `Service` - Service cards with image
- `ChurchEvent` - Event cards with date
- `HeroSection` - Hero content and CTAs
- `AboutSection` - About section content
- `QuoteSection` - Bible verse data
- `FooterColumn` - Footer navigation columns
- `HomePage` - Complete page aggregation
- `StrapiResponse<T>` - Strapi API responses
- `StrapiImage` - Image metadata

## Color Palette

```css
/* Primary Colors */
--primary-dark: #0a0a0a;      /* Near black - hero, quote, CTA, footer */
--white: #ffffff;              /* Light sections */
--light-gray: #f5f5f5;         /* Subtle backgrounds */

/* Text Colors */
--text-primary: #111111;       /* Main text on light backgrounds */
--text-secondary: #666666;     /* Secondary text */
--text-on-dark: #ffffff;       /* Text on dark backgrounds */
--text-muted-dark: #a0a0a0;    /* Muted text on dark backgrounds */

/* Optional Accent */
--accent-gold: #c8a96e;        /* Warm gold for highlights (optional) */
```

## Typography

- **Headings**: Bold, large-scale hierarchy
- **Body**: Geist Sans (Next.js default)
- **Special**:
  - "Iglesia": italic serif style
  - "revoluciona": lowercase, very bold sans-serif
- **Labels**: Uppercase, tracking-widest, text-xs

## Responsive Breakpoints

Using Tailwind's default breakpoints:
- `sm`: 640px - Small tablets
- `md`: 768px - Tablets
- `lg`: 1024px - Laptops
- `xl`: 1280px - Desktops

### Mobile-First Strategy
- Single column layouts on mobile
- Hamburger menu for navigation
- Stacked buttons
- Full-width cards

### Desktop Enhancements
- Multi-column grids (2-3 columns)
- Horizontal navigation
- Side-by-side buttons
- Larger typography

## Development Workflow

### Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create `.env.local`:

```env
# Optional: Connect to Strapi (falls back to static data if not set)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

### Adding New Sections

1. Create component in `src/components/`
2. Add data structure to `src/lib/types.ts`
3. Add fallback data to `src/lib/data.ts`
4. Add Strapi fetch function to `src/lib/strapi.ts` (if using CMS)
5. Add API wrapper to `src/lib/api.ts`
6. Import and use in `src/app/page.tsx`

## Image Handling

### Current State
- All images are placeholders (gray divs with text)
- Ready to be replaced with actual images

### To Add Real Images

#### Option 1: Static Images (public folder)
1. Add images to `/public/images/`
2. Replace placeholder divs with:
```tsx
<Image
  src="/images/hero-bg.jpg"
  alt="Description"
  width={1920}
  height={1080}
  className="..."
/>
```

#### Option 2: Strapi Images (CMS)
- Images automatically fetched from Strapi
- `getStrapiImageUrl()` helper handles URLs
- Already integrated in data structures

#### Option 3: External URLs
- Update image URLs in `src/lib/data.ts`
- Use Next.js Image component with `remotePatterns` in `next.config.ts`

## Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Add environment variables in Vercel dashboard
# Auto-deploy on push to main
```

### Other Platforms
```bash
# Build static export (if not using ISR)
npm run build

# Deploy 'out' folder to any static host
```

## Future Enhancements

### Phase 1 (Current) ✅
- Complete static frontend
- All sections responsive
- Strapi integration layer ready
- Fallback data system

### Phase 2 (Next Steps)
- Connect to live Strapi backend
- Add real images and content
- SEO optimization (metadata, structured data)
- Performance optimization (image loading, lazy loading)

### Phase 3 (Advanced)
- Dynamic pages for services and events (`/servicios/[slug]`, `/eventos/[slug]`)
- Contact form integration
- Newsletter signup
- Social media feed integration
- Multi-language support (i18n)
- Search functionality

## Code Quality

### Best Practices Implemented
- ✅ TypeScript for type safety
- ✅ Server components by default
- ✅ Client components only where needed (Navbar)
- ✅ Responsive mobile-first design
- ✅ Semantic HTML
- ✅ Accessibility (alt texts, ARIA labels)
- ✅ Clean component structure
- ✅ Reusable data layer
- ✅ Error handling with fallbacks
- ✅ Performance (ISR, caching)

### Testing (To Be Added)
- Unit tests for components
- Integration tests for API layer
- E2E tests for user flows
- Accessibility tests

## Support

For questions or issues:
1. Check this documentation
2. Review component code comments
3. Check Strapi documentation for CMS questions
4. Review Next.js 14 App Router documentation

---

**Built with Next.js 14+, TypeScript, and Tailwind CSS**
**Ready for Strapi v5 integration with static fallback**
