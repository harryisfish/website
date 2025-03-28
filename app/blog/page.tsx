import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Metadata } from "next";
import { Blog } from "@/types/blog";
import { MotionUl } from "@/components/ui/motion";
import { BlogItem } from "@/components/Blogs/BlogItem";
import { BlogPagination } from "@/components/Blogs/Pagination";
import { PrismaClient } from "@prisma/client";

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
  const prisma = new PrismaClient();
  const total = await prisma.blogs.count({ where: { hide: false } });
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
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
  const skip = (page - 1) * PAGE_SIZE;

  const prisma = new PrismaClient();
  const [blogs, total] = await Promise.all([
    prisma.blogs.findMany({
      where: { hide: false },
      skip,
      take: PAGE_SIZE,
      orderBy: { created_at: "desc" },
    }),
    prisma.blogs.count({ where: { hide: false } }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <MotionUl
        className="space-y-8"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {blogs.map((blog: Blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </MotionUl>
      <BlogPagination
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}

