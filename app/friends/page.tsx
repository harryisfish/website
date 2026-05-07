'use client';

import React from 'react';
import Image from 'next/image';
import { Variants } from 'motion/react';
import { MotionA, MotionDiv, MotionH2, MotionP } from '@/components/ui/motion';
import { ExternalLink } from 'lucide-react';

interface FriendLink {
  name: string;
  link: string;
  avatar: string;
  descr: string;
}

interface FriendCategory {
  title: string;
  links: FriendLink[];
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const FriendCard: React.FC<FriendLink> = ({ name, link, avatar, descr }) => (
  <MotionA
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
    variants={fadeInUp}
  >
    <Image
      src={avatar}
      alt={name}
      width={48}
      height={48}
      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all shrink-0"
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
          {name}
        </h3>
        <ExternalLink className="size-3 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 line-clamp-1">
        {descr}
      </p>
    </div>
  </MotionA>
);

const FriendsPage: React.FC = () => {
  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-20">
          {/* Header */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <MotionH2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              友链
            </MotionH2>
            <MotionP className="text-gray-500 dark:text-gray-400 text-base">
              那些人，那些事 —— 一群志同道合的朋友，值得相识相知。
            </MotionP>
          </MotionDiv>

          {/* Friend Categories */}
          <MotionDiv
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-10"
          >
            {friendCategories.map((category, index) => (
              <MotionDiv
                key={index}
                variants={fadeInUp}
              >
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                  {category.title}
                </h3>
                <MotionDiv
                  className="grid sm:grid-cols-2 gap-3"
                  variants={stagger}
                >
                  {category.links.map((friend, friendIndex) => (
                    <FriendCard key={friendIndex} {...friend} />
                  ))}
                </MotionDiv>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

const friendCategories: FriendCategory[] = [
  {
    title: '挚友',
    links: [
      {
        name: 'Cunky',
        link: 'https://www.cunoe.com/',
        avatar: 'https://s3.cunoe.com/files/web-icon.png',
        descr: '一只探索世界的鸽子的旅程',
      },
      {
        name: '夜游船',
        link: 'https://www.yeyouchuan.me/',
        avatar: 'https://tc-new.z.wiki/autoupload/f/coF0XJNJZ7Q6uYCWoMduOpmesdO83n0jJRcmVXjsIsc/20250919/5xz8/1185X1026/21EDDBB7C852D4C1904F5ADE07130D96.jpg/webp',
        descr: 'ACG 与音乐爱好者，科幻读者，富有创造力的灵魂',
      },
    ],
  },
];

export default FriendsPage;
