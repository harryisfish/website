"use client";

import React, { useState } from "react";
import { Image } from "@heroui/react";
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import('react-viewer'), {
  ssr: false,
  loading: () => <div>Loading viewer...</div>,
});

interface ImageWithZoomProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: any; // 支持 HeroUI Image 的其他属性
}

const ImageWithZoom: React.FC<ImageWithZoomProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  onClick,
  ...props
}) => {
  const [viewerVisible, setViewerVisible] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Image clicked, opening viewer');
    setViewerVisible(true);
    onClick?.();
  };

  return (
    <>
      <div
        className={`cursor-pointer relative ${className || ""}`}
        style={style}
        onClick={handleImageClick}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain"
          {...props}
        />
        {/* 备用点击区域 */}
        <div 
          className="absolute inset-0 z-10"
          onClick={handleImageClick}
        />
      </div>

      <Viewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        images={[{ src, alt }]}
        activeIndex={0}
      />
    </>
  );
};

export default ImageWithZoom;
