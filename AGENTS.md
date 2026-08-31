# Project: 海鱼Harry个人网站

## Overview

Harry 的个人网站，基于 Next.js 构建，使用 Notion 作为博客内容源，部署在 Vercel 上。

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI
- **Content**: Notion API (via `notion-client` / `@notionhq/client`)
- **MDX**: `@next/mdx` for markdown support
- **Animation**: Framer Motion / Motion
- **Font**: LXGW Bright / LXGW Bright Medium (CDN)
- **Package Manager**: pnpm (lockfile: `pnpm-lock.yaml`)
- **Deployment**: Vercel (auto-deploy on push to main)
- **Analytics**: Google Analytics (`@next/third-parties`)
- **Bundler**: Webpack (`--webpack` flag; Turbopack 无法 spawn PostCSS worker)
- **Dev Tool**: react-grab (仅 dev 环境, ⌘C 选中元素复制组件信息)

## Project Structure

```
app/
  page.tsx          # 首页 (Profile: Hero + Projects + Recent Posts)
  blog/page.tsx     # 博客列表页 (BlogTimeline)
  blog/[urlname]/   # 博客详情页 (SSG, 从 Notion 获取)
  friends/          # 友链页面
  api/blogs/        # 博客列表 API
  sitemap.tsx       # Sitemap 生成
  globals.css       # 全局样式 (Tailwind v4 + 主题变量 + 字体)
  layout.tsx        # 根布局 (渐变背景 + SVG 纹理 + Header)
components/
  Header.tsx        # 导航栏 (Home / Blog / Friends, 毛玻璃, 主题切换)
  Blogs/            # 博客组件 (BlogItem, BlogTimeline, Pagination)
  Markdown/         # Markdown 渲染 (ContentRender, ImageBlock)
  ui/               # 通用 UI 组件 (shadcn 风格)
  ThemeProvider.tsx  # 主题切换 (dark/light, next-themes)
lib/
  notion.ts         # Notion API 封装 (含内存缓存)
  utils.ts          # 工具函数
proxy.ts            # 请求代理: /about→/, /links→/friends, /changelog→/blog
```

## Routes

| 路由              | 说明                                                    |
| ----------------- | ------------------------------------------------------- |
| `/`               | Profile 首页 (头像、简介、项目卡片、最近博客、社交链接) |
| `/blog`           | 博客列表 (年份分组时间线)                               |
| `/blog/[urlname]` | 博客详情 (Notion 内容渲染)                              |
| `/friends`        | 友链页面                                                |
| `/about`          | 重定向到 `/`                                            |
| `/links`          | 重定向到 `/friends`                                     |
| `/changelog/*`    | 重定向到 `/blog/*`                                      |

## Commands

- `pnpm dev` - 开发服务器 (绑定 0.0.0.0, webpack)
- `pnpm build` - 构建 (webpack)
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
- `eslint-config-next` 固定在 v15 以兼容 ESLint 8 的 legacy 配置格式
- Tailwind CSS v4 需要 `postcss.config.mjs` + `@tailwindcss/postcss`
- `.npmrc` 设置了 `shamefully-hoist=true`

## Theming

- 使用 `next-themes` 管理 dark/light 切换，`attribute="class"`
- Tailwind v4 需要 `@custom-variant dark (&:is(.dark *))` 在 globals.css 中声明
- CSS 变量定义在 `globals.css` 的 `:root` / `.dark` 中
- 颜色通过 `hsl(var(--name))` 在 `tailwind.config.ts` 中映射
- 渐变背景和 SVG 纹理统一在 `layout.tsx` 的 `<main>` 上
- 字体统一在 `globals.css` 中声明，组件不应内联 `fontFamily`

## Turbopack 兼容性问题

- Turbopack 在 pnpm symlink 结构下无法 spawn PostCSS 工作子进程
- 当前方案：dev/build 均使用 `--webpack` flag
- Vercel 部署可能不受影响（Linux 容器环境）

## Known Issues / History

- 2026-03-24: 网站重构 — 首页改为 Profile 模式，新增 /blog 列表页，/links 改为 /friends
- 2026-03-24: 修复 dark mode (Tailwind v4 需要 @custom-variant)
- 2026-03-24: 安装 react-grab 开发工具
- 2026-03-24: 改进导航栏 UI + 深浅色主题配色 + 清理冗余字体声明
- 2026-03-24: 发现 Turbopack 无法处理 PostCSS，回退到 webpack
- 2026-03-24: 升级到 Next.js 16.2.1 + Tailwind CSS v4 + HeroUI v3
- 2026-03-24: Next.js 从 15.2.4 升级到 15.5.14，修复 CVE-2025-66478
