import type { Metadata } from 'next';
import Script from "next/script";
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import * as React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: '海鱼Harry@harryisfish',
  description: '这是有关Harry的一切',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
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
                backgroundRepeat: 'no-repeat'
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
