'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { NotionRenderer } from 'react-notion-x';
import { format } from 'date-fns';
import ImageBlock from './ImageBlock';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));

interface Blog {
  id: string;
  title: string;
  content: string;
  urlname: string;
  categories: string[];
  tags: string[];
  hide: boolean;
  created_at: string;
  updated_at: string;
  digest?: string;
  status?: string;
}

interface NotionContentProps {
  recordMap: any;
  blog?: Blog;
}

const NotionContent: React.FC<NotionContentProps> = ({ recordMap, blog }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // 自定义页面标题组件
  const CustomPageTitle = () => {
    if (!blog) return null;

    return (
      <div className="notion-page-title-section mb-12">
        {/* 博客标题 */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100 leading-tight">
          {blog.title}
        </h1>

        {/* 摘要 */}
        {blog.digest && (
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{blog.digest}</p>
          </div>
        )}

        {/* 元信息 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          {/* 发布时间 */}
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time
              dateTime={blog.created_at}
              className="text-sm font-medium">
              {format(new Date(blog.created_at), 'yyyy年MM月dd日')}
            </time>
          </div>
        </div>

        {/* 分类和标签 */}
        {(blog.categories.length > 0 || blog.tags.length > 0) && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {blog.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">分类</span>
                <div className="flex gap-2">
                  {blog.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full border border-blue-200 dark:border-blue-700">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {blog.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">标签</span>
                <div className="flex gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full border border-green-200 dark:border-green-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="notion max-w-none container mx-auto px-4 py-12 max-w-5xl">
      <NotionRenderer
        pageTitle={<CustomPageTitle />}
        disableHeader={true}
        recordMap={recordMap}
        components={{
          nextImage: ImageBlock,
          nextLink: Link,
          Code,
        }}
        fullPage={true}
        darkMode={isDark}
        forceCustomImages
        className=""
      />
    </div>
  );
};

export default NotionContent;
