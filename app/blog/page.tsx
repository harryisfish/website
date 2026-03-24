import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { MotionDiv } from '@/components/ui/motion';
import { BlogTimeline } from '@/components/Blogs/BlogTimeline';
import { getAllBlogs } from '@/lib/notion';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: 'Blog | Harry',
  description: 'Harry 的博客 - 关于技术、AI、Web3 和生活的思考',
};

export const revalidate = 600;

export default function BlogPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
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
      timestamp: new Date().toISOString()
    });
    return <p className="text-red-500 text-center py-8">加载博客失败，请稍后重试。</p>;
  }
}
