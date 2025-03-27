import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Metadata } from "next";
import { BlogList } from "./components/BlogList";

export const metadata: Metadata = {
  title: "博客列表 | My Blog",
  description: "查看所有博客文章",
};

export const revalidate = 3600; // 每小时重新验证一次

export default function BlogListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BlogList />
    </Suspense>
  );
}

