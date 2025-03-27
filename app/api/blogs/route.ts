import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || "10");

  const blogs = await prisma.blogs.findMany({
    where: { hide: false },
    take: limit,
    ...(cursor
      ? {
          cursor: {
            id: parseInt(cursor),
          },
        }
      : {}),
    orderBy: { created_at: "desc" },
  });

  const nextCursor = blogs.length === limit ? blogs[blogs.length - 1].id : null;

  return NextResponse.json({
    blogs,
    nextCursor,
  });
} 