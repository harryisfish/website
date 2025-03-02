"use client";

import { Image } from "@heroui/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Viewer = dynamic(() => import('react-viewer'), { ssr: false });

export default function ImageBlock({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        title={title}
        width="100%"
        height="auto"
        className="w-full cursor-pointer"
        onClick={() => setVisible(true)}
      />
      {visible && (
        <Viewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={[{ src, alt, downloadUrl: src }]}
        />
      )}
    </>
  );
}
