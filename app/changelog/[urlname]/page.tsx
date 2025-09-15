import { notFound } from 'next/navigation';
import NotionContent from '@/components/Markdown/ContentRender';
import { notion, NOTION_DATABASE_ID, transformNotionPageToBlog, getPageRecordMap, getPageMarkdown } from '@/lib/notion';
import { MotionDiv } from '@/components/ui/motion';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{ urlname: string }>;
}

export const revalidate = 300; // 每5分钟重新验证一次缓存
export const dynamicParams = true; // 允许动态参数

// 安全提取 URLName 文本
function extractURLName(page: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = page;
  const prop = p?.properties?.URLName;
  const rt = prop?.rich_text;
  if (Array.isArray(rt) && rt.length > 0 && typeof rt[0]?.plain_text === 'string') {
    return rt[0].plain_text as string;
  }
  return '';
}

export async function generateStaticParams() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        // Status 是 Notion 的"状态"类型
        status: {
          equals: '已发布',
        },
      },
      page_size: 100,
    });

    const params = response.results.map((page) => ({ urlname: extractURLName(page) })).filter((item) => item.urlname);
    console.log(`Generated ${params.length} static params for changelog pages`);
    
    // 如果生成失败或没有参数，返回一个默认参数避免构建错误
    if (params.length === 0) {
      console.warn('No static params generated, returning empty array');
      return [];
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    // 返回空数组，让页面在运行时动态生成
    return [];
  }
}


export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <BlogContent urlname={params.urlname} />
    </Suspense>
  );
}

async function BlogContent({ urlname }: { urlname: string }) {
  console.log(`[BlogDetail] 开始获取博客详情，URLName: ${urlname}`);
  const startTime = Date.now();
  
  try {
    console.log(`[BlogDetail] 查询数据库，查找 URLName: ${urlname}`);
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'URLName',
            rich_text: {
              equals: urlname,
            },
          },
          {
            property: 'Status',
            status: {
              equals: '已发布',
            },
          },
        ],
      },
      page_size: 1,
    });

    const queryDuration = Date.now() - startTime;
    console.log(`[BlogDetail] 数据库查询完成，耗时: ${queryDuration}ms，结果数量: ${response.results.length}`);

    if (!response.results.length) {
      console.log(`[BlogDetail] 未找到博客，URLName: ${urlname}`);
      return notFound();
    }

    console.log(`[BlogDetail] 开始转换博客数据`);
    const blog = transformNotionPageToBlog(response.results[0]);
    console.log(`[BlogDetail] 博客转换完成: ${blog.title} (ID: ${blog.id})`);

    console.log(`[BlogDetail] 开始获取 RecordMap`);
    const recordMapStartTime = Date.now();
    let recordMap;
    try {
      recordMap = await getPageRecordMap(blog.id);
      const recordMapDuration = Date.now() - recordMapStartTime;
      console.log(`[BlogDetail] RecordMap 获取完成，耗时: ${recordMapDuration}ms`);
    } catch (error) {
      const recordMapDuration = Date.now() - recordMapStartTime;
      console.warn(`[BlogDetail] RecordMap 获取失败，耗时: ${recordMapDuration}ms，使用降级方案, error: ${error}`);
      // 使用空的recordMap作为降级方案
      recordMap = {
        block: {},
        collection: {},
        collection_view: {},
        notion_user: {},
        signed_urls: {},
        preview_images: {},
      };
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[BlogDetail] 博客详情页面准备完成，总耗时: ${totalDuration}ms`);

    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <NotionContent
          recordMap={recordMap}
          blog={blog}
        />
      </MotionDiv>
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[BlogDetail] 获取博客详情失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      urlname,
      timestamp: new Date().toISOString()
    });
    return notFound();
  }
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const params = await props.params;
  console.log(`[BlogMetadata] 开始生成元数据，URLName: ${params.urlname}`);
  const startTime = Date.now();

  try {
    console.log(`[BlogMetadata] 查询数据库获取博客信息`);
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'URLName',
            rich_text: {
              equals: params.urlname,
            },
          },
          {
            property: 'Status',
            status: {
              equals: '已发布',
            },
          },
        ],
      },
      page_size: 1,
    });

    const queryDuration = Date.now() - startTime;
    console.log(`[BlogMetadata] 数据库查询完成，耗时: ${queryDuration}ms，结果数量: ${response.results.length}`);

    if (!response.results.length) {
      console.log(`[BlogMetadata] 未找到博客，返回默认元数据`);
      return {
        title: 'Changelog Not Found',
      };
    }

    console.log(`[BlogMetadata] 开始转换博客数据`);
    const blog = transformNotionPageToBlog(response.results[0]);
    console.log(`[BlogMetadata] 博客转换完成: ${blog.title}`);

    // 提取前 160 个字符作为描述（若没有 digest）
    let fallback = '';
    if (blog.content && blog.content.length > 0) {
      fallback = blog.content.substring(0, 160);
      console.log(`[BlogMetadata] 使用博客内容作为描述，长度: ${fallback.length}`);
    } else {
      console.log(`[BlogMetadata] 博客内容为空，获取 Markdown 内容作为描述`);
      const markdownStartTime = Date.now();
      try {
        const markdown = await getPageMarkdown(blog.id);
        fallback = markdown.substring(0, 160);
        const markdownDuration = Date.now() - markdownStartTime;
        console.log(`[BlogMetadata] Markdown 获取完成，耗时: ${markdownDuration}ms，描述长度: ${fallback.length}`);
      } catch (error) {
        const markdownDuration = Date.now() - markdownStartTime;
        console.warn(`[BlogMetadata] Markdown 获取失败，耗时: ${markdownDuration}ms，使用默认描述, error: ${error}`);
        fallback = '暂无描述';
      }
    }

    const metadata = {
      title: `${blog.title} | Cunoe Changelog`,
      description: blog.digest || fallback,
      keywords: [...blog.categories, ...blog.tags].join(', '),
      openGraph: {
        title: blog.title,
        description: blog.digest || fallback,
        type: 'article',
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
      },
    };

    const totalDuration = Date.now() - startTime;
    console.log(`[BlogMetadata] 元数据生成完成，总耗时: ${totalDuration}ms`, {
      title: metadata.title,
      descriptionLength: metadata.description.length,
      keywordsCount: [...blog.categories, ...blog.tags].length
    });

    return metadata;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[BlogMetadata] 生成元数据失败，耗时: ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      urlname: params.urlname,
      timestamp: new Date().toISOString()
    });
    return {
      title: 'Changelog Not Found',
    };
  }
}
