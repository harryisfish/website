'use client';

import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Blog } from '@/types/blog';
import { MotionDiv, MotionH2, MotionH3, MotionP, MotionA } from '@/components/ui/motion';
import { Variants, useScroll, useTransform, motion } from 'motion/react';

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
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

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

  return (
    <div className="w-full" style={{ fontFamily: "'LXGW Bright', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
        <div
          className="w-full md:px-10"
          style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
          ref={containerRef}
        >
          <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
            <MotionH2 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-5xl text-black dark:text-white max-w-4xl font-bold" 
              style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
            >
              Blog from my journey
            </MotionH2>
            {(() => {
              const startYear = 2017;
              const currentYear = new Date().getFullYear();
              const years = currentYear - startYear;
              return (
                <MotionP
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm font-semibold"
                  style={{
                    fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                  }}
                >
                  My blog began {years} years ago, and every step since has been a line in this unfolding journey.
                </MotionP>
              );
            })()}
          </div>

          <MotionDiv 
            ref={ref} 
            className="relative max-w-7xl mx-auto pb-20"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            {sortedYears.map((year) => {
    const yearBlogs = groupedBlogs[year];
    
              return (
                <MotionDiv
                  key={year}
                  className="flex justify-start pt-10 md:gap-10"
                  variants={fadeInUp}
                >
                  <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-24 md:w-32">
                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div>
                    <MotionH3 
                      className="hidden md:block text-lg md:pl-16 md:text-3xl font-bold text-neutral-500 dark:text-neutral-500" 
                      style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
                      variants={fadeInUp}
                    >
                      {year}
                    </MotionH3>
                  </div>

                  <div className="relative pl-20 pr-4 md:pl-2 w-full">
                    <MotionH3 
                      className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500" 
                      style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
                      variants={fadeInUp}
                    >
                      {year}
                    </MotionH3>
                    <MotionDiv variants={fadeInUp}>
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
                    </MotionDiv>
                  </div>
                </MotionDiv>
              );
            })}
            <div
              style={{
                height: height + "px",
              }}
              className="absolute md:left-12 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
            >
              <motion.div
                style={{
                  height: heightTransform,
                  opacity: opacityTransform,
                }}
                className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
              />
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
