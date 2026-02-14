import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, destination, frequency, paymentMethod } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(`${STRAPI_URL}/api/donations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          name,
          email,
          phone,
          amount,
          destination,
          frequency: frequency || 'normal',
          paymentMethod: paymentMethod || 'transferencia',
          status: 'pendiente',
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: 'Error al registrar la donacion', details: err },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.data?.id });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
