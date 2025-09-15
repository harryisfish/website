'use client';

import React from 'react';
import { format } from 'date-fns';
import { Timeline } from '@/components/ui/timeline';
import { Blog } from '@/types/blog';
import { MotionDiv, MotionH3, MotionP, MotionA } from '@/components/ui/motion';
import { Variants } from 'motion/react';

interface BlogTimelineProps {
  blogs: Blog[];
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
        <MotionDiv
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <MotionP 
            className="mb-12 text-lg font-bold text-neutral-800 dark:text-neutral-200" 
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
            variants={fadeInUp}
          >
            在 {year} 年，我写了 {yearBlogs.length} 篇文章。
          </MotionP>
          <MotionDiv 
            className="space-y-6"
            variants={stagger}
          >
            {yearBlogs.map((blog) => (
              <MotionA
                key={blog.id}
                href={`/blog/${blog.urlname}`}
                className="group block py-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <MotionH3 
                    className="text-xl font-bold text-black dark:text-white group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition-colors" 
                    style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
                    variants={fadeInUp}
                  >
                    {blog.title}
                  </MotionH3>
                  <MotionP 
                    className="text-sm font-medium text-neutral-500 dark:text-neutral-500" 
                    style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
                    variants={fadeInUp}
                  >
                    {format(new Date(blog.created_at), 'MMM d, yyyy')}
                  </MotionP>
                </div>
              </MotionA>
            ))}
          </MotionDiv>
        </MotionDiv>
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
