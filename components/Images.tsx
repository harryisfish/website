'use client';
import { GalleryImageItem } from '@/types/gallery';
import { Masonry } from 'react-masonry-component2';
import ImageBlock from './Markdown/ImageBlock';

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
      }}>
      {props.images.map((image) => (
        <div
          key={image.image}
          className="mb-8 px-2">
          <ImageBlock
            src={image.image}
            alt={image.title ?? ''}
            title={image.title ?? ''}
          />
        </div>
      ))}
    </Masonry>
  );
};
