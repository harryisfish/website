'use client';
import { useState, useEffect } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { Blog } from '@/types/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { mdxOptions } from '@/types/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import remarkToc from 'remark-toc';
import remarkGFM from 'remark-gfm';
import mdxCustomComponents from '@/components/MdxComponents';
function getBlog(urlname: string) {
  return fetch(`/api/blog?urlname=${urlname}`);
}

interface BlogPageProps {
  params: { urlname: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getBlog(params.urlname)
      .then(res => res.json())
      .then(async (data: Blog) => {
        setBlog(data);
        const mdxSource = await serialize(
          data.content,
          {
            mdxOptions: {
              remarkPlugins: [
                remarkGFM,
                [
                  remarkToc,
                  {
                    ordered: true,
                    tight: true,
                    heading: "TOC",
                    maxDepth: 3,
                  },
                ],
                remarkEmoji,
              ],
              rehypePlugins: [
                rehypeSlug,
                // this code is a bug for kv about md(x) page
                [
                  rehypePrettyCode,
                  {
                    theme: "one-dark-pro",
                    // theme: {
                    // 	dark: 'one-dark-pro',
                    // 	light: 'one-dark-pro'
                    // },
                    keepBackground: false,
                  },
                ],
              ],
              format: "mdx",
            },
            parseFrontmatter: true,
          },
        );
        setMdxSource(mdxSource);
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

  if (!blog || !mdxSource) {
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
      <div className=''>
        <MDXRemote {...mdxSource} components={mdxCustomComponents} />
      </div>
    </article>
  );
}
