# Project: 海鱼Harry个人网站

## Overview
Harry 的个人网站，基于 Next.js 构建，使用 Notion 作为博客内容源，部署在 Vercel 上。

## Tech Stack
- **Framework**: Next.js 15.5.14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + HeroUI + Radix UI
- **Content**: Notion API (via `notion-client` / `@notionhq/client`)
- **MDX**: `@next/mdx` for markdown support
- **Animation**: Framer Motion / Motion
- **Package Manager**: pnpm (lockfile: `pnpm-lock.yaml`)
- **Deployment**: Vercel (auto-deploy on push to main)
- **Analytics**: Google Analytics (`@next/third-parties`)

## Project Structure
```
app/
  page.tsx          # 首页 (项目展示)
  about/page.tsx    # 关于页面 (个人简介、项目链接、社交媒体)
  blog/[urlname]/   # 博客详情页 (SSG, 从 Notion 获取)
  links/            # 友链页面
  api/blogs/        # 博客列表 API
  sitemap.tsx       # Sitemap 生成
components/
  Header.tsx        # 导航栏
  Blogs/            # 博客相关组件 (BlogItem, BlogTimeline, Pagination)
  Markdown/         # Markdown 渲染 (ContentRender, ImageBlock)
  ui/               # 通用 UI 组件 (shadcn 风格)
  ThemeProvider.tsx  # 主题切换 (dark/light)
lib/
  notion.ts         # Notion API 封装
  utils.ts          # 工具函数
```

## Commands
- `pnpm dev` - 开发服务器 (绑定 0.0.0.0)
- `pnpm build` - 构建
- `pnpm lint` / `pnpm lint:fix` - ESLint
- `pnpm format` / `pnpm format:check` - Prettier
- `pnpm stylelint` / `pnpm stylelint:fix` - Stylelint
- `pnpm type-check` - TypeScript 类型检查

## Git Hooks (Husky + lint-staged)
- Pre-commit: 对暂存文件运行 eslint (JS/TS) 和 stylelint (CSS)
- Commit message: commitlint (conventional commits)
- 首次 clone 需要 `pnpm install` 安装依赖以启用 hooks

## Deployment
- 平台: Vercel
- Git 集成: push 到 `main` 分支自动触发部署
- Vercel 项目名: `website`
- 生产 URL: `website-harryisfish.vercel.app`
- 构建命令: `next build` (standalone output)
- 注意: Vercel 会阻止部署含已知安全漏洞的 Next.js 版本

## Key Dependencies Notes
- `npm install` 会因 peer dependency 冲突失败，需使用 `pnpm install`
- 如需 npm，需加 `--legacy-peer-deps` 参数
- 部分依赖 (next-themes, framer-motion 等) 的 peer deps 尚未支持 React 19，但运行正常

## Known Issues / History
- 2026-03-24: Next.js 从 15.2.4 升级到 15.5.14，修复 CVE-2025-66478 安全漏洞（Vercel 拒绝部署旧版本）
