import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { Metadata } from 'next';
import { BlogTimeline } from '@/components/Blogs/BlogTimeline';
import { getAllBlogs } from '@/lib/notion';
import { MotionDiv } from '@/components/ui/motion';

export const metadata: Metadata = {
  title: 'Changelog | Cunoe',
  description: 'A journey through time, documenting the evolution of thoughts, projects, and digital adventures.',
};

export const revalidate = 300; // 每5分钟重新验证一次缓存

export default async function BlogListPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Suspense fallback={<Loading />}>
        <BlogList />
      </Suspense>
    </MotionDiv>
  );
}

async function BlogList() {
  try {
    // 获取所有博客
    const allBlogs = await getAllBlogs();
    return <BlogTimeline blogs={allBlogs} />;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">加载博客失败，请稍后重试。</p>
      </div>
    );
  }
}
