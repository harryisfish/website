import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Blog } from "@/types/blog";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";
interface BlogResponse {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export async function GET(
  request: Request
): Promise<NextResponse<BlogResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const skip = (page - 1) * pageSize;

    const [blogs, total] = await Promise.all([
      prisma.blogs.findMany({
        where: { hide: false }, // 只返回未隐藏的博客
        skip,
        take: pageSize,
        orderBy: { created_at: "desc" },
      }),
      prisma.blogs.count({ where: { hide: false } }), // 只计算未隐藏的博客总数
    ]);

    const response: BlogResponse = {
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("获取博客失败:", error);
    return NextResponse.json(
      {
        blogs: [],
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        error: "获取博客失败",
      },
      { status: 500 }
    );
  }
}
