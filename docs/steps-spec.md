## Vue3 静态博客实施步骤规范（Steps Spec）

> 本文为零编码版执行清单：逐步落地技术方案，适配 macOS + GitHub。

### 一、项目初始化（已选 Nuxt 3 + @nuxt/content，UI 使用 Tailwind）
1. 选择方案：
   - 确认：Nuxt 3 + @nuxt/content（本期采用）
   - 备注：VitePress 为备选，不在本期实施
2. 准备环境：
   - 安装 Node.js LTS（建议 v20+）
   - 包管理器：pnpm（或 npm/yarn）
   - Git 初始化并创建 GitHub 仓库

### 二、目录结构（Nuxt 推荐方案）
```
root/
  content/
    posts/              # 博客文章（Markdown）
    pages/              # 自定义页面（Markdown）
  public/
    images/             # 静态图片
  components/           # Vue 组件（主题与布局）
  layouts/              # 布局（default/post 等）
  pages/                # 站点路由页面（列表/归档/标签等）
  server/               # （可选）构建期脚本或 API（静态化前）
  app.config.ts         # 站点级配置（Nuxt）
  nuxt.config.ts        # Nuxt 配置
  docs/
    tech-plan.md
    steps-spec.md
```

### 三、依赖规划（本期范围）
- 必选：`nuxt`、`@nuxt/content`
- 样式：`@nuxtjs/tailwindcss`
- 高亮：内置或 `shiki`（可选）
- 图片：暂不接入 `@nuxt/image`
- 搜索：暂不实现（后续可选 `fuse.js` 或 `pagefind`）
- SEO/评论/分析：本期不接入（预留新增位置）

### 四、配置要点（本期约束）
1. `nuxt.config.ts`：
   - 启用 `@nuxt/content`、`@nuxtjs/tailwindcss`
   - 基础 meta：站点标题与描述（使用 Nuxt 默认 head 即可）
   - 预渲染：`nuxi generate` 输出静态文件
2. 内容约定：
   - Frontmatter 字段：`title`、`date`、`updated`、`description`、`tags`、`categories`、`cover`、`draft`
   - 草稿处理：生产构建忽略 `draft: true`
3. 主题与布局：
   - `layouts/default.vue`、`layouts/post.vue`
   - 组件：导航、页脚、文章卡、目录（ToC）、标签/分类、分页
4. 搜索：
   - 本期不实现；后续按内容体量接入 `Fuse.js` 或 `Pagefind`
5. RSS/Atom：
   - 本期不提供；后续可在构建期生成 `rss.xml`/`atom.xml`
6. PWA（可选）：
   - `@vite-pwa/nuxt`，配置离线策略与图标清单

### 五、内容与写作流程
1. 文章存放：`content/posts/YYYY/MM/slug.md`（便于归档）
2. 命名规范：文件名使用英文与短横线；封面放 `public/images/posts/...`
3. 文章模板：统一 frontmatter 与 Markdown 模板（标题、概述、目录、引用、代码块）
4. 草稿：本地使用 `draft: true`；合并前去除或保留但在生产忽略
5. 校对与预览：本地预览或平台 Preview URL

### 六、部署与 CI/CD（GitHub Pages 示例）
1. 分支策略：`main` 为发布分支，`blog/**` 为内容分支
2. GitHub Actions：
   - 触发：push 到 `main` 或标签发布
   - Job：Node 版本、安装依赖、构建静态产物（`nuxi generate`）、部署到 `gh-pages` 分支
   - 缓存：依赖与构建缓存
3. GitHub Pages 设置：
   - 指定 `gh-pages` 分支与根目录
   - 绑定自定义域名（可选），配置 `CNAME`

### 七、可选集成（后续阶段）
- SEO：`nuxt-seo-kit`、`nuxt-simple-sitemap`、`@nuxtjs/robots`
- 评论：Giscus/Utterances；国内 Valine/Artalk
- 分析：Plausible/Umami/GA4/百度统计
- 错误监控：Sentry（前端）
- i18n：`@nuxtjs/i18n`
- 图片：`@nuxt/image` 或外部 CDN/IPX

### 八、质量与规范
- ESLint + Prettier：提交前自动检查
- Git hooks：Husky + lint-staged，Commitlint（约定式提交）
- 可维护性：TypeScript、组件职责单一、清晰的内容约定

### 九、备选方案（VitePress）步骤要点
1. 初始化 VitePress 与基础配置
2. 目录：`docs/posts/` 与自定义主题目录
3. 搜索：接入 Pagefind 或 DocSearch
4. RSS/Sitemap：插件或脚本
5. 部署：同 GitHub Pages/Vercel/Netlify 流程

### 十、交付物
- 可运行的静态博客项目（Nuxt 或 VitePress）
- 配置完善的 CI/CD 与部署
- 写作与发布流程文档（本文件 + README 简述）


