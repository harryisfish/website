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

export const revalidate = 86400; // 每24小时重新验证一次缓存
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
  try {
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

    if (!response.results.length) {
      return notFound();
    }

    const blog = transformNotionPageToBlog(response.results[0]);

    let recordMap;
    try {
      recordMap = await getPageRecordMap(blog.id);
    } catch (error) {
      console.warn(`[BlogDetail] RecordMap 获取失败，使用降级方案, error: ${error}`);
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
    console.error(`[BlogDetail] 获取博客详情失败`, {
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

  try {
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

    if (!response.results.length) {
      return {
        title: 'Changelog Not Found',
      };
    }

    const blog = transformNotionPageToBlog(response.results[0]);

    // 提取前 160 个字符作为描述（若没有 digest）
    let fallback = '';
    if (blog.content && blog.content.length > 0) {
      fallback = blog.content.substring(0, 160);
    } else {
      try {
        const markdown = await getPageMarkdown(blog.id);
        fallback = markdown.substring(0, 160);
      } catch (error) {
        console.warn(`[BlogMetadata] Markdown 获取失败，使用默认描述, error: ${error}`);
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

    return metadata;
  } catch (error) {
    console.error(`[BlogMetadata] 生成元数据失败`, {
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
