## Vue3 静态博客技术方案（Tech Plan）

### 目标与边界
- **目标**: 基于 Vue3 快速搭建一个可持续写作的静态博客，支持 Markdown 写作、良好 SEO、主题可定制、搜索、RSS、评论与分析。
- **边界**: 本方案仅做设计与决策，后续按步骤执行；部署优先 GitHub Pages，也兼容 Vercel/Netlify/Cloudflare Pages。

### 技术选型与对比（已确认：Nuxt 3 + @nuxt/content + Tailwind）

| 方案 | 技术栈 | 优点 | 可能不足 | 适用场景 |
| --- | --- | --- | --- | --- |
| Nuxt 3 + @nuxt/content（推荐） | Vue3 + Nuxt + Content | 博客能力完善（MD+Vue 组件、目录/标签、草稿）、强 SEO、生态完备（SEO Kit、Image、PWA、i18n） | 配置量略多，上手略重于 VitePress | 需要完整博客功能与长期可扩展性 |
| VitePress（轻量） | Vite + Vue3 + Markdown-it | 极简、上手飞快、写作流畅 | 博客特性需自研或插件，RSS/Sitemap/Search 需补齐 | 笔记/文档型、对复杂功能要求不高 |
| Astro + Vue 组件 | Astro + Vue | 出色的静态站性能与内容能力 | 核心非 Vue，心智模型增加 | 多框架协作与极致性能优先 |

**结论（已定）**: 采用 Nuxt 3 + @nuxt/content，样式体系使用 Tailwind。本阶段不接入 SEO 套件、评论系统与站点分析，后续可平滑增量接入。

### 推荐方案架构（Nuxt 3 + @nuxt/content）

- **核心依赖（按当前阶段约束）**
  - 必选：`nuxt`、`@nuxt/content`
  - 样式：`@nuxtjs/tailwindcss`
  - 代码高亮：内置高亮或 `shiki`（可选）
  - 图片处理：暂不接入 `@nuxt/image`（后续如需可增量接入）
  - 搜索：后续根据内容体量评估（`Fuse.js`/`Pagefind`），当前阶段不实现
  - SEO/评论/分析：本阶段不接入，预留增量空间

- **内容组织**
  - 目录：`content/posts/`（文章）、`content/pages/`（独立页）、`public/`（静态资源）
  - Frontmatter：`title`、`date`、`updated`、`description`、`tags`、`categories`、`cover`、`draft`
  - 草稿：`draft: true` 在生产构建时排除

- **主题与 UI**
  - 全局样式：Tailwind 或 UnoCSS；暗黑模式（prefers-color-scheme + class 切换）
  - 组件：导航栏、页脚、文章卡片、标签/分类、面包屑、目录（ToC）
  - 文章页：代码高亮、图片懒加载、阅读时长、上一篇/下一篇、版权信息

- **搜索方案**
  - 轻量：构建期生成 `search-index.json`（标题/摘要/标签/路径），客户端 Fuse.js 查询
  - 加强：Pagefind（静态站全文检索，中文支持更好，无需第三方）
  - 重型：Algolia DocSearch（内容量极大时）

- **SEO 与可见性（当前阶段）**
  - 不接入 `nuxt-seo-kit`、`sitemap`、`robots`、RSS/Atom
  - 仍建议在基础页面设置标题与描述的基础 meta（Nuxt 默认能力即可）

- **媒体与性能**
  - 图片：@nuxt/image + 本地 IPX 或外部 CDN，生成多规格、懒加载
  - 代码高亮：SSR 渲染（shiki 或内置）提升首屏与可读性
  - 预渲染：`nuxi generate` 输出纯静态文件，适配各类静态托管

- **部署与运维**
  - 部署：GitHub Pages（优先）或 Vercel/Netlify/Cloudflare Pages
  - CI/CD：GitHub Actions 自动构建与部署
  - 监测：本阶段不接入统计与错误监控

- **写作流程**
  - 本地写作：`content/posts/` 新建 Markdown；图片放置 `public/images/`
  - 预览：本地开发预览或平台 Preview 环境；分支 PR 审阅
  - 版本化：文章与资源随仓库版本管理
  - 可选无头 CMS：Decap（Git 驱动 GUI）、CloudCannon 等（保持静态）

- **工程化**
  - Node LTS（建议 v20+），包管理器 pnpm（或 npm/yarn）
  - TypeScript（建议）
  - 规范：ESLint（Vue/TS）、Prettier、lint-staged、Husky、Commitlint（约定式提交）

### 备选方案要点（VitePress）
- 核心：Vite + Vue3 + Markdown-it，默认主题可扩展为博客风格
- 搜索：Algolia DocSearch 或 Pagefind/vitepress-plugin-search
- RSS：vitepress-plugin-rss 或构建脚本生成
- SEO/Sitemap：基础 meta + `vite-plugin-sitemap` 或脚本
- PWA：`vite-plugin-pwa`
- 适用：极简、内容偏文档/笔记，对标签/分类/归档等要求较低

### 风险与权衡
- Nuxt 方案：配置更多，但一旦搭好，写作体验与扩展性最佳
- VitePress：最快落地，但复杂博客功能需要插件与维护投入
- 国内可用性：评论与分析服务注意可达性（Giscus/Utterances/Valine/Artalk；Plausible/Umami/GA4/百度）

### 需确认的关键选项
- 框架选择：Nuxt 3 + @nuxt/content 或 VitePress？
- 部署平台：GitHub Pages、Vercel、Netlify、Cloudflare Pages？
- 域名与 SEO：是否有自定义域、favicon、OG 图与站点描述？
- 评论与分析：Giscus/Utterances/Valine/Artalk；Plausible/Umami/GA4/百度？
- 样式体系：Tailwind 或 UnoCSS；是否需要暗黑模式切换？
- 功能范围：标签/分类/归档、阅读时长、系列文章、相册、i18n？

### 术语与约定
- 本方案中的「静态博客」指构建产物为纯静态文件，可通过任意静态托管平台发布。
- 「内容系统」指 Markdown/MDX/Content DB 等内容读取与渲染链路。


