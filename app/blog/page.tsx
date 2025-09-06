import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { Metadata } from 'next';
import { BlogTimeline } from '@/components/Blogs/BlogTimeline';
import { getAllBlogs } from '@/lib/notion';

export const metadata: Metadata = {
  title: '博客列表 | My Blog',
  description: '查看所有博客文章',
};

export const revalidate = 3600; // 每小时重新验证一次

export default async function BlogListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BlogList />
    </Suspense>
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
