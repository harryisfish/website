import { MotionDiv, MotionH2, MotionP } from '@/components/ui/motion';
import { LightPoints } from '@/components/ui/light-points';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { BlogTimeline } from '@/components/Blogs/BlogTimeline';
import { getAllBlogs } from '@/lib/notion';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
  title: '海鱼Harry',
  description: 'Working on the AI',
};

export const revalidate = 600; // 每5分钟重新验证一次缓存

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-background">
          <div 
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: 'url(/background.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <LightPoints className="absolute inset-0 bg-transparent" />
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Blog List */}
            <div className="lg:col-span-2">
              <Suspense fallback={<Loading />}>
                <BlogList />
              </Suspense>
            </div>

            {/* Right Column - Profile Card */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="sticky top-8">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                      <Image
                        src="/harry.png"
                        alt="Harry"
                        width={120}
                        height={120}
                        className="relative rounded-full border-4 border-white dark:border-background shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center mb-6">
                    <MotionH2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Harry</span>
                    </MotionH2>
                    <MotionP className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      Full Stack Engineer
                    </MotionP>
                    <MotionP className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      Passionate about building innovative solutions with AI and Web3 technologies. 
                      Currently working on MultiPost and always eager to collaborate on exciting SaaS projects.
                    </MotionP>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link href="/about" className="block">
                      <Button 
                        size="lg" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        About Me
                      </Button>
                    </Link>
                    <Link href="/links" className="block">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-300">
                        Links
                      </Button>
                    </Link>
                  </div>

                  {/* My Projects */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      My Projects
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Link
                          href="https://multipost.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          MultiPost.app
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          开源社交媒体发布工具，支持多平台批量发布与数据分析
                        </p>
                      </div>
                      <div>
                        <Link
                          href="https://2some.one"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          2SOME.one
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          B站和抖音创作者运营工具，涵盖粉丝管理、弹幕互动与数据分析
                        </p>
                      </div>
                      <div>
                        <Link
                          href="https://leaper.one"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          LEAPERone
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          统一API网关，集成AI模型、图像生成等多项服务，支持按量付费
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

async function BlogList() {
  try {
    const allBlogs = await getAllBlogs();
    return <BlogTimeline blogs={allBlogs} />;
  } catch (error) {
    console.error(`[HomePage] 获取博客失败`, {
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