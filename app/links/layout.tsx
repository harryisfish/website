import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '友情链接 | Cunoe',
  description: '那些人，那些事 - Cunoe的友情链接',
  openGraph: {
    title: '友情链接 | Cunoe',
    description: '那些人，那些事 - Cunoe的友情链接',
    type: 'website',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
