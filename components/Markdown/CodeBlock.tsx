'use client';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AnimatePresence } from 'motion/react';
import { MotionSection, MotionSpan } from '../ui/motion';

interface CodeBlockProps {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const [language, setLanguage] = useState('unknown');
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const match = /language-(\w+)/.exec(className || '');
    if (match && match[1]) {
      setLanguage(match[1]);
    }
  }, [className]);

  const handleCopy = () => {
    setIsCopied(true);
    toast('代码已复制到剪贴板');
    setTimeout(() => setIsCopied(false), 2000); // 2秒后恢复原始图标
  };

  return (
    <section
      className="relative"
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}>
      <AnimatePresence>
        {showCopyButton && (
          <MotionSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 z-10">
            <CopyToClipboard
              text={children}
              onCopy={handleCopy}>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent">
                <AnimatePresence
                  mode="wait"
                  initial={false}>
                  {isCopied ? (
                    <MotionSpan
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}>
                      <Check className="h-4 w-4" />
                    </MotionSpan>
                  ) : (
                    <MotionSpan
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}>
                      <Copy className="h-4 w-4" />
                    </MotionSpan>
                  )}
                </AnimatePresence>
              </Button>
            </CopyToClipboard>
          </MotionSection>
        )}
      </AnimatePresence>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="section"
        className="rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </section>
  );
}
