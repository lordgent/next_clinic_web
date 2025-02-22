import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from "@/config/config";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const res = await fetch(API_URL + '/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ message: 'Login failed' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', data.data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, 
  });

  return response;
}
