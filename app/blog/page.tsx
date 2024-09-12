"use client";
import { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BallTriangle } from "react-loader-spinner";
import { motion } from "framer-motion";
import { BlogItem } from "@/components/Blogs/BlogItem";

function getBlogs(page = 1, pageSize = 10) {
  return fetch(`/api/blogs?page=${page}&pageSize=${pageSize}`);
}

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogListPage({
  searchParams,
}: {
  searchParams: { page?: string; pageSize?: string };
}) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const page = parseInt(searchParams.page || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  useEffect(() => {
    setIsLoading(true);
    getBlogs(page, pageSize)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalItems);
        setIsLoading(false);
      });
  }, [page, pageSize]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#fff"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.ul
        className="space-y-8"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {blogs.map((blog: Blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </motion.ul>
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/blog?page=${currentPage - 1}&pageSize=${pageSize}`}
              />
            </PaginationItem>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/blog?page=${pageNumber}&pageSize=${pageSize}`}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <PaginationEllipsis key={pageNumber} />;
            }
            return null;
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/blog?page=${currentPage + 1}&pageSize=${pageSize}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
