// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Verifica se a rota é privada (adapte conforme suas rotas privadas)
  const isProtectedRoute =
    /^\/(dashboard|profile|settings|customers|quotes|contracts|invoices|sales|)/.test(
      req.nextUrl.pathname
    );

  // Se a rota for protegida e não tiver token, redireciona para login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Senão, continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/customers/:path*',
    '/settings/:path*',
    '/quotes/:path*',
    '/contracts/:path*',
    '/invoices/:path*',
    '/sales/:path*',
  ],
};
