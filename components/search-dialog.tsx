'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Search as SearchIcon, X } from 'lucide-react';
import Search from './search';

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="搜索"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* 背景遮罩 */}
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />

        {/* 弹窗内容 */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                搜索博客文章
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Search />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
} 