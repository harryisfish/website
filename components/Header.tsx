'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as LinkIcon, Mail, Github, Sun, Moon, Twitter, Home, User, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Harry Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold">海鱼Harry</span>
              <span className="text-xs italic text-gray-500">@harryisfish</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="size-4" />
              About
            </Link>
            <Link
              href="/links"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <LinkIcon className="size-4" />
              Links
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="mailto:product.indents-4d@icloud.com"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
              <Mail className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/harryisfish"
              target="_blank"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com/harry_is_fish"
              target="_blank"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
              <Twitter className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            className="sm:hidden p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              <Home className="size-4" /> Home
            </Link>
            <Link href="/about" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              <User className="size-4" /> About
            </Link>
            <Link href="/links" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>
              <LinkIcon className="size-4" /> Links
            </Link>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <Link href="mailto:product.indents-4d@icloud.com" className="p-2"><Mail className="h-5 w-5" /></Link>
              <Link href="https://github.com/harryisfish" target="_blank" className="p-2"><Github className="h-5 w-5" /></Link>
              <Link href="https://twitter.com/harry_is_fish" target="_blank" className="p-2"><Twitter className="h-5 w-5" /></Link>
              <button onClick={toggleTheme} className="p-2">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
