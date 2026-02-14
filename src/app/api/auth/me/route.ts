import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const jwt = request.cookies.get('strapi-jwt')?.value;
  if (!jwt) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    const response = NextResponse.json({ user: null }, { status: 401 });
    response.cookies.delete('strapi-jwt');
    return response;
  }

  const user = await res.json();
  return NextResponse.json({ user });
}
