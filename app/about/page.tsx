import { MotionDiv, MotionH1, MotionH2, MotionP } from '@/components/ui/motion';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Twitter, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Harry',
  description: 'Learn more about Harry, a full stack engineer passionate about AI, Web3, and creating innovative SaaS solutions.',
};

export default function About() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen"
    >
      <div className="relative">
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

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <MotionH1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </MotionH1>
          </MotionDiv>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="space-y-6">
                <MotionH2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Journey
                </MotionH2>
                <MotionP className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  I&apos;m a full stack engineer with a deep passion for creating innovative solutions. 
                  My journey in technology has led me to explore the fascinating worlds of AI, Web3, 
                  and modern web development. I believe in the power of technology to solve real-world 
                  problems and make a positive impact.
                </MotionP>
                <MotionP className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Currently, I&apos;m busy working on two exciting projects: {' '}
                  <Link
                    href="https://multipost.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
                  >
                    MultiPost
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="https://2some.ren"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
                  >
                    2SOMEren
                  </Link>
                  . MultiPost is a comprehensive social media management platform that helps creators and businesses optimize their content strategy across multiple platforms, while 2SOMEren is a marshmallow tool optimized for streaming. I&apos;m always eager to collaborate on exciting SaaS projects and explore new technologies.
                </MotionP>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center"
            >
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

          {/* Projects Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-20"
          >
            <MotionH2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              My Projects
            </MotionH2>
            <MotionP className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve been working on. Each one represents a different aspect of my journey in technology and innovation.
            </MotionP>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="https://fameday.one"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">🎉</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Fameday
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  A platform for celebrating special moments
                </p>
              </Link>

              <Link
                href="https://multipost.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  MultiPost
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Comprehensive social media management platform
                </p>
              </Link>

              <Link
                href="https://2some.ren"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">🍬</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  2SOMEren
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Marshmallow tool optimized for streaming
                </p>
              </Link>

              <Link
                href="https://2some.one"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">🌟</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  2SOMEone
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Another innovative platform in the 2SOME ecosystem
                </p>
              </Link>

              <Link
                href="https://saraclick.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  SaraClick
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  A focused studio for strategy and stories—plans, pages, and timing in one place
                </p>
              </Link>

              <Link
                href="https://github.com/leaperone/envx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="text-2xl mb-3">⚙️</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  EnvX
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  A neat CLI for envs—versioned, tagged, and synced when you need it
                </p>
              </Link>
            </div>
          </MotionDiv>

          {/* Social Media & Contact Section */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-center"
          >
            <MotionH2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Let&apos;s Connect
            </MotionH2>
            <MotionP className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in connecting with fellow developers, entrepreneurs, and anyone passionate about technology. 
              Feel free to reach out!
            </MotionP>
            
            <div className="flex justify-center space-x-6">
              <Link
                href="mailto:product.indents-4d@icloud.com"
                className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2"
              >
                <Mail className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/harryisfish"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com/harry_is_fish"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://space.bilibili.com/17005773"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2"
              >
                <Play className="h-6 w-6" />
              </Link>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}
