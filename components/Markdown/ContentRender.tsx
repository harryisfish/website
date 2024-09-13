import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

interface ContentRenderProps {
  content: string;
}

const ContentRender: React.FC<ContentRenderProps> = ({ content }) => {
  return (
    <article
        className="prose prose-lg dark:prose-invert max-w-none
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
        prose-h5:text-base prose-h6:text-sm
        prose-ul:text-base prose-ol:text-base
        prose-pre:bg-transparent prose-pre:p-0
        [&_pre]:!bg-transparent [&_pre]:!p-0"
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            code({ node, inline, className, children, ...props }: any) {
              return (
                <CodeBlock className={className}>{String(children)}</CodeBlock>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </article>
  );
};

export default ContentRender;
