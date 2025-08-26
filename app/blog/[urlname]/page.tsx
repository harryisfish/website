import { notFound } from "next/navigation";
import { format } from "date-fns";
import ContentRender from "@/components/Markdown/ContentRender";
import { notion, NOTION_DATABASE_ID, transformNotionPageToBlog, getPageMarkdown } from "@/lib/notion";
import { MotionDiv, MotionH1 } from "@/components/ui/motion";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Metadata } from 'next'

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
        property: "Status",
        // Status 是 Notion 的“状态”类型
        status: {
          equals: "已发布",
        },
      },
      page_size: 100,
    });
    
    return response.results
      .map((page) => ({ urlname: extractURLName(page) }))
      .filter((item) => item.urlname);
  } catch (error) {
    console.error("Error generating static params:", error);
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
            property: "URLName",
            rich_text: {
              equals: urlname,
            },
          },
          {
            property: "Status",
            status: {
              equals: "已发布",
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

    // 若 Digest 为空，则从 blocks 拉取正文并填充到 content
    const content = await getPageMarkdown(blog.id);

    return (
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        {/* 博客标题 */}
        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {blog.title}
        </MotionH1>
        
        {/* 分类和标签 */}
        {(blog.categories.length > 0 || blog.tags.length > 0) && (
          <div className="text-center mb-6">
            {blog.categories.length > 0 && (
              <div className="inline-block mr-4 mb-2">
                <span className="text-sm text-gray-500 font-medium">分类:</span>
                {blog.categories.map((category, index) => (
                  <span key={index} className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {category}
                  </span>
                ))}
              </div>
            )}
            {blog.tags.length > 0 && (
              <div className="inline-block mb-2">
                <span className="text-sm text-gray-500 font-medium">标签:</span>
                {blog.tags.map((tag, index) => (
                  <span key={index} className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* 发布时间 */}
        <div className="text-center text-gray-600 mb-8">
          <time dateTime={blog.created_at} className="text-lg">
            📅 {format(new Date(blog.created_at), "yyyy年MM月dd日")}
          </time>
        </div>
        
        {/* 摘要内容 */}
        {blog.digest && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
              📝 摘要
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{blog.digest}</p>
          </div>
        )}
        
        {/* 主要内容 */}
        <div className="prose prose-lg max-w-none">
          <ContentRender content={content} />
        </div>
        
        {/* 文章信息 */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
            <div>
              <span className="font-medium">状态:</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                blog.status === '已发布' ? 'bg-green-100 text-green-800' :
                blog.status === '草稿' ? 'bg-yellow-100 text-yellow-800' :
                blog.status === '正在编辑' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {blog.status}
              </span>
            </div>
            <div>
              <span className="font-medium">创建时间:</span>
              <span className="ml-2">{format(new Date(blog.created_at), "yyyy/MM/dd")}</span>
            </div>
            <div>
              <span className="font-medium">更新时间:</span>
              <span className="ml-2">{format(new Date(blog.updated_at), "yyyy/MM/dd")}</span>
            </div>
          </div>
        </div>
      </MotionDiv>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
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
            property: "URLName",
            rich_text: {
              equals: params.urlname,
            },
          },
          {
            property: "Status",
            status: {
              equals: "已发布",
            },
          },
        ],
      },
      page_size: 1,
    });

    if (!response.results.length) {
      return {
        title: 'Blog Not Found'
      };
    }

    const blog = transformNotionPageToBlog(response.results[0]);

    // 提取前 160 个字符作为描述（若没有 digest）
    const fallback = blog.content && blog.content.length > 0
      ? blog.content.substring(0, 160)
      : (await getPageMarkdown(blog.id)).substring(0, 160);

    return {
      title: `${blog.title} | Cunoe Blog`,
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
    console.error("Error generating metadata:", error);
    return {
      title: 'Blog Not Found'
    };
  }
}
