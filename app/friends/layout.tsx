import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '友链 | 海鱼Harry',
  description: '那些人，那些事 — Harry 的朋友们',
  openGraph: {
    title: '友链 | 海鱼Harry',
    description: '那些人，那些事 — Harry 的朋友们',
    type: 'website',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
