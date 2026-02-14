import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const path = searchParams.get('path');

  if (!path || !STRAPI_URL) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const res = await fetch(`${STRAPI_URL}${path}`);
    if (!res.ok) {
      return new NextResponse('Not found', { status: 404 });
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Error', { status: 500 });
  }
}
