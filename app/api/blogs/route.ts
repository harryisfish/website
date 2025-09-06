import { NextResponse } from 'next/server';
import { notion, NOTION_DATABASE_ID, transformNotionPageToBlog } from '@/lib/notion';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: '已发布', // 只显示已发布状态的文章
        },
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'descending',
        },
      ],
      page_size: limit,
      start_cursor: cursor || undefined,
    });

    const blogs = response.results.map(transformNotionPageToBlog);
    const nextCursor = response.next_cursor;

    return NextResponse.json({
      blogs,
      nextCursor,
    });
  } catch (error) {
    console.error('Error fetching blogs from Notion:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
