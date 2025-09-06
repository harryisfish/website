'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Timeline } from '@/components/ui/timeline';
import { Blog } from '@/types/blog';

interface BlogTimelineProps {
  blogs: Blog[];
}

export function BlogTimeline({ blogs }: BlogTimelineProps) {

  // 按年份分组博客
  const groupedBlogs = blogs.reduce((acc, blog) => {
    const year = new Date(blog.created_at).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(blog);
    return acc;
  }, {} as Record<number, Blog[]>);

  // 按年份排序（最新的在前）
  const sortedYears = Object.keys(groupedBlogs)
    .map(Number)
    .sort((a, b) => b - a);

  // 转换为Timeline组件需要的数据格式
  const timelineData = sortedYears.map(year => {
    const yearBlogs = groupedBlogs[year];
    
    return {
      title: year.toString(),
      content: (
        <div>
          <p className="mb-12 text-lg font-bold text-neutral-800 dark:text-neutral-200" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
            在 {year} 年，我写了 {yearBlogs.length} 篇文章。
          </p>
          <div className="space-y-6">
            {yearBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/changelog/${blog.urlname}`}
                className="group block py-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition-colors" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                    {blog.title}
                  </h3>
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-500" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
                    {format(new Date(blog.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="w-full px-4 py-8" style={{ fontFamily: "'LXGW Bright', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      <div className="relative w-full overflow-clip">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
}
