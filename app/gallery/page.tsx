import { FocusCards } from '@/components/ui/focus-cards';
import { MotionDiv, MotionH1, MotionSpan } from '@/components/ui/motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图片画廊 | Cunoe',
  description: '探索精选图片集，包含背景画廊、城市印象等摄影作品展示。',
};

export default function GalleryPage() {
  const cards = [
    {
      title: '背景画廊',
      description: '探索我们精心挑选的网站背景图集。提前浏览可优化您的浏览体验哦~',
      src: 'https://s3.cunoe.com/files/background/bg-2.jpg',
      link: '/gallery/background',
      hoverEffect: 'scale',
    },
    {
      title: '合肥之秋',
      description: '2023年10月，漫步合肥街头，感受这座城市的魅力与活力',
      src: 'https://s3.cunoe.com/files/20231001/_DSC2891.jpg',
      link: '/gallery/202310-hefei',
      hoverEffect: 'glow',
    },
    {
      title: '武汉印象',
      description: '2023年10月，镜头下的武汉：一座充满活力与历史的城市',
      src: 'https://s3.cunoe.com/files/20231020/_DSC3093.jpg',
      link: '/gallery/202310-wuhan',
      hoverEffect: 'rotate',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <MotionDiv
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-[20rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <MotionH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="md:text-6xl text-3xl lg:text-7xl font-bold text-center text-black dark:text-white relative z-20 mb-10">
          图片画廊
        </MotionH1>
        <div className="w-full relative">
          {/* 渐变效果 */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
        <MotionSpan
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="block text-center mt-8 text-gray-600 dark:text-gray-400">
          图片较大！流量预警，请谨慎访问
        </MotionSpan>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}>
        <FocusCards cards={cards} />
      </MotionDiv>
    </div>
  );
}
