# Cunoe Blog - Next.js + Notion

一个基于 Next.js 15 和 Notion API 的现代化博客系统。

## 特性

- ⚡ **Next.js 15** - 最新的 React 框架
- 📝 **Notion 集成** - 使用 Notion 作为内容管理系统
- 🎨 **Tailwind CSS** - 现代化的样式系统
- 🌙 **深色模式** - 支持主题切换
- 📱 **响应式设计** - 移动端友好

- 📊 **MDX 支持** - 支持 Markdown 和 React 组件
- 🚀 **静态生成** - 支持 SSG 和 ISR

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS, Framer Motion
- **内容管理**: Notion API

- **部署**: Vercel (推荐)

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd cunoe-blog-next
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

复制 `.env.local.example` 到 `.env.local` 并填写：

```bash
# Notion API 配置
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here


```

### 4. 设置 Notion

详细设置说明请参考 [Notion 设置指南](./docs/notion-setup.md)

### 5. 运行开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

```
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API 路由
│   ├── blog/              # 博客页面
│   └── globals.css        # 全局样式
├── components/             # React 组件
│   ├── Blogs/             # 博客相关组件
│   ├── Header/            # 头部组件
│   └── ui/                # UI 组件库
├── lib/                    # 工具函数
│   └── notion.ts          # Notion API 客户端
├── types/                  # TypeScript 类型定义
└── docs/                   # 项目文档
```

## 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### 其他平台

项目支持部署到任何支持 Next.js 的平台。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
