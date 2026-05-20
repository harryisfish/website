'use client';

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
  const imageAlt = alt || title || '文章图片';
  const imageTitle = title || alt || undefined;

  const isSvg = src.toLowerCase().includes('.svg') || src.toLowerCase().includes('svg');

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

  const Placeholder = () => (
    <div className="w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
      <BallTriangle
        height={60}
        width={60}
        radius={5}
        color={theme === 'dark' ? '#fff' : '#000'}
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );

  const ErrorPlaceholder = () => (
    <div className="w-full h-64 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-500"
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
    </div>
  );

  return (
    <>
      <div className="relative w-full min-h-64">
        {isLoading && <Placeholder />}
        {hasError && <ErrorPlaceholder />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={imageAlt}
          title={imageTitle}
          loading="lazy"
          decoding="async"
          className={`w-full h-auto cursor-pointer transition-opacity duration-300 rounded-lg ${
            isLoading || hasError ? 'opacity-0 absolute' : 'opacity-100'
          }`}
          role="button"
          tabIndex={0}
          onClick={() => setVisible(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setVisible(true);
            }
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {visible && !hasError && (
        <Viewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={[{ src, alt: imageAlt, downloadUrl: src }]}
        />
      )}
    </>
  );
}
