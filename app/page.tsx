import { MotionDiv, MotionH1, MotionH2, MotionP } from '@/components/ui/motion';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { getAllBlogs } from '@/lib/notion';
import Loading from '@/components/Loading';
import { Mail, Github, Twitter, Play, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: '海鱼Harry - Full Stack Engineer',
  description: 'Harry 的个人网站。Full Stack Engineer，专注于 AI、Web3 和现代 Web 开发。',
};

export const revalidate = 600;

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          <div
            className="absolute inset-0 opacity-30 dark:opacity-10"
            style={{
              backgroundImage: 'url(/background.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Hero */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center text-center pt-20 pb-16"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 scale-150"></div>
              <Image
                src="/harry.png"
                alt="Harry"
                width={140}
                height={140}
                className="relative rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
              />
            </div>
            <MotionH1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Harry</span>
            </MotionH1>
            <MotionP className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Full Stack Engineer
            </MotionP>
            <MotionP className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              I&apos;m a full stack engineer passionate about AI, Web3, and modern web development.
              Currently working on{' '}
              <Link href="https://multipost.app" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">MultiPost</Link>
              {' '}and{' '}
              <Link href="https://2some.one" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">2SOMEone</Link>.
              I believe in the power of technology to solve real-world problems.
            </MotionP>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <Link href="mailto:product.indents-4d@icloud.com" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2">
                <Mail className="size-5" />
              </Link>
              <Link href="https://github.com/harryisfish" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2">
                <Github className="size-5" />
              </Link>
              <Link href="https://twitter.com/harry_is_fish" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2">
                <Twitter className="size-5" />
              </Link>
              <Link href="https://space.bilibili.com/17005773" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2">
                <Play className="size-5" />
              </Link>
            </div>
          </MotionDiv>

          {/* Projects */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <MotionH2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Projects
            </MotionH2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                href="https://multipost.app"
                target="_blank"
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">MultiPost</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">开源社交媒体发布工具，支持多平台批量发布与数据分析</p>
              </Link>
              <Link
                href="https://2some.one"
                target="_blank"
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-2xl mb-2">🍬</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">2SOMEone</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">B站和抖音创作者运营工具，涵盖粉丝管理、弹幕互动与数据分析</p>
              </Link>
              <Link
                href="https://leaper.one"
                target="_blank"
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">LEAPERone</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">统一API网关，集成AI模型、图像生成等多项服务，支持按量付费</p>
              </Link>
            </div>
          </MotionDiv>

          {/* Recent Posts */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <MotionH2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Posts
              </MotionH2>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <Suspense fallback={<Loading />}>
              <RecentPosts />
            </Suspense>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}

async function RecentPosts() {
  try {
    const allBlogs = await getAllBlogs();
    const recent = allBlogs.slice(0, 5);

    return (
      <div className="space-y-3">
        {recent.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.urlname}`}
            className="flex items-baseline justify-between gap-4 py-3 px-4 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 hover:shadow-md transition-all duration-200 group"
          >
            <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {blog.title}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0">
              {format(new Date(blog.created_at), 'MMM d, yyyy')}
            </span>
          </Link>
        ))}
      </div>
    );
  } catch {
    return <p className="text-red-500">加载博客失败，请稍后重试。</p>;
  }
}
