import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Quote } from "@/components/Quote";
import { Events } from "@/components/Events";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'NOT SET';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ? 'SET' : 'NOT SET';

async function fetchStrapi(endpoint: string) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api${endpoint}`;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (process.env.STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }
  const res = await fetch(url, { headers, next: { revalidate: 10 } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export default async function Home() {
  let debug: Record<string, string> = {
    STRAPI_URL,
    STRAPI_TOKEN,
  };

  let quote = { text: '', reference: '' };
  let services: any[] = [];
  let events: any[] = [];
  let navLinks: any[] = [];
  let footerColumns: any[] = [];

  try {
    const quoteRes = await fetchStrapi('/quote');
    quote = { text: quoteRes.data.attributes.text, reference: quoteRes.data.attributes.reference };
    debug.quote = 'OK';
  } catch (e: any) { debug.quote = e.message; }

  try {
    const servicesRes = await fetchStrapi('/services');
    services = servicesRes.data.map((s: any) => ({
      id: s.id, title: s.attributes.title, description: s.attributes.description,
      slug: s.attributes.slug, image: null,
    }));
    debug.services = `OK (${services.length})`;
  } catch (e: any) { debug.services = e.message; }

  try {
    const eventsRes = await fetchStrapi('/events?sort=date:asc&pagination[pageSize]=3');
    events = eventsRes.data.map((e: any) => ({
      id: e.id, title: e.attributes.title, description: e.attributes.description,
      date: e.attributes.date, displayDate: e.attributes.displayDate,
      slug: e.attributes.slug, image: null,
    }));
    debug.events = `OK (${events.length})`;
  } catch (e: any) { debug.events = e.message; }

  try {
    const navRes = await fetchStrapi('/navigation');
    navLinks = navRes.data.attributes.links || [];
    debug.navigation = `OK (${navLinks.length})`;
  } catch (e: any) { debug.navigation = e.message; }

  try {
    const footerRes = await fetchStrapi('/footer');
    footerColumns = footerRes.data.attributes.columns || [];
    debug.footer = `OK (${footerColumns.length})`;
  } catch (e: any) { debug.footer = e.message; }

  return (
    <main className="flex flex-col w-full">
      {/* Debug panel */}
      <div className="bg-yellow-100 text-black p-4 text-xs font-mono">
        <strong>STRAPI DEBUG:</strong>
        <pre>{JSON.stringify(debug, null, 2)}</pre>
      </div>

      <Navbar links={navLinks} />
      <Hero />
      <About />
      <Services services={services} />
      <Quote text={quote.text} reference={quote.reference} />
      <Events events={events} />
      <CTA />
      <Footer columns={footerColumns} />
    </main>
  );
}
