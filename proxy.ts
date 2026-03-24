import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
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

  // 重定向旧的 /about 到首页
  if (pathname === '/about') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 重定向旧的 /links 到 /friends
  if (pathname === '/links') {
    return NextResponse.redirect(new URL('/friends', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/changelog',
    '/changelog/:path*',
    '/about',
    '/links',
  ],
};
