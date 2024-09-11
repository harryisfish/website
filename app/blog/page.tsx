'use client'
import { Blog } from '@/types/blog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function getBlogs(page = 1, pageSize = 10) {
  return fetch(`/api/blogs?page=${page}&pageSize=${pageSize}`)
}

// 新增函数：截取内容预览
function getContentPreview(content: string, maxLength: number = 100) {
  const firstHashIndex = content.indexOf('#');
  if (firstHashIndex === -1 || firstHashIndex > maxLength) {
    return content.length <= maxLength ? content : content.slice(0, maxLength).trim() + '...';
  }
  return content.slice(0, firstHashIndex).trim();
}

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
  const page = parseInt(searchParams.page || '1');
  const pageSize = parseInt(searchParams.pageSize || '10');

  useEffect(() => {
    setIsLoading(true);
    getBlogs(page, pageSize).then(res => res.json()).then(data => {
      setBlogs(data.blogs);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      setIsLoading(false);
    });
  }, [page, pageSize]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <ul className="space-y-8">
            {blogs.map((blog: Blog) => (
              <li key={blog.id} className="pb-3">
                <Link href={`/blog/${blog.urlname}`} className="block hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{blog.title}</h2>
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex gap-2">
                    <span>by CUNOE</span>
                  {format(new Date(blog.created_at), 'MMM d, yyyy')}
                  {blog.updated_at && blog.updated_at !== blog.created_at && (
                    <span> (Updated: {format(new Date(blog.updated_at), 'MMM d, yyyy')})</span>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 prose prose-sm dark:prose-invert">
                  {getContentPreview(blog.content)}
                </div>
                <Separator className="mt-12" />
              </li>
            ))}
          </ul>
          
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/blog?page=${currentPage - 1}&pageSize=${pageSize}`} />
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
                  <PaginationNext href={`/blog?page=${currentPage + 1}&pageSize=${pageSize}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
