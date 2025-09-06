import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 重定向 /blog 到 /changelog
  if (pathname === '/blog') {
    return NextResponse.redirect(new URL('/changelog', request.url));
  }

  // 重定向 /blog/xxx 到 /changelog/xxx
  if (pathname.startsWith('/blog/')) {
    const newPath = pathname.replace('/blog/', '/changelog/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blog',
    '/blog/:path*',
  ],
};
