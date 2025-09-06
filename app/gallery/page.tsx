import { FocusCards } from '@/components/ui/focus-cards';
import { MotionDiv, MotionH1, MotionP } from '@/components/ui/motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Cunoe',
  description: 'A curated collection of visual stories, capturing moments of beauty and urban poetry.',
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
    <div className="min-h-screen" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
      <div className="w-full bg-white dark:bg-neutral-950 md:px-10" style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}>
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <MotionH1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-5xl mb-6 text-black dark:text-white max-w-4xl font-bold"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            Visual Stories
          </MotionH1>
          <MotionP
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm font-semibold"
            style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}>
            A curated collection of visual stories, capturing moments of beauty and urban poetry.
          </MotionP>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}>
          <FocusCards cards={cards} />
        </MotionDiv>
      </div>
    </div>
  );
}
