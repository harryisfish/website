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
          className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
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
            className="font-medium text-neutral-700 dark:text-neutral-200 text-lg text-center">
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
            className="mt-4 block w-full px-4 py-2 text-sm rounded-full font-bold bg-blue-500 text-white text-center">
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
    <MotionDiv
      className="max-w-6xl mx-auto p-4 min-h-screen"
      initial="initial"
      animate="animate"
      variants={stagger}>
      <MotionH1
        className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
        variants={fadeInUp}>
        友情链接
      </MotionH1>
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
  );
};

const friendLinks: LinkCategory[] = [
  {
    class_name: '友情链接',
    class_desc: '那些人，那些事',
    link_list: [
      {
        name: 'CUNOE',
        link: 'https://www.cunoe.com/',
        avatar: 'https://s3.cunoe.com/files/web-icon.png',
        descr: '记录鸽子探索世界的旅程',
      },
      {
        name: "Harry's Blog",
        link: 'https://harryisfish.github.io/',
        avatar: 'https://avatars.githubusercontent.com/u/15265627',
        descr: "Harry's Blog",
      },
    ],
  },
  {
    class_name: '网站',
    class_desc: '值得一看的网站',
    link_list: [
      {
        name: 'KissSub',
        link: 'https://www.kisssub.org/',
        avatar: 'https://www.kisssub.org/images/favicon/kisssub.ico',
        descr: '爱恋动漫BT下载站',
      },
      {
        name: '碧蓝航线工具箱',
        link: 'https://al.pelom.cn/home',
        avatar: 'https://al.pelom.cn/assets/favicon.e584446d.png',
        descr: 'AzurLane涩涩~',
      },
      {
        name: 'Civitai',
        link: 'https://civitai.com/',
        avatar: 'https://civitai.com/favicon.ico',
        descr: 'AI绘图才是生产力~',
      },
      {
        name: 'PLANET NYAACAT',
        link: 'https://planet.nyaa.cat/',
        avatar: 'https://nyaa.cat/images/logo-color.png',
        descr: 'NyaaCat 社区星球',
      },
      {
        name: 'USTC Open Source Software Mirror',
        link: 'https://mirrors.ustc.edu.cn/',
        avatar: 'https://mirrors.ustc.edu.cn/static/img/favicon.png',
        descr: '好用的开源镜像站',
      },
      {
        name: 'Azure',
        link: 'https://azure.microsoft.com/',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
        descr: '好好好~',
      },
      {
        name: 'vcb-studio',
        link: 'https://vcb-s.com/',
        avatar: 'https://vcb-s.com/wp-content/customRes/favicon@32.png',
        descr: '看番的资源网站',
      },
    ],
  },
  {
    class_name: '其它链接',
    class_desc: '起飞~起飞~',
    link_list: [
      {
        name: 'Cunoeの魔法空间',
        link: 'https://cloud.cunoe.com/',
        avatar: 'https://s3.cunoe.com/files/web-icon.png',
        descr: '我自己的云盘',
      },
      {
        name: 'CUNOE GitHub',
        link: 'https://github.com/CUNOE/',
        avatar: 'https://avatars.githubusercontent.com/u/90205430',
        descr: '我的GitHub',
      },
      {
        name: '泡泡树洞',
        link: 'https://2some.one/',
        avatar: 'https://2some.one/favicon.ico',
        descr: '针对直播优化的棉花糖工具',
      },
    ],
  },
];

export default LinksPage;
