'use client';

import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import { algoliasearch } from 'algoliasearch';
import Link from 'next/link';
import { format } from 'date-fns';

const searchClient = algoliasearch('Q4XLVZNMY7', 'e2bb09ac377d0171f06e3eab1add9c8e');

interface HitProps {
  hit: {
    objectID: string;
    title: string;
    excerpt: string;
    urlname: string;
    created_at: string;
    categories: string[];
    tags: string[];
  };
}

const Hit = ({ hit }: HitProps) => (
  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
    <Link href={`/blog/${hit.urlname}`} className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{hit.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{hit.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{format(new Date(hit.created_at), 'yyyy-MM-dd')}</span>
        <div className="flex gap-2">
          {hit.categories.map((category) => (
            <span key={category} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  </div>
);

interface SearchProps {
  className?: string;
}

export default function Search({ className = '' }: SearchProps) {
  return (
    <div className={className}>
      <InstantSearch searchClient={searchClient} indexName="blogs_index">
        <div className="mb-8">
          <SearchBox
            placeholder="搜索博客文章..."
            className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            classNames={{
              input: 'w-full bg-transparent border-none focus:outline-none',
              submit: 'hidden',
              reset: 'hidden',
              loadingIndicator: 'hidden',
            }}
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
} 