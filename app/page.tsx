import { MotionDiv, MotionH1, MotionH2, MotionP } from '@/components/ui/motion';
import { LightPoints } from '@/components/ui/light-points';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Harry - Full Stack Engineer',
  description: 'A full stack engineer passionate about AI, Web3, and creating innovative SaaS solutions. Currently working on MultiPost and always eager to collaborate on exciting projects.',
};

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
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
        
        {/* Hero Section */}
        <HeroHighlight containerClassName="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
          <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}>
                <div className="space-y-6">
                  <MotionH1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Hi, I&apos;m <Highlight>Harry</Highlight>
                  </MotionH1>
                  
                  <MotionH2 className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400">
              Full Stack Engineer
                  </MotionH2>
                  
                  <MotionP className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Passionate about building innovative solutions with AI and Web3 technologies. 
              Currently working on MultiPost and always eager to collaborate on exciting SaaS projects.
                  </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4">
            <Link href="/blog">
              <Button 
                size="lg" 
                        className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Blog
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                        className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-300">
                About
              </Button>
            </Link>
                  </MotionDiv>
                </div>
          </MotionDiv>

              {/* Right Column - Profile Image */}
          <MotionDiv
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                  <Image
                    src="/harry.png"
                    alt="Harry"
                    width={300}
                    height={300}
                    className="relative rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
                  />
            </div>
              </MotionDiv>
            </div>
            </div>
        </HeroHighlight>

        {/* About Section */}
        <section className="relative z-10 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-16">
              <MotionH2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </MotionH2>
              <MotionP className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A full stack engineer with a passion for building innovative solutions. 
                Currently focused on AI and Web3 technologies, I love creating new things and 
                developing SaaS applications that make a difference.
              </MotionP>
          </MotionDiv>

            {/* Current Focus Cards */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Current Project</h3>
                <p className="text-gray-600 dark:text-gray-300">Building MultiPost - A social media management platform</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">Mastering NextJS and modern web technologies</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Collaboration</h3>
                <p className="text-gray-600 dark:text-gray-300">Open to exciting SaaS projects and partnerships</p>
              </div>
            </MotionDiv>
          </div>
        </section>

        {/* Skills Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-4">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-16">
              <MotionH2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Skills & Technologies
              </MotionH2>
              <MotionP className="text-xl text-gray-600 dark:text-gray-300">
                Technologies I work with to build amazing products
              </MotionP>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'React', icon: '⚛️', color: 'from-blue-400 to-blue-600' },
                { name: 'NextJS', icon: '🚀', color: 'from-gray-600 to-gray-800' },
                { name: 'TypeScript', icon: '🔷', color: 'from-blue-500 to-blue-700' },
                { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
                { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-yellow-600' },
                { name: 'Go', icon: '🐹', color: 'from-cyan-400 to-cyan-600' },
                { name: 'PostgreSQL', icon: '🐘', color: 'from-indigo-400 to-indigo-600' },
                { name: 'Docker', icon: '🐳', color: 'from-blue-300 to-blue-500' },
                { name: 'Vue', icon: '💚', color: 'from-green-300 to-green-500' },
                { name: 'TailwindCSS', icon: '🎨', color: 'from-teal-400 to-teal-600' },
                { name: 'Ethereum', icon: '⛓️', color: 'from-purple-400 to-purple-600' },
                { name: 'AI/ML', icon: '🤖', color: 'from-pink-400 to-pink-600' },
              ].map((skill, index) => (
              <MotionDiv
                  key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  className="group">
                  <div className={`bg-gradient-to-r ${skill.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group-hover:scale-105`}>
                    <div className="text-center">
                      <div className="text-3xl mb-3">{skill.icon}</div>
                      <div className="text-white font-semibold text-lg">{skill.name}</div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
              </MotionDiv>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative z-10 py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-16">
              <MotionH2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Projects
              </MotionH2>
              <MotionP className="text-xl text-gray-600 dark:text-gray-300">
                Explore my latest work and creations
              </MotionP>
              </MotionDiv>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'MultiPost',
                  description: 'Open-source social media publishing tool with multi-platform support and content optimization.',
                  icon: '📱',
                  link: 'https://multipost.app',
                  color: 'from-blue-500 to-blue-700'
                },
                {
                  title: 'Fameday',
                  description: 'Event management and celebration platform for memorable moments and special occasions.',
                  icon: '🎯',
                  link: 'https://fameday.one',
                  color: 'from-purple-500 to-purple-700'
                },
                {
                  title: '2SOMEren',
                  description: 'All-in-one platform for Bilibili & Douyin creators with personal pages and fan management.',
                  icon: '👥',
                  link: 'https://2some.ren',
                  color: 'from-green-500 to-green-700'
                },
                {
                  title: '2SOMEone',
                  description: 'Developer platform offering AI APIs, authentication, and analytics tools.',
                  icon: '💫',
                  link: 'https://2some.one',
                  color: 'from-pink-500 to-pink-700'
                },
                {
                  title: 'SaraClick',
                  description: 'AI-powered social media marketing tool with content creation and campaign optimization.',
                  icon: '📊',
                  link: 'https://saraclick.com',
                  color: 'from-orange-500 to-orange-700'
                },
                {
                  title: 'This Website',
                  description: 'A personal website built with Next.js, featuring a blog, links collection, and modern UI design.',
                  icon: '🌐',
                  link: 'https://harryis.fish',
                  color: 'from-teal-500 to-teal-700'
                }
              ].map((project, index) => (
              <MotionDiv
                  key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                  className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                </p>
                <a
                      href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium`}>
                  Visit Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                  </div>
              </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}>
              <MotionH2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Let&apos;s Connect
              </MotionH2>
              <MotionP className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                I&apos;m always interested in new opportunities and collaborations. Feel free to reach out!
              </MotionP>
              
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:product.indents-4d@icloud.com"
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-medium text-lg">
                  <span className="text-2xl">📧</span>
                <span>product.indents-4d@icloud.com</span>
              </a>
              <a
                href="https://github.com/harryisfish"
                target="_blank"
                rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-medium text-lg">
                  <span className="text-2xl">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
          </MotionDiv>
          </div>
        </section>
      </div>
    </MotionDiv>
  );
}