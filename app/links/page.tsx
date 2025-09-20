'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, Variants } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { MotionA, MotionDiv, MotionH1, MotionH3, MotionP, MotionUl } from '@/components/ui/motion';

interface Link {
  name: string;
  link: string;
  avatar: string;
  descr: string;
  content?: string;
}

interface LinkCategory {
  class_name: string;
  class_desc: string;
  link_list: Link[];
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LinkCard: React.FC<Link & { onClick: () => void }> = ({ name, avatar, descr, onClick }) => (
  <MotionDiv
    layoutId={`card-${name}`}
    onClick={onClick}
    className="p-3 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors duration-200"
    variants={fadeInUp}>
    <div className="flex flex-col w-full">
      <MotionDiv
        layoutId={`image-${name}`}
        className="mb-2">
        <Image
          src={avatar}
          alt={name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover mx-auto"
        />
      </MotionDiv>
      <div className="text-center">
        <MotionH3
          layoutId={`title-${name}`}
            className="font-medium text-neutral-800 dark:text-neutral-200 text-sm"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
          {name}
        </MotionH3>
        <MotionP
          layoutId={`description-${descr}`}
          className="text-neutral-600 dark:text-neutral-400 text-xs mt-1 line-clamp-2">
          {descr}
        </MotionP>
      </div>
    </div>
  </MotionDiv>
);

const ExpandedCard: React.FC<Link & { onClose: () => void }> = ({ name, link, avatar, descr, content, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  return (
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <MotionDiv
        layoutId={`card-${name}`}
        ref={ref}
        className="w-full max-w-[400px] h-fit max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg">
        <MotionDiv
          layoutId={`image-${name}`}
          className="p-4 flex justify-center">
          <Image
            priority
            width={100}
            height={100}
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </MotionDiv>
        <div className="px-4 pb-4">
          <MotionH3
            layoutId={`title-${name}`}
            className="font-medium text-neutral-700 dark:text-neutral-200 text-lg text-center"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            {name}
          </MotionH3>
          <MotionP
            layoutId={`description-${descr}`}
            className="text-neutral-600 dark:text-neutral-400 text-sm text-center mt-1">
            {descr}
          </MotionP>
          <MotionA
            layout
            href={link}
            target="_blank"
            className="mt-4 block w-full px-4 py-2 text-sm rounded-full font-bold bg-blue-500 text-white text-center"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            访问
          </MotionA>
        </div>
        {content && (
          <div className="px-4 pb-4">
            <MotionDiv
              layout
              className="text-neutral-600 dark:text-neutral-400 text-sm max-h-40 overflow-y-auto">
              {content}
            </MotionDiv>
          </div>
        )}
      </MotionDiv>
    </div>
  );
};

const LinksPage: React.FC = () => {
  const [active, setActive] = useState<Link | null>(null);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [active]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      <div className="w-full bg-white dark:bg-neutral-950 md:px-10" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <MotionH1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-5xl mb-6 text-black dark:text-white max-w-4xl font-bold"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            Digital Connections
          </MotionH1>
          <MotionP
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm font-semibold"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            A constellation of kindred spirits and digital sanctuaries worth exploring.
          </MotionP>
        </div>
      </div>
      <MotionDiv
        className="max-w-6xl mx-auto p-4"
        initial="initial"
        animate="animate"
        variants={stagger}>
        <AnimatePresence>
          {active && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && (
            <ExpandedCard
              {...active}
              onClose={() => setActive(null)}
            />
          )}
        </AnimatePresence>
        <MotionDiv
          className="space-y-6"
          variants={stagger}>
          {friendLinks.map((category, index) => (
            <MotionDiv
              key={index}
              className="mb-6"
              variants={fadeInUp}>
              <MotionH3
                className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2"
                style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}
                variants={fadeInUp}>
                {category.class_name}
              </MotionH3>
              <MotionP
                className="text-sm text-gray-500 dark:text-gray-400 mb-3"
                variants={fadeInUp}>
                {category.class_desc}
              </MotionP>
              <MotionUl
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                variants={stagger}>
                {category.link_list.map((link, linkIndex) => (
                  <LinkCard
                    key={linkIndex}
                    {...link}
                    onClick={() => setActive(link)}
                  />
                ))}
              </MotionUl>
            </MotionDiv>
          ))}
        </MotionDiv>
      </MotionDiv>
    </div>
  );
};

const friendLinks: LinkCategory[] = [
  {
    class_name: 'MY MATE',
    class_desc: 'Close friends and companions',
    link_list: [
      {
        name: 'Cunky',
        link: 'https://www.cunoe.com/',
        avatar: 'https://s3.cunoe.com/files/web-icon.png',
        descr: 'Journey of a pigeon exploring the world',
      },
    ],
  },
  {
    class_name: 'Friend Links',
    class_desc: 'People and stories',
    link_list: [
      {
        name: '夜游船',
        link: 'https://www.yeyouchuan.me/',
        avatar: 'https://tc-new.z.wiki/autoupload/f/coF0XJNJZ7Q6uYCWoMduOpmesdO83n0jJRcmVXjsIsc/20250919/5xz8/1185X1026/21EDDBB7C852D4C1904F5ADE07130D96.jpg/webp',
        descr: 'ACG and music enthusiast, sci-fi reader, and creative soul',
      },
    ],
  },
  {
    class_name: 'Websites',
    class_desc: 'Sites worth a look',
    link_list: [
      {
        name: 'USTC Open Source Software Mirror',
        link: 'https://mirrors.ustc.edu.cn/',
        avatar: 'https://mirrors.ustc.edu.cn/static/img/favicon.png',
        descr: 'Useful open source mirror site',
      },
      {
        name: 'vcb-studio',
        link: 'https://vcb-s.com/',
        avatar: 'https://vcb-s.com/wp-content/customRes/favicon@32.png',
        descr: 'Blu-ray anime resources',
      },
    ],
  },
  {
    class_name: 'Other Links',
    class_desc: 'Take off~',
    link_list: [
      {
        name: '2SOMEren',
        link: 'https://2some.ren/',
        avatar: 'https://2some.ren/favicon.ico',
        descr: 'Marshmallow tool optimized for streaming',
      },
      {
        name: 'MultiPost',
        link: 'https://multipost.app/',
        avatar: 'https://multipost.app/icon.png',
        descr: 'Simplify your social media workflow',
      },
    ],
  },
];

export default LinksPage;
