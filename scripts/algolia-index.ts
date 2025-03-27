const { algoliasearch } = require('algoliasearch');
const { PrismaClient } = require('@prisma/client');

interface Blog {
  id: number;
  title: string;
  content: string;
  urlname: string;
  categories: string;
  tags: string;
  created_at: Date;
  updated_at: Date;
}

const prisma = new PrismaClient();
const client = algoliasearch('Q4XLVZNMY7', 'e2bb09ac377d0171f06e3eab1add9c8e');

// 截断文本到指定长度
const truncateText = (text: string, maxLength: number = 5000): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// 生成摘要
const generateExcerpt = (content: string, maxLength: number = 200): string => {
  // 移除 HTML 标签
  const plainText = content.replace(/<[^>]*>/g, '');
  return truncateText(plainText, maxLength);
};

// Fetch and index objects in Algolia
const processRecords = async () => {
  try {
    // 从数据库获取所有博客文章
    const blogs = await prisma.blogs.findMany({
      where: {
        hide: false
      },
      select: {
        id: true,
        title: true,
        content: true,
        urlname: true,
        categories: true,
        tags: true,
        created_at: true,
        updated_at: true
      }
    });

    // 转换数据格式以适应 Algolia
    const records = blogs.map((blog: Blog) => ({
      objectID: blog.id,
      title: blog.title,
      // 只保留前 5000 个字符的内容
      content: truncateText(blog.content),
      // 添加摘要字段
      excerpt: generateExcerpt(blog.content),
      urlname: blog.urlname,
      categories: blog.categories.split(',').map((cat: string) => cat.trim()),
      tags: blog.tags.split(',').map((tag: string) => tag.trim()),
      created_at: blog.created_at.toISOString(),
      updated_at: blog.updated_at.toISOString()
    }));

    // 保存到 Algolia
    await client.saveObjects({ indexName: 'blogs_index', objects: records });
    console.log(`Successfully indexed ${records.length} blog posts!`);
  } catch (error) {
    console.error('Error indexing objects:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the indexing process
processRecords(); 