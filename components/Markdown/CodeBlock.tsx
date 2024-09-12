import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const [language, setLanguage] = useState("unknown");
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const match = /language-(\w+)/.exec(className || "");
    if (match && match[1]) {
      setLanguage(match[1]);
    }
  }, [className]);

  const handleCopy = () => {
    setIsCopied(true);
    toast("代码已复制到剪贴板");
    setTimeout(() => setIsCopied(false), 2000); // 2秒后恢复原始图标
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
    >
      <AnimatePresence>
        {showCopyButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 z-10"
          >
            <CopyToClipboard text={children} onCopy={handleCopy}>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isCopied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </CopyToClipboard>
          </motion.div>
        )}
      </AnimatePresence>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className="rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
