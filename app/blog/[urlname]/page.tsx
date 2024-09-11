'use client';
import { useState, useEffect } from 'react';
import { Blog } from '@/types/blog';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

function getBlog(urlname: string) {
  return fetch(`/api/blog?urlname=${urlname}`);
}

interface BlogPageProps {
  params: { urlname: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getBlog(params.urlname)
      .then(res => res.json())
      .then(async (data: Blog) => {
        setBlog(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [params.urlname]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">错误：{error}</div>;
  }

  if (!blog) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{blog.title}</h1>
      <div className="text-center text-gray-600 mb-8">
        <time dateTime={new Date(blog.created_at).toISOString()}>
          {format(new Date(blog.created_at), 'yyyy年MM月dd日', { locale: zhCN })}
        </time>
      </div>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[]}>
        {blog.content}
      </Markdown>
    </article>
  );
}

