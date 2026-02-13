# Component Visual Guide - Iglesia Revoluciona

## Page Layout Overview

```
┌─────────────────────────────────────────┐
│           NAVBAR (Sticky)               │ ← Dark (#0a0a0a)
│  Logo + Nav Links + Search + User       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│                                         │
│             HERO SECTION                │ ← Dark with image overlay
│     "Iglesia revoluciona"               │    Full viewport height
│  "Un lugar donde tu vida..."            │
│   [Conócelo] [Conéctate]               │
│                                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         ABOUT / QUIÉNES SOMOS           │ ← White background
│  ┌────────────────┬──────────────────┐  │
│  │ QUIÉNES SOMOS  │                  │  │
│  │ "Una comunidad │   [Image]        │  │
│  │  que transforma│                  │  │
│  │    vidas"      │                  │  │
│  │ [Description]  │                  │  │
│  │ [Button]       │                  │  │
│  └────────────────┴──────────────────┘  │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      SERVICES / ENCUENTRA TU LUGAR      │ ← Light gray (#f5f5f5)
│      "NUESTROS SERVICIOS"               │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │[Img] │  │[Img] │  │[Img] │          │
│  │Title │  │Title │  │Title │          │
│  │Desc  │  │Desc  │  │Desc  │          │
│  └──────┘  └──────┘  └──────┘          │
│  Dominical  Grupos    Servicio          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│           QUOTE / BIBLE VERSE           │ ← Dark (#0a0a0a)
│                                         │
│  "Porque donde están dos o tres..."     │
│           Mateo 18:20                   │
│                                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      EVENTS / PRÓXIMOS EVENTOS          │ ← White background
│    "No te pierdas lo que viene"         │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │[Img] │  │[Img] │  │[Img] │          │
│  │Date  │  │Date  │  │Date  │          │
│  │Title │  │Title │  │Title │          │
│  │Desc  │  │Desc  │  │Desc  │          │
│  └──────┘  └──────┘  └──────┘          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│               CTA SECTION               │ ← Dark (#0a0a0a)
│   "Se parte de la revolución"           │
│  "Tu historia importa..."               │
│ [Visítanos] [Conoce más]               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│                FOOTER                   │ ← Dark (#0a0a0a)
│  ┌─────────┬─────────┬─────────┐        │
│  │NOSOTROS │SERVICIO │ REDES   │        │
│  │ Link 1  │ Link 1  │Instagram│        │
│  │ Link 2  │ Link 2  │YouTube  │        │
│  │ Link 3  │ Link 3  │Facebook │        │
│  │ Link 4  │ Link 4  │Spotify  │        │
│  └─────────┴─────────┴─────────┘        │
│  © 2024 Iglesia Revoluciona             │
│  Privacidad | Términos                  │
└─────────────────────────────────────────┘
```

## Component Details

### 1. Navbar Component

```tsx
// Location: src/components/Navbar.tsx
// Type: Client Component (uses useState)

┌─────────────────────────────────────────────┐
│ [Logo] Iglesia Revoluciona                  │
│                                              │
│  Inicio  Grupos  Servicios  Nosotros   🔍 👤│
└─────────────────────────────────────────────┘

Mobile:
┌─────────────────────────────────────────────┐
│ [Logo] Iglesia Revoluciona            ☰     │
└─────────────────────────────────────────────┘
  ↓ (Menu opens)
┌─────────────────────────────────────────────┐
│ Inicio                                       │
│ Grupos                                       │
│ Servicios                                    │
│ Nosotros                                     │
│ ────────────────                             │
│ 🔍 👤                                        │
└─────────────────────────────────────────────┘
```

**Props**: None (uses static data from lib/data.ts)

**Features**:
- Sticky position
- Mobile hamburger menu
- Smooth transitions
- Dark background (#0a0a0a)

---

### 2. Hero Component

```tsx
// Location: src/components/Hero.tsx
// Type: Server Component

┌───────────────────────────────────────────────┐
│                                               │
│  BIENVENIDO A                                 │
│                                               │
│  Iglesia revoluciona                          │
│  (serif italic + bold sans)                   │
│                                               │
│  Un lugar donde tu vida es transformada       │
│                                               │
│  ┌──────────┐  ┌──────────┐                  │
│  │Conócelo  │  │Conéctate │                  │
│  └──────────┘  └──────────┘                  │
│                                               │
└───────────────────────────────────────────────┘
   [Background: Dark image with gradient overlay]
```

**Props**: None (uses heroData from lib/data.ts)

**Data Structure**:
```typescript
{
  title: string,
  subtitle: string,
  backgroundImage: StrapiImage,
  ctaPrimary: { label, href },
  ctaSecondary: { label, href }
}
```

---

### 3. About Component

```tsx
// Location: src/components/About.tsx
// Type: Server Component

┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────────────────┬───────────────────┐  │
│  │  QUIÉNES SOMOS   │                   │  │
│  │                  │                   │  │
│  │  Una comunidad   │     [Image       │  │
│  │  que transforma  │    Placeholder]  │  │
│  │  vidas           │                   │  │
│  │                  │                   │  │
│  │  [Long text...]  │                   │  │
│  │                  │                   │  │
│  │  ┌─────────────┐ │                   │  │
│  │  │Conoce más   │ │                   │  │
│  │  └─────────────┘ │                   │  │
│  └──────────────────┴───────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

**Props**: None (uses aboutData from lib/data.ts)

**Layout**:
- Desktop: 2 columns (50/50)
- Mobile: Stacked (text top, image bottom)

---

### 4. Services Component

```tsx
// Location: src/components/Services.tsx
// Type: Server Component

┌──────────────────────────────────────────────┐
│         NUESTROS SERVICIOS                   │
│        Encuentra tu lugar                    │
│                                              │
│  ┌───────┐  ┌───────┐  ┌───────┐           │
│  │ ┌───┐ │  │ ┌───┐ │  │ ┌───┐ │           │
│  │ │Img│ │  │ │Img│ │  │ │Img│ │           │
│  │ └───┘ │  │ └───┘ │  │ └───┘ │           │
│  │       │  │       │  │       │           │
│  │Service│  │Grupos │  │Servicio│          │
│  │Domin. │  │de Vida│  │Comunit.│          │
│  │       │  │       │  │       │           │
│  │[Text] │  │[Text] │  │[Text] │           │
│  └───────┘  └───────┘  └───────┘           │
│                                              │
└──────────────────────────────────────────────┘
```

**Props**: None (uses services array from lib/data.ts)

**Data Structure**:
```typescript
Service[] = [
  {
    id: number,
    title: string,
    description: string,
    slug: string,
    image: StrapiImage
  }
]
```

**Grid**:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

---

### 5. Quote Component

```tsx
// Location: src/components/Quote.tsx
// Type: Server Component

┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│   "Porque donde están dos o tres            │
│    congregados en mi nombre, allí            │
│    estoy yo en medio de ellos."              │
│                                              │
│              Mateo 18:20                     │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

**Props**: None (uses quoteData from lib/data.ts)

**Styling**:
- Text: Italic, large (text-2xl to text-4xl)
- Reference: Uppercase, smaller, gray
- Background: Dark (#0a0a0a)
- Text color: White

---

### 6. Events Component

```tsx
// Location: src/components/Events.tsx
// Type: Server Component

┌──────────────────────────────────────────────┐
│  PRÓXIMOS EVENTOS                Ver todos > │
│  No te pierdas lo que viene                  │
│                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │┌────┐│  │┌────┐│  │┌────┐│              │
│  ││Img ││  ││Img ││  ││Img ││              │
│  │└────┘│  │└────┘│  │└────┘│              │
│  │NOV 24│  │NOV 29│  │DIC 01│              │
│  │DOMINGO│  │VIERNES│ │DOMINGO│             │
│  │      │  │      │  │      │              │
│  │Service│ │Noche │  │Día de│              │
│  │Especial│ │Jóvenes│ │Familia│            │
│  │      │  │      │  │      │              │
│  │[Text]│  │[Text]│  │[Text]│              │
│  └──────┘  └──────┘  └──────┘              │
└──────────────────────────────────────────────┘
```

**Props**: None (uses events array from lib/data.ts)

**Data Structure**:
```typescript
ChurchEvent[] = [
  {
    id: number,
    title: string,
    date: string, // ISO format
    displayDate: string, // "NOV 24 - DOMINGO"
    description: string,
    slug: string,
    image: StrapiImage
  }
]
```

---

### 7. CTA Component

```tsx
// Location: src/components/CTA.tsx
// Type: Server Component

┌──────────────────────────────────────────────┐
│                                              │
│        Se parte de la revolución             │
│                                              │
│   Tu historia importa. Ven y descubre        │
│   lo que Dios tiene preparado para ti.       │
│                                              │
│  ┌─────────────┐  ┌─────────────┐           │
│  │Visítanos    │  │Conoce más   │           │
│  │este domingo │  │             │           │
│  └─────────────┘  └─────────────┘           │
│                                              │
└──────────────────────────────────────────────┘
```

**Props**: None (uses ctaData from lib/data.ts)

**Button Variants**:
- Outlined: Transparent bg, white border
- Solid: White bg, dark text

---

### 8. Footer Component

```tsx
// Location: src/components/Footer.tsx
// Type: Server Component

┌──────────────────────────────────────────────┐
│                                              │
│  ┌────────────┬────────────┬────────────┐   │
│  │ NOSOTROS   │ SERVICIO   │ REDES      │   │
│  │            │            │            │   │
│  │ Nuestra    │ Servicios  │ Instagram  │   │
│  │ Historia   │ Dominicales│ YouTube    │   │
│  │            │            │            │   │
│  │ Creemos    │ Grupos de  │ Facebook   │   │
│  │            │ Vida       │            │   │
│  │ Pastores   │            │ Spotify    │   │
│  │            │ Jóvenes    │            │   │
│  │ Liderazgo  │            │            │   │
│  │            │ Niños      │            │   │
│  └────────────┴────────────┴────────────┘   │
│                                              │
│  ────────────────────────────────────────    │
│                                              │
│  © 2024 Iglesia Revoluciona.                 │
│  Todos los derechos reservados.              │
│                        Privacidad | Términos │
└──────────────────────────────────────────────┘
```

**Props**: None (uses footerColumns from lib/data.ts)

**Layout**:
- Desktop: 3 columns
- Mobile: Stacked

---

## Data Flow

```
┌──────────────┐
│  page.tsx    │  Imports all components
└──────┬───────┘
       │
       ├─→ Navbar ─→ navLinks (data.ts)
       │
       ├─→ Hero ─→ heroData (data.ts)
       │
       ├─→ About ─→ aboutData (data.ts)
       │
       ├─→ Services ─→ services[] (data.ts)
       │
       ├─→ Quote ─→ quoteData (data.ts)
       │
       ├─→ Events ─→ events[] (data.ts)
       │
       ├─→ CTA ─→ ctaData (data.ts)
       │
       └─→ Footer ─→ footerColumns (data.ts)
```

## Responsive Behavior

### Mobile (< 768px)
```
┌─────────────┐
│   Navbar    │ Hamburger menu
├─────────────┤
│    Hero     │ Stacked layout
├─────────────┤
│   About     │ Text above image
├─────────────┤
│  Services   │ 1 column grid
├─────────────┤
│   Quote     │ Smaller text
├─────────────┤
│   Events    │ 1 column grid
├─────────────┤
│    CTA      │ Stacked buttons
├─────────────┤
│   Footer    │ Stacked columns
└─────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────┐
│     Navbar      │ Full nav links
├─────────────────┤
│      Hero       │ Same
├─────────────────┤
│     About       │ Side by side
├─────────────────┤
│    Services     │ 2 columns
├─────────────────┤
│     Quote       │ Larger text
├─────────────────┤
│     Events      │ 2 columns
├─────────────────┤
│      CTA        │ Side by side
├─────────────────┤
│     Footer      │ 3 columns
└─────────────────┘
```

### Desktop (> 1024px)
```
┌───────────────────────┐
│       Navbar          │ Full layout
├───────────────────────┤
│        Hero           │ Full viewport
├───────────────────────┤
│       About           │ 50/50 split
├───────────────────────┤
│      Services         │ 3 columns
├───────────────────────┤
│       Quote           │ Max width
├───────────────────────┤
│       Events          │ 3 columns
├───────────────────────┤
│        CTA            │ Centered
├───────────────────────┤
│       Footer          │ 3 columns wide
└───────────────────────┘
```

## Color Reference

| Section    | Background | Text       | Accent     |
|------------|-----------|------------|------------|
| Navbar     | #0a0a0a   | #ffffff    | -          |
| Hero       | #0a0a0a   | #ffffff    | -          |
| About      | #ffffff   | #111111    | #666666    |
| Services   | #f5f5f5   | #111111    | #666666    |
| Quote      | #0a0a0a   | #ffffff    | #a0a0a0    |
| Events     | #ffffff   | #111111    | #666666    |
| CTA        | #0a0a0a   | #ffffff    | -          |
| Footer     | #0a0a0a   | #ffffff    | #a0a0a0    |

---

**Ready to use!** All components are fully functional and responsive.
