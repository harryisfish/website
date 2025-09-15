import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 重定向 /changelog 到 /blog
  if (pathname === '/changelog') {
    return NextResponse.redirect(new URL('/blog', request.url));
  }

  // 重定向 /changelog/xxx 到 /blog/xxx
  if (pathname.startsWith('/changelog/')) {
    const newPath = pathname.replace('/changelog/', '/blog/');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/changelog',
    '/changelog/:path*',
  ],
};
