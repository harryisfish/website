'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Github, Sun, Moon, Twitter, Home, Notebook, Users, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
    }`;

  const iconBtnClass =
    'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg p-2 transition-all duration-200';

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group">
            <Image
              src="/favicon.ico"
              alt="Harry Logo"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-200"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-gray-900 dark:text-white">海鱼Harry</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">@harryisfish</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className={navLinkClass('/')}>
              <Home className="size-3.5" />
              首页
            </Link>
            <Link
              href="/blog"
              className={navLinkClass('/blog')}>
              <Notebook className="size-3.5" />
              博客
            </Link>
            <Link
              href="/friends"
              className={navLinkClass('/friends')}>
              <Users className="size-3.5" />
              友链
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-0.5">
            <Link
              href="mailto:product.indents-4d@icloud.com"
              aria-label="发送邮件给 Harry"
              className={iconBtnClass}>
              <Mail className="size-4" />
            </Link>
            <Link
              href="https://github.com/harryisfish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="访问 Harry 的 GitHub"
              className={iconBtnClass}>
              <Github className="size-4" />
            </Link>
            <Link
              href="https://twitter.com/harry_is_fish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="访问 Harry 的 X 主页"
              className={iconBtnClass}>
              <Twitter className="size-4" />
            </Link>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
              className={`${iconBtnClass} relative overflow-hidden`}>
              {mounted && (theme === 'dark' ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
              className={iconBtnClass}>
              {mounted && (theme === 'dark' ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />)}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
              className={iconBtnClass}>
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-white/5">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className={`${navLinkClass('/')} w-full py-2.5`}
              onClick={() => setIsMenuOpen(false)}>
              <Home className="size-4" /> 首页
            </Link>
            <Link
              href="/blog"
              className={`${navLinkClass('/blog')} w-full py-2.5`}
              onClick={() => setIsMenuOpen(false)}>
              <Notebook className="size-4" /> 博客
            </Link>
            <Link
              href="/friends"
              className={`${navLinkClass('/friends')} w-full py-2.5`}
              onClick={() => setIsMenuOpen(false)}>
              <Users className="size-4" /> 友链
            </Link>
            <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-white/5">
              <Link
                href="mailto:product.indents-4d@icloud.com"
                aria-label="发送邮件给 Harry"
                className={iconBtnClass}>
                <Mail className="size-4" />
              </Link>
              <Link
                href="https://github.com/harryisfish"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="访问 Harry 的 GitHub"
                className={iconBtnClass}>
                <Github className="size-4" />
              </Link>
              <Link
                href="https://twitter.com/harry_is_fish"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="访问 Harry 的 X 主页"
                className={iconBtnClass}>
                <Twitter className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
