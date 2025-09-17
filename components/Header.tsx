'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as HeroLink,
  Image,
} from '@heroui/react';
import Link from 'next/link';
import { Link as LinkIcon, Mail, Github, Sun, Moon, Logs, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      className="fixed inset-x-0 top-0 z-50">
      <NavbarContent>
        {/* 桌面端Brand */}
        <NavbarBrand className="sm:flex">
          <HeroLink
            href="/"
            className="flex items-center gap-2">
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
          </HeroLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden gap-4 sm:flex"
        justify="center">
        <NavbarItem>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Logs className="size-4" />
            Blog
          </Link>
        </NavbarItem>


        <NavbarItem>
          <Link
            href="/links"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <LinkIcon className="size-4" />
            Links
          </Link>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex items-center gap-2">
          <Link
            href="mailto:product.indents-4d@icloud.com"
            className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/cunoe"
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
        </NavbarItem>

        {/* 移动端菜单按钮 */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="z-50 items-end">
        <NavbarMenuItem className="flex justify-end">
          <HeroLink
            className="w-auto"
            color="foreground"
            href="/blog"
            size="lg">
            <Logs className="mr-2 size-4" />
            Blog
          </HeroLink>
        </NavbarMenuItem>


        <NavbarMenuItem className="flex justify-end">
          <HeroLink
            className="w-auto"
            color="foreground"
            href="/links"
            size="lg">
            <LinkIcon className="mr-2 size-4" />
            Links
          </HeroLink>
        </NavbarMenuItem>

        <NavbarMenuItem className="flex justify-end">
          <div className="flex items-center gap-2 w-auto">
            <Link
              href="mailto:product.indents-4d@icloud.com"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200 p-2">
              <Mail className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/cunoe"
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
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
