import { Images } from "@/components/Images";
import { GalleryImageItem } from "@/types/gallery";

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-6xl text-3xl lg:text-7xl font-bold text-center mb-8 text-black dark:text-white relative z-20">
        背景图库
      </h1>
      <div className="w-full relative mb-12">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
      <div className="backdrop-blur-lg p-6">
        <Images images={images} />
      </div>
    </div>
  );
}

const images: GalleryImageItem[] = [
  {
    image: "https://s3.cunoe.com/files/background/bg-1.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-2.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-3.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-4.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-5.png",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-6.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-7.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-8.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-9.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-10.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-11.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-12.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-13.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-14.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-15.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-16.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-17.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-18.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-19.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-20.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-21.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-22.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-23.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-24.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-25.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-26.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-27.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-28.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-29.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-30.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-31.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-32.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-33.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-34.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-35.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-36.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-37.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-38.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-39.jpg",
  },
  {
    image: "https://s3.cunoe.com/files/background/bg-40.jpg",
  },
];
