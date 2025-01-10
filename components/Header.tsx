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
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const closePopover = () => setIsOpen(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div className="h-16" />
      <header className="fixed top-0 left-0 right-0 z-50 dark:bg-black/50 bg-white/50 backdrop-blur-md h-16">
        <div className="container mx-auto h-full">
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
                <Link
                  href="https://cloud.cunoe.com"
                  target="_blank"
                  className="btn btn-ghost text-base dark:text-gray-400 text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  Cloud
                </Link>
              </div>
            </div>
            {/* 右侧联系信息部分 */}
            <div className="flex space-x-6 dark:text-gray-400 text-gray-600">
              <Link
                href="mailto:admin@cunoe.com"
                className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </Link>
              <Link
                href="https://github.com/cunoe"
                target="_blank"
                className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </Link>
              <button
                onClick={toggleTheme}
                className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Menu size={24} className="md:hidden cursor-pointer" />
                </PopoverTrigger>
                <AnimatePresence>
                  {isOpen && (
                    <PopoverContent className="dark:bg-black/90 bg-white/90 dark:border-gray-700 border-gray-200 p-0">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col"
                      >
                        {["Blog", "Code", "Gallery", "Links", "Cloud"].map(
                          (item, index) => (
                            <motion.div
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
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    </PopoverContent>
                  )}
                </AnimatePresence>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
