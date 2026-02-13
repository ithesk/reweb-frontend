# Quick Start Guide - Iglesia Revoluciona Frontend

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd /Users/pabloholguin/desarrollo2/reweb/frontend
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

That's it! Your church website is now running.

---

## ✅ What's Already Done

### Components Created (8/8)
- ✅ Navbar.tsx (sticky navigation)
- ✅ Hero.tsx (full-screen hero)
- ✅ About.tsx (quiénes somos)
- ✅ Services.tsx (servicios cards)
- ✅ Quote.tsx (bible verse)
- ✅ Events.tsx (eventos cards)
- ✅ CTA.tsx (call-to-action)
- ✅ Footer.tsx (footer with links)

### Core Files Updated (3/3)
- ✅ page.tsx (home page)
- ✅ layout.tsx (root layout)
- ✅ globals.css (styles)

### Data Layer Complete (4/4)
- ✅ types.ts (TypeScript interfaces)
- ✅ data.ts (static fallback data)
- ✅ strapi.ts (API client)
- ✅ api.ts (unified API with fallback)

### Documentation (4/4)
- ✅ README.md
- ✅ PROJECT_STRUCTURE.md
- ✅ FILES_CREATED.md
- ✅ COMPONENT_GUIDE.md

---

## 📋 Verification Checklist

Run through this checklist to ensure everything works:

### Basic Functionality
```bash
# 1. Check if dev server starts
npm run dev
# ✅ Should start without errors

# 2. Open browser
# http://localhost:3000
# ✅ Page should load

# 3. Verify all sections appear
# ✅ Navbar at top
# ✅ Hero with "Iglesia revoluciona"
# ✅ About section with text and image placeholder
# ✅ Services with 3 cards
# ✅ Quote section with Bible verse
# ✅ Events with 3 cards
# ✅ CTA section
# ✅ Footer with 3 columns
```

### Responsive Testing
```
# 4. Test mobile view
# - Open dev tools (F12)
# - Toggle device toolbar
# - Select iPhone or Android
# ✅ Hamburger menu appears
# ✅ Menu opens/closes
# ✅ Single column layout
# ✅ All sections stack vertically

# 5. Test tablet view
# - Set width to 768px
# ✅ 2-column grids for services/events
# ✅ About section side-by-side

# 6. Test desktop view
# - Set width to 1280px
# ✅ Full navigation visible
# ✅ 3-column grids
# ✅ Proper spacing
```

### Navigation Testing
```
# 7. Test navbar
# ✅ Logo clickable
# ✅ Nav links present
# ✅ Search icon visible
# ✅ User icon visible
# ✅ Mobile menu toggle works

# 8. Test buttons
# ✅ Hero buttons
# ✅ About CTA button
# ✅ CTA section buttons
# ✅ Hover effects work
```

---

## 🎨 Customization Guide

### Change Content

**Edit**: `src/lib/data.ts`

```typescript
// Update navigation
export const navLinks = [
  { label: "Your Label", href: "/your-path" }
];

// Update services
export const services = [
  {
    id: 1,
    title: "Your Service",
    description: "Your description",
    // ...
  }
];

// Update events, footer, etc.
```

### Change Colors

**Edit component files** (e.g., `src/components/Hero.tsx`)

```tsx
// Current
className="bg-[#0a0a0a]"

// Change to your color
className="bg-[#YOUR_COLOR]"
```

### Add Real Images

**Step 1**: Add images to `/public/images/`
```
public/
  images/
    hero-bg.jpg
    servicios.jpg
    grupos.jpg
    evento1.jpg
    etc.
```

**Step 2**: Replace placeholder divs

```tsx
// Before (in component)
<div className="bg-gray-300">Image Placeholder</div>

// After
import Image from "next/image";

<Image
  src="/images/hero-bg.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  className="object-cover"
/>
```

---

## 🔌 Strapi Integration (Optional)

The site works perfectly **without Strapi** using static data.

### To Connect Strapi:

**Step 1**: Create `.env.local`
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
```

**Step 2**: That's it!
- Data will automatically come from Strapi
- Falls back to static data if Strapi is down
- No code changes needed

---

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or deploy to Vercel
# Push to GitHub and connect to Vercel
```

---

## 🐛 Troubleshooting

### Issue: `npm run dev` fails
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors
**Solution**:
```bash
# Check for missing dependencies
npm install
```

### Issue: Styles not loading
**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## 📚 Additional Resources

- **Full Documentation**: See `PROJECT_STRUCTURE.md`
- **Component Details**: See `COMPONENT_GUIDE.md`
- **File List**: See `FILES_CREATED.md`

### External Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev/icons)

---

## 🎯 Next Steps

### Immediate (Now)
1. ✅ Run `npm run dev`
2. ✅ View site at http://localhost:3000
3. ✅ Verify all sections load

### Short Term (This Week)
1. 🔲 Add real images
2. 🔲 Update content in `data.ts`
3. 🔲 Test on real mobile devices
4. 🔲 Deploy to Vercel

### Medium Term (This Month)
1. 🔲 Connect Strapi CMS (optional)
2. 🔲 Add contact form
3. 🔲 Create service detail pages
4. 🔲 Create event detail pages
5. 🔲 Add SEO optimization

### Long Term (Future)
1. 🔲 Add blog section
2. 🔲 Newsletter integration
3. 🔲 Search functionality
4. 🔲 Multi-language support
5. 🔲 Social media feeds

---

## 💡 Pro Tips

### Tip 1: Keep Static Data Updated
Even if using Strapi, keep `data.ts` updated as fallback.

### Tip 2: Test Responsiveness Often
Use browser dev tools to test different screen sizes.

### Tip 3: Use Semantic HTML
Components already use semantic tags (`<nav>`, `<section>`, `<footer>`).

### Tip 4: Optimize Images
Use Next.js Image component for automatic optimization.

### Tip 5: Monitor Performance
Use Lighthouse in Chrome DevTools to check performance.

---

## 🎉 You're Ready!

Your church website is:
- ✅ Fully functional
- ✅ Responsive on all devices
- ✅ Production-ready
- ✅ Easy to customize
- ✅ Well-documented

**Need help?** Review the documentation files or check the component code comments.

---

**Happy Building! 🚀**

Built with Next.js 14+, TypeScript, and Tailwind CSS
