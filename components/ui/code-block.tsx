'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

// Notion 相关类型定义
type Decoration = [string] | [string, any[]];
type NotionCodeBlock = {
  id: string;
  type: 'code';
  properties: {
    title: Decoration[];
    language: Decoration[];
    caption?: Decoration[];
  };
  format?: {
    code_wrap?: boolean;
    copied_from_pointer?: {
      id: string;
      table: string;
      spaceId: string;
    };
  };
  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  space_id: string;
  version: number;
  crdt_format_version?: number;
  crdt_data?: any;
};

type CodeBlockProps = {
  language?: string;
  filename?: string;
  highlightLines?: number[];
  block?: NotionCodeBlock;
  defaultLanguage?: string;
} & (
  | {
      code?: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs?: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

// 从 Notion Decoration 数组中提取文本内容
const extractTextFromDecorations = (decorations: Decoration[]): string => {
  return decorations
    .map((decoration) => {
      if (Array.isArray(decoration) && decoration.length > 0) {
        return decoration[0];
      }
      return '';
    })
    .join('');
};

// 从 Notion CodeBlock 中提取代码和语言信息
const extractNotionCodeData = (block: NotionCodeBlock) => {
  const code = extractTextFromDecorations(block.properties.title);
  const language = extractTextFromDecorations(block.properties.language);
  const codeWrap = block.format?.code_wrap || false;

  return {
    code,
    language: language || 'plaintext',
    codeWrap,
  };
};

export const CodeBlock = ({
  block,
  defaultLanguage = 'typescript',
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps & { className?: string }) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // 从 Notion block 中提取数据，如果提供了 block
  const notionData = block ? extractNotionCodeData(block) : null;

  // 确定最终使用的代码、语言和换行设置
  const finalCode = notionData?.code || code || '';
  const finalLanguage = notionData?.language || language || defaultLanguage;
  const shouldWrapLines = notionData?.codeWrap || false;

  const tabsExist = tabs && tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : finalCode;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : finalCode;
  const activeLanguage = tabsExist ? tabs[activeTab].language || finalLanguage : finalLanguage;
  const activeHighlightLines = tabsExist ? tabs[activeTab].highlightLines || [] : highlightLines;

  return (
    <div
      className={`relative w-full rounded-lg p-4 font-mono text-sm ${
        isDark ? 'bg-slate-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
      style={{
        all: 'unset',
        display: 'block',
        position: 'relative',
        width: '100%',
        borderRadius: '0.5rem',
        backgroundColor: isDark ? 'rgb(15 23 42)' : 'rgb(243 244 246)',
        color: isDark ? 'rgb(243 244 246)' : 'rgb(17 24 39)',
        padding: '1rem',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        fontSize: '0.875rem',
      }}>
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className={`flex overflow-x-auto ${isDark ? 'scrollbar-horizontal' : 'scrollbar-horizontal-light'}`}>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? isDark
                      ? 'text-white'
                      : 'text-gray-900'
                    : isDark
                      ? 'text-zinc-400 hover:text-zinc-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}>
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className={`text-xs py-2 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>{filename}</div>
        )}
      </div>

      {/* 复制按钮 - 绝对定位在右上角 */}
      <button
        onClick={copyToClipboard}
        className={`absolute top-4 right-4 flex items-center gap-1 text-xs transition-colors font-sans z-10 ${
          isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-500 hover:text-gray-700'
        }`}>
        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
      </button>
      <SyntaxHighlighter
        language={activeLanguage}
        style={isDark ? atomDark : tomorrow}
        customStyle={{
          margin: 0,
          padding: 0,
          background: 'transparent',
          fontSize: '0.875rem', // text-sm equivalent
          color: isDark ? 'inherit' : 'rgb(17 24 39)',
          fontFamily: 'inherit',
          textShadow: 'none',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          tabSize: 4,
          hyphens: 'none',
        }}
        wrapLines={shouldWrapLines}
        showLineNumbers={true}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber) ? 'rgba(255,255,255,0.1)' : 'transparent',
            display: 'block',
            width: '100%',
          },
        })}
        PreTag="div"
        codeTagProps={{
          style: {
            background: 'transparent',
            color: isDark ? 'inherit' : 'rgb(17 24 39)',
            fontFamily: 'inherit',
          },
        }}>
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
