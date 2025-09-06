'use client';
import { Blog } from '@/types/blog';
import Link from 'next/link';
import { format } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import { MotionLi } from '../ui/motion';

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function getContentPreview(content: string, maxLength: number = 100) {
  const firstHashIndex = content.indexOf('#');
  if (firstHashIndex === -1 || firstHashIndex > maxLength) {
    return content.length <= maxLength ? content : content.slice(0, maxLength).trim() + '...';
  }
  return content.slice(0, firstHashIndex).trim();
}

export function BlogItem({ blog }: { blog: Blog }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <MotionLi
      ref={ref}
      variants={itemAnimation}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ duration: 0.5 }}
      className="pb-3">
      <Link
        href={`/changelog/${blog.urlname}`}
        className="block hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{blog.title}</h2>
      </Link>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex gap-2">
        <span>by CUNOE</span>
        {format(new Date(blog.created_at), 'MMM d, yyyy')}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 prose prose-sm dark:prose-invert">
        {getContentPreview(blog.content)}
      </div>
    </MotionLi>
  );
}
