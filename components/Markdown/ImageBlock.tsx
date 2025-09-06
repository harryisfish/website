'use client';

import { Image, Card, CardBody } from '@heroui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useTheme } from 'next-themes';

const Viewer = dynamic(() => import('react-viewer'), { ssr: false });

export default function ImageBlock({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  // 检查是否为SVG链接
  const isSvg = src.toLowerCase().includes('.svg') || src.toLowerCase().includes('svg');

  // 如果是SVG，直接返回null
  if (isSvg) {
    return null;
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // 占位符组件
  const Placeholder = () => (
    <Card className="w-full h-64">
      <CardBody className="flex items-center justify-center">
        <BallTriangle
          height={60}
          width={60}
          radius={5}
          color={theme === 'dark' ? '#fff' : '#000'}
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </CardBody>
    </Card>
  );

  // 错误状态组件
  const ErrorPlaceholder = () => (
    <Card className="w-full h-64 border-danger/20">
      <CardBody className="flex items-center justify-center">
        <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-danger"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="relative w-full">
        {isLoading && <Placeholder />}
        {hasError && <ErrorPlaceholder />}
        <Image
          src={src}
          alt={alt}
          title={title}
          width="100%"
          height="auto"
          className={`w-full cursor-pointer transition-opacity duration-300 ${
            isLoading || hasError ? 'opacity-0 absolute' : 'opacity-100'
          }`}
          onClick={() => setVisible(true)}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {visible && !hasError && (
        <Viewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={[{ src, alt, downloadUrl: src }]}
        />
      )}
    </>
  );
}
