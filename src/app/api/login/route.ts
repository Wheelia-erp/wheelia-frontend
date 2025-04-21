import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const res = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const token = res.data.access_token;
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    return NextResponse.json({ success: false, message: 'Credenciais inválidas' }, { status: 401 });
  }
}