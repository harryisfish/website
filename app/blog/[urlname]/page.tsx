"use client";
import { useState, useEffect } from "react";
import { Blog } from "@/types/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import CodeBlock from "@/components/Markdown/CodeBlock";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BallTriangle } from "react-loader-spinner";
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
      .then((res) => {
        if (res.status === 404) {
          setError("未找到博客");
        } else {
          return res.json();
        }
      })
      .then(async (data: Blog) => {
        setBlog(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [params.urlname]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#fff"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (!blog) {
    return notFound();
  }

  if (error) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        {blog.title}
      </h1>
      <div className="text-center text-gray-600 mb-8">
        <time dateTime={new Date(blog.created_at).toISOString()}>
          {format(new Date(blog.created_at), "yyyy年MM月dd日", {
            locale: zhCN,
          })}
        </time>
      </div>
      <article
        className="prose prose-lg dark:prose-invert max-w-none
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
        prose-h5:text-base prose-h6:text-sm
        prose-ul:text-base prose-ol:text-base
        prose-pre:bg-transparent prose-pre:p-0
        [&_pre]:!bg-transparent [&_pre]:!p-0"
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            code({ node, inline, className, children, ...props }: any) {
              return (
                <CodeBlock className={className}>{String(children)}</CodeBlock>
              );
            },
          }}
        >
          {blog.content}
        </Markdown>
      </article>
    </article>
  );
}
