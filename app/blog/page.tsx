import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Metadata } from "next";
import { Blog } from "@/types/blog";
import { MotionUl } from "@/components/ui/motion";
import { BlogItem } from "@/components/Blogs/BlogItem";
import { BlogPagination } from "@/components/Blogs/Pagination";
import { getAllBlogs } from "@/lib/notion";

export const metadata: Metadata = {
  title: "博客列表 | My Blog",
  description: "查看所有博客文章",
};

export const revalidate = 3600; // 每小时重新验证一次

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export async function generateStaticParams() {
  try {
    const allBlogs = await getAllBlogs();
    const PAGE_SIZE = 10;
    const totalPages = Math.ceil(allBlogs.length / PAGE_SIZE);
    
    return Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 1).toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1");

  return (
    <Suspense fallback={<Loading />}>
      <BlogList page={page} />
    </Suspense>
  );
}

async function BlogList({
  page,
}: {
  page: number;
}) {
  const PAGE_SIZE = 10;

  try {
    // 获取所有博客来计算总数和分页
    const allBlogs = await getAllBlogs();
    const total = allBlogs.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    
    // 计算当前页的博客
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentPageBlogs = allBlogs.slice(startIndex, endIndex);

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <MotionUl
          className="space-y-8"
          variants={containerAnimation}
          initial="hidden"
          animate="show"
        >
          {currentPageBlogs.map((blog: Blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </MotionUl>
        <BlogPagination
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">加载博客失败，请稍后重试。</p>
      </div>
    );
  }
}

