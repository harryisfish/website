import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '友链',
  description: '那些人，那些事 — Harry 的朋友们',
  alternates: {
    canonical: '/friends',
  },
  openGraph: {
    title: '友链 | 海鱼Harry',
    description: '那些人，那些事 — Harry 的朋友们',
    url: '/friends',
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
    title: '友链 | 海鱼Harry',
    description: '那些人，那些事 — Harry 的朋友们',
    images: ['/harry.png'],
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
