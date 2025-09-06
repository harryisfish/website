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

export const revalidate = 3600; // 每小时重新验证一次

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
        // Status 是 Notion 的“状态”类型
        status: {
          equals: '已发布',
        },
      },
      page_size: 100,
    });

    return response.results.map((page) => ({ urlname: extractURLName(page) })).filter((item) => item.urlname);
  } catch (error) {
    console.error('Error generating static params:', error);
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
    const recordMap = await getPageRecordMap(blog.id);

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
    console.error('Error fetching blog:', error);
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
    const fallback =
      blog.content && blog.content.length > 0
        ? blog.content.substring(0, 160)
        : (await getPageMarkdown(blog.id)).substring(0, 160);

    return {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Changelog Not Found',
    };
  }
}
