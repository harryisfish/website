import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Blog } from "@/types/blog";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlname = searchParams.get("urlname");

    if (urlname) {
      // 根据 urlname 获取单篇博客
      const blog = (await prisma.blogs.findUnique({
        where: { urlname },
      })) as Blog | null;

      if (!blog) {
        return NextResponse.json({ error: "未找到博客" }, { status: 404 });
      }

      return NextResponse.json(blog);
    }
    return NextResponse.json({ error: "未找到博客" }, { status: 404 });
  } catch (error) {
    console.error("获取博客失败:", error);
    return NextResponse.json({ error: "获取博客失败" }, { status: 500 });
  }
}
