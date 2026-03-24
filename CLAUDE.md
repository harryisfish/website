# Project: 海鱼Harry个人网站

## Overview
Harry 的个人网站，基于 Next.js 构建，使用 Notion 作为博客内容源，部署在 Vercel 上。

## Tech Stack
- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + HeroUI v3 + Radix UI
- **Content**: Notion API (via `notion-client` / `@notionhq/client`)
- **MDX**: `@next/mdx` for markdown support
- **Animation**: Framer Motion / Motion
- **Package Manager**: pnpm (lockfile: `pnpm-lock.yaml`)
- **Deployment**: Vercel (auto-deploy on push to main)
- **Analytics**: Google Analytics (`@next/third-parties`)
- **Bundler**: Webpack (Turbopack has `@config` CSS bug with Tailwind v4)

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
proxy.ts            # 请求代理 (Next.js 16 替代 middleware.ts)
```

## Commands
- `pnpm dev` - 开发服务器 (绑定 0.0.0.0)
- `pnpm build` - 构建 (使用 webpack)
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
- 构建命令: `next build --webpack` (standalone output)
- 注意: Vercel 会阻止部署含已知安全漏洞的 Next.js 版本

## Key Dependencies Notes
- `npm install` 会因 peer dependency 冲突失败，需使用 `pnpm install`
- 如需 npm，需加 `--legacy-peer-deps` 参数
- `eslint-config-next` 固定在 v15 以兼容 ESLint 8 的 legacy 配置格式
- `eslint-plugin-tailwindcss` 已移除（与 Tailwind CSS v4 不兼容）
- HeroUI v3 不再需要 `HeroUIProvider`，使用 CSS 变量和 `@heroui/styles`
- Tailwind CSS v4 使用 `@import "tailwindcss"` 和 `@tailwindcss/postcss`

## Known Issues / History
- 2026-03-24: 升级到 Next.js 16.2.1 + Tailwind CSS v4 + HeroUI v3
- 2026-03-24: Next.js 从 15.2.4 升级到 15.5.14，修复 CVE-2025-66478 安全漏洞
