import { Navbar } from "@/components/Navbar";
import { QuickActions } from "@/components/QuickActions";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Quote } from "@/components/Quote";
import { Events } from "@/components/Events";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { getServices, getEvents, getQuote, getNavigation, getFooter } from "@/lib/api";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi(endpoint: string) {
  if (!STRAPI_URL) return null;
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const [services, events, quote, navLinks, footerColumns] = await Promise.all([
    getServices(),
    getEvents(3),
    getQuote(),
    getNavigation(),
    getFooter(),
  ]);

  // Fetch home-page sections (hero, about, cta, section headers)
  const hpParams = new URLSearchParams({
    'populate[hero][populate]': 'ctaPrimary,ctaSecondary',
    'populate[about][populate]': '*',
    'populate[cta][populate]': 'buttonPrimary,buttonSecondary',
    'populate[servicesHeader]': '*',
    'populate[eventsHeader]': '*',
    'populate[quickActions]': '*',
  });
  const homePageRes = await fetchStrapi(`/home-page?${hpParams.toString()}`);
  const hp = homePageRes?.data?.attributes;

  // Fetch site settings
  const settingsRes = await fetchStrapi('/site-settings');
  const settings = settingsRes?.data?.attributes;

  return (
    <main className="flex flex-col w-full">
      <Navbar
        links={navLinks}
        searchPlaceholder={settings?.searchPlaceholder}
      />
      <QuickActions actions={hp?.quickActions} />
      <Hero
        welcomeLabel={hp?.hero?.title ? "BIENVENIDO A" : undefined}
        subtitle={hp?.hero?.subtitle}
        ctaPrimaryLabel={hp?.hero?.ctaPrimary?.label}
        ctaPrimaryHref={hp?.hero?.ctaPrimary?.href}
        ctaSecondaryLabel={hp?.hero?.ctaSecondary?.label}
        ctaSecondaryHref={hp?.hero?.ctaSecondary?.href}
      />
      <About
        label={hp?.about?.label}
        title={hp?.about?.title}
        description={hp?.about?.description}
        ctaLabel={hp?.about?.ctaLabel}
        ctaHref={hp?.about?.ctaHref}
      />
      <Services
        services={services}
        headerLabel={hp?.servicesHeader?.label}
        headerTitle={hp?.servicesHeader?.title}
        headerDescription={hp?.servicesHeader?.description}
      />
      <Quote text={quote.text} reference={quote.reference} />
      <Events
        events={events}
        headerLabel={hp?.eventsHeader?.label}
        headerTitle={hp?.eventsHeader?.title}
      />
      <CTA
        title={hp?.cta?.title}
        subtitle={hp?.cta?.subtitle}
        buttonPrimaryLabel={hp?.cta?.buttonPrimary?.label}
        buttonSecondaryLabel={hp?.cta?.buttonSecondary?.label}
        buttonSecondaryHref={hp?.cta?.buttonSecondary?.href}
      />
      <Footer
        columns={footerColumns}
        tagline={settings?.tagline}
        copyright={settings?.copyright}
        privacyLabel={settings?.privacyLabel}
        privacyHref={settings?.privacyHref}
        termsLabel={settings?.termsLabel}
        termsHref={settings?.termsHref}
      />
    </main>
  );
}
