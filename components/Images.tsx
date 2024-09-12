"use client";
import { GalleryImageItem } from "@/types/gallery";
import { Masonry } from "react-masonry-component2";
import { Image } from '@nextui-org/react';

export interface ImagesProps {
  images: GalleryImageItem[];
}

export const Images = (props: ImagesProps) => {
  return (
    <Masonry
      direction="column"
      columnsCountBreakPoints={{
        1400: 3,
        1000: 2,
      }}
    >
      {props.images.map((image) => (
        <div key={image.image} className="mb-8 px-2"> {/* 添加了 margin-bottom 和 padding-x */}
          <Image
            src={image.image}
            alt={image.title ?? ""}
            width="100%"
            height="auto"
            className="w-full"
          />
        </div>
      ))}
    </Masonry>
  );
};
