import { Images } from '@/components/Images';
import { GalleryImageItem } from '@/types/gallery';

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-6xl text-3xl lg:text-7xl font-bold text-center mb-8 text-black dark:text-white relative z-20">
        合肥之秋
      </h1>
      <div className="backdrop-blur-lg p-6">
        <Images images={images} />
      </div>
    </div>
  );
}

const images: GalleryImageItem[] = [
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2885.jpg',
    title: '校舍',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2891.jpg',
    title: '热烈庆祝中华人民共和国成立74周年！',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2898.jpg',
    title: '淮河路桥（大东门）',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2901.jpg',
    title: 'NioEP9',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2916.JPG',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2933.JPG',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2965.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2987.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC2998.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC3017.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC3027.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC3041.jpg',
    title: '',
  },
  {
    image: 'https://s3.cunoe.com/files/20231001/_DSC3039.jpg',
    title: '',
  },
];
