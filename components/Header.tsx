import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Github } from "lucide-react";

const Header: React.FC = () => {
  return (
    
    <>
    <div className="h-16" />
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md h-16">
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
                className="btn btn-ghost text-lg font-bold text-gray-200 hover:text-white"
              >
                CUNOE
              </Link>
            </div>

            <Link
              href="/blog"
              className="btn btn-ghost text-base text-gray-400 hover:text-white transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/code"
              className="btn btn-ghost text-base text-gray-400 hover:text-white transition-colors duration-200"
            >
              Code
            </Link>
            <Link
              href="/gallery"
              className="btn btn-ghost text-base text-gray-400 hover:text-white transition-colors duration-200"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="btn btn-ghost text-base text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="https://cloud.cunoe.com"
              target="_blank"
              className="btn btn-ghost text-base text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cloud
            </Link>
          </div>
          {/* 右侧联系信息部分 */}
          <div className="flex space-x-6 text-gray-400">
            <Link
              href="mailto:admin@cunoe.com"
              className="hover:text-white transition-colors duration-200"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="https://github.com/cunoe"
              target="_blank"
              className="hover:text-white transition-colors duration-200"
            >
              <Github size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
