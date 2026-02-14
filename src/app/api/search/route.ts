import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function searchStrapi(endpoint: string, query: string, extraFields: string[] = []) {
  const params = new URLSearchParams({
    'filters[$or][0][title][$containsi]': query,
    'filters[$or][1][description][$containsi]': query,
    'fields[0]': 'title',
    'fields[1]': 'description',
    'fields[2]': 'slug',
    'pagination[pageSize]': '5',
  });
  extraFields.forEach((f, i) => {
    params.set(`fields[${i + 3}]`, f);
  });

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(`${STRAPI_URL}/api${endpoint}?${params}`, { headers });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ services: [], events: [], pages: [] });
  }

  const [services, events, pages] = await Promise.allSettled([
    searchStrapi('/services', q),
    searchStrapi('/events', q, ['displayDate']),
    searchStrapi('/pages', q),
  ]);

  const mapResults = (items: any[], type: string) =>
    items.map((item: any) => ({
      id: item.id,
      title: item.attributes?.title || item.title || '',
      description: item.attributes?.description || item.description || '',
      slug: item.attributes?.slug || item.slug || '',
      displayDate: item.attributes?.displayDate || item.displayDate || undefined,
      type,
    }));

  return NextResponse.json({
    services: mapResults(services.status === 'fulfilled' ? services.value : [], 'service'),
    events: mapResults(events.status === 'fulfilled' ? events.value : [], 'event'),
    pages: mapResults(pages.status === 'fulfilled' ? pages.value : [], 'page'),
  });
}
