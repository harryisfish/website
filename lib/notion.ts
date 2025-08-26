/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

if (!process.env.NOTION_TOKEN) {
  throw new Error('Missing NOTION_TOKEN environment variable');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing NOTION_DATABASE_ID environment variable');
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notionApi = new NotionAPI({ authToken: process.env.NOTION_TOKEN_V2 });

// 博客文章类型定义
export interface NotionBlog {
  id: string;
  title: string;
  content: string;
  urlname: string;
  categories: string[];
  tags: string[];
  hide: boolean;
  created_at: string;
  updated_at: string;
  digest?: string;
  status?: string;
}

// 从 Notion 页面对象转换为博客对象
export function transformNotionPageToBlog(page: any): NotionBlog {
  const properties = page.properties;
  
  return {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || '',
    content: properties.Digest?.rich_text?.[0]?.plain_text || '', // 如果不在 Digest 中，稍后用 blocks 填充
    urlname: properties.URLName?.rich_text?.[0]?.plain_text || '',
    categories: properties.Categories?.multi_select?.map((cat: any) => cat.name) || [],
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    hide: properties.Status?.status?.name !== '已发布',
    created_at: properties.CreatedAt?.created_time || page.created_time,
    updated_at: page.last_edited_time,
    digest: properties.Digest?.rich_text?.[0]?.plain_text || '',
    status: properties.Status?.status?.name || '构思中',
  };
}

// 分页结果类型
export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

// 获取分页博客列表
export async function getPaginatedBlogs(
  pageSize: number = 10,
  startCursor?: string
): Promise<PaginatedResult<NotionBlog>> {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: "Status",
      status: {
        equals: "已发布",
      },
    },
    sorts: [
      {
        property: "CreatedAt",
        direction: "descending",
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const blogs = response.results.map(transformNotionPageToBlog);
  
  return {
    data: blogs,
    nextCursor: response.next_cursor,
    hasMore: response.has_more,
  };
}

// 获取所有博客（用于计算总数和静态生成）
export async function getAllBlogs(): Promise<NotionBlog[]> {
  const allBlogs: NotionBlog[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const result = await getPaginatedBlogs(100, startCursor);
    allBlogs.push(...result.data);
    hasMore = result.hasMore;
    startCursor = result.nextCursor || undefined;
  }

  return allBlogs;
}

// 读取页面 blocks 并转成简单 Markdown（覆盖常见块：heading/paragraph/bulleted/numbered/quote/code/divider）
export async function getPageMarkdown(pageId: string): Promise<string> {
  const lines: string[] = [];
  let startCursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: startCursor,
      page_size: 100,
    });

    for (const block of res.results as any[]) {
      const type = block.type as string;
      const b: any = block[type];
      const textArray = b?.rich_text as any[] | undefined;
      const plain = Array.isArray(textArray)
        ? textArray.map((t) => t?.plain_text ?? '').join('')
        : '';

      switch (type) {
        case 'heading_1':
          lines.push(`# ${plain}`);
          break;
        case 'heading_2':
          lines.push(`## ${plain}`);
          break;
        case 'heading_3':
          lines.push(`### ${plain}`);
          break;
        case 'paragraph':
          lines.push(plain);
          break;
        case 'bulleted_list_item':
          lines.push(`- ${plain}`);
          break;
        case 'numbered_list_item':
          lines.push(`1. ${plain}`);
          break;
        case 'quote':
          lines.push(`> ${plain}`);
          break;
        case 'code': {
          const lang = b?.language || '';
          const codeText = Array.isArray(textArray)
            ? textArray.map((t) => t?.plain_text ?? '').join('')
            : '';
          lines.push('```' + lang);
          lines.push(codeText);
          lines.push('```');
          break;
        }
        case 'divider':
          lines.push('---');
          break;
        default:
          // 未覆盖类型作为普通文本降级
          if (plain) lines.push(plain);
      }
    }

    hasMore = res.has_more as boolean;
    startCursor = (res.next_cursor as string | null) || undefined;
  }

  // 合并空行，保证可读性
  return lines.join('\n\n');
}

// 使用 notion-client 获取完整的 recordMap，用于 react-notion-x 渲染
export async function getPageRecordMap(pageId: string) {
  const cleanId = pageId.replace(/-/g, '');
  return notionApi.getPage(cleanId);
}
