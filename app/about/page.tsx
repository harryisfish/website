import { MotionDiv, MotionH1, MotionH2, MotionP } from '@/components/ui/motion';
import { Metadata } from 'next';
import Image from 'next/image';

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
            <MotionP className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A passionate full stack engineer dedicated to building innovative solutions with cutting-edge technologies.
            </MotionP>
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
                  Currently, I&apos;m focused on building MultiPost, a comprehensive social media management 
                  platform that helps creators and businesses optimize their content strategy across 
                  multiple platforms. I&apos;m always eager to collaborate on exciting SaaS projects and 
                  explore new technologies.
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

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Current Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">Building MultiPost and exploring AI/Web3 technologies</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">Creating innovative SaaS solutions that make a difference</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">Always open to exciting projects and partnerships</p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}
