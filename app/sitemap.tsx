import type { MetadataRoute } from 'next';
import { getAllBlogs, type NotionBlog } from '@/lib/notion';

async function getBlogs(): Promise<MetadataRoute.Sitemap> {
  const blogs: NotionBlog[] = await getAllBlogs();
  return blogs.map((blog: NotionBlog) => ({
    url: `https://cunoe.com/changelog/${blog.urlname}`,
    lastModified: new Date(blog.updated_at),
    changeFrequency: 'weekly',
    priority: 0.5,
  })) as MetadataRoute.Sitemap;
}

async function getPages(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://cunoe.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cunoe.com/gallery',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://cunoe.com/links',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://cunoe.com/changelog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();
  const pages = await getPages();
  return [...blogs, ...pages];
}
