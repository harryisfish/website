import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import * as React from "react";
import {HeroUIProvider} from "@heroui/react";

export const metadata: Metadata = {
  title: "I am CUNOE, welcome！",
  description: "这是有关CUNOE的一切",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://chinese-fonts-cdn.deno.dev/packages/lxgwwenkaibright/dist/LXGWBright-Regular/result.css"
        />
      </head>
      <body style={{ fontFamily: "LXGW Bright", fontWeight: "400" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <HeroUIProvider>
            <Header />
            <main>{children}</main>
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
