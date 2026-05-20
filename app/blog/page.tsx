import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { MotionDiv, MotionH1, MotionP } from '@/components/ui/motion';
import { BlogTimeline } from '@/components/Blogs/BlogTimeline';
import { getAllBlogs } from '@/lib/notion';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: '博客',
  description: 'Harry 的博客 — 关于技术、AI、Web3 与生活的思考',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: '博客 | 海鱼Harry',
    description: 'Harry 的博客 — 关于技术、AI、Web3 与生活的思考',
    url: '/blog',
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
    title: '博客 | 海鱼Harry',
    description: 'Harry 的博客 — 关于技术、AI、Web3 与生活的思考',
    images: ['/harry.png'],
  },
};

export const revalidate = 600;

export default function BlogPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-20">
          <div className="mb-10 text-center">
            <MotionH1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">博客</MotionH1>
            <MotionP className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              关于技术、AI、Web3 与生活的思考
            </MotionP>
          </div>
          <Suspense fallback={<Loading />}>
            <BlogList />
          </Suspense>
        </div>
      </div>
    </MotionDiv>
  );
}

async function BlogList() {
  try {
    const allBlogs = await getAllBlogs();
    return <BlogTimeline blogs={allBlogs} />;
  } catch (error) {
    console.error(`[BlogPage] 获取博客失败`, {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return <p className="text-red-500 text-center py-8">加载博客失败，请稍后重试。</p>;
  }
}
