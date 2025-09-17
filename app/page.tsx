import { MotionDiv } from '@/components/ui/motion';
import { LightPoints } from '@/components/ui/light-points';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-white dark:bg-black">
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: 'url(/background.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <LightPoints className="absolute inset-0 bg-transparent" />
        <HeroHighlight containerClassName="relative z-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
          {/* 主标题 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
              Hi, I&apos;m <Highlight>Harry</Highlight>
            </h1>
          </MotionDiv>

          {/* 副标题 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Full Stack Engineer
            </h2>
          </MotionDiv>

          {/* 描述文字 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Passionate about building innovative solutions with AI and Web3 technologies. 
              Currently working on MultiPost and always eager to collaborate on exciting SaaS projects.
            </p>
          </MotionDiv>

          {/* 行动按钮 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Get In Touch
            </Button>
          </MotionDiv>

          {/* 当前状态卡片 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Project</h3>
              <p className="text-gray-600 dark:text-gray-400">Working on MultiPost</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">NextJS & Modern Web</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">Open to SaaS Projects</p>
            </div>
          </MotionDiv>

          {/* 技能标签 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                'React', 'NextJS', 'Vue', 'TypeScript', 'Node.js', 'Python',
                'PostgreSQL', 'Docker', 'AWS', 'TailwindCSS', 'Web3', 'AI'
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                  {skill}
                </span>
              ))}
            </div>
          </MotionDiv>

          {/* 项目展示 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-20">
            <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">My Projects</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">Explore my latest work and creations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Fameday */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Fameday</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Event management and celebration platform for memorable moments and special occasions.
                </p>
                <a
                  href="https://fameday.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </MotionDiv>

              {/* MultiPost */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">MultiPost</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Open-source social media publishing tool with multi-platform support and content optimization.
                </p>
                <a
                  href="https://multipost.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </MotionDiv>

              {/* 2SOMEren */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2SOMEren</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  All-in-one platform for Bilibili & Douyin creators with personal pages and fan management.
                </p>
                <a
                  href="https://2some.ren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </MotionDiv>

              {/* 2SOMEone */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">💫</div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2SOMEone</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  Developer platform offering AI APIs, authentication, and analytics tools.
                </p>
                <a
                  href="https://2some.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </MotionDiv>

              {/* SaraClick */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">SaraClick</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  AI-powered social media marketing tool with content creation and campaign optimization.
                </p>
                <a
                  href="https://saraclick.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </MotionDiv>
            </div>
          </MotionDiv>

          {/* 联系信息 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:product.indents-4d@icloud.com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="text-xl">📧</span>
                <span>product.indents-4d@icloud.com</span>
              </a>
              <a
                href="https://github.com/harryisfish"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="text-xl">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
          </MotionDiv>
          </div>
        </HeroHighlight>
      </div>
    </MotionDiv>
  );
}
