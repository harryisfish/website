"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import dynamic from "next/dynamic";
import { Image } from "@heroui/react";
import Link from "next/link";
import { useTheme } from "next-themes";

const NotionRenderer = dynamic<any>(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
);

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);

interface NotionContentProps {
  recordMap: any;
}

const NotionContent: React.FC<NotionContentProps> = ({ recordMap }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="notion max-w-none">
      <NotionRenderer
        recordMap={recordMap}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
        }}
        fullPage={true}
        darkMode={isDark}
        forceCustomImages
      />
    </div>
  );
};

export default NotionContent;
