import { MotionDiv, MotionH1, MotionH2, MotionP } from '@/components/ui/motion';
import { LightPoints } from '@/components/ui/light-points';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Harry',
  description: 'Learn more about Harry - A full stack engineer passionate about AI, Web3, and creating innovative SaaS solutions.',
};

export default function AboutPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <div className="relative min-h-screen">
        <LightPoints className="absolute inset-0 bg-white dark:bg-black" />
        <MotionDiv
          className="relative z-10 max-w-4xl mx-auto p-6 text-black dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <MotionH1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}>
              About Me
            </MotionH1>
            <MotionP
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}>
              A full stack engineer passionate about AI, Web3, and creating innovative SaaS solutions.
            </MotionP>
          </div>

          {/* Profile Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <MotionDiv
              className="flex justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}>
              <div className="relative">
                <Image
                  src="/harry.png"
                  alt="Harry"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-blue-500 shadow-lg"
                />
              </div>
            </MotionDiv>
            
            <MotionDiv
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Hello, I&apos;m Harry</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I&apos;m a full stack engineer with a passion for building innovative solutions. 
                  Currently focused on AI and Web3 technologies, I love creating new things and 
                  developing SaaS applications that make a difference.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-3">Current Focus</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🚀</span>
                    Building MultiPost - A social media management platform
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🧠</span>
                    Learning and mastering NextJS
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🤝</span>
                    Open to collaborating on exciting SaaS projects
                  </li>
                </ul>
              </div>
            </MotionDiv>
          </div>

          {/* Skills & Technologies */}
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}>
            <MotionH2 className="text-3xl font-bold text-center mb-8">Skills & Technologies</MotionH2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React', icon: '⚛️' },
                { name: 'NextJS', icon: '🚀' },
                { name: 'TypeScript', icon: '🔷' },
                { name: 'Node.js', icon: '🟢' },
                { name: 'Python', icon: '🐍' },
                { name: 'Go', icon: '🐹' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'Docker', icon: '🐳' },
                { name: 'Vue', icon: '💚' },
                { name: 'TailwindCSS', icon: '🎨' },
                { name: 'Ethereum', icon: '⛓️' },
                { name: 'AI/ML', icon: '🤖' },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-2xl mr-2">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </MotionDiv>

          {/* Projects */}
          <MotionDiv
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}>
            <MotionH2 className="text-3xl font-bold text-center mb-8">Featured Projects</MotionH2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">MultiPost</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A browser extension that helps users publish content to multiple social media platforms with one click.
                </p>
                <div className="flex items-center text-sm text-blue-500">
                  <span className="mr-2">🔗</span>
                  <a 
                    href="https://github.com/leaperone/MultiPost-Extension" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline">
                    View on GitHub
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">This Website</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A personal website built with Next.js, featuring a blog, links collection, and modern UI design.
                </p>
                <div className="flex items-center text-sm text-blue-500">
                  <span className="mr-2">🔗</span>
                  <a 
                    href="https://harryis.fish" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline">
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Contact */}
          <MotionDiv
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}>
            <MotionH2 className="text-3xl font-bold mb-8">Let&apos;s Connect</MotionH2>
            <MotionP className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              I&apos;m always interested in new opportunities and collaborations. Feel free to reach out!
            </MotionP>
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:product.indents-4d@icloud.com"
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <span className="mr-2">📧</span>
                Email Me
              </a>
              <a
                href="https://github.com/harryisfish"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                <span className="mr-2">🐙</span>
                GitHub
              </a>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
