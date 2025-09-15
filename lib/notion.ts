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

const notionApi = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

// 简单的内存缓存
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`[Cache] 命中缓存: ${key}`);
    return cached.data;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
  console.log(`[Cache] 设置缓存: ${key}`);
}

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
  console.log(`[NotionTransform] 开始转换页面: ${page.id}`);

  const properties = page.properties;

  // 处理分类 - Categories 是 select 类型，不是 multi_select
  const categories = properties.Categories?.select?.name ? [properties.Categories.select.name] : [];

  const blog = {
    id: page.id,
    title: properties.Title?.title?.[0]?.plain_text || '',
    content: properties.Digest?.rich_text?.[0]?.plain_text || '', // 如果不在 Digest 中，稍后用 blocks 填充
    urlname: properties.URLName?.rich_text?.[0]?.plain_text || '',
    categories: categories,
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
    hide: properties.Status?.status?.name !== '已发布',
    created_at: properties.CreatedAt?.date?.start || page.created_time,
    updated_at: page.last_edited_time,
    digest: properties.Digest?.rich_text?.[0]?.plain_text || '',
    status: properties.Status?.status?.name || '构思中',
  };

  console.log(`[NotionTransform] 转换完成: ${blog.title} (${blog.status})`);

  return blog;
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
  startCursor?: string,
): Promise<PaginatedResult<NotionBlog>> {
  console.log(`[NotionQuery] 开始分页查询，页面大小: ${pageSize}, 起始游标: ${startCursor || '无'}`);
  const startTime = Date.now();

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: '已发布',
        },
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'descending',
        },
      ],
      page_size: pageSize,
      start_cursor: startCursor,
    });

    const duration = Date.now() - startTime;
    console.log(`[NotionQuery] 数据库查询完成，耗时: ${duration}ms, 结果数量: ${response.results.length}`);

    const blogs = response.results.map(transformNotionPageToBlog);

    console.log(`[NotionQuery] 分页结果: 当前页 ${blogs.length} 篇，还有更多: ${response.has_more}`);

    return {
      data: blogs,
      nextCursor: response.next_cursor,
      hasMore: response.has_more,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[NotionQuery] 分页查询失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      pageSize,
      startCursor,
      databaseId: NOTION_DATABASE_ID,
    });
    throw error;
  }
}

// 获取所有博客（用于计算总数和静态生成）
export async function getAllBlogs(): Promise<NotionBlog[]> {
  console.log('[NotionGetAll] 开始获取所有博客');
  const startTime = Date.now();
  const allBlogs: NotionBlog[] = [];
  let hasMore = true;
  let startCursor: string | undefined;
  let pageCount = 0;

  while (hasMore) {
    pageCount++;
    console.log(`[NotionGetAll] 获取第 ${pageCount} 页博客`);

    const result = await getPaginatedBlogs(100, startCursor);
    allBlogs.push(...result.data);
    hasMore = result.hasMore;
    startCursor = result.nextCursor || undefined;

    console.log(`[NotionGetAll] 第 ${pageCount} 页完成，当前总数: ${allBlogs.length}`);
  }

  const duration = Date.now() - startTime;
  console.log(`[NotionGetAll] 获取所有博客完成，总计: ${allBlogs.length} 篇，分 ${pageCount} 页，耗时: ${duration}ms`);

  return allBlogs;
}

// 读取页面 blocks 并转成简单 Markdown（覆盖常见块：heading/paragraph/bulleted/numbered/quote/code/divider）
export async function getPageMarkdown(pageId: string): Promise<string> {
  console.log(`[NotionMarkdown] 开始获取页面 Markdown: ${pageId}`);
  const startTime = Date.now();

  // 检查缓存
  const cacheKey = `markdown:${pageId}`;
  const cachedData = getCachedData<string>(cacheKey);
  if (cachedData) {
    const duration = Date.now() - startTime;
    console.log(`[NotionMarkdown] Markdown 从缓存获取完成，耗时: ${duration}ms`);
    return cachedData;
  }

  const lines: string[] = [];
  let startCursor: string | undefined;
  let hasMore = true;
  let blockCount = 0;

  try {
    while (hasMore) {
      // 添加超时控制，每次API调用最多等待3秒
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Markdown获取超时')), 3000);
      });

      const blocksPromise = notion.blocks.children.list({
        block_id: pageId,
        start_cursor: startCursor,
        page_size: 100,
      });

      const res = await Promise.race([blocksPromise, timeoutPromise]) as any;

      console.log(`[NotionMarkdown] 获取到 ${res.results.length} 个 blocks`);

      for (const block of res.results as any[]) {
        blockCount++;
        const type = block.type as string;
        const b: any = block[type];
        const textArray = b?.rich_text as any[] | undefined;
        const plain = Array.isArray(textArray) ? textArray.map((t) => t?.plain_text ?? '').join('') : '';

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
            const codeText = Array.isArray(textArray) ? textArray.map((t) => t?.plain_text ?? '').join('') : '';
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

    const duration = Date.now() - startTime;
    const markdown = lines.join('\n\n');
    
    // 缓存结果
    setCachedData(cacheKey, markdown);
    
    console.log(
      `[NotionMarkdown] Markdown 转换完成，处理了 ${blockCount} 个 blocks，生成 ${markdown.length} 字符，耗时: ${duration}ms`,
    );

    return markdown;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[NotionMarkdown] Markdown 获取失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      pageId,
    });
    
    // 如果是超时错误，返回已获取的部分内容
    if (error instanceof Error && error.message.includes('超时')) {
      console.warn(`[NotionMarkdown] 超时降级，返回已获取的 ${lines.length} 行内容`);
      return lines.join('\n\n');
    }
    
    throw error;
  }
}

// 使用 notion-client 获取完整的 recordMap，用于 react-notion-x 渲染
export async function getPageRecordMap(pageId: string) {
  console.log(`[NotionRecordMap] 开始获取页面 RecordMap: ${pageId}`);
  const startTime = Date.now();

  try {
    const cleanId = pageId.replace(/-/g, '');
    console.log(`[NotionRecordMap] 清理后的页面ID: ${cleanId}`);

    // 检查缓存
    const cacheKey = `recordmap:${cleanId}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      const duration = Date.now() - startTime;
      console.log(`[NotionRecordMap] RecordMap 从缓存获取完成，耗时: ${duration}ms`);
      return cachedData;
    }

    // 添加超时控制，最多等待8秒
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('RecordMap获取超时')), 8000);
    });

    const recordMapPromise = notionApi.getPage(cleanId);
    
    const recordMap = await Promise.race([recordMapPromise, timeoutPromise]);

    // 缓存结果
    setCachedData(cacheKey, recordMap);

    const duration = Date.now() - startTime;
    console.log(`[NotionRecordMap] RecordMap 获取完成，耗时: ${duration}ms`);

    return recordMap;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[NotionRecordMap] RecordMap 获取失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      pageId,
      cleanId: pageId.replace(/-/g, ''),
    });
    
    // 如果是超时错误，返回一个空的recordMap而不是抛出错误
    if (error instanceof Error && error.message.includes('超时')) {
      console.warn(`[NotionRecordMap] 超时降级，返回空RecordMap`);
      return {
        block: {},
        collection: {},
        collection_view: {},
        notion_user: {},
        signed_urls: {},
        preview_images: {},
      };
    }
    
    throw error;
  }
}
