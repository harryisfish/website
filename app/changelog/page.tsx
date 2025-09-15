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

export const revalidate = 600; // 每10分钟重新验证一次缓存

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
  console.log('[ChangelogPage] 开始获取博客列表');
  const startTime = Date.now();
  
  try {
    // 获取所有博客
    console.log('[ChangelogPage] 调用 getAllBlogs() 获取所有博客');
    const allBlogs = await getAllBlogs();
    
    const duration = Date.now() - startTime;
    console.log(`[ChangelogPage] 成功获取 ${allBlogs.length} 篇博客，耗时: ${duration}ms`);
    
    // 记录博客基本信息用于调试
    if (allBlogs.length > 0) {
      console.log('[ChangelogPage] 博客列表预览:', {
        total: allBlogs.length,
        firstBlog: {
          id: allBlogs[0].id,
          title: allBlogs[0].title,
          urlname: allBlogs[0].urlname,
          status: allBlogs[0].status,
          created_at: allBlogs[0].created_at
        },
        lastBlog: {
          id: allBlogs[allBlogs.length - 1].id,
          title: allBlogs[allBlogs.length - 1].title,
          urlname: allBlogs[allBlogs.length - 1].urlname,
          status: allBlogs[allBlogs.length - 1].status,
          created_at: allBlogs[allBlogs.length - 1].created_at
        }
      });
    } else {
      console.log('[ChangelogPage] 警告: 没有获取到任何博客');
    }
    
    return <BlogTimeline blogs={allBlogs} />;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[ChangelogPage] 获取博客失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">加载博客失败，请稍后重试。</p>
      </div>
    );
  }
}
