'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { Blog } from '@/types/blog';
import { MotionUl } from '@/components/ui/motion';
import { BlogItem } from '@/components/Blogs/BlogItem';
import { useInView } from 'react-intersection-observer';

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchBlogs = async (cursor?: string) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      console.log('Fetching blogs with cursor:', cursor);
      const response = await fetch(`/api/blogs?limit=10${cursor ? `&cursor=${cursor}` : ''}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);

      if (cursor) {
        setBlogs((prev) => [...prev, ...data.blogs]);
      } else {
        setBlogs(data.blogs);
      }

      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error instanceof Error ? error.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Initial fetch');
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      console.log('Loading more blogs');
      const lastBlog = blogs[blogs.length - 1];
      if (lastBlog) {
        fetchBlogs(String(lastBlog.id));
      }
    }
  }, [inView]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {error && <div className="text-red-500 mb-4">加载失败: {error}</div>}
      <MotionUl
        className="space-y-8"
        variants={containerAnimation}
        initial="hidden"
        animate="show">
        {blogs.map((blog: Blog) => (
          <BlogItem
            key={blog.id}
            blog={blog}
          />
        ))}
      </MotionUl>
      <div
        ref={ref}
        className="h-20 flex items-center justify-center">
        {loading && <Loading />}
      </div>
    </div>
  );
}
