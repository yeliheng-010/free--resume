# Free Resume Builder

[中文](#中文说明) | [English](#english)

## 中文说明

Free Resume Builder 是一个基于 `Next.js + TypeScript + Tailwind CSS` 开发的免费在线简历生成器。

它面向真实求职场景，支持用户在浏览器中编辑简历、实时预览 A4 排版、切换模板与主题、导出 PDF，并管理多个针对不同岗位的简历版本。

### 当前功能

- 基本信息、教育经历、工作经历、项目经历、技能模块编辑
- 个人照片上传、压缩、预览、替换、删除，并支持本地持久化
- 简历实时预览，预览区接近真实 A4 打印效果
- 2 套 ATS-friendly 模板：`Classic` / `Modern`
- 3 套主题色：`Slate` / `Emerald` / `Amber`
- 中英文简历切换
- 模块排序调整
- 多版本简历管理，适合不同岗位分别保存
- JSON 简历数据导入 / 导出
- 浏览器本地自动保存
- 一键导出 PDF
- 首页与模板选择页

### 技术栈

- Next.js 16（App Router）
- TypeScript
- Tailwind CSS v4
- Docker / Docker Compose

### 项目结构

```text
src/
  app/
    page.tsx
    builder/page.tsx
    templates/page.tsx
  components/
    builder/
    editor/
    layout/
    preview/
  data/
  hooks/
  lib/
  types/
```

### Docker 运行方式

首次初始化依赖：

```bash
docker compose run --rm deps
```

启动开发环境：

```bash
docker compose up -d web
```

访问地址：

```text
http://localhost:3000
```

停止服务：

```bash
docker compose down
```

### 本地直接运行

如果本机已安装 Node.js 20+：

```bash
npm install
npm run dev
```

### PDF 导出说明

项目使用浏览器原生 `window.print()` 导出 PDF。

这样做的原因是：

- 更适合文本密集型简历
- 对打印样式保真度更高
- 不需要额外引入复杂的前端截图依赖
- 对照片、主题色和排版兼容性更稳

---

## English

Free Resume Builder is a free online resume generator built with `Next.js + TypeScript + Tailwind CSS`.

It is designed for real job-seeking workflows. Users can edit resume content in the browser, preview an A4-style layout in real time, switch templates and themes, export to PDF, and maintain multiple resume versions for different target roles.

### Current Features

- Edit basics, education, work experience, projects, and skills
- Upload, compress, preview, replace, and remove a profile photo with local persistence
- Real-time A4-style resume preview
- Two ATS-friendly templates: `Classic` / `Modern`
- Three theme options: `Slate` / `Emerald` / `Amber`
- Chinese / English resume switching
- Section reordering
- Multiple resume versions for different target jobs
- JSON import / export for resume data
- Auto-save with browser local storage
- One-click PDF export
- Landing page and template selection page

### Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Docker / Docker Compose

### Project Structure

```text
src/
  app/
    page.tsx
    builder/page.tsx
    templates/page.tsx
  components/
    builder/
    editor/
    layout/
    preview/
  data/
  hooks/
  lib/
  types/
```

### Docker Workflow

Initialize dependencies for the first time:

```bash
docker compose run --rm deps
```

Start the dev server:

```bash
docker compose up -d web
```

Open:

```text
http://localhost:3000
```

Stop services:

```bash
docker compose down
```

### Run Without Docker

If Node.js 20+ is available locally:

```bash
npm install
npm run dev
```

### PDF Export Notes

The project uses native browser `window.print()` for PDF export.

Why this approach:

- Better fit for text-heavy resume documents
- More reliable print fidelity than canvas-based export in most browsers
- No extra heavy client-side screenshot dependency
- Stable for photos, theme colors, and print layout preservation

