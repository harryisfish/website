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

## Project Structure
```
app/
  page.tsx          # 首页 (博客时间线 + 侧栏个人卡片)
  about/page.tsx    # 关于页面 (个人简介、项目链接、社交媒体)
  blog/[urlname]/   # 博客详情页 (SSG, 从 Notion 获取)
  links/            # 友链页面
  api/blogs/        # 博客列表 API
  sitemap.tsx       # Sitemap 生成
  globals.css       # 全局样式 (Tailwind v4 + 主题变量 + 字体)
components/
  Header.tsx        # 导航栏 (毛玻璃效果、active 指示、主题切换)
  Blogs/            # 博客相关组件 (BlogItem, BlogTimeline, Pagination)
  Markdown/         # Markdown 渲染 (ContentRender, ImageBlock)
  ui/               # 通用 UI 组件 (shadcn 风格)
  ThemeProvider.tsx  # 主题切换 (dark/light, next-themes)
lib/
  notion.ts         # Notion API 封装 (含内存缓存)
  utils.ts          # 工具函数
proxy.ts            # 请求代理 (Next.js 16 替代 middleware.ts)
```

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
- 如需 npm，需加 `--legacy-peer-deps` 参数
- `eslint-config-next` 固定在 v15 以兼容 ESLint 8 的 legacy 配置格式
- `eslint-plugin-tailwindcss` 已移除（与 Tailwind CSS v4 不兼容）
- Tailwind CSS v4 需要 `postcss.config.mjs` + `@tailwindcss/postcss`
- `.npmrc` 设置了 `shamefully-hoist=true`

## Theming
- 使用 `next-themes` 管理 dark/light 切换
- CSS 变量定义在 `globals.css` 的 `:root` / `.dark` 中
- 颜色通过 `hsl(var(--name))` 格式在 `tailwind.config.ts` 中映射为 Tailwind 颜色
- 暗色模式：深蓝灰背景 (`gray-950`)，蓝色主色调
- 字体统一在 `globals.css` 中声明，组件不应内联 `fontFamily`

## Turbopack 兼容性问题
- Turbopack 在 pnpm symlink 结构下无法 spawn PostCSS 工作子进程（exit code 0, 无输出）
- 不删除 `postcss.config.mjs` 时 Turbopack 崩溃，删除后 Tailwind v4 不处理
- 当前方案：dev/build 均使用 `--webpack` flag
- Vercel 部署可能不受影响（Linux 容器环境）

## Known Issues / History
- 2026-03-24: 改进导航栏 UI + 深浅色主题配色 + 清理 30+ 处冗余字体声明
- 2026-03-24: 发现 Turbopack 无法处理 PostCSS，回退到 webpack
- 2026-03-24: 升级到 Next.js 16.2.1 + Tailwind CSS v4 + HeroUI v3
- 2026-03-24: Next.js 从 15.2.4 升级到 15.5.14，修复 CVE-2025-66478
