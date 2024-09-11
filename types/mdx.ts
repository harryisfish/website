import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGFM from "remark-gfm";
import remarkToc from "remark-toc";

export const mdxOptions = {
  remarkPlugins: [
    remarkGFM,
    [
      remarkToc,
      {
        ordered: true,
        tight: true,
        heading: "TOC",
        maxDepth: 3,
      },
    ],
    remarkEmoji,
  ],
  rehypePlugins: [
    rehypeSlug,
    // this code is a bug for kv about md(x) page
    [
      rehypePrettyCode,
      {
        theme: "one-dark-pro",
        // theme: {
        // 	dark: 'one-dark-pro',
        // 	light: 'one-dark-pro'
        // },
        keepBackground: false,
      },
    ],
  ],
  format: "mdx",
};
