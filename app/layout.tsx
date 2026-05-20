import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import * as React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.harryis.fish'),
  title: {
    default: '海鱼Harry@harryisfish',
    template: '%s | 海鱼Harry',
  },
  description: 'Harry 的个人网站，记录产品、工程、AI、Web3 与生活观察。',
  applicationName: '海鱼Harry',
  authors: [{ name: 'Harry', url: 'https://www.harryis.fish' }],
  creator: 'Harry',
  publisher: 'Harry',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/harry.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: '海鱼Harry@harryisfish',
    description: 'Harry 的个人网站，记录产品、工程、AI、Web3 与生活观察。',
    url: '/',
    siteName: '海鱼Harry',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/harry.png',
        width: 140,
        height: 140,
        alt: '海鱼Harry',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '海鱼Harry@harryisfish',
    description: 'Harry 的个人网站，记录产品、工程、AI、Web3 与生活观察。',
    images: ['/harry.png'],
    creator: '@harry_is_fish',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="https://unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <link
          rel="stylesheet"
          href="https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkaibright/dist/LXGWBright-Regular/result.css"
        />
        <link
          rel="stylesheet"
          href="https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkaibright/dist/LXGWBright-Medium/result.css"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange>
          <Header />
          <main className="relative pt-14 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
            <div
              className="fixed inset-0 opacity-30 dark:opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'url(/background.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="relative z-10">{children}</div>
          </main>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-TXG3G5FQ2N" />
      </body>
    </html>
  );
}
