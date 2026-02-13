# Strapi Integration Architecture

Complete architecture overview of the Strapi integration layer.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Server Components (RSC)                   │  │
│  │                                                         │  │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │  Page   │  │ Layout  │  │ Services │  │ Events  │ │  │
│  │  └────┬────┘  └────┬────┘  └────┬─────┘  └────┬────┘ │  │
│  │       │            │            │             │       │  │
│  │       └────────────┴────────────┴─────────────┘       │  │
│  │                         │                              │  │
│  └─────────────────────────┼──────────────────────────────┘  │
│                            │                                  │
│  ┌─────────────────────────▼──────────────────────────────┐  │
│  │               src/lib/api.ts                            │  │
│  │         (Unified API with Fallback)                     │  │
│  │                                                          │  │
│  │  • getServices()        • getNavigation()               │  │
│  │  • getEvents()          • getFooter()                   │  │
│  │  • getHomePage()        • getQuote()                    │  │
│  │  • getStrapiImageUrl()                                  │  │
│  └────────────┬─────────────────────────┬──────────────────┘  │
│               │                         │                     │
│     ┌─────────▼──────────┐    ┌────────▼─────────┐          │
│     │  src/lib/strapi.ts │    │ src/lib/data.ts  │          │
│     │  (Strapi Client)   │    │ (Static Data)    │          │
│     └─────────┬──────────┘    └──────────────────┘          │
│               │                                               │
└───────────────┼───────────────────────────────────────────────┘
                │
                │ HTTP/REST
                │
      ┌─────────▼──────────┐
      │                    │
      │   Strapi v5 CMS    │
      │                    │
      │  • Services        │
      │  • Events          │
      │  • Navigation      │
      │  • Footer          │
      │  • Home Page       │
      │  • Quote           │
      │                    │
      └────────────────────┘
```

## Data Flow

### 1. Request Flow (with Strapi available)

```
User Request
    ↓
Next.js Server Component
    ↓
lib/api.ts → getServices()
    ↓
lib/strapi.ts → fetchAPI('/services')
    ↓
HTTP Request + Bearer Token
    ↓
Strapi CMS (http://localhost:1337/api/services)
    ↓
JSON Response
    ↓
Transform Data (strapi.ts)
    ↓
Return Typed Data
    ↓
Render Component
    ↓
HTML Response to User
```

### 2. Fallback Flow (Strapi unavailable)

```
User Request
    ↓
Next.js Server Component
    ↓
lib/api.ts → getServices()
    ↓
lib/strapi.ts → fetchAPI('/services')
    ↓
HTTP Request fails ❌
    ↓
Catch error in api.ts
    ↓
lib/data.ts → static services
    ↓
Return Static Data
    ↓
Render Component (no difference!)
    ↓
HTML Response to User
```

## File Structure

```
frontend/
├── src/
│   └── lib/
│       ├── types.ts          # TypeScript definitions
│       ├── config.ts         # Configuration
│       ├── strapi.ts         # Strapi API client
│       ├── data.ts           # Static fallback data
│       ├── api.ts            # Unified API layer ⭐
│       ├── index.ts          # Main exports
│       ├── README.md         # Documentation
│       └── example-usage.tsx # Usage examples
│
├── .env.example              # Environment template
├── STRAPI_INTEGRATION_SUMMARY.md
├── QUICK_REFERENCE.md
├── MIGRATION_GUIDE.md
└── ARCHITECTURE.md (this file)
```

## Layer Responsibilities

### Layer 1: Components (Your Code)
**Location**: `app/` directory
**Purpose**: UI rendering and composition
**Responsibility**:
- Import functions from `@/lib`
- Fetch data with `await getServices()`
- Render UI with data
- Handle user interactions

**Example**:
```typescript
import { getServices } from '@/lib';

export default async function Page() {
  const services = await getServices();
  return <div>{/* render */}</div>;
}
```

### Layer 2: Unified API (`lib/api.ts`)
**Purpose**: Smart data fetching with fallback
**Responsibility**:
- Try Strapi first
- Fall back to static data if Strapi fails
- Provide consistent interface
- Handle errors gracefully

**Features**:
- Automatic fallback
- Error handling
- Consistent return types
- Logging

### Layer 3A: Strapi Client (`lib/strapi.ts`)
**Purpose**: Direct Strapi API communication
**Responsibility**:
- HTTP requests to Strapi
- Authentication (Bearer token)
- Query parameter building
- Response parsing
- Data transformation
- ISR configuration

**Features**:
- Generic `fetchAPI()` function
- Specialized fetch functions
- Image URL conversion
- Error handling
- Type safety

### Layer 3B: Static Data (`lib/data.ts`)
**Purpose**: Fallback data source
**Responsibility**:
- Provide default data
- Match Strapi types exactly
- Spanish content
- Complete data sets

**Features**:
- Production-ready content
- Type-safe data
- Easy to update
- Always available

### Layer 4: Types (`lib/types.ts`)
**Purpose**: TypeScript definitions
**Responsibility**:
- Define all data structures
- Ensure type safety
- Enable autocomplete
- Document data shape

### Layer 5: Configuration (`lib/config.ts`)
**Purpose**: Centralized settings
**Responsibility**:
- API URLs
- Revalidation times
- Feature flags
- Defaults

## Authentication Flow

```
fetchAPI()
    ↓
Check STRAPI_API_TOKEN env var
    ↓
    ├─ Token exists?
    │      ↓ Yes
    │  Add header:
    │  Authorization: Bearer {token}
    │      ↓
    └─ Token missing?
           ↓ No
       No auth header
           ↓
    Send request to Strapi
```

## Caching Strategy

### ISR (Incremental Static Regeneration)

```
First Request
    ↓
Fetch from Strapi
    ↓
Cache response (60s)
    ↓
Serve cached page
    ↓
60 seconds later...
    ↓
Next request triggers revalidation
    ↓
Fetch fresh data in background
    ↓
Update cache
    ↓
Serve updated page
```

### Revalidation Times

```typescript
{
  services: 60,      // 1 minute - changes frequently
  events: 60,        // 1 minute - time-sensitive
  navigation: 3600,  // 1 hour - rarely changes
  footer: 3600,      // 1 hour - rarely changes
  quote: 3600,       // 1 hour - rarely changes
  homePage: 60       // 1 minute - main page
}
```

## Image Handling

### Image URL Conversion

```
Strapi Image Object
    ↓
{
  url: "/uploads/image_abc123.jpg",
  alternativeText: "Church service",
  width: 1200,
  height: 800,
  formats: {
    thumbnail: { url: "..." },
    small: { url: "..." },
    medium: { url: "..." },
    large: { url: "..." }
  }
}
    ↓
getStrapiImageUrl(image)
    ↓
Check if URL is absolute
    ├─ Yes: Return as-is
    └─ No: Prepend STRAPI_URL
    ↓
"http://localhost:1337/uploads/image_abc123.jpg"
```

## Error Handling Chain

```
Component calls getServices()
    ↓
api.ts: try/catch
    ↓
strapi.ts: fetchAPI()
    ↓
fetch() request
    ↓
    ├─ Success (200)
    │     ↓
    │  Return data
    │     ↓
    │  Transform to clean types
    │     ↓
    │  Return to component
    │
    └─ Error (4xx, 5xx, network error)
          ↓
      Throw error
          ↓
      Catch in api.ts
          ↓
      Log warning
          ↓
      Return static data from data.ts
          ↓
      Component renders normally!
```

## Type Safety Flow

```
TypeScript Compilation
    ↓
Check types.ts definitions
    ↓
Verify function signatures
    ↓
    ├─ Correct usage?
    │     ↓
    │  Compile successfully
    │     ↓
    │  Runtime with confidence
    │
    └─ Type mismatch?
          ↓
      Show error in IDE
          ↓
      Prevent compilation
          ↓
      Developer fixes issue
```

## Performance Optimization

### Bundle Size Optimization

```
Server Components (RSC)
    ↓
Data fetching code stays on server
    ↓
Only HTML sent to client
    ↓
Smaller JavaScript bundle
    ↓
Faster page loads
```

### Image Optimization

```
Strapi generates responsive images
    ↓
Multiple formats available:
  • thumbnail (150px)
  • small (500px)
  • medium (750px)
  • large (1000px)
  • original (full size)
    ↓
Use appropriate size for context
    ↓
Faster loads, less bandwidth
```

## Deployment Considerations

### Environment Variables

```
Development (.env.local)
  NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
  STRAPI_API_TOKEN=dev_token_here

Production
  NEXT_PUBLIC_STRAPI_URL=https://cms.yoursite.com
  STRAPI_API_TOKEN=prod_token_here
```

### Build Process

```
npm run build
    ↓
Next.js fetches data from Strapi
    ↓
Generates static pages where possible
    ↓
Sets up ISR for dynamic data
    ↓
Optimizes and bundles
    ↓
Ready to deploy
```

## Scalability

### Horizontal Scaling

```
Load Balancer
    ↓
    ├─ Next.js Instance 1
    │     ↓
    ├─ Next.js Instance 2
    │     ↓
    └─ Next.js Instance 3
          ↓
    All connect to same Strapi
```

### Caching Layers

```
User Request
    ↓
CDN (Vercel, Cloudflare)
    ↓
Next.js ISR Cache
    ↓
Strapi Database
```

## Security

### API Token

```
Environment Variable (server-only)
    ↓
STRAPI_API_TOKEN
    ↓
Never exposed to client
    ↓
Used in server-side fetch only
    ↓
Sent as Authorization header
```

### Content Security

```
Strapi Permissions
    ↓
API Token with 'read' only
    ↓
No write/delete permissions
    ↓
Safe for frontend use
```

## Monitoring

### Error Logging

```
fetchAPI() error
    ↓
console.error() with details
    ↓
Caught by error boundary (optional)
    ↓
Fallback data served
    ↓
User sees working site
```

### Health Checks

```typescript
// Check if Strapi is available
const health = await fetch(`${STRAPI_URL}/api/health`);
if (!health.ok) {
  // Alert monitoring system
}
```

## Extension Points

### Adding New Content Types

1. Define types in `types.ts`
2. Add fetch function in `strapi.ts`
3. Add wrapper in `api.ts`
4. Add fallback data in `data.ts`
5. Export from `index.ts`
6. Use in components!

### Custom Transformations

```typescript
// strapi.ts
function transformCustomType(data: StrapiData): CustomType {
  return {
    // Transform logic
  };
}
```

### Additional Features

- GraphQL support (replace REST calls)
- Redis caching layer
- Search functionality
- Multi-language support
- Real-time updates (webhooks)

## Best Practices

1. ✅ Always use `api.ts` in components
2. ✅ Use `getStrapiImageUrl()` for images
3. ✅ Add proper TypeScript types
4. ✅ Handle null/undefined cases
5. ✅ Test with Strapi off (fallback)
6. ✅ Configure appropriate revalidation times
7. ✅ Use Server Components when possible
8. ✅ Keep API tokens secret

## Summary

- **Layered architecture** for separation of concerns
- **Automatic fallback** ensures reliability
- **Type safety** throughout the stack
- **Performance optimized** with ISR
- **Developer friendly** with clear APIs
- **Production ready** with proper error handling
