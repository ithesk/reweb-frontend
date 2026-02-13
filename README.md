# Iglesia Revoluciona - Frontend

Complete church website built with Next.js 14+, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Overview

Modern, responsive church website featuring:
- 🏠 Full home page with 8 sections
- 📱 Mobile-first responsive design
- 🎨 Professional dark/light section design
- ⚡ Server-side rendering with Next.js App Router
- 🔄 Strapi CMS integration with static fallback
- 🎯 TypeScript for type safety
- 🚀 Ready for production deployment

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx               # About section
│   ├── Services.tsx            # Services cards
│   ├── Quote.tsx               # Bible verse
│   ├── Events.tsx              # Events cards
│   ├── CTA.tsx                 # Call-to-action
│   └── Footer.tsx              # Footer
└── lib/
    ├── types.ts                # TypeScript types
    ├── data.ts                 # Fallback data
    ├── strapi.ts               # Strapi API client
    └── api.ts                  # API with fallback
```

## Website Sections

### 1. **Navbar** (Sticky)
- Dark background with logo
- Desktop: horizontal navigation
- Mobile: hamburger menu
- Search and user icons

### 2. **Hero** (Full Height)
- Background image with overlay
- "Iglesia revoluciona" heading (mixed typography)
- Two CTA buttons
- Responsive layout

### 3. **About / Quiénes Somos**
- Two-column layout
- Mission description
- Image placeholder
- CTA button

### 4. **Services / Encuentra tu lugar**
- Three service cards
- Image, title, description
- Grid layout
- Hover effects

### 5. **Quote / Bible Verse**
- Dark background
- Centered italic text
- Scripture reference

### 6. **Events / Próximos Eventos**
- Three upcoming event cards
- Date badges
- "Ver todos" link
- Grid layout

### 7. **CTA / Call to Action**
- Dark background
- Centered content
- Two action buttons

### 8. **Footer**
- Three navigation columns
- Social media links
- Copyright and legal

## Features

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced
- ✅ Touch-friendly navigation

### Performance
- ✅ Server-side rendering (SSR)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Image optimization ready
- ✅ Fast page loads

### Developer Experience
- ✅ TypeScript for type safety
- ✅ Modular component structure
- ✅ Clean code organization
- ✅ Easy to maintain and extend

## Environment Variables

Create `.env.local` (optional):

```env
# Strapi CMS (optional - falls back to static data)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

**Note**: The website works perfectly without Strapi, using static fallback data.

## Strapi Integration

### Automatic Fallback
The app has a smart fallback system:
1. Try to fetch from Strapi
2. If Strapi is unavailable, use static data
3. No errors, seamless experience

### API Functions
- `getServices()` - Fetch all services
- `getEvents(limit)` - Fetch events
- `getNavigation()` - Fetch nav links
- `getFooter()` - Fetch footer data
- `getQuote()` - Fetch Bible verse
- `getHomePage()` - Fetch complete page

## Customization

### Update Content
Edit `src/lib/data.ts` to change:
- Navigation links
- Service cards
- Event information
- Footer links
- Hero text
- About section

### Update Styling
All styling uses Tailwind CSS:
- Colors: Edit in component files
- Spacing: Modify `className` props
- Typography: Update text classes

### Add Images
Replace placeholder divs:

```tsx
// Before (placeholder)
<div className="bg-gray-300">Image Placeholder</div>

// After (real image)
<Image
  src="/images/hero.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  className="object-cover"
/>
```

Add images to `/public/images/` folder.

## Color Palette

```css
Primary Dark:    #0a0a0a    (hero, quote, CTA, footer)
White:           #ffffff    (light sections)
Light Gray:      #f5f5f5    (services section)
Text Primary:    #111111    (main text)
Text Secondary:  #666666    (descriptions)
Text on Dark:    #ffffff    (white text)
Text Muted:      #a0a0a0    (muted on dark)
```

## Typography

- **Headings**: Bold, large-scale
- **Body**: Geist Sans
- **Labels**: Uppercase, tracking-widest
- **Special**: Mixed serif (Iglesia) + bold sans (revoluciona)

## Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Other Platforms
The app works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Documentation

- 📖 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed documentation
- 📖 [Next.js Docs](https://nextjs.org/docs)
- 📖 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 📖 [TypeScript Docs](https://www.typescriptlang.org/docs)

## Next Steps

1. **Add Real Content**
   - Replace placeholder images
   - Update text in `src/lib/data.ts`
   - Add actual service information

2. **Connect Strapi** (Optional)
   - Set up Strapi backend
   - Configure environment variables
   - Manage content through CMS

3. **SEO Optimization**
   - Add metadata to pages
   - Implement structured data
   - Create sitemap

4. **Add Dynamic Pages**
   - Service detail pages (`/servicios/[slug]`)
   - Event detail pages (`/eventos/[slug]`)
   - About pages

5. **Features**
   - Contact form
   - Newsletter signup
   - Search functionality
   - Blog section

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Strapi v5** - Headless CMS (optional)

## License

© 2024 Iglesia Revoluciona. All rights reserved.

## Support

For questions or issues, please review the [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) documentation.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
