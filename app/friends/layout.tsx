import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Friends | Harry',
  description: '那些人，那些事 - Harry的朋友们',
  openGraph: {
    title: 'Friends | Harry',
    description: '那些人，那些事 - Harry的朋友们',
    type: 'website',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
