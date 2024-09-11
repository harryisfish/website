import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CodeBlockProps {
  className?: string;
  children: string;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  
  const [language, setLanguage] = useState('unknown');

  const languages = [
    'bash', 'c', 'cpp', 'csharp', 'css', 'dart', 'docker', 'go',
    'graphql', 'html', 'java', 'javascript', 'json', 'kotlin', 'latex',
    'less', 'lua', 'markdown', 'matlab', 'mysql', 'objectivec', 'perl',
    'php', 'powershell', 'python', 'r', 'ruby', 'rust', 'scala', 'scss',
    'shell', 'sql', 'swift', 'typescript', 'vim', 'yaml', 'text', 'plaintext', 'unknown'
  ];

  useEffect(() => {
    const match = /language-(\w+)/.exec(className || "");
    if (match && match[1]) {
      setLanguage(match[1]);
    }
  }, [className]);

  return (
    <div className="relative">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="absolute top-2 right-2 z-10 w-[120px] text-white rounded px-2 py-1 text-sm">
          <SelectValue placeholder="选择语言" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className="min-h-16 rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}
