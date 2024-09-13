import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function BlogListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");

  return (
    <Suspense fallback={<Loading />}>
      <BlogList page={page} />
    </Suspense>
  );
}
import { Blog } from "@/types/blog";
import { MotionUl } from "@/components/ui/motion";
import { BlogItem } from "@/components/Blogs/BlogItem";
import { BlogPagination } from "@/components/Blogs/Pagination";
import { PrismaClient } from "@prisma/client";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

