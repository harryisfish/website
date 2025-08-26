"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Menu, Sun, Moon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { MotionDiv } from "./ui/motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const closePopover = () => setIsOpen(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex justify-between items-center h-full">
          {/* 左侧头像和链接部分 */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <Link
                href="/"
                className="btn btn-ghost text-lg font-bold dark:text-gray-200 text-gray-800 hover:text-gray-900 dark:hover:text-white"
              >
                CUNOE
              </Link>
            </div>

            <div className="hidden md:flex space-x-6">
              <Link
                href="/blog"
                className="btn btn-ghost text-base dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                className="btn btn-ghost text-base dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                Gallery
              </Link>
              <Link
                href="/links"
                className="btn btn-ghost text-base dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                Links
              </Link>
            </div>
          </div>
          {/* 右侧联系信息部分 */}
          <div className="flex items-center space-x-6 dark:text-gray-400 text-gray-600">
            <Link
              href="mailto:admin@cunoe.com"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/cunoe"
              target="_blank"
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleTheme}
              className="flex items-center hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Menu className="h-6 w-6 md:hidden cursor-pointer" />
              </PopoverTrigger>
              <AnimatePresence>
                {isOpen && (
                  <PopoverContent className="dark:bg-black/90 bg-white/90 dark:border-gray-700 border-gray-200 p-0">
                    <MotionDiv
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col"
                    >
                      {["Blog", "Code", "Gallery", "Links", "Cloud"].map(
                        (item, index) => (
                          <MotionDiv
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              href={
                                item === "Cloud"
                                  ? "https://cloud.cunoe.com"
                                  : `/${item.toLowerCase()}`
                              }
                              target={item === "Cloud" ? "_blank" : undefined}
                              className="block px-4 py-2 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-100 transition-colors duration-200"
                              onClick={closePopover}
                            >
                              {item}
                            </Link>
                          </MotionDiv>
                        )
                      )}
                    </MotionDiv>
                  </PopoverContent>
                )}
              </AnimatePresence>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
