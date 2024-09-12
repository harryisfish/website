import type { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getBlogs(): Promise<MetadataRoute.Sitemap> {
  const blogs = await prisma.blogs.findMany();
  return blogs.map((blog) => ({
    url: `https://cunoe.com/blog/${blog.urlname}`,
    lastModified: blog.updated_at,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
}

async function getPages(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://cunoe.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://cunoe.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://cunoe.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const pages = await getPages();
  return [...blogs, ...pages];
}
