// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Se não tiver token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Senão, continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|login|signup|public|_next|favicon.ico).*)'],
};
