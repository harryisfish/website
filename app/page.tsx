import { MotionDiv } from '@/components/ui/motion';
import { LightPoints } from '@/components/ui/light-points';
import React from 'react';

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="relative min-h-screen">
        <LightPoints className="absolute inset-0 bg-white dark:bg-black" />
        <MotionDiv
          className="relative z-10 flex justify-center items-center h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          <div className="max-w-3xl mx-auto p-6 text-black dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-6">Hi,I&apos;m Cunoe</h1>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-8">
              <p>记录我探索世界的旅程</p>
            </blockquote>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-4">
                当前状态
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-xl mr-2">🎓</span> 学生
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">📷</span> 摄影爱好者
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🎮</span> 游戏爱好者
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-4">
                技能树
              </h2>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  '🐍 Python',
                  '🚀 Golang',
                  '🔧 Go-Zero',
                  '🖥️ Nuxt',
                  '🐳 Docker',
                  '☸️ Kubernetes',
                  '🌐 Nginx',
                  '🗃️ PostgreSQL',
                  '⚛️ Next.js',
                  '🖥️ Tauri',
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center">
                    <span className="text-xl mr-2">{item.slice(0, 2)}</span>
                    {item.slice(2)}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-4">
                联系方式
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-xl mr-2">📧</span>
                  主要邮箱:{' '}
                  <a
                    href="mailto:admin@cunoe.com"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                    admin@cunoe.com
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">📩</span>
                  备用邮箱:{' '}
                  <a
                    href="mailto:gave-trudge.0w@icloud.com"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                    gave-trudge.0w@icloud.com
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🐙</span>
                  GitHub:{' '}
                  <a
                    href="https://github.com/cunoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                    https://github.com/cunoe
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
