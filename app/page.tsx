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
            <h1 className="text-4xl font-bold text-center mb-6">Hi, I&apos;m Harry</h1>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-8">
              <p>A full stack engineer. Interested in AI and Web3. Learning to create new things and SaaS.</p>
            </blockquote>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-4">
                Current Status
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-xl mr-2">🚀</span> Currently working on MultiPost
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🧠</span> Learning NextJS
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🤝</span> Open to collaborating on SaaS
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">💻</span> Full Stack Engineer
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-blue-500 pb-2 mb-4">
                Skills
              </h2>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  '⚛️ React',
                  '🚀 NextJS',
                  '💚 Vue',
                  '🔥 Nuxtjs',
                  '⚡ Vite',
                  '🎨 TailwindCSS',
                  '🟢 NodeJS',
                  '🐘 PostgreSQL',
                  '🐍 Python',
                  '☕ Java',
                  '🔷 TypeScript',
                  '🟦 JavaScript',
                  '🐹 Go',
                  '🍎 Swift',
                  '🐳 Docker',
                  '🐧 Linux',
                  '🍎 MacOS',
                  '🔧 VS Code',
                  '📝 Vim',
                  '🍎 XCode',
                  '🌐 Uniswap',
          '🦊 MetaMask',
                  '⛓️ Ethereum',
                  '📝 WordPress',
                  '🔧 Arduino',
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
                Contact
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-xl mr-2">📧</span>
                  Email:{' '}
                  <a
                    href="mailto:admin@cunoe.com"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                    harry@leaper.one
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="text-xl mr-2">🐙</span>
                  GitHub:{' '}
                  <a
                    href="https://github.com/harryisfish"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                    https://github.com/harryisfish
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
