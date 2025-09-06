import { Images } from '@/components/Images';
import { GalleryImageItem } from '@/types/gallery';

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-6xl text-3xl lg:text-7xl font-bold text-center mb-8 text-black dark:text-white relative z-20">
        武汉印象
      </h1>
      <div className="backdrop-blur-lg p-6">
        <Images images={images} />
      </div>
    </div>
  );
}

const images: GalleryImageItem[] = [
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3072.jpg',
    title: '武汉古德寺的鸽子',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3093.jpg',
    title: '武汉长江边的『W506快艇』',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3097.jpg',
    title: '武汉横渡长江博物馆',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3120.jpg',
    title: '武汉台北小院',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3131.jpg',
    title: '武汉江汉路美食营地',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3136.jpg',
    title: '武汉江汉关',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3141.jpg',
    title: '武汉长江大桥上方',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3154.jpg',
    title: '武汉黄鹤楼',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3162.jpg',
    title: '武汉某公园',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3165.jpg',
    title: '武汉一个窗口',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3171.jpg',
    title: '武汉的公园猫猫，敲可爱🥰',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3173.jpg',
    title: '武汉大学门牌',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3182.jpg',
    title: '武汉大学樱花城堡上的建筑',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3188.jpg',
    title: '武汉大学樱花城堡上的绿茵',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3192.jpg',
    title: '武汉大学樱花城堡的楼梯',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3206-2.jpg',
    title: '武汉大学内博物馆观景台',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3207.jpg',
    title: '武汉大学内博物馆观景台',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3208-2.jpg',
    title: '武汉东湖',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3208.jpg',
    title: '武汉东湖',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3212.jpg',
    title: '武汉东湖',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3254.jpg',
    title: '武汉湖北省博物馆旁边的湖里的警示牌',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3257.jpg',
    title: '武汉临江大道旁',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3263.jpg',
    title: '武汉临江大道旁',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3264.jpg',
    title: '武汉临江大道旁',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3275.jpg',
    title: '武汉轮渡的一个警示牌',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3277.jpg',
    title: '武汉轮渡上的江景',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3286.jpg',
    title: '武汉轮渡上的手持拍摄',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3278.jpg',
    title: '武汉轮渡上不知道的什么塔',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3279.jpg',
    title: '武汉轮渡上的江景',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3293.jpg',
    title: '武汉轮渡上等待离船的人们',
  },
  {
    image: 'https://s3.cunoe.com/files/20231020/_DSC3294.jpg',
    title: '武汉轮渡上一个很漂亮的玩偶摊子',
  },
];
