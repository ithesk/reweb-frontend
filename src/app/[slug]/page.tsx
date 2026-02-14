import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getNavigation, getFooter } from "@/lib/api";

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

async function getPageBySlug(slug: string) {
  // Try pages first
  const pageParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate[sections][populate]': '*',
    'populate': 'heroImage',
  });
  const pageRes = await fetchStrapi(`/pages?${pageParams.toString()}`);
  if (pageRes?.data?.length) return { type: 'page' as const, data: pageRes.data[0] };

  // Try services
  const svcParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': 'image',
  });
  const svcRes = await fetchStrapi(`/services?${svcParams.toString()}`);
  if (svcRes?.data?.length) return { type: 'service' as const, data: svcRes.data[0] };

  // Try events
  const evtParams = new URLSearchParams({
    'filters[slug][$eq]': slug,
    'populate': 'image',
  });
  const evtRes = await fetchStrapi(`/events?${evtParams.toString()}`);
  if (evtRes?.data?.length) return { type: 'event' as const, data: evtRes.data[0] };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPageBySlug(slug);
  if (!result) return { title: 'Pagina no encontrada' };
  const attrs = result.data.attributes;
  return {
    title: `${attrs.title} | Iglesia Revoluciona`,
    description: attrs.description || '',
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [result, navLinks, footerColumns] = await Promise.all([
    getPageBySlug(slug),
    getNavigation(),
    getFooter(),
  ]);

  if (!result) notFound();

  const attrs = result.data.attributes;

  return (
    <main className="flex flex-col w-full">
      <Navbar links={navLinks} />

      {/* Hero */}
      <section className="relative w-full py-20 md:py-32 bg-[var(--bg-dark)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative flex flex-col items-center justify-center px-6 md:px-10 lg:px-[80px] gap-4">
          <h1 className="font-display text-[36px] md:text-[48px] lg:text-[64px] font-extrabold text-white tracking-[-1.5px] text-center">
            {attrs.heroTitle || attrs.title}
          </h1>
          {(attrs.heroSubtitle || attrs.description) && (
            <p className="font-body text-[16px] md:text-[20px] text-white/80 text-center max-w-[700px]">
              {attrs.heroSubtitle || attrs.description}
            </p>
          )}
          {result.type === 'event' && attrs.displayDate && (
            <span className="font-body text-[14px] text-white/60 tracking-[1px]">
              {attrs.displayDate}
            </span>
          )}
        </div>
      </section>

      {/* Rich text content (pages only) */}
      {result.type === 'page' && attrs.content && (
        <section className="w-full px-6 md:px-10 lg:px-[200px] py-16 md:py-[80px] bg-[var(--bg-primary)]">
          <div
            className="prose prose-lg max-w-none font-body text-[var(--text-primary)]
              prose-headings:font-display prose-headings:text-[var(--text-primary)]
              prose-p:text-[var(--text-secondary)] prose-p:leading-[1.7]
              prose-a:text-[var(--text-primary)] prose-a:underline
              prose-strong:text-[var(--text-primary)]
              prose-ul:text-[var(--text-secondary)] prose-ol:text-[var(--text-secondary)]"
            dangerouslySetInnerHTML={{ __html: attrs.content }}
          />
        </section>
      )}

      {/* Description for services/events */}
      {result.type !== 'page' && attrs.description && (
        <section className="w-full px-6 md:px-10 lg:px-[200px] py-16 md:py-[80px] bg-[var(--bg-primary)]">
          <p className="font-body text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-[1.7] max-w-[800px] mx-auto text-center">
            {attrs.description}
          </p>
        </section>
      )}

      {/* Dynamic sections (pages only) */}
      {result.type === 'page' && attrs.sections && attrs.sections.length > 0 && (
        <>
          {attrs.sections.map((section: any, index: number) => {
            switch (section.__component) {
              case 'shared.quote':
                return (
                  <section key={index} className="flex flex-col items-center justify-center gap-6 w-full px-6 md:px-16 lg:px-[200px] py-16 md:py-[100px] bg-[var(--bg-primary)]">
                    <blockquote className="font-display text-[24px] md:text-[30px] lg:text-[36px] font-light text-[var(--text-primary)] tracking-[-0.5px] leading-[1.3] text-center max-w-[900px]">
                      {section.text}
                    </blockquote>
                    {section.reference && (
                      <cite className="font-body text-[13px] md:text-[14px] font-semibold text-[var(--text-secondary)] tracking-[2px] not-italic">
                        {section.reference}
                      </cite>
                    )}
                  </section>
                );
              case 'shared.section-header':
                return (
                  <section key={index} className="flex flex-col items-center gap-4 w-full px-6 md:px-10 lg:px-[80px] py-12 md:py-16 bg-[var(--bg-surface)]">
                    {section.label && (
                      <span className="font-display text-[12px] font-bold text-[var(--text-secondary)] tracking-[3px]">
                        {section.label}
                      </span>
                    )}
                    <h2 className="font-display text-[32px] md:text-[40px] font-extrabold text-[var(--text-primary)] tracking-[-1px] text-center">
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="font-body text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6] text-center max-w-[600px]">
                        {section.description}
                      </p>
                    )}
                  </section>
                );
              case 'shared.cta-section':
                return (
                  <section key={index} className="relative w-full py-16 md:py-24 bg-[var(--bg-dark)] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.87)_0%,_rgba(0,0,0,1)_100%)]" />
                    <div className="relative flex flex-col items-center justify-center px-6 md:px-10 gap-6">
                      <h2 className="font-display text-[32px] md:text-[44px] font-extrabold text-white tracking-[-1.5px] text-center">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p className="font-body text-[15px] md:text-[18px] text-white/70 text-center max-w-[600px]">
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                  </section>
                );
              default:
                return null;
            }
          })}
        </>
      )}

      <Footer columns={footerColumns} />
    </main>
  );
}
